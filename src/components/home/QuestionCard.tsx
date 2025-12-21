// src/components/home/QuestionCard.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageSquare, ChevronRight, MoreVertical } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';
import Card from '../common/Card';

export interface Question {
    id: string;
    type: 'question';
    author: {
        name: string;
        avatar: string;
        username: string;
    };
    title: string;
    body: string;
    tags: string[];
    answerCount: number;
    timestamp: string;
    topAnswer?: {
        author: string;
        preview: string;
    };
}

interface QuestionCardProps {
    question: Question;
    onPress?: () => void;
    onAnswer?: () => void;
}

export default function QuestionCard({ question, onPress, onAnswer }: QuestionCardProps) {
    const { colors, colorScheme } = useThemeStore();
    const isDark = colorScheme === 'dark';

    return (
        <Card onPress={onPress} padding="none" style={styles.card} elevated>
            {/* Type Badge */}
            <View style={[styles.typeBadge, { backgroundColor: colors.surface }]}>
                <MessageSquare color={colors.textSecondary} size={12} strokeWidth={2.5} />
                <Text style={[styles.typeBadgeText, { color: colors.textSecondary }]}>Q&A</Text>
            </View>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.authorSection}>
                    <Image source={{ uri: question.author.avatar }} style={styles.avatar} />
                    <View style={styles.authorInfo}>
                        <Text style={[styles.authorName, { color: colors.text }]}>
                            {question.author.name}
                        </Text>
                        <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
                            @{question.author.username} • {question.timestamp}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                    <MoreVertical color={colors.textTertiary} size={20} />
                </TouchableOpacity>
            </View>

            {/* Question Content */}
            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text }]}>{question.title}</Text>
                <Text style={[styles.body, { color: colors.textSecondary }]} numberOfLines={2}>
                    {question.body}
                </Text>
            </View>

            {/* Tags */}
            <View style={styles.tagsContainer}>
                {question.tags.slice(0, 3).map((tag, idx) => (
                    <View
                        key={idx}
                        style={[styles.tag, { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)' }]}
                    >
                        <Text style={[styles.tagText, { color: colors.textSecondary }]}>{tag}</Text>
                    </View>
                ))}
            </View>

            {/* Top Answer Preview */}
            {question.topAnswer && (
                <View style={[styles.answerPreview, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.answerLabel, { color: colors.textTertiary }]}>TOP ANSWER</Text>
                    <Text style={[styles.answerAuthor, { color: colors.text }]}>
                        {question.topAnswer.author}
                    </Text>
                    <Text style={[styles.answerText, { color: colors.textSecondary }]} numberOfLines={2}>
                        {question.topAnswer.preview}
                    </Text>
                </View>
            )}

            {/* Actions */}
            <View style={[styles.actions, { borderTopColor: colors.border }]}>
                <View style={styles.answerCountContainer}>
                    <MessageSquare color={colors.textSecondary} size={16} strokeWidth={2} />
                    <Text style={[styles.answerCount, { color: colors.textSecondary }]}>
                        {question.answerCount} {question.answerCount === 1 ? 'answer' : 'answers'}
                    </Text>
                </View>
                <TouchableOpacity
                    style={[styles.answerButton, { backgroundColor: colors.text }]}
                    onPress={onAnswer}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.answerButtonText, { color: colors.background }]}>Answer</Text>
                    <ChevronRight color={colors.background} size={16} strokeWidth={2.5} />
                </TouchableOpacity>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginBottom: SPACING.xl,
        overflow: 'hidden',
    },
    typeBadge: {
        position: 'absolute',
        top: SPACING.md,
        right: SPACING.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: RADIUS.xs,
        zIndex: 10,
    },
    typeBadgeText: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '700',
        letterSpacing: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.md,
    },
    authorSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: RADIUS.full,
        marginRight: SPACING.md,
    },
    authorInfo: {
        flex: 1,
    },
    authorName: {
        fontSize: FONT_SIZES.base,
        fontWeight: '600',
        fontFamily: FONTS.body.family,
    },
    timestamp: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '500',
        fontFamily: FONTS.body.family,
    },
    content: {
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.sm,
    },
    title: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        lineHeight: 24,
        marginBottom: SPACING.xs,
        fontFamily: FONTS.heading.family,
    },
    body: {
        fontSize: FONT_SIZES.sm,
        lineHeight: 20,
        fontFamily: FONTS.body.family,
    },
    tagsContainer: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.md,
        gap: SPACING.xs,
        flexWrap: 'wrap',
    },
    tag: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: RADIUS.sm,
    },
    tagText: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '600',
        fontFamily: FONTS.body.family,
    },
    answerPreview: {
        marginHorizontal: SPACING.md,
        marginBottom: SPACING.md,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
    },
    answerLabel: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 4,
    },
    answerAuthor: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        marginBottom: 4,
        fontFamily: FONTS.body.family,
    },
    answerText: {
        fontSize: FONT_SIZES.sm,
        lineHeight: 18,
        fontFamily: FONTS.body.family,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        borderTopWidth: 1,
    },
    answerCountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.xs,
    },
    answerCount: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        fontFamily: FONTS.body.family,
    },
    answerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: RADIUS.sm,
        gap: 4,
    },
    answerButtonText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '700',
        fontFamily: FONTS.body.family,
    },
});
