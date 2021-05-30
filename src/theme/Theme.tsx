import React from 'react';
// import { Theme as ThemeClass, ThemeProps, useThemeStore } from '../store/ThemeStore';
import {
  ThemeProvider as SCThemeProvider,
} from 'styled-components';
import { observer } from 'mobx-react-lite';
import { MessageStructure, UserThemeProps } from '../types';
import { useAccountStore } from '../store/Account';

export const defaultUserTheme: UserThemeProps = {
  color: '#7e8eb8',
  fontScale: 1,
  borderRadius: 12,
  structure: MessageStructure.default
}

interface StaticThemeProps {
  colors: StaticThemeColorsProps,
  font: StaticThemeFontsProps
}

export interface StaticThemeColorsProps {
  dark: string;
  mediumBg: string;
  message: string;
  light: string;
  hover: string;
}

export interface StaticThemeFontsProps {
  bigTitle: number;
  title: number;
  subTitle: number;
  default: number;
  small: number;
  verySmall: number;
}

const staticTheme: StaticThemeProps =  {
  colors: {
    dark: '#12161f',
    mediumBg: '#141927',
    message: '#2d2d2d',
    light: '#1b202e',
    hover: '#46494D',
  },
  font: {
    bigTitle: 24,
    title: 18,
    subTitle: 16,
    default: 14,
    small: 12,
    verySmall: 10,
  },
}

//     darkBg: '#1A1B1D',
//     mediumBg: '#222426',
//     messageBg: '#2d2d2d',
//     lightBg: '#333539',
//     formHoverBg: '#46494D',


export type StaticTheme = typeof staticTheme;

interface Theme {
  static: StaticTheme;
  personal: UserThemeProps;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

const ThemeProvider: React.FC = observer((props) => {

  const personalTheme = useAccountStore().user?.theme ?? defaultUserTheme;
  const theme = {
    static: staticTheme,
    personal: {...personalTheme}
  }

  return (
    <SCThemeProvider theme={theme}>
      {props.children}
    </SCThemeProvider>
  ); 
});

export default ThemeProvider;
