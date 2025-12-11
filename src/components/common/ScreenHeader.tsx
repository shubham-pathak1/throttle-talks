// src/components/common/ScreenHeader.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, MoreVertical } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';

interface ScreenHeaderProps {
  title?: string;
  onBack?: () => void;
  onMore?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export default function ScreenHeader({
  title,
  onBack,
  onMore,
  rightAction,
  transparent = false,
}: ScreenHeaderProps) {
  const { colors } = useThemeStore();

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.container,
        {
          backgroundColor: transparent ? 'transparent' : colors.background,
          borderBottomColor: colors.border,
          borderBottomWidth: transparent ? 0 : 1,
        },
      ]}
    >
      <View style={styles.content}>
        {/* Left Action */}
        <View style={styles.leftAction}>
          {onBack && (
            <TouchableOpacity
              onPress={onBack}
              style={[
                styles.iconButton,
                transparent && { backgroundColor: colors.surface },
              ]}
              activeOpacity={0.7}
            >
              <ArrowLeft color={colors.text} size={24} strokeWidth={2} />
            </TouchableOpacity>
          )}
        </View>

        {/* Title */}
        {title && (
          <Text
            style={[
              styles.title,
              { color: colors.text, fontFamily: FONTS.heading.family },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
        )}

        {/* Right Action */}
        <View style={styles.rightAction}>
          {rightAction || (
            onMore && (
              <TouchableOpacity
                onPress={onMore}
                style={[
                  styles.iconButton,
                  transparent && { backgroundColor: colors.surface },
                ]}
                activeOpacity={0.7}
              >
                <MoreVertical color={colors.text} size={24} strokeWidth={2} />
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    minHeight: 56,
  },
  leftAction: {
    width: 40,
    alignItems: 'flex-start',
  },
  rightAction: {
    width: 40,
    alignItems: 'flex-end',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    textAlign: 'center',
  },
});