
declare module 'expo-haptics';
declare module 'expo-linear-gradient' {
    import * as React from 'react';
    import { ViewProps } from 'react-native';

    export type LinearGradientProps = ViewProps & {
        colors: ReadonlyArray<string>;
        locations?: ReadonlyArray<number> | null;
        start?: { x: number; y: number } | [number, number];
        end?: { x: number; y: number } | [number, number];
    };

    export class LinearGradient extends React.Component<LinearGradientProps> { }
}
