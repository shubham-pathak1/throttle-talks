// src/navigation/MeetupsStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MeetupsStackParamList } from '../types/navigation';
import MeetupsScreen from '../screens/meetups/MeetupsScreen';
import CreateMeetupScreen from '../screens/meetups/CreateMeetupScreen';

const Stack = createNativeStackNavigator<MeetupsStackParamList>();

export default function MeetupsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
        presentation: 'modal',
      }}
    >
      <Stack.Screen 
        name="Meetups" 
        component={MeetupsScreen}
        options={{ animation: 'none' }}
      />
      <Stack.Screen name="CreateMeetup" component={CreateMeetupScreen} />
    </Stack.Navigator>
  );
}