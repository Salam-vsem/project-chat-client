import React from 'react';
import styled from 'styled-components';
import LoginPanel from './LoginPanel';
import loginBg from '../../images/bg/login-page/login.jpg';
import signUp from '../../images/bg/login-page/sign-up.jpg';
import { useAccountStore } from '../../store/Account';
import { useHistory, useLocation } from 'react-router';
import { routes } from '../../config/routes';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  touch-action: none;
  -ms-touch-action: none;
`;

interface BgImageProps {
  isSignUp: boolean
}
const BgImageContainer = styled.div<BgImageProps>`
  width: 50vw;
  height: 100vh;
  object-fit:cover;
  background-image: ${props => props.isSignUp? `url(${signUp})`: `url(${loginBg})`};
  background-position: center;
  background-size: cover;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const LoginPanelContainer = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 800px) {
    width: 90vw;
  }
`;

export const LoginPage: React.FC = () => {
  const accountStore = useAccountStore();
  const history = useHistory();
  const props = useLocation();

  console.log(props)

  if (accountStore.user) {
    history.replace(routes.chat);
    return null;
  }

  return (
    <Container>
      <BgImageContainer isSignUp={props.pathname === routes.signUp} />
      <LoginPanelContainer>
        <LoginPanel isSignUp={props.pathname === routes.signUp} />
      </LoginPanelContainer>
    </Container>
  )
}

export default LoginPage;