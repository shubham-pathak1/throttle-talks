// src/components/garage/VehicleCard.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MoreVertical, Settings } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';
import Card from '../common/Card';

export interface Vehicle {
  id: string;
  name: string;
  year: number;
  make: string;
  model: string;
  image: string;
  specs: {
    horsepower: number;
    engine: string;
    drivetrain: string;
  };
  mods: string[];
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onPress?: () => void;
  onEdit?: () => void;
}

export default function VehicleCard({ vehicle, onPress, onEdit }: VehicleCardProps) {
  const { colors } = useThemeStore();

  return (
    <Card onPress={onPress} padding="md" style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.name,
              { color: colors.text, fontFamily: FONTS.heading.family },
            ]}
          >
            {vehicle.name}
          </Text>
          <Text
            style={[
              styles.details,
              { color: colors.textSecondary, fontFamily: FONTS.body.family },
            ]}
          >
            {vehicle.year} {vehicle.make} {vehicle.model}
          </Text>
        </View>
        <TouchableOpacity onPress={onEdit} style={styles.menuButton}>
          <MoreVertical color={colors.textSecondary} size={20} />
        </TouchableOpacity>
      </View>

      {/* Image */}
      <Image source={{ uri: vehicle.image }} style={styles.image} />

      {/* Specs */}
      <View style={styles.specs}>
        <View style={styles.specItem}>
          <Text
            style={[
              styles.specLabel,
              { color: colors.textTertiary, fontFamily: FONTS.body.family },
            ]}
          >
            POWER
          </Text>
          <Text
            style={[
              styles.specValue,
              { color: colors.text, fontFamily: FONTS.body.family },
            ]}
          >
            {vehicle.specs.horsepower} HP
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
              { color: colors.text, fontFamily: FONTS.body.family },
            ]}
          >
            {vehicle.specs.engine}
          </Text>
        </View>
        <View style={styles.specItem}>
          <Text
            style={[
              styles.specLabel,
              { color: colors.textTertiary, fontFamily: FONTS.body.family },
            ]}
          >
            DRIVE
          </Text>
          <Text
            style={[
              styles.specValue,
              { color: colors.text, fontFamily: FONTS.body.family },
            ]}
          >
            {vehicle.specs.drivetrain}
          </Text>
        </View>
      </View>

      {/* Mods */}
      {vehicle.mods.length > 0 && (
        <View style={styles.modsContainer}>
          <View style={styles.modsHeader}>
            <Settings color={colors.textSecondary} size={16} />
            <Text
              style={[
                styles.modsTitle,
                { color: colors.textSecondary, fontFamily: FONTS.body.family },
              ]}
            >
              {vehicle.mods.length} Modifications
            </Text>
          </View>
          <View style={styles.modsList}>
            {vehicle.mods.slice(0, 3).map((mod, index) => (
              <View
                key={index}
                style={[
                  styles.modTag,
                  { backgroundColor: colors.surfaceElevated, borderColor: colors.border },
                ]}
              >
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
            {vehicle.mods.length > 3 && (
              <View
                style={[
                  styles.modTag,
                  { backgroundColor: colors.surfaceElevated, borderColor: colors.border },
                ]}
              >
                <Text
                  style={[
                    styles.modText,
                    { color: colors.textSecondary, fontFamily: FONTS.body.family },
                  ]}
                >
                  +{vehicle.mods.length - 3} more
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '700',
    marginBottom: 4,
  },
  details: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  menuButton: {
    padding: SPACING.xs,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    backgroundColor: '#1A1A1A',
  },
  specs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  specItem: {
    flex: 1,
    alignItems: 'center',
  },
  specLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  specValue: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
  },
  modsContainer: {
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  modsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  modsTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  modsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  modTag: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
  },
  modText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
});