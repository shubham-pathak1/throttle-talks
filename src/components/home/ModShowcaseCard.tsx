// src/components/home/ModShowcaseCard.tsx
import { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Pressable } from 'react-native';
import { Bookmark, MoreVertical, ChevronLeft, ChevronRight, Wrench } from 'lucide-react-native';

import * as Haptics from 'expo-haptics';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';
import Card from '../common/Card';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_WIDTH = SCREEN_WIDTH - SPACING.lg * 2 - SPACING.md * 2;

export interface ModShowcase {
    id: string;
    type: 'mod';
    author: {
        name: string;
        avatar: string;
        username: string;
    };
    modName: string;
    brand: string;
    price: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    beforeImage: string;
    afterImage: string;
    description: string;
    timestamp: string;
    saved?: boolean;
}

interface ModShowcaseCardProps {
    mod: ModShowcase;
    onPress?: () => void;
    onSave?: () => void;
}

export default function ModShowcaseCard({ mod, onPress, onSave }: ModShowcaseCardProps) {
    const { colors, colorScheme } = useThemeStore();
    const isDark = colorScheme === 'dark';
    const [activeIndex, setActiveIndex] = useState(0);
    const [isSaved, setIsSaved] = useState(mod.saved || false);
    const scrollRef = useRef<ScrollView>(null);

    const handleSave = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setIsSaved(!isSaved);
        onSave?.();
    };

    const scrollToIndex = (index: number) => {
        scrollRef.current?.scrollTo({ x: index * IMAGE_WIDTH, animated: true });
        setActiveIndex(index);
    };

    const getDifficultyColor = () => {
        switch (mod.difficulty) {
            case 'Easy': return colors.text;
            case 'Medium': return colors.textSecondary;
            case 'Hard': return colors.textTertiary;
        }
    };

    return (
        <Card onPress={onPress} padding="none" style={styles.card} elevated>
            {/* Type Badge */}
            <View style={[styles.typeBadge, { backgroundColor: colors.surface }]}>
                <Wrench color={colors.textSecondary} size={12} strokeWidth={2.5} />
                <Text style={[styles.typeBadgeText, { color: colors.textSecondary }]}>MOD</Text>
            </View>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.authorSection}>
                    <Image source={{ uri: mod.author.avatar }} style={styles.avatar} />
                    <View style={styles.authorInfo}>
                        <Text style={[styles.authorName, { color: colors.text }]}>
                            {mod.author.name}
                        </Text>
                        <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
                            @{mod.author.username} • {mod.timestamp}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                    <MoreVertical color={colors.textTertiary} size={20} />
                </TouchableOpacity>
            </View>

            {/* Before/After Image Slider */}
            <View style={styles.imageSliderContainer}>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(e) => {
                        const index = Math.round(e.nativeEvent.contentOffset.x / IMAGE_WIDTH);
                        setActiveIndex(index);
                    }}
                    scrollEventThrottle={16}
                >
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: mod.beforeImage }} style={styles.image} resizeMode="cover" />
                        <View style={[styles.imageLabel, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
                            <Text style={styles.imageLabelText}>BEFORE</Text>
                        </View>
                    </View>
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: mod.afterImage }} style={styles.image} resizeMode="cover" />
                        <View style={[styles.imageLabel, { backgroundColor: colors.text }]}>
                            <Text style={[styles.imageLabelText, { color: colors.background }]}>AFTER</Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Navigation Arrows */}
                {activeIndex === 0 && (
                    <Pressable
                        style={[styles.navButton, styles.navButtonRight]}
                        onPress={() => scrollToIndex(1)}
                    >
                        <ChevronRight color="#FFF" size={20} strokeWidth={2.5} />
                    </Pressable>
                )}
                {activeIndex === 1 && (
                    <Pressable
                        style={[styles.navButton, styles.navButtonLeft]}
                        onPress={() => scrollToIndex(0)}
                    >
                        <ChevronLeft color="#FFF" size={20} strokeWidth={2.5} />
                    </Pressable>
                )}

                {/* Pagination Dots */}
                <View style={styles.pagination}>
                    {[0, 1].map((index) => (
                        <View
                            key={index}
                            style={[
                                styles.paginationDot,
                                {
                                    backgroundColor: '#FFF',
                                    width: activeIndex === index ? 24 : 8,
                                    opacity: activeIndex === index ? 1 : 0.4,
                                }
                            ]}
                        />
                    ))}
                </View>
            </View>

            {/* Mod Info */}
            <View style={styles.modInfo}>
                <Text style={[styles.modName, { color: colors.text }]}>{mod.modName}</Text>
                <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
                    {mod.description}
                </Text>
            </View>

            {/* Specs Grid */}
            <View style={styles.specsGrid}>
                <View style={[styles.specItem, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.specLabel, { color: colors.textTertiary }]}>BRAND</Text>
                    <Text style={[styles.specValue, { color: colors.text }]}>{mod.brand}</Text>
                </View>
                <View style={[styles.specItem, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.specLabel, { color: colors.textTertiary }]}>PRICE</Text>
                    <Text style={[styles.specValue, { color: colors.text }]}>{mod.price}</Text>
                </View>
                <View style={[styles.specItem, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.specLabel, { color: colors.textTertiary }]}>DIFFICULTY</Text>
                    <Text style={[styles.specValue, { color: getDifficultyColor() }]}>{mod.difficulty}</Text>
                </View>
            </View>

            {/* Save Action */}
            <View style={[styles.actions, { borderTopColor: colors.border }]}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                    activeOpacity={0.7}
                >
                    <Bookmark
                        color={isSaved ? colors.text : colors.textSecondary}
                        size={20}
                        fill={isSaved ? colors.text : 'transparent'}
                        strokeWidth={2}
                    />
                    <Text style={[styles.saveText, { color: isSaved ? colors.text : colors.textSecondary }]}>
                        {isSaved ? 'Saved' : 'Save to Wishlist'}
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
    imageSliderContainer: {
        position: 'relative',
        height: 280,
    },
    imageWrapper: {
        width: IMAGE_WIDTH,
        height: 280,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1A1A1A',
    },
    imageLabel: {
        position: 'absolute',
        top: SPACING.md,
        left: SPACING.md,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: RADIUS.xs,
    },
    imageLabelText: {
        color: '#FFF',
        fontSize: FONT_SIZES.xs,
        fontWeight: '700',
        letterSpacing: 1,
    },
    navButton: {
        position: 'absolute',
        top: '50%',
        marginTop: -20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButtonLeft: {
        left: SPACING.sm,
    },
    navButtonRight: {
        right: SPACING.sm,
    },
    pagination: {
        position: 'absolute',
        bottom: SPACING.md,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
    },
    paginationDot: {
        height: 8,
        borderRadius: 4,
    },
    modInfo: {
        padding: SPACING.md,
    },
    modName: {
        fontSize: FONT_SIZES.xl,
        fontWeight: '700',
        marginBottom: SPACING.xs,
        fontFamily: FONTS.heading.family,
    },
    description: {
        fontSize: FONT_SIZES.sm,
        lineHeight: 20,
        fontFamily: FONTS.body.family,
    },
    specsGrid: {
        flexDirection: 'row',
        paddingHorizontal: SPACING.md,
        paddingBottom: SPACING.md,
        gap: SPACING.sm,
    },
    specItem: {
        flex: 1,
        padding: SPACING.sm,
        borderRadius: RADIUS.sm,
        alignItems: 'center',
    },
    specLabel: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 4,
    },
    specValue: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '700',
        fontFamily: FONTS.body.family,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        borderTopWidth: 1,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
    },
    saveText: {
        fontSize: FONT_SIZES.sm,
        fontWeight: '600',
        fontFamily: FONTS.body.family,
    },
});
