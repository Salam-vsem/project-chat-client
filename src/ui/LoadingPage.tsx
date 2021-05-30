import React from 'react';
import loadingVideo from '../images/loading2.webm';
import styled from 'styled-components';
import Typing from 'react-typing-animation';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

const StyledTyping = styled(Typing)`
  min-height: 70px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
`;
const Video = styled.video`
  justify-self: flex-end;
`;

export const LoadingPage: React.FC = () => {
  return (
    <Container>
      <StyledTyping loop={true} speed={150}>
        <Title>Loading...</Title>
        <Typing.Reset />
      </StyledTyping>
      <Video src={loadingVideo} autoPlay={true} />
    </Container>
  );
}

export default LoadingPage;