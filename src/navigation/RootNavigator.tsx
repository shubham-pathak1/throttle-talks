// src/navigation/RootNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootTabParamList } from '../types/navigation';
import CustomTabBar from './CustomTabBar';
import HomeStack from './HomeStack';
import GarageStack from './GarageStack';

import MeetupsScreen from '../screens/meetups/MeetupsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ChatScreen from '../screens/chat/ChatScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="HomeTab" component={HomeStack} />
        <Tab.Screen name="MeetupsTab" component={MeetupsScreen} />
        <Tab.Screen name="GarageTab" component={GarageStack} />
        <Tab.Screen name="ProfileTab" component={ProfileScreen} />
        <Tab.Screen name="ChatTab" component={ChatScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}