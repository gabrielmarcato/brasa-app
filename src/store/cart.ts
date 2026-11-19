import { create } from 'zustand';
import { COUPON, DELIVERY_FEE, defaultFavorites } from '@/data/menu';

export interface CartLine {
  key: string;
  productId: string;
  name: string;
  /** Resumo das opções escolhidas, ex.: "Regular · Queijo extra · Bacon". */
  options: string;
  unitPrice: number;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  couponApplied: boolean;
  favorites: string[];
  addLine: (line: Omit<CartLine, 'key'>) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  clear: () => void;
  toggleCoupon: () => void;
  toggleFavorite: (productId: string) => void;
}

// Carrinho inicial hard coded (igual ao protótipo de design).
const seedLines: CartLine[] = [
  {
    key: 'seed-1',
    productId: 'chicken-picante',
    name: 'Chicken Picante',
    options: 'Regular · Queijo extra · Bacon',
    unitPrice: 32.9,
    qty: 1,
  },
  {
    key: 'seed-2',
    productId: 'duplo-bacon',
    name: 'Duplo Bacon',
    options: 'Grande · Sem cebola',
    unitPrice: 36.9,
    qty: 2,
  },
  {
    key: 'seed-3',
    productId: 'batata-rustica',
    name: 'Batata Rústica',
    options: 'Média · Páprica defumada',
    unitPrice: 14.9,
    qty: 1,
  },
];

export const useCart = create<CartState>((set) => ({
  lines: seedLines,
  couponApplied: true,
  favorites: defaultFavorites,

  addLine: (line) =>
    set((s) => {
      const existing = s.lines.find((l) => l.productId === line.productId && l.options === line.options);
      if (existing) {
        return {
          lines: s.lines.map((l) => (l.key === existing.key ? { ...l, qty: l.qty + line.qty } : l)),
        };
      }
      return { lines: [...s.lines, { ...line, key: `${line.productId}-${Date.now()}` }] };
    }),

  increment: (key) =>
    set((s) => ({ lines: s.lines.map((l) => (l.key === key ? { ...l, qty: Math.min(20, l.qty + 1) } : l)) })),

  // Ao chegar em zero, a linha é removida.
  decrement: (key) =>
    set((s) => ({
      lines: s.lines.flatMap((l) => (l.key !== key ? [l] : l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : [])),
    })),

  clear: () => set({ lines: [] }),

  toggleCoupon: () => set((s) => ({ couponApplied: !s.couponApplied })),

  toggleFavorite: (productId) =>
    set((s) => ({
      favorites: s.favorites.includes(productId)
        ? s.favorites.filter((id) => id !== productId)
        : [...s.favorites, productId],
    })),
}));

export interface CartTotals {
  count: number;
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
}

export const computeTotals = (lines: CartLine[], couponApplied: boolean): CartTotals => {
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0);
  const delivery = lines.length ? DELIVERY_FEE : 0;
  const discount = lines.length && couponApplied ? COUPON.discount : 0;
  return { count, subtotal, delivery, discount, total: subtotal + delivery - discount };
};

export const useTotals = (): CartTotals => {
  const lines = useCart((s) => s.lines);
  const couponApplied = useCart((s) => s.couponApplied);
  return computeTotals(lines, couponApplied);
};
