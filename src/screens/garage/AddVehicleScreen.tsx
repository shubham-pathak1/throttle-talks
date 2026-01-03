// src/screens/garage/AddVehicleScreen.tsx
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { X, Camera, Plus, Trash2 } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function AddVehicleScreen() {
  const { colors } = useThemeStore();
  const navigation = useNavigation();

  const [vehicleName, setVehicleName] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [horsepower, setHorsepower] = useState('');
  const [engine, setEngine] = useState('');
  const [drivetrain, setDrivetrain] = useState('');
  const [mods, setMods] = useState<string[]>([]);
  const [currentMod, setCurrentMod] = useState('');

  const handleAddMod = () => {
    if (currentMod.trim()) {
      setMods([...mods, currentMod.trim()]);
      setCurrentMod('');
    }
  };

  const handleRemoveMod = (index: number) => {
    setMods(mods.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (vehicleName && year && make && model) {
      console.log('Saving vehicle:', {
        vehicleName,
        year,
        make,
        model,
        horsepower,
        engine,
        drivetrain,
        mods,
      });
      // TODO: Save to garage
      navigation.goBack();
    }
  };

  const canSave = vehicleName.trim() && year.trim() && make.trim() && model.trim();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}
            activeOpacity={0.7}
          >
            <X color={colors.text} size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text, fontFamily: FONTS.heading.family }]}>
            Add Vehicle
          </Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Image Upload */}
          <TouchableOpacity
            style={[styles.imageUpload, { backgroundColor: colors.surface, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <Camera color={colors.textSecondary} size={48} strokeWidth={1.5} />
            <Text style={[styles.imageUploadText, { color: colors.textSecondary, fontFamily: FONTS.body.family }]}>
              Add Photos
            </Text>
          </TouchableOpacity>

          {/* Basic Info */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: FONTS.heading.family }]}>
              Basic Information
            </Text>

            <Input
              label="Vehicle Name"
              placeholder="e.g., The Beast"
              value={vehicleName}
              onChangeText={setVehicleName}
              containerStyle={styles.input}
            />

            <View style={styles.row}>
              <Input
                label="Year"
                placeholder="2020"
                value={year}
                onChangeText={setYear}
                keyboardType="numeric"
                containerStyle={[styles.input, styles.halfWidth]}
              />
              <Input
                label="Make"
                placeholder="Subaru"
                value={make}
                onChangeText={setMake}
                containerStyle={[styles.input, styles.halfWidth]}
              />
            </View>

            <Input
              label="Model"
              placeholder="WRX STI"
              value={model}
              onChangeText={setModel}
              containerStyle={styles.input}
            />
          </View>

          {/* Specs */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: FONTS.heading.family }]}>
              Specifications
            </Text>

            <View style={styles.row}>
              <Input
                label="Horsepower"
                placeholder="400"
                value={horsepower}
                onChangeText={setHorsepower}
                keyboardType="numeric"
                containerStyle={[styles.input, styles.halfWidth]}
              />
              <Input
                label="Engine"
                placeholder="2.5L Turbo"
                value={engine}
                onChangeText={setEngine}
                containerStyle={[styles.input, styles.halfWidth]}
              />
            </View>

            <Input
              label="Drivetrain"
              placeholder="AWD"
              value={drivetrain}
              onChangeText={setDrivetrain}
              containerStyle={styles.input}
            />
          </View>

          {/* Modifications */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: FONTS.heading.family }]}>
              Modifications
            </Text>

            <View style={styles.modInputRow}>
              <TextInput
                style={[
                  styles.modInput,
                  {
                    backgroundColor: colors.surface,
                    color: colors.text,
                    fontFamily: FONTS.body.family,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Add a modification..."
                placeholderTextColor={colors.textTertiary}
                value={currentMod}
                onChangeText={setCurrentMod}
                onSubmitEditing={handleAddMod}
              />
              <TouchableOpacity
                style={[styles.addModButton, { backgroundColor: colors.accent }]}
                onPress={handleAddMod}
                activeOpacity={0.7}
              >
                <Plus color={colors.background} size={24} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            {mods.length > 0 && (
              <View style={styles.modsList}>
                {mods.map((mod, index) => (
                  <View
                    key={index}
                    style={[
                      styles.modItem,
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
                    <TouchableOpacity
                      onPress={() => handleRemoveMod(index)}
                      style={styles.removeModButton}
                      activeOpacity={0.7}
                    >
                      <Trash2 color={colors.error} size={18} strokeWidth={2} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <Button
            title="Add to Garage"
            onPress={handleSave}
            variant="primary"
            size="lg"
            disabled={!canSave}
            fullWidth
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  imageUpload: {
    height: 200,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING['2xl'],
  },
  imageUploadText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    marginTop: SPACING.sm,
  },
  section: {
    marginBottom: SPACING['2xl'],
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    marginBottom: SPACING.lg,
  },
  input: {
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  halfWidth: {
    flex: 1,
  },
  modInputRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  modInput: {
    flex: 1,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
  },
  addModButton: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modsList: {
    gap: SPACING.sm,
  },
  modItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
  },
  modText: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
  removeModButton: {
    padding: SPACING.xs,
  },
  bottomBar: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: 80, // Large padding for Android navigation bar
    borderTopWidth: 1,
  },
});