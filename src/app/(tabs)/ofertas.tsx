import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { Backdrop, Badge, Glass, PressableScale, ScreenTitle, Txt } from '@/components/ui';
import { offers } from '@/data/menu';
import { useCart } from '@/store/cart';
import { TAB_BAR_SPACE, colors } from '@/theme';

export default function Ofertas() {
  const insets = useSafeAreaInsets();
  const couponApplied = useCart((s) => s.couponApplied);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Backdrop />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 20, paddingBottom: TAB_BAR_SPACE + 20, gap: 14 }}
      >
        <View>
          <ScreenTitle>Ofertas</ScreenTitle>
          <Txt size={13} color={colors.muted}>
            Cupons e combos para pedir com desconto.
          </Txt>
        </View>

        {offers.map((offer, i) => {
          const active = offer.code === 'BRASA10' && couponApplied;
          return (
            <Animated.View key={offer.id} entering={FadeInDown.delay(i * 70).duration(380)}>
              <PressableScale
                haptic
                onPress={() => router.push({ pathname: '/produto/[id]', params: { id: offer.productId } })}
                accessibilityRole="button"
                accessibilityLabel={`${offer.title}, ${offer.discount}`}
              >
                <Glass style={{ padding: 16, gap: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Badge label={offer.discount} tone="accent" style={{ height: 26, borderRadius: 13 }} />
                    {active && (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Icon name="check" size={14} color={colors.accentLight} />
                        <Txt size={12} weight="medium" color={colors.accentLight}>
                          Aplicado
                        </Txt>
                      </View>
                    )}
                  </View>
                  <View>
                    <Txt size={17} weight="semibold">
                      {offer.title}
                    </Txt>
                    <Txt size={13} color={colors.muted}>
                      {offer.subtitle}
                    </Txt>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View style={{ borderWidth: 1, borderStyle: 'dashed', borderColor: 'rgba(255,165,58,0.55)', borderRadius: 10, paddingHorizontal: 10, height: 28, justifyContent: 'center' }}>
                      <Txt size={12} weight="semibold" color={colors.accentSoft} style={{ letterSpacing: 1 }}>
                        {offer.code}
                      </Txt>
                    </View>
                    <View style={{ flex: 1 }} />
                    <Txt size={13} weight="medium" color={colors.accentLight}>
                      Pedir agora
                    </Txt>
                    <Icon name="arrow" size={16} color={colors.accentLight} />
                  </View>
                </Glass>
              </PressableScale>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
}
