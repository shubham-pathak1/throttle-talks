import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'ClashDisplay': require('../../assets/fonts/ClashDisplay-Variable.ttf'),
    'Satoshi': require('../../assets/fonts/Satoshi-Variable.ttf'),
  });
};

// Helper to get font family with weight for variable fonts
export const getFontFamily = (
  family: 'ClashDisplay' | 'Satoshi',
  weight?: number
) => {
  return family;
};