import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ImageBackground, StatusBar } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
    FadeIn,
    SharedValue
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/common/Button';
import { COLORS, FONTS, FONT_SIZES, SPACING } from '../../constants/theme';
import { useThemeStore } from '../../store/themeStore';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Connect with\nEnthusiasts',
        description: 'Join the fastest growing community of car lovers. Share your passion, discovered meets, and build your garage.',
        image: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop', // Porsche/Dark
    },
    {
        id: '2',
        title: 'Showcase Your\nBuild',
        description: 'Create a digital garage of your vehicles. Document modifications, track specs, and get inspired by others.',
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966&auto=format&fit=crop', // Car Detail
    },
    {
        id: '3',
        title: 'Discover\nLocal Meets',
        description: 'Never miss a car meet again. Find local events, organize rides, and meet like-minded people nearby.',
        image: 'https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?q=80&w=2070&auto=format&fit=crop', // Car Meet
    },
];

const Slide = ({ item, index, scrollX }: { item: typeof SLIDES[0], index: number, scrollX: SharedValue<number> }) => {

    const animatedImageStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [1.2, 1, 1.2],
            Extrapolation.CLAMP
        );
        return {
            transform: [{ scale }],
        };
    });

    return (
        <View style={styles.slide}>
            <Animated.View style={[StyleSheet.absoluteFill, animatedImageStyle]}>
                <ImageBackground
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="cover"
                >
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.9)', '#000000']}
                        style={StyleSheet.absoluteFill}
                        locations={[0, 0.5, 1]}
                    />
                </ImageBackground>
            </Animated.View>
        </View>
    );
};

export default function OnboardingScreen({ navigation }: any) {
    const scrollX = useSharedValue(0);
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { completeOnboarding } = useAuthStore();
    const { colorScheme } = useThemeStore();

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
            setCurrentIndex(currentIndex + 1);
        } else {
            completeOnboarding();
            navigation.replace('Login');
        }
    };

    const handleSkip = () => {
        completeOnboarding();
        navigation.replace('Login');
    };

    const onViewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems[0]) {
            setCurrentIndex(viewableItems[0].index);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <Animated.FlatList
                ref={flatListRef}
                data={SLIDES}
                renderItem={({ item, index }: { item: typeof SLIDES[0], index: number }) => <Slide item={item} index={index} scrollX={scrollX} />}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                bounces={false}
            />

            <View style={styles.footer}>
                <Animated.View entering={FadeIn.duration(500).delay(200)} style={styles.textContainer}>
                    <Text style={styles.title}>{SLIDES[currentIndex].title}</Text>
                    <Text style={styles.description}>{SLIDES[currentIndex].description}</Text>
                </Animated.View>

                <View style={styles.controls}>
                    {/* Pagination Dots */}
                    <View style={styles.pagination}>
                        {SLIDES.map((_, index) => {
                            const animatedDotStyle = useAnimatedStyle(() => {
                                const widthAnim = interpolate(
                                    scrollX.value,
                                    [(index - 1) * width, index * width, (index + 1) * width],
                                    [8, 24, 8],
                                    Extrapolation.CLAMP
                                );
                                const opacity = interpolate(
                                    scrollX.value,
                                    [(index - 1) * width, index * width, (index + 1) * width],
                                    [0.4, 1, 0.4],
                                    Extrapolation.CLAMP
                                );
                                return {
                                    width: widthAnim,
                                    opacity,
                                };
                            });

                            return (
                                <Animated.View
                                    key={index}
                                    style={[styles.dot, animatedDotStyle]}
                                />
                            );
                        })}
                    </View>

                    <View style={styles.buttons}>
                        {currentIndex < SLIDES.length - 1 ? (
                            <>
                                <Button
                                    title="Skip"
                                    onPress={handleSkip}
                                    variant="ghost"
                                    style={{ marginRight: SPACING.md }}
                                />
                                <Button
                                    title="Next"
                                    onPress={handleNext}
                                    variant="primary"
                                    style={{ minWidth: 120 }}
                                />
                            </>
                        ) : (
                            <Button
                                title="Get Started"
                                onPress={handleNext}
                                variant="primary" // Will be gradient
                                fullWidth
                                size="lg"
                                style={{ minWidth: 200 }}
                            />
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    slide: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: SPACING['2xl'],
        paddingBottom: SPACING['4xl'],
        justifyContent: 'flex-end',
    },
    textContainer: {
        marginBottom: SPACING['2xl'],
    },
    title: {
        fontFamily: FONTS.heading.family,
        fontWeight: '700',
        fontSize: FONT_SIZES['5xl'], // Massive
        color: '#FFFFFF',
        marginBottom: SPACING.md,
        lineHeight: 56,
        textTransform: 'uppercase', // Editorial look
        letterSpacing: 1,
    },
    description: {
        fontFamily: FONTS.body.family,
        fontSize: FONT_SIZES.lg,
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 24,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 10,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFF',
        marginRight: 6,
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
