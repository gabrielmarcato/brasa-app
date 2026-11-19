import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { Backdrop, Badge, Glass, GradientButton, PressableScale, ScreenTitle, SectionHeader, Txt } from '@/components/ui';
import { RESTAURANT, activeOrder, formatBRL, pastOrders } from '@/data/menu';
import { TAB_BAR_SPACE, colors } from '@/theme';

export default function Pedidos() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Backdrop />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 12, paddingHorizontal: 20, paddingBottom: TAB_BAR_SPACE + 20, gap: 14 }}
      >
        <ScreenTitle>Pedidos</ScreenTitle>

        <Animated.View entering={FadeInDown.duration(400)}>
          <Glass style={{ padding: 16, gap: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Badge label="Em andamento" tone="accent" style={{ height: 26, borderRadius: 13 }} />
              <Txt size={13} color={colors.muted}>
                Pedido {activeOrder.number}
              </Txt>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,138,31,0.2)', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="bike" size={24} color={colors.accentLight} />
              </View>
              <View style={{ flex: 1 }}>
                <Txt size={15} weight="semibold">
                  Chega em {activeOrder.eta}
                </Txt>
                <Txt size={12} color={colors.muted} numberOfLines={1}>
                  {RESTAURANT}
                </Txt>
              </View>
              <Txt size={16} weight="semibold" color={colors.accentLight}>
                {formatBRL(activeOrder.total)}
              </Txt>
            </View>
            <GradientButton height={48} onPress={() => router.push('/rastreamento')}>
              <Txt size={14} weight="semibold" color={colors.onAccent}>
                Acompanhar pedido
              </Txt>
            </GradientButton>
          </Glass>
        </Animated.View>

        <View style={{ marginTop: 6 }}>
          <SectionHeader title="Anteriores" />
        </View>

        {pastOrders.map((o, i) => (
          <Animated.View key={o.id} entering={FadeInDown.delay(120 + i * 70).duration(380)}>
            <PressableScale haptic accessibilityRole="button" accessibilityLabel={`Pedido ${o.number}`}>
              <Glass style={{ padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: colors.glass, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="receipt" size={22} color={colors.muted} />
                </View>
                <View style={{ flex: 1 }}>
                  <Txt size={14} weight="semibold" numberOfLines={1}>
                    {o.items}
                  </Txt>
                  <Txt size={12} color={colors.muted}>
                    {o.number} · {o.date}
                  </Txt>
                </View>
                <Txt size={14} weight="semibold">
                  {formatBRL(o.total)}
                </Txt>
              </Glass>
            </PressableScale>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}
