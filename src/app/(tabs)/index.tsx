import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/Icon';
import { ProductCard } from '@/components/ProductCard';
import {
  Backdrop,
  Badge,
  EmptyState,
  Glass,
  GradientButton,
  IconButton,
  PhotoPlaceholder,
  PressableScale,
  SectionHeader,
  Txt,
} from '@/components/ui';
import { categories, getProduct, products, productsByCategory, type CategoryId } from '@/data/menu';
import { useTotals } from '@/store/cart';
import { TAB_BAR_SPACE, colors, gradients, shadows } from '@/theme';

export default function Home() {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState<CategoryId>('burger');
  const [query, setQuery] = useState('');
  const { count } = useTotals();

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return productsByCategory(category);
    return products.filter((p) => `${p.name} ${p.tagline}`.toLowerCase().includes(q));
  }, [category, query]);

  const rows: (typeof list)[] = [];
  for (let i = 0; i < list.length; i += 2) rows.push(list.slice(i, i + 2));

  const offerProduct = getProduct('chicken-picante')!;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Backdrop />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingTop: insets.top + 8, paddingHorizontal: 20, paddingBottom: TAB_BAR_SPACE + 20 }}
      >
        {/* Cabeçalho */}
        <View style={{ height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Txt size={20} weight="semibold" style={{ letterSpacing: -0.2 }}>
              Olá, Alex!
            </Txt>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View>
              <IconButton
                icon="bag"
                size={44}
                iconSize={20}
                accessibilityLabel={`Carrinho, ${count} itens`}
                onPress={() => router.push('/carrinho')}
              />
              {count > 0 && (
                <View
                  pointerEvents="none"
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    minWidth: 20,
                    height: 20,
                    borderRadius: 10,
                    paddingHorizontal: 4,
                    backgroundColor: colors.accentDark,
                    borderWidth: 2,
                    borderColor: colors.bg,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Txt size={10} weight="bold" color={colors.onAccent} style={{ lineHeight: 14 }}>
                    {count}
                  </Txt>
                </View>
              )}
            </View>
            <View>
              <Image
                source={require('../../../assets/images/avatar.webp')}
                accessibilityLabel="Foto de perfil de Alex"
                style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'rgba(255,255,255,0.18)' }}
              />
              <LinearGradient
                colors={gradients.accent}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                accessibilityLabel="3 notificações"
                style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  minWidth: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: colors.bg,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Txt size={10} weight="bold" color={colors.onAccent} style={{ lineHeight: 14 }}>
                  3
                </Txt>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Busca */}
        <Glass radius={28} intensity={30} style={{ marginTop: 16, height: 56, flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingRight: 8, gap: 12 }}>
          <Icon name="search" size={20} color={colors.muted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Busque sua comida favorita"
            placeholderTextColor={colors.muted}
            selectionColor={colors.accent}
            returnKeyType="search"
            accessibilityLabel="Buscar"
            style={{ flex: 1, minWidth: 0, color: colors.text, fontFamily: 'Poppins_400Regular', fontSize: 14, padding: 0, outlineStyle: 'none' } as never}
          />
          <GradientButton height={40} style={{ width: 40 }} accessibilityLabel="Filtros">
            <Icon name="sliders" size={18} color={colors.onAccent} />
          </GradientButton>
        </Glass>

        {/* Categorias */}
        <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
          {categories.map((c) => {
            const on = c.id === category && !query;
            return (
              <PressableScale
                key={c.id}
                haptic
                onPress={() => {
                  setQuery('');
                  setCategory(c.id);
                }}
                accessibilityRole="button"
                accessibilityState={{ selected: on }}
                accessibilityLabel={c.label}
              >
                <View
                  style={{
                    width: 64,
                    height: 72,
                    borderRadius: 18,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: on ? colors.accent : colors.border,
                    backgroundColor: on ? undefined : colors.glassSoft,
                    ...(on ? shadows.accent : {}),
                  }}
                >
                  {on && (
                    <LinearGradient
                      colors={gradients.accentSoft}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{ position: 'absolute', inset: 0 } as never}
                    />
                  )}
                  <Icon name={c.icon} size={28} color={on ? colors.accentLight : colors.muted} />
                  <Txt size={12} weight="medium" color={on ? colors.text : colors.muted} style={{ lineHeight: 16 }}>
                    {c.label}
                  </Txt>
                </View>
              </PressableScale>
            );
          })}
        </View>

        {/* Oferta */}
        <Animated.View entering={FadeInDown.duration(420)}>
          <Glass style={{ marginTop: 16, height: 144, padding: 16, paddingLeft: 18, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <View style={{ flex: 1, alignItems: 'flex-start', gap: 6 }}>
              <Badge label="Oferta" tone="accent" style={{ height: 24, borderRadius: 12, paddingHorizontal: 10 }} />
              <Txt size={19} weight="bold" style={{ lineHeight: 24 }}>
                Combo Burger{'\n'}
                <Txt size={19} weight="bold" color={colors.accentLight} style={{ lineHeight: 24 }}>
                  Picante
                </Txt>
              </Txt>
              <GradientButton
                height={32}
                style={{ alignSelf: 'flex-start' }}
                contentStyle={{ paddingHorizontal: 16 }}
                onPress={() => router.push({ pathname: '/produto/[id]', params: { id: offerProduct.id } })}
              >
                <Txt size={13} weight="semibold" color={colors.onAccent}>
                  Pedir agora
                </Txt>
              </GradientButton>
            </View>
            <PhotoPlaceholder icon="burger" iconSize={34} style={{ width: 124, height: 112 }} />
          </Glass>
        </Animated.View>

        {/* Popular */}
        <View style={{ marginTop: 16 }}>
          <SectionHeader title={query ? 'Resultados' : 'Popular agora'} action={query ? undefined : 'Ver tudo'} />
        </View>

        <View style={{ marginTop: 14, gap: 14 }}>
          {rows.map((row, r) => (
            <View key={row.map((p) => p.id).join()} style={{ flexDirection: 'row', gap: 14 }}>
              {row.map((p, c) => (
                <ProductCard key={p.id} product={p} index={r * 2 + c} />
              ))}
              {row.length === 1 && <View style={{ flex: 1 }} />}
            </View>
          ))}
          {list.length === 0 && (
            <EmptyState icon="search" title="Nada por aqui" text={`Não encontramos "${query}". Tente outro nome.`} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

