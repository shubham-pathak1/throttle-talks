import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Settings, Gauge } from 'lucide-react-native'; // Changed Gauge to avoid conflict if any, but standard lucide is fine
import { useThemeStore } from '../../store/themeStore';
import { COLORS, FONTS, SPACING, FONT_SIZES, RADIUS } from '../../constants/theme';
import Button from '../../components/common/Button';

const { width } = Dimensions.get('window');

const MOCK_VEHICLE = {
  name: 'Nissan GT-R R35',
  year: '2017',
  image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
  specs: [
    { label: 'Power', value: '565 HP' },
    { label: '0-60', value: '2.7s' },
    { label: 'Engine', value: '3.8L V6' },
  ],
  mods: [
    'HKS Exhaust System',
    'Brembo Breaks',
    'Nismo Body Kit',
    'Custom Tune'
  ]
};

export default function VehicleDetailScreen() {
  const { colors } = useThemeStore();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: MOCK_VEHICLE.image }} style={styles.image} />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent', 'transparent', colors.background] as any}
            style={StyleSheet.absoluteFill}
            locations={[0, 0.2, 0.7, 1]}
          />
          <SafeAreaView style={styles.header} edges={['top']}>
            <Button
              title=""
              variant="glass"
              icon={<ArrowLeft color="#FFF" size={24} />}
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            />
          </SafeAreaView>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text, fontFamily: FONTS.heading.family }]}>
            {MOCK_VEHICLE.name}
          </Text>
          <Text style={[styles.year, { color: colors.textSecondary }]}>{MOCK_VEHICLE.year}</Text>

          {/* Specs Grid */}
          <View style={styles.specsGrid}>
            {MOCK_VEHICLE.specs.map((spec, index) => (
              <View key={index} style={[styles.specCard, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}>
                <Text style={[styles.specValue, { color: colors.text }]}>{spec.value}</Text>
                <Text style={[styles.specLabel, { color: colors.textSecondary }]}>{spec.label}</Text>
              </View>
            ))}
          </View>

          {/* Mods List */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Modifications</Text>
          {MOCK_VEHICLE.mods.map((mod, index) => (
            <View key={index} style={[styles.modItem, { borderBottomColor: colors.border }]}>
              <Settings color={colors.text} size={20} />
              <Text style={[styles.modText, { color: colors.text }]}>{mod}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <Button title="Edit Build" variant="outline" onPress={() => { }} fullWidth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 350,
    width: width,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: SPACING.md,
  },
  backButton: {
    width: 44,
    height: 44,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  year: {
    fontSize: FONT_SIZES.xl,
    marginBottom: SPACING.xl,
    fontWeight: '600',
  },
  specsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING['2xl'],
  },
  specCard: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    alignItems: 'center',
  },
  specValue: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    marginBottom: 4,
  },
  specLabel: {
    fontSize: FONT_SIZES.xs,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '700',
    marginBottom: SPACING.lg,
    fontFamily: FONTS.heading.family,
  },
  modItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    gap: SPACING.md,
  },
  modText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.md,
    paddingBottom: 34,
    borderTopWidth: 1,
  }
});