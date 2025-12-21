// src/components/home/PollCard.tsx
import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { BarChart2, Check, MoreVertical } from 'lucide-react-native';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS, ANIMATIONS } from '../../constants/theme';
import Card from '../common/Card';

export interface PollOption {
    id: string;
    text: string;
    votes: number;
}

export interface Poll {
    id: string;
    type: 'poll';
    author: {
        name: string;
        avatar: string;
        username: string;
    };
    question: string;
    options: PollOption[];
    totalVotes: number;
    timestamp: string;
    userVotedOptionId?: string;
}

interface PollCardProps {
    poll: Poll;
    onPress?: () => void;
    onVote?: (optionId: string) => void;
}

export default function PollCard({ poll, onPress, onVote }: PollCardProps) {
    const { colors, colorScheme } = useThemeStore();
    const isDark = colorScheme === 'dark';
    const [selectedOption, setSelectedOption] = useState<string | null>(poll.userVotedOptionId || null);
    const hasVoted = selectedOption !== null;

    const handleVote = (optionId: string) => {
        if (hasVoted) return;
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setSelectedOption(optionId);
        onVote?.(optionId);
    };

    const getPercentage = (votes: number) => {
        if (poll.totalVotes === 0) return 0;
        return Math.round((votes / poll.totalVotes) * 100);
    };

    return (
        <Card onPress={onPress} padding="none" style={styles.card} elevated>
            {/* Type Badge */}
            <View style={[styles.typeBadge, { backgroundColor: colors.surface }]}>
                <BarChart2 color={colors.textSecondary} size={12} strokeWidth={2.5} />
                <Text style={[styles.typeBadgeText, { color: colors.textSecondary }]}>POLL</Text>
            </View>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.authorSection}>
                    <Image source={{ uri: poll.author.avatar }} style={styles.avatar} />
                    <View style={styles.authorInfo}>
                        <Text style={[styles.authorName, { color: colors.text }]}>
                            {poll.author.name}
                        </Text>
                        <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
                            @{poll.author.username} • {poll.timestamp}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                    <MoreVertical color={colors.textTertiary} size={20} />
                </TouchableOpacity>
            </View>

            {/* Question */}
            <View style={styles.questionContainer}>
                <Text style={[styles.question, { color: colors.text }]}>{poll.question}</Text>
            </View>

            {/* Options */}
            <View style={styles.optionsContainer}>
                {poll.options.map((option, index) => {
                    const percentage = getPercentage(option.votes + (selectedOption === option.id ? 1 : 0));
                    const isSelected = selectedOption === option.id;

                    return (
                        <Pressable
                            key={option.id}
                            onPress={() => handleVote(option.id)}
                            style={({ pressed }) => [
                                styles.optionButton,
                                {
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
                                    borderColor: isSelected ? colors.text : colors.border,
                                    borderWidth: isSelected ? 2 : 1,
                                    opacity: pressed && !hasVoted ? 0.7 : 1,
                                },
                            ]}
                        >
                            {/* Progress bar */}
                            {hasVoted && (
                                <MotiView
                                    from={{ width: '0%' }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ type: 'timing', duration: 500, delay: index * 100 }}
                                    style={[
                                        styles.progressBar,
                                        { backgroundColor: isSelected ? colors.text : colors.surface },
                                    ]}
                                />
                            )}

                            <View style={styles.optionContent}>
                                <View style={styles.optionLeft}>
                                    {isSelected && (
                                        <MotiView
                                            from={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                                            style={[styles.checkCircle, { backgroundColor: colors.text }]}
                                        >
                                            <Check color={colors.background} size={12} strokeWidth={3} />
                                        </MotiView>
                                    )}
                                    <Text style={[styles.optionText, { color: colors.text }]}>{option.text}</Text>
                                </View>
                                {hasVoted && (
                                    <MotiView
                                        from={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 300 }}
                                    >
                                        <Text style={[styles.percentageText, { color: colors.textSecondary }]}>
                                            {percentage}%
                                        </Text>
                                    </MotiView>
                                )}
                            </View>
                        </Pressable>
                    );
                })}
            </View>

            {/* Vote count */}
            <View style={styles.footer}>
                <Text style={[styles.voteCount, { color: colors.textTertiary }]}>
                    {poll.totalVotes + (selectedOption ? 1 : 0)} votes
                </Text>
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
    questionContainer: {
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.md,
    },
    question: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        lineHeight: 26,
        fontFamily: FONTS.heading.family,
    },
    optionsContainer: {
        paddingHorizontal: SPACING.md,
        gap: SPACING.sm,
    },
    optionButton: {
        borderRadius: RADIUS.md,
        overflow: 'hidden',
        position: 'relative',
    },
    progressBar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        borderRadius: RADIUS.md,
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SPACING.md,
        zIndex: 1,
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        flex: 1,
    },
    checkCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        fontSize: FONT_SIZES.base,
        fontWeight: '500',
        fontFamily: FONTS.body.family,
    },
    percentageText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '700',
        fontFamily: FONTS.body.family,
    },
    footer: {
        padding: SPACING.md,
        paddingTop: SPACING.sm,
    },
    voteCount: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '600',
        fontFamily: FONTS.body.family,
    },
});
