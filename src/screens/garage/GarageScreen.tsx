// src/screens/garage/GarageScreen.tsx
import { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Car } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import * as Haptics from 'expo-haptics';
import { GarageScreenNavigationProp } from '../../types/navigation';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS, LAYOUT, ANIMATIONS } from '../../constants/theme';
import VehicleCard, { Vehicle } from '../../components/garage/VehicleCard';

const MOCK_VEHICLES: Vehicle[] = [
  {
    id: '1',
    name: 'The Beast',
    year: 2018,
    make: 'Subaru',
    model: 'WRX STI',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    specs: {
      horsepower: 485,
      engine: '2.5L Turbo',
      drivetrain: 'AWD',
    },
    mods: [
      'Cobb Stage 3',
      'Invidia Exhaust',
      'KW V3 Coilovers',
      'Brembo Brakes',
      'Rotiform Wheels',
    ],
  },
  {
    id: '2',
    name: 'Daily Driver',
    year: 2020,
    make: 'Honda',
    model: 'Civic Type R',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    specs: {
      horsepower: 380,
      engine: '2.0L Turbo',
      drivetrain: 'FWD',
    },
    mods: [
      'Hondata Tune',
      'HKS Exhaust',
      'Ohlins Suspension',
    ],
  },
];

export default function GarageScreen() {
  const { colors } = useThemeStore();
  const navigation = useNavigation<GarageScreenNavigationProp>();
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES);

  const handleAddVehicle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('AddVehicle' as never);
  };

  const handleVehiclePress = (vehicleId: string) => {
    navigation.navigate('VehicleDetail', { vehicleId });
  };

  const handleEditVehicle = (vehicleId: string) => {
    console.log('Edit vehicle', vehicleId);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.title,
              { color: colors.text, fontFamily: FONTS.heading.family },
            ]}
          >
            My Garage
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: colors.textSecondary, fontFamily: FONTS.body.family },
            ]}
          >
            {vehicles.length} {vehicles.length === 1 ? 'project' : 'projects'} in the works
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleAddVehicle}
          style={[styles.addButton, { backgroundColor: colors.accent }]}
          activeOpacity={0.7}
        >
          <Plus color={colors.background} size={24} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {/* Vehicles */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {vehicles.length === 0 ? (
          <View style={styles.emptyState}>
            <Text
              style={[
                styles.emptyText,
                { color: colors.textSecondary, fontFamily: FONTS.body.family },
              ]}
            >
              No vehicles yet. Start your build!
            </Text>
          </View>
        ) : (
          vehicles.map((vehicle, index) => (
            <View
              key={vehicle.id}
              style={{ marginBottom: SPACING.lg }}
            >
              <VehicleCard
                vehicle={vehicle}
                onPress={() => handleVehiclePress(vehicle.id)}
                onEdit={() => handleEditVehicle(vehicle.id)}
              />
            </View>
          ))
        )}
        <View style={{ height: LAYOUT.bottomSpacer }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING['6xl'],
  },
  emptyText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
  },
});
