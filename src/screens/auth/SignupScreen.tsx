import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { COLORS, FONTS, FONT_SIZES, SPACING } from '../../constants/theme';
import { useThemeStore } from '../../store/themeStore';
import { Mail, Lock, User } from 'lucide-react-native';

export default function SignupScreen({ navigation }: any) {
    const { login } = useAuthStore();
    const { colors } = useThemeStore();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            login();
            setLoading(false);
        }, 1500);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
                        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                            Join the community of enthusiasts
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Full Name"
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={setName}
                            icon={<User size={20} color={colors.textSecondary} />}
                        />

                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            icon={<Mail size={20} color={colors.textSecondary} />}
                        />

                        <Input
                            label="Password"
                            placeholder="Create a password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            icon={<Lock size={20} color={colors.textSecondary} />}
                        />

                        <Button
                            title="Sign Up"
                            onPress={handleSignup}
                            variant="primary"
                            size="lg"
                            fullWidth
                            style={{ marginTop: SPACING.lg }}
                            disabled={loading}
                        />
                    </View>

                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={[styles.linkText, { color: colors.text }]}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: SPACING['2xl'],
        justifyContent: 'center',
    },
    header: {
        marginBottom: SPACING['4xl'],
    },
    title: {
        fontFamily: FONTS.heading.family,
        fontWeight: '700',
        fontSize: FONT_SIZES['4xl'],
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontFamily: FONTS.body.family,
        fontSize: FONT_SIZES.lg,
    },
    form: {
        width: '100%',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SPACING['4xl'],
        gap: SPACING.xs,
    },
    footerText: {
        fontFamily: FONTS.body.family,
        fontSize: FONT_SIZES.base,
    },
    linkText: {
        fontFamily: FONTS.body.family,
        fontWeight: '700',
        fontSize: FONT_SIZES.base,
    },
});
