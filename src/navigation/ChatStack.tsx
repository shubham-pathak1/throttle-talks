// src/navigation/ChatStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatStackParamList } from '../types/navigation';
import ChatScreen from '../screens/chat/ChatScreen';
import ChatDetailScreen from '../screens/chat/ChatDetailScreen';

const Stack = createNativeStackNavigator<ChatStackParamList>();

export default function ChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
    </Stack.Navigator>
  );
}