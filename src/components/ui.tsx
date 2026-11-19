import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type TextProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { colors, fonts, gradients, radii, shadows } from '@/theme';
import { Icon, type IconName } from './Icon';

/* -------------------------------------------------------------------------- */
/* Texto                                                                       */
/* -------------------------------------------------------------------------- */

interface TxtProps extends TextProps {
  size?: number;
  weight?: keyof typeof fonts;
  color?: string;
  lineHeight?: number;
}

export function Txt({ size = 14, weight = 'regular', color = colors.text, lineHeight, style, ...rest }: TxtProps) {
  return (
    <Text
      {...rest}
      style={[{ fontFamily: fonts[weight], fontSize: size, color, lineHeight: lineHeight ?? Math.round(size * 1.4) }, style]}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Fundo com brilhos laranja                                                   */
/* -------------------------------------------------------------------------- */

/** Fundo de tela: cor sólida (laranja escuro). */
export function Backdrop(_props: { variant?: 'home' | 'hero' }) {
  return <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: colors.bg }]} />;
}


/* -------------------------------------------------------------------------- */
/* Vidro (glassmorphism)                                                       */
/* -------------------------------------------------------------------------- */

interface GlassProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  tint?: string;
  radius?: number;
}

export function Glass({ children, style, intensity = 28, tint = colors.glass, radius = radii.lg }: GlassProps) {
  // Raios por canto passados em `style` (ex.: barra colada na borda da tela) também valem para o vidro interno.
  const flat = (StyleSheet.flatten(style) ?? {}) as ViewStyle;
  const corners: ViewStyle = {
    borderTopLeftRadius: flat.borderTopLeftRadius ?? radius,
    borderTopRightRadius: flat.borderTopRightRadius ?? radius,
    borderBottomLeftRadius: flat.borderBottomLeftRadius ?? radius,
    borderBottomRightRadius: flat.borderBottomRightRadius ?? radius,
  };
  return (
    <View style={[styles.glass, { borderRadius: radius }, shadows.glass, style]}>
      <View style={[StyleSheet.absoluteFill, corners, { overflow: 'hidden' }]} pointerEvents="none">
        <BlurView
          intensity={intensity}
          tint="dark"
          experimentalBlurMethod={Platform.OS === 'android' ? 'dimezisBlurView' : undefined}
          style={StyleSheet.absoluteFill}
        />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: tint }]} />
      </View>
      {children}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* Botões                                                                      */
/* -------------------------------------------------------------------------- */

interface PressableScaleProps extends Omit<PressableProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
  haptic?: boolean;
}

const LAYOUT_KEYS = new Set([
  'flex', 'flexGrow', 'flexShrink', 'flexBasis', 'position', 'left', 'right', 'top', 'bottom',
  'alignSelf', 'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight', 'marginHorizontal',
  'marginVertical', 'width', 'height', 'zIndex',
]);

/** Separa o layout (vai no Pressable externo) da aparência (vai no Animated.View que escala). */
function splitLayout(style: StyleProp<ViewStyle>) {
  const flat = (StyleSheet.flatten(style) ?? {}) as Record<string, unknown>;
  const outer: Record<string, unknown> = {};
  const inner: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(flat)) {
    if (LAYOUT_KEYS.has(k)) outer[k] = v;
    if (!LAYOUT_KEYS.has(k) || k === 'width' || k === 'height') inner[k] = v;
  }
  if (outer.flex !== undefined || outer.position === 'absolute') {
    if (outer.flex !== undefined) inner.flex = 1;
  }
  return { outer: outer as ViewStyle, inner: inner as ViewStyle };
}

export function PressableScale({ style, scaleTo = 0.96, haptic, onPress, children, ...rest }: PressableScaleProps) {
  const scale = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const { outer, inner } = splitLayout(style);
  return (
    <Pressable
      {...rest}
      style={outer}
      onPressIn={() => scale.set(withSpring(scaleTo, { damping: 18, stiffness: 320 }))}
      onPressOut={() => scale.set(withSpring(1, { damping: 14, stiffness: 260 }))}
      onPress={(e) => {
        if (haptic && Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(e);
      }}
    >
      {(state) => (
        <Animated.View style={[inner, anim]}>
          {typeof children === 'function' ? children(state) : children}
        </Animated.View>
      )}
    </Pressable>
  );
}

interface GradientButtonProps extends Omit<PressableScaleProps, 'children'> {
  children: ReactNode;
  height?: number;
  radius?: number;
  contentStyle?: StyleProp<ViewStyle>;
}

export function GradientButton({
  children,
  height = 56,
  radius = height / 2,
  contentStyle,
  style,
  ...rest
}: GradientButtonProps) {
  return (
    <PressableScale haptic {...rest} style={[{ borderRadius: radius }, shadows.accent, style]}>
      <LinearGradient
        colors={gradients.accent}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[{ height, borderRadius: radius, alignItems: 'center', justifyContent: 'center' }, contentStyle]}
      >
        {children}
      </LinearGradient>
    </PressableScale>
  );
}

interface IconButtonProps extends Omit<PressableScaleProps, 'children'> {
  icon: IconName;
  size?: number;
  iconSize?: number;
  iconColor?: string;
  variant?: 'glass' | 'accent' | 'plain';
}

export function IconButton({
  icon,
  size = 44,
  iconSize = 20,
  iconColor = colors.text,
  variant = 'glass',
  style,
  ...rest
}: IconButtonProps) {
  if (variant === 'accent') {
    return (
      <GradientButton height={size} radius={size / 2} style={[{ width: size }, style]} {...rest}>
        <Icon name={icon} size={iconSize} color={colors.onAccent} />
      </GradientButton>
    );
  }
  return (
    <PressableScale haptic {...rest} style={style}>
      <Glass
        radius={size / 2}
        intensity={22}
        tint={variant === 'plain' ? colors.glassSoft : colors.glass}
        style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}
      >
        <Icon name={icon} size={iconSize} color={iconColor} />
      </Glass>
    </PressableScale>
  );
}

/* -------------------------------------------------------------------------- */
/* Placeholder de foto (troque por <Image> quando houver fotos reais)           */
/* -------------------------------------------------------------------------- */

interface PhotoProps {
  icon?: IconName;
  label?: string;
  hint?: string;
  style?: StyleProp<ViewStyle>;
  radius?: number;
  iconSize?: number;
}

export function PhotoPlaceholder({ icon = 'burger', label, hint, style, radius = 18, iconSize = 28 }: PhotoProps) {
  return (
    <View
      style={[
        {
          borderRadius: radius,
          borderWidth: 1.5,
          borderStyle: 'dashed',
          borderColor: 'rgba(255,165,58,0.5)',
          backgroundColor: 'rgba(255,255,255,0.045)',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        },
        style,
      ]}
      accessibilityRole="image"
      accessibilityLabel={label ?? 'Foto do produto'}
    >
      <View style={{ opacity: 0.9 }}>
        <Icon name={icon} size={iconSize} color={colors.accentLight} />
      </View>
      {label ? (
        <Txt size={12} weight="medium" color={colors.muted}>
          {label}
        </Txt>
      ) : null}
      {hint ? (
        <Txt size={11} color={colors.dim}>
          {hint}
        </Txt>
      ) : null}
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/* Pequenos blocos                                                             */
/* -------------------------------------------------------------------------- */

export function Badge({ label, tone = 'red', style }: { label: string; tone?: 'red' | 'accent'; style?: StyleProp<ViewStyle> }) {
  const isRed = tone === 'red';
  return (
    <View
      style={[
        {
          height: 22,
          paddingHorizontal: 9,
          borderRadius: 11,
          backgroundColor: isRed ? colors.red : 'rgba(255,138,31,0.16)',
          borderWidth: isRed ? 0 : 1,
          borderColor: 'rgba(255,138,31,0.35)',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Txt size={11} weight="semibold" color={isRed ? colors.text : colors.accentSoft} style={{ lineHeight: 15 }}>
        {label}
      </Txt>
    </View>
  );
}

export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <Txt size={18} weight="semibold">
        {title}
      </Txt>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Txt size={13} weight="medium" color={colors.accentLight}>
            {action}
          </Txt>
        </Pressable>
      ) : null}
    </View>
  );
}

export function ScreenTitle({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  return (
    <Txt size={24} weight="semibold" style={[{ letterSpacing: -0.3 }, style]}>
      {children}
    </Txt>
  );
}

export function EmptyState({ icon, title, text }: { icon: IconName; title: string; text: string }) {
  return (
    <View style={{ alignItems: 'center', paddingVertical: 48, gap: 10 }}>
      <Glass radius={36} style={{ width: 72, height: 72, alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={30} color={colors.accentLight} />
      </Glass>
      <Txt size={16} weight="semibold">
        {title}
      </Txt>
      <Txt size={13} color={colors.muted} style={{ textAlign: 'center', maxWidth: 260 }}>
        {text}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  glass: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionHeader: {
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
