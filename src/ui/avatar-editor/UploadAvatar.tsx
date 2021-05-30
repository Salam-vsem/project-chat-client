// import { BigUserAvatar } from '../../../menu/settings/SettingsList';
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useRef } from "react";
import styled from "styled-components";

interface ContainerProps {
  src?: string;
  clip?: ClipProps;
}
const Container = styled.div<ContainerProps>`
  position: relative;
  text-align: center;
  min-width: 70px;
  min-height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 100%;
  background: ${props => props.src? `url('${props.src}');`: props.theme.personal.color};
  clip-path: ${props => props.clip && formClipText(props.clip.x, props.clip.y, props.clip.width)};
  /* background-clip: ${props => props.clip && formClipText(props.clip.x, props.clip.y, props.clip.width)}; */
  /* background-position: ${props => props.clip? `top ${props.clip.y}px left ${props.clip.y}px`: ''}; */
  background-size: cover;
`;

const formClipText = (x: number, y: number, width: number) => {
  const res = `inset(${y}px, ${x + width}px, ${y + width}px, ${x}px);`
  return res;
}

const UploadLabel = styled.label`
`;

const Blackout = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.5;
  z-index: 3;
`;


const EditIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: color 0.3s ease;
  z-index: 4;
  cursor: pointer;
  font-size: ${props => props.theme.static.font.bigTitle + 'px'};

  &:hover {
    color: ${props => props.theme.personal.color};
  }
`;

export interface ClipProps {
  x: number;
  y: number;
  width: number;
}

interface UploadAvatarProps {
  onFileLoad: (event: React.ChangeEvent<HTMLInputElement>) => void;
  avatarSrc?: string;
  clip?: ClipProps;
}
export const UploadAvatar: React.FC<UploadAvatarProps> = (props)=> {
  const {avatarSrc, onFileLoad, clip} = props;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Container src={avatarSrc} clip={clip}>
      <UploadLabel>
        <EditIcon icon={faCamera} />
        <input
          style={{display: 'none'}}
          ref={inputRef}
          onChange={onFileLoad}
          type="file"
          accept="image/x-png,image/jpeg"
        />
      </UploadLabel>
      <Blackout />
    </Container>
  )
}

export default UploadAvatar;