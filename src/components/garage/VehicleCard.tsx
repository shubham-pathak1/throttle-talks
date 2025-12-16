// src/components/garage/VehicleCard.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MoreVertical, Settings, Zap, Disc, Gauge } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';
import Card from '../common/Card';
import { LinearGradient } from 'expo-linear-gradient';

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
    <Card onPress={onPress} padding="none" style={styles.card} elevated>
      {/* Image Background Header */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: vehicle.image }} style={styles.image} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        <View style={styles.headerContent}>
          <View>
            <Text
              style={[
                styles.name,
                { color: '#FFF', fontFamily: FONTS.heading.family },
              ]}
            >
              {vehicle.name}
            </Text>
            <Text
              style={[
                styles.details,
                { color: 'rgba(255,255,255,0.8)', fontFamily: FONTS.body.family },
              ]}
            >
              {vehicle.year} {vehicle.make} {vehicle.model}
            </Text>
          </View>
          <TouchableOpacity onPress={onEdit} style={styles.menuButton}>
            <MoreVertical color="#FFF" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ padding: SPACING.md }}>
        {/* Specs */}
        <View style={styles.specs}>
          <View style={styles.specItem}>
            <Zap color={colors.accent} size={18} strokeWidth={2.5} style={{ marginBottom: 4 }} />
            <Text
              style={[
                styles.specValue,
                { color: colors.text, fontFamily: FONTS.body.family },
              ]}
            >
              {vehicle.specs.horsepower}
              <Text style={{ fontSize: FONT_SIZES.xs, fontWeight: '400', color: colors.textSecondary }}> HP</Text>
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.specItem}>
            <Gauge color={colors.accent} size={18} strokeWidth={2.5} style={{ marginBottom: 4 }} />
            <Text
              style={[
                styles.specValue,
                { color: colors.text, fontFamily: FONTS.body.family },
              ]}
            >
              {vehicle.specs.engine}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.specItem}>
            <Disc color={colors.accent} size={18} strokeWidth={2.5} style={{ marginBottom: 4 }} />
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
              <Settings color={colors.textSecondary} size={14} />
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
                    { backgroundColor: colors.surface, borderColor: colors.border },
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
                <Text style={{ color: colors.textSecondary, fontSize: FONT_SIZES.xs, alignSelf: 'center', marginLeft: 4 }}>
                  +{vehicle.mods.length - 3}
                </Text>
              )}
            </View>
          </View>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 200,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1A1A1A',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    top: '40%',
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  name: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '700',
    marginBottom: 0,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  details: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  menuButton: {
    padding: SPACING.xs,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: RADIUS.full,
  },
  specs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  specItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignSelf: 'center',
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
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  modsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  modsTitle: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  modTag: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
  },
  modText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
});
