// src/navigation/GarageStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GarageStackParamList } from '../types/navigation';
import GarageScreen from '../screens/garage/GarageScreen';
import VehicleDetailScreen from '../screens/garage/VehicleDetailScreen';
import AddVehicleScreen from '../screens/garage/AddVehicleScreen';

const Stack = createNativeStackNavigator<GarageStackParamList>();

export default function GarageStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
        presentation: 'modal',
      }}
    >
      <Stack.Screen 
        name="Garage" 
        component={GarageScreen}
        options={{ animation: 'none' }}
      />
      <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} />
      <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
    </Stack.Navigator>
  );
}