// src/constants/theme.ts
export const COLORS = {
  light: {
    background: '#FFFFFF',
    surface: '#F8F8F8', // Very subtle off-white
    surfaceElevated: '#FFFFFF',
    text: '#000000',
    textSecondary: '#666666',
    textTertiary: '#AAAAAA',
    primary: '#000000',
    primaryLight: '#333333',
    accent: '#000000', // Strict Black
    border: '#E0E0E0',
    borderLight: '#F5F5F5',
    success: '#000000', // Success is black tick
    warning: '#333333',
    error: '#333333', // Errors are bold dark
    info: '#666666',
    overlay: 'rgba(255, 255, 255, 0.8)',
    overlayLight: 'rgba(0, 0, 0, 0.05)',
    shadow: 'rgba(0, 0, 0, 0.05)',
    gradient: {
      primary: ['#000000', '#000000'], // No gradient, solid luxury
      accent: ['#333333', '#000000'],
    },
  },
  dark: {
    background: '#000000', // True Black
    surface: '#121212', // Subtle charcoal
    surfaceElevated: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#888888',
    textTertiary: '#444444',
    primary: '#FFFFFF',
    primaryLight: '#CCCCCC',
    accent: '#FFFFFF', // Strict White
    border: '#222222',
    borderLight: '#111111',
    success: '#FFFFFF',
    warning: '#CCCCCC',
    error: '#FFFFFF',
    info: '#888888',
    overlay: 'rgba(0, 0, 0, 0.85)',
    overlayLight: 'rgba(255, 255, 255, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.8)',
    gradient: {
      primary: ['#FFFFFF', '#FFFFFF'],
      accent: ['#333333', '#111111'], // subtle metallic
    },
  },
};

export const FONTS = {
  heading: {
    family: 'ClashDisplay',
    weights: {
      regular: '400' as const,
      medium: '500' as const,
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
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
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
  '5xl': 64,
  '6xl': 96,
};

export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 28,
  full: 9999,
};

export const LAYOUT = {
  screenPadding: 24, // Wider gutters for luxury feel
  maxContentWidth: 600,
  tabBarHeight: 90, // Taller, statement bar
  headerHeight: 70, // More breathing room for headers
  bottomSpacer: 120, // Critical for clearing floating elements
};

export type ColorScheme = 'light' | 'dark';
