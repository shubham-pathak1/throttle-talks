import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useThemeStore } from '../../store/themeStore';
import { SPACING, RADIUS, LAYOUT } from '../../constants/theme';

interface FloatingActionBarProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

export const FloatingActionBar = ({ children, style }: FloatingActionBarProps) => {
    const { colors, colorScheme } = useThemeStore();
    const isDark = colorScheme === 'dark';

    return (
        <View style={[styles.wrapper, style]}>
            <BlurView
                intensity={isDark ? 80 : 95}
                tint={isDark ? 'dark' : 'light'}
                style={[
                    styles.container,
                    {
                        backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)',
                        borderColor: colors.borderLight,
                    }
                ]}
            >
                {children}
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 120, // Increased for proper clearance above tab bar + Android nav
        left: SPACING.lg,
        right: SPACING.lg,
        alignItems: 'center',
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        padding: SPACING.md,
        borderRadius: RADIUS.xl,
        borderWidth: 1,
        overflow: 'hidden',
        gap: SPACING.md,
    },
});
