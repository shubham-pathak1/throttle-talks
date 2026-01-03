import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { loadFonts } from './src/utils/fonts';
import { useThemeStore } from './src/store/themeStore';
import RootNavigator from './src/navigation/RootNavigator';

SplashScreen.preventAutoHideAsync();

import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

// ... other imports

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { colorScheme } = useThemeStore();

  useEffect(() => {
    async function prepare() {
      try {
        console.log('Loading fonts...');
        await loadFonts();
        console.log('Fonts loaded!');

        if (Platform.OS === 'android') {
          await NavigationBar.setPositionAsync('absolute');
          await NavigationBar.setBackgroundColorAsync('#00000000'); // Transparent
          await NavigationBar.setButtonStyleAsync('light'); // White buttons/bar icons
        }

        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.error('Error loading app:', e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}