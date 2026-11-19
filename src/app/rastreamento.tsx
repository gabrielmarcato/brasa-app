import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { Backdrop, Glass, IconButton, PressableScale, Txt } from '@/components/ui';
import { RESTAURANT, activeOrder, trackingSteps } from '@/data/menu';
import { colors, gradients } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';

function Pulse() {
  const p = useSharedValue(0);
  useEffect(() => {
    p.set(withRepeat(withTiming(1, { duration: 1600, easing: Easing.out(Easing.quad) }), -1, false));
  }, [p]);
  const ring = useAnimatedStyle(() => ({
    opacity: 0.5 * (1 - p.value),
    transform: [{ scale: 1 + p.value * 1.1 }],
  }));
  return (
    <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View
        style={[{ position: 'absolute', width: 40, height: 40, borderRadius: 20, backgroundColor: colors.accent }, ring]}
      />
      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,138,31,0.25)', alignItems: 'center', justifyContent: 'center' }}>
        <LinearGradient
          colors={gradients.accent}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }}
        >
          <Icon name="bike" size={16} color={colors.onAccent} />
        </LinearGradient>
      </View>
    </View>
  );
}

export default function Rastreamento() {
  const insets = useSafeAreaInsets();
  const { courier } = activeOrder;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Backdrop />

      {/* Mapa */}
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 520 }}>
        <Image
          source={require('../../assets/images/map.webp')}
          contentFit="cover"
          accessibilityLabel="Mapa escuro com a rota do restaurante até o endereço de entrega destacada em laranja"
          style={{ width: '100%', height: '100%' }}
        />
        <LinearGradient
          colors={['rgba(18,12,8,0)', colors.bg]}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 140 }}
        />
        <View style={{ position: 'absolute', left: 150, top: 240 }}>
          <Pulse />
        </View>
      </View>

      {/* Topo */}
      <View style={{ paddingTop: insets.top + 4, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton icon="back" accessibilityLabel="Voltar" onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} />
        <Glass radius={22} intensity={24} style={{ height: 44, paddingHorizontal: 16, justifyContent: 'center' }}>
          <Txt size={16} weight="semibold">
            Acompanhar pedido
          </Txt>
        </Glass>
        <IconButton icon="more" accessibilityLabel="Mais opções" />
      </View>

      {/* Origem */}
      <Glass radius={18} intensity={24} style={{ position: 'absolute', left: 20, top: insets.top + 76, height: 36, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Icon name="pin" size={16} color={colors.accentLight} />
        <Txt size={12} weight="medium">
          {RESTAURANT}
        </Txt>
      </Glass>

      {/* Painel */}
      <Animated.View entering={FadeInUp.duration(450)} style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <Glass
          radius={32}
          intensity={55}
          tint="rgba(24,15,10,0.8)"
          style={{
            paddingTop: 8,
            paddingHorizontal: 20,
            paddingBottom: Math.max(insets.bottom, 16) + 8,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomWidth: 0,
          }}
        >
          <View style={{ alignSelf: 'center', width: 36, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.25)' }} />

          <View style={{ marginTop: 14, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <View>
              <Txt size={12} color={colors.muted}>
                Chega em
              </Txt>
              <Txt size={30} weight="bold" color={colors.accentLight} style={{ lineHeight: 38 }}>
                {activeOrder.eta}
              </Txt>
            </View>
            <Txt size={13} color={colors.muted} style={{ marginBottom: 6 }}>
              Pedido {activeOrder.number}
            </Txt>
          </View>

          {/* Entregador */}
          <Glass radius={20} intensity={20} tint={colors.glassSoft} style={{ marginTop: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Image source={require('../../assets/images/courier.webp')} accessibilityLabel="Rafael, entregador" style={{ width: 48, height: 48, borderRadius: 24 }} />
            <View style={{ flex: 1 }}>
              <Txt size={14} weight="semibold">
                {courier.name}
              </Txt>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Icon name="star" size={12} color={colors.yellow} />
                <Txt size={12} color={colors.muted}>
                  {courier.rating.toFixed(1).replace('.', ',')} · {courier.vehicle} · {courier.plate}
                </Txt>
              </View>
            </View>
            <PressableScale haptic scaleTo={0.88} accessibilityRole="button" accessibilityLabel="Enviar mensagem para Rafael">
              <Glass radius={20} intensity={18} style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="chat" size={18} />
              </Glass>
            </PressableScale>
            <PressableScale haptic scaleTo={0.88} accessibilityRole="button" accessibilityLabel="Ligar para Rafael">
              <LinearGradient colors={gradients.accent} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="phone" size={18} color={colors.onAccent} />
              </LinearGradient>
            </PressableScale>
          </Glass>

          {/* Linha do tempo */}
          <View style={{ marginTop: 16 }}>
            {trackingSteps.map((step, i) => {
              const last = i === trackingSteps.length - 1;
              const done = step.state === 'done';
              const current = step.state === 'current';
              return (
                <View key={step.id} style={{ flexDirection: 'row', gap: 14 }}>
                  <View style={{ alignItems: 'center', width: 24 }}>
                    {done || current ? (
                      <LinearGradient
                        colors={gradients.accent}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}
                      >
                        {done ? <Icon name="check" size={14} color={colors.onAccent} /> : <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.onAccent }} />}
                      </LinearGradient>
                    ) : (
                      <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.22)' }} />
                    )}
                    {!last && (
                      <View style={{ width: 2, flex: 1, minHeight: 18, marginVertical: 2, borderRadius: 1, backgroundColor: done ? colors.accent : 'rgba(255,255,255,0.14)' }} />
                    )}
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: last ? 0 : 12 }}>
                    <Txt size={14} weight={current ? 'semibold' : 'medium'} color={step.state === 'pending' ? colors.dim : colors.text}>
                      {step.title}
                    </Txt>
                    <Txt size={12} color={current ? colors.accentLight : colors.muted} style={{ marginTop: 2 }}>
                      {step.time}
                    </Txt>
                  </View>
                </View>
              );
            })}
          </View>
        </Glass>
      </Animated.View>
    </View>
  );
}
