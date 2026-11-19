import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View , Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { categoryIcon } from '@/components/ProductCard';
import { Backdrop, Badge, Glass, GradientButton, IconButton, PhotoPlaceholder, PressableScale, Txt } from '@/components/ui';
import { formatBRL, getProduct } from '@/data/menu';
import { useCart } from '@/store/cart';
import { colors, gradients, shadows } from '@/theme';

function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: on }}
      accessibilityLabel={label}
      onPress={onChange}
      hitSlop={6}
      style={[
        { width: 46, height: 28, borderRadius: 14, justifyContent: 'center' },
        on ? shadows.accent : { backgroundColor: 'rgba(255,255,255,0.16)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
      ]}
    >
      {on && (
        <LinearGradient colors={gradients.accent} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ position: 'absolute', inset: 0, borderRadius: 14 } as never} />
      )}
      <View
        style={{
          position: 'absolute',
          top: on ? 3 : 2,
          left: on ? 21 : 2,
          width: 22,
          height: 22,
          borderRadius: 11,
          backgroundColor: '#fff',
        }}
      />
    </Pressable>
  );
}

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = getProduct(String(id));
  const insets = useSafeAreaInsets();
  const favorite = useCart((s) => s.favorites.includes(String(id)));
  const toggleFavorite = useCart((s) => s.toggleFavorite);
  const addLine = useCart((s) => s.addLine);

  const [sizeId, setSizeId] = useState(product?.sizes[0]?.id ?? '');
  const [qty, setQty] = useState(1);
  const [extras, setExtras] = useState<Record<string, boolean>>(() =>
    Object.fromEntries((product?.extras ?? []).map((e) => [e.id, !!e.defaultOn])),
  );

  if (!product) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <Txt size={16} weight="semibold">
          Produto não encontrado
        </Txt>
        <GradientButton height={44} contentStyle={{ paddingHorizontal: 24 }} onPress={() => router.back()}>
          <Txt size={14} weight="semibold" color={colors.onAccent}>
            Voltar
          </Txt>
        </GradientButton>
      </View>
    );
  }

  const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];
  const extrasTotal = product.extras.reduce((sum, e) => sum + (extras[e.id] ? e.price : 0), 0);
  const unitPrice = product.price + size.add + extrasTotal;
  const total = unitPrice * qty;

  const addToCart = () => {
    const chosen = product.extras.filter((e) => extras[e.id]).map((e) => e.label);
    addLine({
      productId: product.id,
      name: product.name,
      options: [size.label, ...chosen].join(' · '),
      unitPrice,
      qty,
    });
    router.push('/carrinho');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Backdrop variant="hero" />

      {/* Hero */}
      <View style={{ paddingTop: insets.top + 7, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <IconButton icon="back" accessibilityLabel="Voltar" onPress={() => router.back()} />
          <IconButton
            icon="heart"
            iconColor={favorite ? colors.red : colors.text}
            accessibilityLabel={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            onPress={() => toggleFavorite(product.id)}
          />
        </View>
        <PhotoPlaceholder
          icon={categoryIcon(product)}
          iconSize={44}
          radius={28}
          label="Foto do produto"
          hint="Imagem hero"
          style={{ height: 232, marginTop: 14 }}
        />
      </View>

      {/* Sheet */}
      <Glass
        radius={32}
        intensity={50}
        tint="rgba(24,15,10,0.78)"
        style={{ flex: 1, marginTop: 18, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottomWidth: 0 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 120 + insets.bottom }}
        >
          <View style={{ alignSelf: 'center', width: 36, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.25)' }} />

          <View style={{ marginTop: 12, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            {product.badge ? <Badge label={product.badge} style={{ height: 26, borderRadius: 13, paddingHorizontal: 12 }} /> : <View />}
            <IconButton icon="more" size={32} iconSize={18} variant="plain" accessibilityLabel="Mais opções" />
          </View>

          <Txt size={24} weight="semibold" style={{ marginTop: 10, lineHeight: 30, letterSpacing: -0.3 }}>
            {product.name}
          </Txt>

          <View style={{ marginTop: 6, height: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Icon name="star" size={17} color={colors.yellow} />
              <Txt size={14} weight="semibold">
                {product.rating.toFixed(1).replace('.', ',')}{' '}
                <Txt size={14} color={colors.muted}>
                  ({product.reviews})
                </Txt>
              </Txt>
            </View>
            <Txt size={18} weight="semibold" color={colors.accentLight}>
              {formatBRL(product.price)}
            </Txt>
          </View>

          <Txt size={13} color={colors.muted} style={{ marginTop: 10, lineHeight: 20 }}>
            {product.description}
          </Txt>

          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.14)', 'rgba(255,255,255,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ height: 1, marginTop: 14 }}
          />

          <Txt size={15} weight="semibold" style={{ marginTop: 12 }}>
            Personalizar
          </Txt>

          {/* Tamanho */}
          <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <Txt size={14}>Tamanho</Txt>
            <View style={{ flexDirection: 'row', gap: 6 }} accessibilityRole="radiogroup">
              {product.sizes.map((s) => {
                const on = s.id === size.id;
                return (
                  <PressableScale
                    key={s.id}
                    haptic
                    scaleTo={0.94}
                    onPress={() => setSizeId(s.id)}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: on }}
                  >
                    {on ? (
                      <LinearGradient
                        colors={gradients.accent}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[{ height: 32, paddingHorizontal: 14, borderRadius: 16, justifyContent: 'center' }, shadows.accent]}
                      >
                        <Txt size={13} weight="semibold" color={colors.onAccent} numberOfLines={1}>
                          {s.label}
                        </Txt>
                      </LinearGradient>
                    ) : (
                      <View
                        style={{
                          height: 32,
                          paddingHorizontal: 14,
                          borderRadius: 16,
                          justifyContent: 'center',
                          backgroundColor: colors.glassSoft,
                          borderWidth: 1,
                          borderColor: colors.border,
                        }}
                      >
                        <Txt size={13} weight="medium" color={colors.muted} numberOfLines={1}>
                          {s.label}
                        </Txt>
                      </View>
                    )}
                  </PressableScale>
                );
              })}
            </View>
          </View>

          {/* Extras */}
          <View style={{ marginTop: 8, gap: 6 }}>
            {product.extras.map((e) => (
              <View key={e.id} style={{ height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Txt size={14}>
                  {e.label}{' '}
                  <Txt size={12} color={colors.muted}>
                    {e.note}
                  </Txt>
                </Txt>
                <Toggle label={e.label} on={!!extras[e.id]} onChange={() => setExtras((x) => ({ ...x, [e.id]: !x[e.id] }))} />
              </View>
            ))}
          </View>
        </ScrollView>
      </Glass>

      {/* Barra de ação */}
      <Glass
        radius={28}
        intensity={50}
        tint={colors.glassStrong}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: 14,
          paddingHorizontal: 20,
          paddingBottom: Math.max(insets.bottom, 12) + 6,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Glass radius={28} intensity={20} tint={colors.glassSoft} style={{ width: 124, height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 9 }}>
          <PressableScale
            haptic
            scaleTo={0.85}
            onPress={() => setQty((q) => Math.max(1, q - 1))}
            accessibilityRole="button"
            accessibilityLabel="Diminuir quantidade"
            style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.12)', borderWidth: 1, borderColor: colors.borderStrong, alignItems: 'center', justifyContent: 'center' }}
          >
            <Icon name="minus" size={14} />
          </PressableScale>
          <Txt size={18} weight="semibold" style={{ minWidth: 20, textAlign: 'center' }} accessibilityLiveRegion="polite">
            {qty}
          </Txt>
          <GradientButton
            height={36}
            style={{ width: 36 }}
            scaleTo={0.85}
            onPress={() => setQty((q) => Math.min(20, q + 1))}
            accessibilityLabel="Aumentar quantidade"
          >
            <Icon name="plus" size={14} color={colors.onAccent} />
          </GradientButton>
        </Glass>

        <GradientButton height={56} style={{ flex: 1 }} onPress={addToCart} accessibilityLabel={`Adicionar ao carrinho, ${formatBRL(total)}`}>
          <Txt size={13} weight="semibold" color={colors.onAccent} style={{ lineHeight: 18 }}>
            Adicionar ao carrinho
          </Txt>
          <Txt size={15} weight="bold" color={colors.onAccent} style={{ lineHeight: 20 }}>
            {formatBRL(total)}
          </Txt>
        </GradientButton>
      </Glass>
    </View>
  );
}
