import "styled-components";
import { DefaultTheme } from "styled-components";
import { defaultTheme } from "../styles/themes/defaul";

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}
}