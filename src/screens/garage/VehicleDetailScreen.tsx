// src/screens/garage/VehicleDetailScreen.tsx
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';
import ScreenHeader from '../../components/common/ScreenHeader';
import Card from '../../components/common/Card';
import { Vehicle } from '../../components/garage/VehicleCard';

// Mock data
const MOCK_VEHICLE: Vehicle = {
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
    'Cobb Stage 3 Tune',
    'Invidia R400 Exhaust',
    'KW V3 Coilovers',
    'Brembo GT Big Brake Kit',
    'Rotiform KPS Wheels 18x9.5',
    'Michelin PS4S Tires',
    'AEM Cold Air Intake',
    'Grimmspeed TMIC',
    'Cobb Flex Fuel Kit',
    'Process West FMIC',
  ],
};

export default function VehicleDetailScreen() {
  const { colors } = useThemeStore();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title={MOCK_VEHICLE.name}
        onBack={() => navigation.goBack()}
        onMore={() => console.log('Edit vehicle')}
        transparent
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <Image source={{ uri: MOCK_VEHICLE.image }} style={styles.heroImage} />

        <View style={styles.content}>
          {/* Title */}
          <View style={styles.titleSection}>
            <Text
              style={[
                styles.name,
                { color: colors.text, fontFamily: FONTS.heading.family },
              ]}
            >
              {MOCK_VEHICLE.name}
            </Text>
            <Text
              style={[
                styles.details,
                { color: colors.textSecondary, fontFamily: FONTS.body.family },
              ]}
            >
              {MOCK_VEHICLE.year} {MOCK_VEHICLE.make} {MOCK_VEHICLE.model}
            </Text>
          </View>

          {/* Specs Card */}
          <Card padding="lg" style={styles.specsCard}>
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text, fontFamily: FONTS.heading.family },
              ]}
            >
              Specifications
            </Text>
            <View style={styles.specsGrid}>
              <View style={styles.specItem}>
                <Text
                  style={[
                    styles.specLabel,
                    { color: colors.textTertiary, fontFamily: FONTS.body.family },
                  ]}
                >
                  HORSEPOWER
                </Text>
                <Text
                  style={[
                    styles.specValue,
                    { color: colors.text, fontFamily: FONTS.heading.family },
                  ]}
                >
                  {MOCK_VEHICLE.specs.horsepower} HP
                </Text>
              </View>
              <View style={styles.specItem}>
                <Text
                  style={[
                    styles.specLabel,
                    { color: colors.textTertiary, fontFamily: FONTS.body.family },
                  ]}
                >
                  ENGINE
                </Text>
                <Text
                  style={[
                    styles.specValue,
                    { color: colors.text, fontFamily: FONTS.heading.family },
                  ]}
                >
                  {MOCK_VEHICLE.specs.engine}
                </Text>
              </View>
              <View style={styles.specItem}>
                <Text
                  style={[
                    styles.specLabel,
                    { color: colors.textTertiary, fontFamily: FONTS.body.family },
                  ]}
                >
                  DRIVETRAIN
                </Text>
                <Text
                  style={[
                    styles.specValue,
                    { color: colors.text, fontFamily: FONTS.heading.family },
                  ]}
                >
                  {MOCK_VEHICLE.specs.drivetrain}
                </Text>
              </View>
            </View>
          </Card>

          {/* Modifications Card */}
          <Card padding="lg">
            <Text
              style={[
                styles.sectionTitle,
                { color: colors.text, fontFamily: FONTS.heading.family },
              ]}
            >
              Modifications ({MOCK_VEHICLE.mods.length})
            </Text>
            <View style={styles.modsList}>
              {MOCK_VEHICLE.mods.map((mod, index) => (
                <View
                  key={index}
                  style={[
                    styles.modItem,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                  ]}
                >
                  <View style={[styles.modBullet, { backgroundColor: colors.accent }]} />
                  <Text
                    style={[
                      styles.modText,
                      { color: colors.text, fontFamily: FONTS.body.family },
                    ]}
                  >
                    {mod}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#1A1A1A',
  },
  content: {
    padding: SPACING.lg,
  },
  titleSection: {
    marginBottom: SPACING.lg,
  },
  name: {
    fontSize: FONT_SIZES['4xl'],
    fontWeight: '700',
    marginBottom: 4,
  },
  details: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
  },
  specsCard: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '700',
    marginBottom: SPACING.lg,
  },
  specsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specItem: {
    flex: 1,
    alignItems: 'center',
  },
  specLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: SPACING.xs,
  },
  specValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  modsList: {
    gap: SPACING.sm,
  },
  modItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
  },
  modBullet: {
    width: 6,
    height: 6,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
  },
  modText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    flex: 1,
  },
});