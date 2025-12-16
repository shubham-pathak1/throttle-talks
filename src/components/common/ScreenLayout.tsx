import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ViewStyle } from 'react-native';
import { SafeAreaView, EdgeInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '../../store/themeStore';
import { LAYOUT } from '../../constants/theme';

interface ScreenLayoutProps {
    children: React.ReactNode;
    style?: ViewStyle;
    edges?: readonly ('top' | 'right' | 'bottom' | 'left')[];
    useSafeArea?: boolean;
    withBottomSpacer?: boolean;
}

export const ScreenLayout = ({
    children,
    style,
    edges = ['top'],
    useSafeArea = true,
    withBottomSpacer = true
}: ScreenLayoutProps) => {
    const { colors } = useThemeStore();

    const Content = (
        <View style={[styles.container, style]}>
            {children}
            {withBottomSpacer && <View style={{ height: LAYOUT.bottomSpacer }} />}
        </View>
    );

    if (useSafeArea) {
        return (
            <SafeAreaView
                edges={edges}
                style={[styles.safeArea, { backgroundColor: colors.background }]}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={{ flex: 1 }}
                >
                    {Content}
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    return (
        <View style={[styles.safeArea, { backgroundColor: colors.background }]}>
            {Content}
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
});
