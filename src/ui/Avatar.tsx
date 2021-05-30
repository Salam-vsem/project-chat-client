import { StaticThemeFontsProps } from "src/theme/Theme";
import styled from "styled-components";

export enum AvatarSize {
  small = 'small',
  medium = 'medium',
  big = 'big',
  veryBig = 'veryBig',
}

const sizeTypeToNum: Record<AvatarSize, string> = {
  [AvatarSize.small]: 40 + 'px',
  [AvatarSize.medium]: 50 + 'px',
  [AvatarSize.big]: 70 + 'px',
  [AvatarSize.veryBig]: 100 + 'px',
}

interface AvatarProps {
  size?: AvatarSize;
  src?: string;
}

const selectFontSize = (fonts: StaticThemeFontsProps, size: AvatarSize) => {
  switch(size) {
    case (AvatarSize.small): return fonts.default + 'px';
    case (AvatarSize.medium): return fonts.title + 'px';
    case (AvatarSize.big): return fonts.bigTitle + 'px';
    case (AvatarSize.veryBig): return 32 + 'px';
    default: return fonts.default + 'px';
  }
}

export const Avatar = styled.div<AvatarProps>`
  position: relative;
  min-width: ${props => props.size? sizeTypeToNum[props.size]: sizeTypeToNum[AvatarSize.medium]};
  height: ${props => props.size? sizeTypeToNum[props.size]: sizeTypeToNum[AvatarSize.medium]};
  line-height: ${props => props.size? sizeTypeToNum[props.size]: sizeTypeToNum[AvatarSize.medium]};
  border-radius: 50%;
  background: ${props => props.src? `url('${props.src}') center;`: ''};
  background-color: ${props => props.theme.personal.color};
  background-size: cover;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  font-size: ${props => selectFontSize(props.theme.static.font, props.size || AvatarSize.medium)};
`;