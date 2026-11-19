import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { Backdrop, Glass, GradientButton, IconButton, PressableScale, Txt } from '@/components/ui';
import { activeOrder, formatBRL } from '@/data/menu';
import { useCart } from '@/store/cart';
import { colors, gradients, shadows } from '@/theme';

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Txt size={13} color={colors.muted}>
        {label}
      </Txt>
      <Txt size={strong ? 16 : 14} weight="semibold" color={strong ? colors.accentLight : colors.text}>
        {value}
      </Txt>
    </View>
  );
}

export default function Confirmado() {
  const insets = useSafeAreaInsets();
  const { total } = useLocalSearchParams<{ total?: string }>();
  const parsed = Number(total);
  const shownTotal = Number.isFinite(parsed) && parsed > 0 ? parsed : activeOrder.total;

  // Pedido enviado: esvazia o carrinho e dá um feedback tátil.
  useEffect(() => {
    useCart.getState().clear();
    if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Backdrop variant="hero" />

      <View style={{ paddingTop: insets.top + 4, paddingHorizontal: 20, alignItems: 'flex-end' }}>
        <IconButton icon="close" iconSize={18} accessibilityLabel="Fechar" onPress={() => router.replace('/')} />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center', gap: 14 }}>
        <Animated.View entering={ZoomIn.springify().damping(12)} accessibilityLabel="Confirmado">
          <View style={{ width: 132, height: 132, borderRadius: 66, backgroundColor: 'rgba(255,138,31,0.14)', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 104, height: 104, borderRadius: 52, backgroundColor: 'rgba(255,138,31,0.24)', alignItems: 'center', justifyContent: 'center' }}>
              <LinearGradient
                colors={gradients.accent}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[{ width: 76, height: 76, borderRadius: 38, alignItems: 'center', justifyContent: 'center' }, shadows.accent]}
              >
                <Icon name="check" size={40} color={colors.onAccent} />
              </LinearGradient>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(150).duration(420)} style={{ alignItems: 'center', gap: 8 }}>
          <Txt size={28} weight="bold" style={{ lineHeight: 36, letterSpacing: -0.4, textAlign: 'center' }}>
            Pedido <Txt size={28} weight="bold" color={colors.accentLight}>confirmado!</Txt>
          </Txt>
          <Txt size={14} color={colors.muted} style={{ textAlign: 'center', maxWidth: 290, lineHeight: 22 }}>
            Seu burger já está na chapa. A gente avisa assim que sair para entrega.
          </Txt>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(260).duration(420)} style={{ alignSelf: 'stretch', marginTop: 10 }}>
          <Glass style={{ padding: 18, gap: 12 }}>
            <Row label="Pedido" value={activeOrder.number} />
            <View style={{ height: 1, backgroundColor: colors.border }} />
            <Row label="Previsão" value={activeOrder.etaClock} />
            <View style={{ height: 1, backgroundColor: colors.border }} />
            <Row label="Total" value={formatBRL(shownTotal)} strong />
          </Glass>
        </Animated.View>
      </View>

      <Animated.View
        entering={FadeInDown.delay(380).duration(420)}
        style={{ paddingHorizontal: 20, paddingBottom: Math.max(insets.bottom, 16) + 8, gap: 12 }}
      >
        <GradientButton height={56} onPress={() => router.replace('/rastreamento')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Icon name="bike" size={20} color={colors.onAccent} />
            <Txt size={15} weight="bold" color={colors.onAccent}>
              Acompanhar pedido
            </Txt>
          </View>
        </GradientButton>
        <PressableScale haptic onPress={() => router.replace('/')} accessibilityRole="button" style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
          <Txt size={14} weight="semibold" color={colors.accentLight}>
            Voltar ao início
          </Txt>
        </PressableScale>
      </Animated.View>
    </View>
  );
}
