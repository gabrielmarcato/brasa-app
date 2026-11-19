import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Animated, { FadeInDown, FadeOutLeft, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { categoryIcon } from '@/components/ProductCard';
import { Backdrop, EmptyState, Glass, GradientButton, IconButton, PhotoPlaceholder, PressableScale, Txt } from '@/components/ui';
import { COUPON, RESTAURANT, formatBRL, getProduct } from '@/data/menu';
import { useCart, useTotals } from '@/store/cart';
import { colors } from '@/theme';

function SummaryRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Txt size={13} color={colors.muted}>
        {label}
      </Txt>
      <Txt size={13} weight="medium" color={accent ? colors.accentLight : colors.text}>
        {value}
      </Txt>
    </View>
  );
}

export default function Carrinho() {
  const insets = useSafeAreaInsets();
  const lines = useCart((s) => s.lines);
  const couponApplied = useCart((s) => s.couponApplied);
  const { increment, decrement, clear, toggleCoupon } = useCart.getState();
  const totals = useTotals();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Backdrop />

      <View style={{ paddingTop: insets.top + 4, paddingHorizontal: 20 }}>
        <View style={{ height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton icon="back" accessibilityLabel="Voltar" onPress={() => router.back()} />
          <Txt size={18} weight="semibold">
            Meu carrinho
          </Txt>
          <IconButton icon="trash" accessibilityLabel="Limpar carrinho" onPress={clear} />
        </View>
        <Txt size={13} color={colors.muted} style={{ marginTop: 10 }}>
          {totals.count} {totals.count === 1 ? 'item' : 'itens'} · {RESTAURANT}
        </Txt>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 260 + insets.bottom, gap: 12 }}
      >
        {lines.length === 0 && (
          <EmptyState icon="bag" title="Seu carrinho está vazio" text="Escolha um burger e ele aparece aqui." />
        )}

        {lines.map((line, i) => {
          const product = getProduct(line.productId);
          return (
            <Animated.View
              key={line.key}
              entering={FadeInDown.delay(i * 60).duration(360)}
              exiting={FadeOutLeft.duration(220)}
              layout={LinearTransition.springify().damping(18)}
            >
              <Glass style={{ padding: 10, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <PhotoPlaceholder icon={product ? categoryIcon(product) : 'burger'} iconSize={22} radius={16} style={{ width: 72, height: 72 }} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Txt size={14} weight="semibold" numberOfLines={1}>
                    {line.name}
                  </Txt>
                  <Txt size={12} color={colors.muted} numberOfLines={1}>
                    {line.options}
                  </Txt>
                  <View style={{ marginTop: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Txt size={15} weight="semibold" color={colors.accentLight}>
                      {formatBRL(line.unitPrice * line.qty)}
                    </Txt>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <PressableScale
                        haptic
                        scaleTo={0.85}
                        onPress={() => decrement(line.key)}
                        accessibilityRole="button"
                        accessibilityLabel={`Diminuir ${line.name}`}
                        style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.12)', borderWidth: 1, borderColor: colors.borderStrong, alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Icon name="minus" size={12} />
                      </PressableScale>
                      <Txt size={14} weight="semibold" style={{ minWidth: 14, textAlign: 'center' }}>
                        {line.qty}
                      </Txt>
                      <GradientButton height={28} style={{ width: 28 }} scaleTo={0.85} onPress={() => increment(line.key)} accessibilityLabel={`Aumentar ${line.name}`}>
                        <Icon name="plus" size={12} color={colors.onAccent} />
                      </GradientButton>
                    </View>
                  </View>
                </View>
              </Glass>
            </Animated.View>
          );
        })}

        {lines.length > 0 && (
          <Glass style={{ padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderColor: couponApplied ? 'rgba(255,138,31,0.45)' : colors.border }}>
            <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,138,31,0.18)', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="tag" size={20} color={colors.accentLight} />
            </View>
            <View style={{ flex: 1 }}>
              <Txt size={14} weight="semibold" style={{ letterSpacing: 0.8 }}>
                {COUPON.code}
              </Txt>
              <Txt size={12} color={colors.muted}>
                {couponApplied ? `Cupom aplicado · −${formatBRL(COUPON.discount)}` : 'Cupom disponível para este pedido'}
              </Txt>
            </View>
            <PressableScale haptic onPress={toggleCoupon} accessibilityRole="button">
              <Txt size={13} weight="semibold" color={colors.accentLight}>
                {couponApplied ? 'Remover' : 'Aplicar'}
              </Txt>
            </PressableScale>
          </Glass>
        )}
      </ScrollView>

      {/* Resumo */}
      {lines.length > 0 && (
        <Glass
          radius={28}
          intensity={50}
          tint={colors.glassStrong}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            paddingTop: 18,
            paddingHorizontal: 20,
            paddingBottom: Math.max(insets.bottom, 12) + 8,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            gap: 8,
          }}
        >
          <SummaryRow label="Subtotal" value={formatBRL(totals.subtotal)} />
          <SummaryRow label="Entrega" value={formatBRL(totals.delivery)} />
          {totals.discount > 0 && <SummaryRow label="Desconto" value={`−${formatBRL(totals.discount)}`} accent />}
          <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 4 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Txt size={16} weight="semibold">
              Total
            </Txt>
            <Txt size={20} weight="bold" color={colors.accentLight}>
              {formatBRL(totals.total)}
            </Txt>
          </View>
          <GradientButton height={56} style={{ marginTop: 8 }} onPress={() => router.replace({ pathname: '/confirmado', params: { total: String(totals.total) } })}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Txt size={15} weight="bold" color={colors.onAccent}>
                Finalizar pedido
              </Txt>
              <Icon name="arrow" size={18} color={colors.onAccent} />
            </View>
          </GradientButton>
        </Glass>
      )}
    </View>
  );
}
