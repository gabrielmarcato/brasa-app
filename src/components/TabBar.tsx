import type { BottomTabBarProps } from 'expo-router/build/layouts/Tabs';
import * as Haptics from 'expo-haptics';
import { Platform, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon, type IconName } from './Icon';
import { Txt } from './ui';

const tabs: Record<string, { label: string; icon: IconName }> = {
  index: { label: 'Início', icon: 'home' },
  ofertas: { label: 'Ofertas', icon: 'tag' },
  pedidos: { label: 'Pedidos', icon: 'receipt' },
  favoritos: { label: 'Favoritos', icon: 'heart' },
};

/** Tab bar flutuante laranja com ícones brancos. */
export function TabBar({ state, emitter, navigateToTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      style={{ position: 'absolute', left: 20, right: 20, bottom: Math.max(insets.bottom, 12) + 8 }}
    >
      <LinearGradient
        colors={['#E8780F', '#C45A00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ height: 68, borderRadius: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 10 }}
      >
        {state.routes.map((route, index) => {
          const meta = tabs[route.name];
          if (!meta) return null;
          const focused = state.index === index;
          const color = '#FFFFFF';
const opacity = focused ? 1 : 0.65;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={meta.label}
              onPress={() => {
                if (Platform.OS !== 'web') Haptics.selectionAsync();
                const event = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                if (!focused && !event.defaultPrevented) navigateToTab(route.key);
              }}
              style={{ width: 64, alignItems: 'center', gap: 4, opacity }}
            >
              <View>
                <Icon name={meta.icon} size={24} color={color} />
              </View>
              <Txt size={11} weight={focused ? 'semibold' : 'medium'} color={color} style={{ lineHeight: 14 }}>
                {meta.label}
              </Txt>
            </Pressable>
          );
        })}
      </LinearGradient>
    </View>
  );
}
