import React, { useState } from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from './LoadingSpinner';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.8);
`;

const StyledImage = styled.img`
  max-width: 90%;
  max-height: 90%;
`;

const LoadingSpinnerWrap = styled(LoadingSpinner)`
  top: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
`;

interface FullScreenImageProps {
  src: string | undefined;
  onClick: () => void;
}
export const FullScreenImage: React.FC<FullScreenImageProps> = (props) => {
  const [loading, setLoading] = useState(true);
  return (
    <Container onClick={props.onClick}>
      {
        loading &&
        <LoadingSpinnerWrap size={20} />
      }
      <StyledImage
        src={props.src}
        onLoad={() => setLoading(false)}
      />
    </Container>
  )
}