// src/navigation/GarageStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GarageStackParamList } from '../types/navigation';
import GarageScreen from '../screens/garage/GarageScreen';
import VehicleDetailScreen from '../screens/garage/VehicleDetailScreen';

const Stack = createNativeStackNavigator<GarageStackParamList>();

export default function GarageStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Garage" component={GarageScreen} />
      <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} />
    </Stack.Navigator>
  );
}