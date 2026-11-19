import { router } from 'expo-router';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { categories, formatBRL, type Product } from '@/data/menu';
import { useCart } from '@/store/cart';
import { colors } from '@/theme';
import { Icon } from './Icon';
import { Badge, Glass, GradientButton, PhotoPlaceholder, PressableScale, Txt } from './ui';

export const categoryIcon = (product: Product) =>
  categories.find((c) => c.id === product.category)?.icon ?? 'burger';

/** Nome curto usado nos cards (o protótipo usa "Chicken Picante" na grade). */
const shortName = (p: Product) => (p.id === 'chicken-picante' ? 'Chicken Picante' : p.name);

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const favorite = useCart((s) => s.favorites.includes(product.id));
  const toggleFavorite = useCart((s) => s.toggleFavorite);
  const open = () => router.push({ pathname: '/produto/[id]', params: { id: product.id } });

  // Os botões de favoritar/adicionar são irmãos (não filhos) do botão principal,
  // para evitar <button> aninhado na web.
  return (
    <Animated.View entering={FadeInDown.delay(index * 60).duration(380)} style={{ flex: 1 }}>
      <Glass style={{ height: 244 }}>
        <PressableScale
          haptic
          onPress={open}
          accessibilityRole="button"
          accessibilityLabel={`${product.name}, ${formatBRL(product.price)}`}
          style={{ flex: 1, padding: 10 }}
        >
          <PhotoPlaceholder icon={categoryIcon(product)} style={{ height: 92, marginTop: 36 }} iconSize={30} />
          <View style={{ paddingHorizontal: 4, marginTop: 8 }}>
            <Txt size={14} weight="semibold" numberOfLines={1}>
              {shortName(product)}
            </Txt>
            <Txt size={12} color={colors.muted} numberOfLines={1}>
              {product.tagline}
            </Txt>
          </View>
          <Txt
            size={18}
            weight="semibold"
            color={colors.accentLight}
            style={{ position: 'absolute', left: 14, bottom: 16 }}
          >
            {formatBRL(product.price)}
          </Txt>
        </PressableScale>

        {product.badge ? (
          <View pointerEvents="none" style={{ position: 'absolute', left: 10, top: 10 }}>
            <Badge label={product.badge} />
          </View>
        ) : null}

        <PressableScale
          scaleTo={0.85}
          haptic
          onPress={() => toggleFavorite(product.id)}
          accessibilityRole="button"
          accessibilityLabel={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          style={{ position: 'absolute', right: 10, top: 10 }}
        >
          <Glass
            radius={14}
            intensity={20}
            tint={colors.glassSoft}
            style={{ width: 28, height: 28, alignItems: 'center', justifyContent: 'center' }}
          >
            <Icon name="heart" size={15} color={favorite ? colors.red : colors.text} />
          </Glass>
        </PressableScale>

        <GradientButton
          height={32}
          radius={10}
          style={{ position: 'absolute', right: 12, bottom: 12, width: 32 }}
          accessibilityLabel={`Ver ${product.name}`}
          onPress={open}
        >
          <Icon name="plus" size={16} color={colors.onAccent} />
        </GradientButton>
      </Glass>
    </Animated.View>
  );
}
