export const colors = {
  bg: '#35190A',
  text: '#FFFFFF',
  muted: '#B8AFA6',
  dim: '#8E857D',
  accent: '#FF8A1F',
  accentLight: '#FFA53A',
  accentDark: '#FF7A00',
  accentSoft: '#FFC58A',
  yellow: '#FFB020',
  red: '#E5383B',
  onAccent: '#1A0E05',
  glass: 'rgba(255,255,255,0.08)',
  glassSoft: 'rgba(255,255,255,0.06)',
  glassStrong: 'rgba(255,255,255,0.10)',
  border: 'rgba(255,255,255,0.12)',
  borderStrong: 'rgba(255,255,255,0.14)',
  highlight: 'rgba(255,255,255,0.22)',
} as const;

export const gradients = {
  accent: ['#FFA53A', '#FF7A00'] as const,
  accentSoft: ['rgba(255,165,58,0.32)', 'rgba(255,122,0,0.16)'] as const,
};

export const radii = { sm: 10, md: 16, lg: 24, xl: 28, pill: 999 } as const;

export const fonts = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
  extrabold: 'Poppins_800ExtraBold',
} as const;

/** Sem sombras no design: tokens mantidos vazios para não quebrar os usos. */
export const shadows = { accent: {}, glass: {} } as const;

/** Espaço reservado no fim das telas para a tab bar flutuante. */
export const TAB_BAR_SPACE = 116;
