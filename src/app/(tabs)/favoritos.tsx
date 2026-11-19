import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from '@/components/ProductCard';
import { Backdrop, EmptyState, ScreenTitle, Txt } from '@/components/ui';
import { products } from '@/data/menu';
import { useCart } from '@/store/cart';
import { TAB_BAR_SPACE, colors } from '@/theme';

export default function Favoritos() {
  const insets = useSafeAreaInsets();
  const favorites = useCart((s) => s.favorites);
  const list = products.filter((p) => favorites.includes(p.id));

  const rows: (typeof list)[] = [];
  for (let i = 0; i < list.length; i += 2) rows.push(list.slice(i, i + 2));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Backdrop />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 20, paddingBottom: TAB_BAR_SPACE + 20, gap: 14 }}
      >
        <View>
          <ScreenTitle>Favoritos</ScreenTitle>
          <Txt size={13} color={colors.muted}>
            {list.length} {list.length === 1 ? 'item salvo' : 'itens salvos'}
          </Txt>
        </View>

        {rows.map((row, r) => (
          <View key={row.map((p) => p.id).join()} style={{ flexDirection: 'row', gap: 14 }}>
            {row.map((p, c) => (
              <ProductCard key={p.id} product={p} index={r * 2 + c} />
            ))}
            {row.length === 1 && <View style={{ flex: 1 }} />}
          </View>
        ))}

        {list.length === 0 && (
          <EmptyState icon="heart" title="Sem favoritos ainda" text="Toque no coração de um produto para salvá-lo aqui." />
        )}
      </ScrollView>
    </View>
  );
}
