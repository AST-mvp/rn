declare module 'react-native-flip-countdown-timer' {
  import React from 'react';
  import { TextStyle, ViewStyle } from 'react-native';

  interface FlipNumberProps {
    /**
     * Number Input
     */
    number: string | number;

    /**
     * Number Input Unit
     * @default 'seconds'
     */
    unit?: 'hours' | 'minutes' | 'seconds';

    /**
     * size (default is `Dimention.width / 6`)
     */
    size?: number;

    /**
     * perspective
     * @default 250
     */
    perspective?: number;

    /**
     * Wrapper Style
     * @default {}
     */
    numberWrapperStyle?: ViewStyle;

    /**
     * Card Style
     * @default {}
     */
    cardStyle?: ViewStyle;

    /**
     * Flip Card Style
     * @default {}
     */
    flipCardStyle?: ViewStyle;

    /**
     * Number style
     * @default {}
     */
    numberStyle?: TextStyle;
  }

  interface CountdownTimerProps {
    /**
     * Time (in seconds)
     */
    time: string | number;

    /**
     * Play the timer
     * @default true
     */
    play?: boolean;

    /**
     * Wrapper for the CountdownTimer
     * @default {}
     */
    wrapperStyle?: ViewStyle;

    /**
     * Flip Number Props
     */
    flipNumberProps?: FlipNumberProps;
  }

  export const CountdownTimer: React.ComponentClass<CountdownTimerProps>;

  export const FlipNumber: React.FC<FlipNumberProps>;
}
