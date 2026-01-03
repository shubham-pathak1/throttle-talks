// src/components/home/ReviewCard.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Star, ThumbsUp, MoreVertical } from 'lucide-react-native';

import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import Card from '../common/Card';

export interface Review {
    id: string;
    type: 'review';
    author: {
        name: string;
        avatar: string;
        username: string;
    };
    vehicle: {
        make: string;
        model: string;
        year: string;
    };
    rating: number;
    title: string;
    content: string;
    pros: string[];
    cons: string[];
    helpfulCount: number;
    timestamp: string;
    image?: string;
}

interface ReviewCardProps {
    review: Review;
    onPress?: () => void;
    onHelpful?: () => void;
}

const StarRating = ({ rating, size = 16 }: { rating: number; size?: number }) => {
    const { colors } = useThemeStore();
    return (
        <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={size}
                    color={star <= rating ? colors.text : colors.textTertiary}
                    fill={star <= rating ? colors.text : 'transparent'}
                    strokeWidth={1.5}
                />
            ))}
        </View>
    );
};

export default function ReviewCard({ review, onPress, onHelpful }: ReviewCardProps) {
    const { colors } = useThemeStore();

    return (
        <Card onPress={onPress} padding="none" style={styles.card} elevated>
            {/* Type Badge */}
            <View style={[styles.typeBadge, { backgroundColor: colors.surface }]}>
                <Text style={[styles.typeBadgeText, { color: colors.textSecondary }]}>REVIEW</Text>
            </View>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.authorSection}>
                    <Image source={{ uri: review.author.avatar }} style={styles.avatar} />
                    <View style={styles.authorInfo}>
                        <Text style={[styles.authorName, { color: colors.text, fontFamily: FONTS.body.family }]}>
                            {review.author.name}
                        </Text>
                        <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
                            @{review.author.username} • {review.timestamp}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                    <MoreVertical color={colors.textTertiary} size={20} />
                </TouchableOpacity>
            </View>

            {/* Vehicle Info */}
            <View style={[styles.vehicleInfo, { backgroundColor: colors.surface }]}>
                <Text style={[styles.vehicleName, { color: colors.text }]}>
                    {review.vehicle.year} {review.vehicle.make} {review.vehicle.model}
                </Text>
                <StarRating rating={review.rating} />
            </View>

            {/* Image */}
            {review.image && (
                <Image source={{ uri: review.image }} style={styles.image} resizeMode="cover" />
            )}

            {/* Content */}
            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text }]}>{review.title}</Text>
                <Text style={[styles.body, { color: colors.textSecondary }]} numberOfLines={3}>
                    {review.content}
                </Text>
            </View>

            {/* Pros/Cons */}
            <View style={styles.prosConsContainer}>
                {review.pros.length > 0 && (
                    <View style={styles.prosConsSection}>
                        <Text style={[styles.prosConsLabel, { color: colors.text }]}>PROS</Text>
                        {review.pros.slice(0, 2).map((pro, idx) => (
                            <Text key={idx} style={[styles.prosConsItem, { color: colors.textSecondary }]}>
                                + {pro}
                            </Text>
                        ))}
                    </View>
                )}
                {review.cons.length > 0 && (
                    <View style={styles.prosConsSection}>
                        <Text style={[styles.prosConsLabel, { color: colors.text }]}>CONS</Text>
                        {review.cons.slice(0, 2).map((con, idx) => (
                            <Text key={idx} style={[styles.prosConsItem, { color: colors.textSecondary }]}>
                                - {con}
                            </Text>
                        ))}
                    </View>
                )}
            </View>

            {/* Actions */}
            <View style={[styles.actions, { borderTopColor: colors.border }]}>
                <TouchableOpacity
                    style={styles.helpfulButton}
                    onPress={onHelpful}
                    activeOpacity={0.7}
                >
                    <ThumbsUp color={colors.textSecondary} size={18} strokeWidth={2} />
                    <Text style={[styles.helpfulText, { color: colors.textSecondary }]}>
                        Helpful ({review.helpfulCount})
                    </Text>
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
    },
    timestamp: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '500',
    },
    vehicleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: SPACING.md,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        marginBottom: SPACING.sm,
    },
    vehicleName: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    stars: {
        flexDirection: 'row',
        gap: 2,
    },
    image: {
        width: '100%',
        height: 220,
        backgroundColor: '#1A1A1A',
    },
    content: {
        padding: SPACING.md,
    },
    title: {
        fontSize: FONT_SIZES.lg,
        fontWeight: '700',
        marginBottom: SPACING.xs,
    },
    body: {
        fontSize: FONT_SIZES.sm,
        lineHeight: 20,
    },
    prosConsContainer: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.md,
        gap: SPACING.lg,
    },
    prosConsSection: {
        flex: 1,
    },
    prosConsLabel: {
        fontSize: FONT_SIZES.xs,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: SPACING.xs,
    },
    prosConsItem: {
        fontSize: FONT_SIZES.xs,
        lineHeight: 18,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        borderTopWidth: 1,
    },
    helpfulButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    helpfulText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
    },
});
