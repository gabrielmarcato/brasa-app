import type { IconName } from '@/components/Icon';

export type CategoryId = 'burger' | 'pizza' | 'frango' | 'fritas' | 'bebidas';

export interface Category {
  id: CategoryId;
  label: string;
  icon: IconName;
}

export interface SizeOption {
  id: string;
  label: string;
  add: number;
}

export interface ExtraOption {
  id: string;
  label: string;
  note: string;
  price: number;
  defaultOn?: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: CategoryId;
  rating: number;
  reviews: number;
  badge?: string;
  sizes: SizeOption[];
  extras: ExtraOption[];
}

export const categories: Category[] = [
  { id: 'burger', label: 'Burger', icon: 'burger' },
  { id: 'pizza', label: 'Pizza', icon: 'pizza' },
  { id: 'frango', label: 'Frango', icon: 'chicken' },
  { id: 'fritas', label: 'Fritas', icon: 'fries' },
  { id: 'bebidas', label: 'Bebidas', icon: 'drink' },
];

const sizesFood: SizeOption[] = [
  { id: 'regular', label: 'Regular', add: 0 },
  { id: 'grande', label: 'Grande', add: 5 },
  { id: 'extra', label: 'Extra Grande', add: 9 },
];

const sizesSide: SizeOption[] = [
  { id: 'pequena', label: 'Pequena', add: 0 },
  { id: 'media', label: 'Média', add: 4 },
  { id: 'grande', label: 'Grande', add: 8 },
];

const sizesDrink: SizeOption[] = [
  { id: '300', label: '300 ml', add: 0 },
  { id: '500', label: '500 ml', add: 3 },
  { id: '700', label: '700 ml', add: 5 },
];

const burgerExtras: ExtraOption[] = [
  { id: 'queijo', label: 'Queijo extra', note: 'Cheddar', price: 0, defaultOn: true },
  { id: 'carne', label: 'Carne extra', note: '+ R$ 8,00', price: 8 },
  { id: 'bacon', label: 'Bacon', note: 'Crocante', price: 0, defaultOn: true },
];

const sideExtras: ExtraOption[] = [
  { id: 'cheddar', label: 'Cheddar cremoso', note: '+ R$ 4,00', price: 4 },
  { id: 'bacon', label: 'Farofa de bacon', note: '+ R$ 3,00', price: 3 },
];

const pizzaExtras: ExtraOption[] = [
  { id: 'borda', label: 'Borda recheada', note: 'Catupiry · + R$ 6,00', price: 6 },
  { id: 'azeitona', label: 'Azeitonas', note: 'Pretas', price: 0, defaultOn: true },
];

export const products: Product[] = [
  // Burgers
  {
    id: 'chicken-picante',
    name: 'Burger de Frango Picante',
    tagline: 'Frango crocante',
    description:
      'Sobrecoxa empanada e crocante, molho de pimenta defumada, jalapeños frescos e alface no pão brioche selado na manteiga.',
    price: 32.9,
    category: 'burger',
    rating: 4.8,
    reviews: 120,
    badge: '+ pedidos',
    sizes: sizesFood,
    extras: burgerExtras,
  },
  {
    id: 'smash-classico',
    name: 'Smash Clássico',
    tagline: 'Blend 160g',
    description:
      'Blend bovino de 160g amassado na chapa até criar crosta, queijo prato derretido, picles e molho da casa no pão de batata.',
    price: 29.9,
    category: 'burger',
    rating: 4.7,
    reviews: 208,
    sizes: sizesFood,
    extras: burgerExtras,
  },
  {
    id: 'duplo-bacon',
    name: 'Duplo Bacon',
    tagline: 'Dois smash + bacon',
    description:
      'Dois smashes de 90g, fatias generosas de bacon crocante, cheddar inglês e cebola caramelizada no pão brioche.',
    price: 36.9,
    category: 'burger',
    rating: 4.9,
    reviews: 312,
    sizes: sizesFood,
    extras: burgerExtras,
  },
  {
    id: 'veggie-brasa',
    name: 'Veggie Brasa',
    tagline: 'Grão-de-bico e cheddar',
    description:
      'Hambúrguer de grão-de-bico temperado com defumado, cheddar cremoso, rúcula, tomate confitado e maionese de ervas.',
    price: 31.9,
    category: 'burger',
    rating: 4.6,
    reviews: 74,
    sizes: sizesFood,
    extras: burgerExtras.filter((e) => e.id !== 'carne'),
  },
  // Pizza
  {
    id: 'pizza-calabresa',
    name: 'Pizza Calabresa',
    tagline: 'Calabresa e cebola',
    description: 'Massa de fermentação lenta, molho de tomate rústico, calabresa artesanal e cebola roxa.',
    price: 49.9,
    category: 'pizza',
    rating: 4.7,
    reviews: 96,
    sizes: sizesFood,
    extras: pizzaExtras,
  },
  {
    id: 'pizza-margherita',
    name: 'Pizza Margherita',
    tagline: 'Muçarela de búfala',
    description: 'Molho de tomate italiano, muçarela de búfala, manjericão fresco e fio de azeite.',
    price: 46.9,
    category: 'pizza',
    rating: 4.8,
    reviews: 143,
    badge: '+ pedidos',
    sizes: sizesFood,
    extras: pizzaExtras,
  },
  {
    id: 'pizza-pepperoni',
    name: 'Pizza Pepperoni',
    tagline: 'Pepperoni defumado',
    description: 'Muçarela, pepperoni fatiado e um toque de mel picante finalizado na saída do forno.',
    price: 52.9,
    category: 'pizza',
    rating: 4.9,
    reviews: 187,
    sizes: sizesFood,
    extras: pizzaExtras,
  },
  {
    id: 'pizza-quatro-queijos',
    name: 'Quatro Queijos',
    tagline: 'Gorgonzola e parmesão',
    description: 'Muçarela, gorgonzola, provolone e parmesão sobre molho branco e orégano.',
    price: 54.9,
    category: 'pizza',
    rating: 4.6,
    reviews: 65,
    sizes: sizesFood,
    extras: pizzaExtras,
  },
  // Frango
  {
    id: 'tiras-crocantes',
    name: 'Tiras Crocantes',
    tagline: 'Com molho barbecue',
    description: 'Peito de frango empanado em crosta de panko, servido com molho barbecue defumado.',
    price: 27.9,
    category: 'frango',
    rating: 4.7,
    reviews: 88,
    badge: '+ pedidos',
    sizes: sizesSide,
    extras: sideExtras,
  },
  {
    id: 'asinhas-picantes',
    name: 'Asinhas Picantes',
    tagline: '10 unidades',
    description: 'Asinhas fritas na hora e passadas no molho de pimenta Brasa. Acompanha molho ranch.',
    price: 34.9,
    category: 'frango',
    rating: 4.8,
    reviews: 132,
    sizes: sizesSide,
    extras: sideExtras,
  },
  {
    id: 'nuggets-brasa',
    name: 'Nuggets Brasa',
    tagline: '8 unidades',
    description: 'Nuggets caseiros de peito de frango, crocantes por fora e suculentos por dentro.',
    price: 22.9,
    category: 'frango',
    rating: 4.5,
    reviews: 59,
    sizes: sizesSide,
    extras: sideExtras,
  },
  {
    id: 'frango-balde',
    name: 'Balde de Frango',
    tagline: 'Para dividir',
    description: 'Oito pedaços de frango frito crocante, porção de batata e dois molhos à escolha.',
    price: 59.9,
    category: 'frango',
    rating: 4.9,
    reviews: 41,
    sizes: sizesSide,
    extras: sideExtras,
  },
  // Fritas
  {
    id: 'batata-rustica',
    name: 'Batata Rústica',
    tagline: 'Páprica defumada',
    description:
      'Batatas com casca cortadas em gomos, assadas e fritas, temperadas com páprica defumada e alecrim.',
    price: 14.9,
    category: 'fritas',
    rating: 4.8,
    reviews: 201,
    badge: '+ pedidos',
    sizes: sizesSide,
    extras: sideExtras,
  },
  {
    id: 'batata-cheddar-bacon',
    name: 'Cheddar & Bacon',
    tagline: 'Batata palito',
    description: 'Batata palito sequinha coberta com cheddar cremoso e farofa de bacon crocante.',
    price: 22.9,
    category: 'fritas',
    rating: 4.9,
    reviews: 176,
    sizes: sizesSide,
    extras: sideExtras,
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    tagline: 'Anéis empanados',
    description: 'Anéis de cebola empanados e fritos, acompanham molho especial de mostarda e mel.',
    price: 18.9,
    category: 'fritas',
    rating: 4.6,
    reviews: 83,
    sizes: sizesSide,
    extras: sideExtras,
  },
  {
    id: 'mandioca-frita',
    name: 'Mandioca Frita',
    tagline: 'Com maionese verde',
    description: 'Mandioca cozida e frita até dourar, servida com maionese verde da casa.',
    price: 16.9,
    category: 'fritas',
    rating: 4.5,
    reviews: 52,
    sizes: sizesSide,
    extras: [],
  },
  // Bebidas
  {
    id: 'limonada-brasa',
    name: 'Limonada Brasa',
    tagline: 'Limão siciliano e hortelã',
    description: 'Limonada gelada batida na hora com limão siciliano, hortelã e um toque de gengibre.',
    price: 11.9,
    category: 'bebidas',
    rating: 4.7,
    reviews: 97,
    badge: '+ pedidos',
    sizes: sizesDrink,
    extras: [],
  },
  {
    id: 'milkshake-chocolate',
    name: 'Milk-shake Chocolate',
    tagline: 'Chantilly e calda',
    description: 'Sorvete de baunilha batido com chocolate belga, finalizado com chantilly e calda.',
    price: 19.9,
    category: 'bebidas',
    rating: 4.9,
    reviews: 154,
    sizes: sizesDrink,
    extras: [{ id: 'chantilly', label: 'Chantilly extra', note: '+ R$ 2,00', price: 2 }],
  },
  {
    id: 'refri-lata',
    name: 'Refrigerante Lata',
    tagline: '350 ml gelado',
    description: 'Escolha entre cola, guaraná ou limão. Sempre bem gelado.',
    price: 6.9,
    category: 'bebidas',
    rating: 4.4,
    reviews: 38,
    sizes: [{ id: 'lata', label: 'Lata 350 ml', add: 0 }],
    extras: [],
  },
  {
    id: 'cha-gelado',
    name: 'Chá Gelado',
    tagline: 'Pêssego',
    description: 'Chá preto gelado com pêssego e folhas de hortelã.',
    price: 9.9,
    category: 'bebidas',
    rating: 4.5,
    reviews: 46,
    sizes: sizesDrink,
    extras: [],
  },
];

export const getProduct = (id: string): Product | undefined => products.find((p) => p.id === id);

export const productsByCategory = (cat: CategoryId): Product[] => products.filter((p) => p.category === cat);

export const defaultFavorites = ['chicken-picante', 'batata-rustica'];

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  discount: string;
  productId: string;
}

export const offers: Offer[] = [
  {
    id: 'combo-picante',
    title: 'Combo Burger Picante',
    subtitle: 'Burger + batata + bebida',
    code: 'PICANTE15',
    discount: '15% OFF',
    productId: 'chicken-picante',
  },
  {
    id: 'brasa10',
    title: 'Primeiro pedido',
    subtitle: 'R$ 10 de desconto acima de R$ 50',
    code: 'BRASA10',
    discount: 'R$ 10 OFF',
    productId: 'smash-classico',
  },
  {
    id: 'terca-smash',
    title: 'Terça do Smash',
    subtitle: 'Duplo Bacon com batata grátis',
    code: 'TERCASMASH',
    discount: 'Batata grátis',
    productId: 'duplo-bacon',
  },
  {
    id: 'frete',
    title: 'Frete grátis',
    subtitle: 'Em pedidos acima de R$ 80',
    code: 'FRETEZERO',
    discount: 'Frete grátis',
    productId: 'frango-balde',
  },
];

export const RESTAURANT = 'Brasa Burger — Centro';
export const DELIVERY_FEE = 5.9;
export const COUPON = { code: 'BRASA10', discount: 10 };

export interface TrackingStep {
  id: string;
  title: string;
  time: string;
  state: 'done' | 'current' | 'pending';
}

export const trackingSteps: TrackingStep[] = [
  { id: 'confirmed', title: 'Pedido confirmado', time: '19:02', state: 'done' },
  { id: 'kitchen', title: 'Preparando na chapa', time: '19:08', state: 'done' },
  { id: 'onway', title: 'A caminho', time: '19:24 · agora', state: 'current' },
  { id: 'delivered', title: 'Entregue', time: 'Previsão 19:36', state: 'pending' },
];

export const activeOrder = {
  number: '#2481',
  eta: '12 min',
  etaClock: '19:36',
  total: 117.5,
  courier: { name: 'Rafael Souza', rating: 4.9, vehicle: 'Moto', plate: 'RIO-2B48' },
};

export interface PastOrder {
  id: string;
  number: string;
  date: string;
  items: string;
  total: number;
}

export const pastOrders: PastOrder[] = [
  { id: 'o1', number: '#2392', date: '02 nov · 20:14', items: '2× Smash Clássico, Batata Rústica', total: 74.7 },
  { id: 'o2', number: '#2310', date: '24 out · 19:48', items: 'Duplo Bacon, Milk-shake Chocolate', total: 62.7 },
  { id: 'o3', number: '#2254', date: '15 out · 12:31', items: 'Pizza Margherita', total: 52.8 },
];

export const formatBRL = (v: number): string => 'R$ ' + v.toFixed(2).replace('.', ',');
