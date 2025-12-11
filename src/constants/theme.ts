// src/constants/theme.ts
export const COLORS = {
  light: {
    background: '#FFFFFF',
    surface: '#F8F8F8',
    surfaceElevated: '#FFFFFF',
    text: '#0A0A0A',
    textSecondary: '#6B6B6B',
    textTertiary: '#9B9B9B',
    primary: '#0A0A0A',
    primaryLight: '#2A2A2A',
    accent: '#FF3B30',
    border: '#E5E5E5',
    borderLight: '#F0F0F0',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#007AFF',
    overlay: 'rgba(0, 0, 0, 0.4)',
    overlayLight: 'rgba(0, 0, 0, 0.15)',
    shadow: 'rgba(0, 0, 0, 0.08)',
  },
  dark: {
    background: '#000000',
    surface: '#0F0F0F',
    surfaceElevated: '#1A1A1A',
    text: '#FFFFFF',
    textSecondary: '#9B9B9B',
    textTertiary: '#6B6B6B',
    primary: '#FFFFFF',
    primaryLight: '#E5E5E5',
    accent: '#FF453A',
    border: '#2A2A2A',
    borderLight: '#1F1F1F',
    success: '#32D74B',
    warning: '#FF9F0A',
    error: '#FF453A',
    info: '#0A84FF',
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(0, 0, 0, 0.3)',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

export const FONTS = {
  heading: {
    family: 'ClashDisplay',
    weights: {
      semibold: '600' as const,
      bold: '700' as const,
    },
  },
  body: {
    family: 'Satoshi',
    weights: {
      regular: '400' as const,
      medium: '500' as const,
      bold: '700' as const,
    },
  },
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
};

export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

export const LAYOUT = {
  screenPadding: 16,
  maxContentWidth: 640,
  tabBarHeight: 60,
  headerHeight: 56,
};

export type ColorScheme = 'light' | 'dark';