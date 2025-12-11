// src/types/navigation.ts
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Tab navigator params
export type RootTabParamList = {
  HomeTab: undefined;
  MeetupsTab: undefined;
  GarageTab: undefined;
  ProfileTab: undefined;
  ChatTab: undefined;
};

// Home stack params
export type HomeStackParamList = {
  Home: undefined;
  PostDetail: { postId: string };
};

// Garage stack params
export type GarageStackParamList = {
  Garage: undefined;
  VehicleDetail: { vehicleId: string };
};

// Meetups stack params
export type MeetupsStackParamList = {
  Meetups: undefined;
  MeetupDetail: { meetupId: string };
};

// Profile stack params
export type ProfileStackParamList = {
  Profile: undefined;
};

// Chat stack params
export type ChatStackParamList = {
  Chat: undefined;
};

// Navigation prop types
export type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Home'>,
  BottomTabNavigationProp<RootTabParamList>
>;

export type GarageScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<GarageStackParamList, 'Garage'>,
  BottomTabNavigationProp<RootTabParamList>
>;