import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, MessageSquare, Heart, Share2 } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { COLORS, FONTS, SPACING, FONT_SIZES, LAYOUT } from '../../constants/theme';
import Button from '../../components/common/Button';

const { width } = Dimensions.get('window');

// Mock Data (placeholder)
const MOCK_POST = {
    id: '1',
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    title: 'Late Night Run',
    user: 'alexrods',
    description: 'Nothing beats the empty city streets at 2 AM. The sound of the engine echoing against the buildings... pure therapy.',
    likes: 245,
    comments: 12,
};

export default function PostDetailScreen() {
    const { colors } = useThemeStore();
    const navigation = useNavigation();
    const route = useRoute();
    // const { postId } = route.params as any; // Use in real app

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={{ paddingBottom: LAYOUT.bottomSpacer }}>
                {/* Full Image Header */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: MOCK_POST.image }} style={styles.image} />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.6)', 'transparent', 'transparent', colors.background] as any}
                        style={StyleSheet.absoluteFill}
                        locations={[0, 0.2, 0.8, 1]}
                    />

                    {/* Back Button */}
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
                        {MOCK_POST.title}
                    </Text>
                    <Text style={[styles.user, { color: colors.textSecondary }]}>@{MOCK_POST.user}</Text>

                    <Text style={[styles.description, { color: colors.text, fontFamily: FONTS.body.family }]}>
                        {MOCK_POST.description}
                    </Text>

                    <View style={[styles.stats, { borderColor: colors.border }]}>
                        <View style={styles.statItem}>
                            <Heart color={colors.text} size={24} />
                            <Text style={[styles.statText, { color: colors.text }]}>{MOCK_POST.likes}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <MessageSquare color={colors.text} size={24} />
                            <Text style={[styles.statText, { color: colors.text }]}>{MOCK_POST.comments}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Share2 color={colors.text} size={24} />
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Comment Input Placeholder */}
            <View style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
                <Button title="Add a comment..." variant="outline" onPress={() => { }} fullWidth style={{ borderColor: colors.border }} textStyle={{ color: colors.textSecondary }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        height: 400,
        width: width,
        position: 'relative',
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
        paddingHorizontal: 0, // override
        paddingVertical: 0,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: SPACING.lg,
        marginTop: -40, // Overlap
    },
    title: {
        fontSize: FONT_SIZES['3xl'],
        fontWeight: '700',
        marginBottom: SPACING.xs,
    },
    user: {
        fontSize: FONT_SIZES.base,
        marginBottom: SPACING.lg,
        fontWeight: '600',
    },
    description: {
        fontSize: FONT_SIZES.lg,
        lineHeight: 28,
        marginBottom: SPACING.xl,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: SPACING.lg,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    statText: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: SPACING.md,
        borderTopWidth: 1,
        paddingBottom: 34,
    },
});
