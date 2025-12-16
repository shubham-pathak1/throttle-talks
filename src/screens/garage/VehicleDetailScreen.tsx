import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ArrowLeft, Settings, Gauge } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { COLORS, FONTS, SPACING, FONT_SIZES, RADIUS, LAYOUT } from '../../constants/theme';
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
  const { colors, colorScheme } = useThemeStore();
  const navigation = useNavigation();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: LAYOUT.bottomSpacer }}>
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

          {/* Specs Grid - Glassmorphism */}
          <View style={styles.specsGrid}>
            {MOCK_VEHICLE.specs.map((spec, index) => (
              <BlurView
                key={index}
                intensity={isDark ? 40 : 80}
                tint={isDark ? 'dark' : 'light'}
                style={[
                  styles.specCard,
                  {
                    borderColor: colors.border,
                    overflow: 'hidden',
                  }
                ]}
              >
                <Text style={[styles.specValue, { color: colors.text, fontFamily: FONTS.heading.family }]}>{spec.value}</Text>
                <Text style={[styles.specLabel, { color: colors.textSecondary }]}>{spec.label}</Text>
              </BlurView>
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

          {/* Action Button - In Flow */}
          <View style={styles.actionContainer}>
            <Button
              title="Edit Build"
              variant="outline"
              onPress={() => { }}
              fullWidth
              style={{ height: 56, borderRadius: RADIUS.full, borderWidth: 1.5 }}
              textStyle={{ fontSize: FONT_SIZES.lg, letterSpacing: 1 }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 400, // Taller image
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
    transform: [{ translateY: -40 }], // Overlap image slightly
  },
  title: {
    fontSize: FONT_SIZES['4xl'], // Massive title
    fontWeight: '700',
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  year: {
    fontSize: FONT_SIZES.xl,
    marginBottom: SPACING.xl,
    fontWeight: '600',
    opacity: 0.8,
  },
  specsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING['3xl'],
  },
  specCard: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  specValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    marginBottom: 4,
  },
  specLabel: {
    fontSize: FONT_SIZES.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '700',
    marginBottom: SPACING.lg,
    fontFamily: FONTS.heading.family,
    textTransform: 'uppercase',
  },
  modItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    gap: SPACING.md,
  },
  modText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '500',
  },
  actionContainer: {
    marginTop: SPACING['3xl'],
  }
});