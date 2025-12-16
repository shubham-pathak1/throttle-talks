// src/navigation/RootNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootTabParamList } from '../types/navigation';
import { useAuthStore } from '../store/authStore';
import CustomTabBar from './CustomTabBar';
import HomeStack from './HomeStack';
import GarageStack from './GarageStack';
import ChatStack from './ChatStack';
import MeetupsStack from './MeetupsStack';
import ProfileStack from './ProfileStack';
import AuthStack from './AuthStack';

const Tab = createBottomTabNavigator<RootTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="MeetupsTab" component={MeetupsStack} />
      <Tab.Screen name="GarageTab" component={GarageStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
      <Tab.Screen name="ChatTab" component={ChatStack} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { isAuthenticated, hasSeenOnboarding } = useAuthStore();

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthStack />
      ) : (
        <MainTabs />
      )}
    </NavigationContainer>
  );
}
