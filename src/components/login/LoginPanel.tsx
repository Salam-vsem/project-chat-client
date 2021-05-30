import React, { useRef } from 'react';
import  { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useAccountStore } from '../../store/Account';
import { useHistory } from 'react-router';
import { routes } from '../../config/routes';
import { Link } from 'react-router-dom';
import { useAccountApi } from 'src/api/AccountApi';

const Image = styled.img`
  width: 140px;
  height: 140px;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.static.font.title + 'px'};
  margin: 0px 0px 30px 0px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 20px;
  color: #E2E2E2;
  background-color: ${props => props.theme.static.colors.light};
  border: none;
  outline: none;
  border-radius: 8px;
  margin-bottom: 10px;

  &:focus {
    background-color: ${props => props.theme.static.colors.hover};
  }
  &::placeholder {
    font-size: ${props => props.theme.static.font.default + 'px'};
    color: #EEEEEE;
  }
`;

const InputIcon = styled.img`
  filter: invert(100%) sepia(3%) saturate(660%) hue-rotate(228deg) brightness(116%) contrast(77%);
  width: 10px;
  height: 10px;
  position: absolute;
  top: 17px;
  left: 20px;
  z-index: 9999;

  &.user {
    width: 12px;
    height: 12px;
    clip: rect(auto, auto, 10px, auto);
  }
`;

const SubmitButton = styled.button`
  width: 200px;
  border: none;
  outline: none;
  border-radius: 8px;
  color: #EEEEEE;
  font-weight: 700;
  font-size: ${props => props.theme.static.font.subTitle + 'px;'};
  background-color: ${props => props.theme.personal.color};
  padding: 20px;
  margin-top: 25px;
  transition: background-color, 0.3s ease;
  cursor: pointer;
`;

const Container = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialMediaLinkContainer = styled.div`
  min-width: 200px;
  display: flex;
  justify-content: space-between;;
  align-items: center;
  margin-bottom: 45px;
`;

const SocialMediaIconBg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.personal.color};
  transition: background-color, 0.3s ease;
  cursor: pointer;
`;

//color !!!! fix
const SocialMediaIcon = styled.img`
  width: 25px;
  height: 25px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-top: 20px;
  font-size: ${props => props.theme.static.font.default + 'px;'};
  color: #fff;
`;

interface LoginPanelProps {
  isSignUp: boolean
}
export const LoginPanel: React.FC<LoginPanelProps> = observer((props) => {
  const accountApi = useAccountApi();
  const accountStore = useAccountStore();
  const loginInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const login = async (login: string, password: string) => {
    try {
      const user = await accountApi.login({login, password});
      accountStore.login(user)
      history.push(routes.chat);
    } catch(e) {
      alert('ты дурак');
    }
  }

  const reg = async(login: string, password: string) => {
    try {
      const user = await accountApi.registration({login, password});
      accountStore.login(user);
      history.push(routes.chat);
    } catch(e) {
      alert('ошибка');
    }
  }

  return (
    <Container>
      <Title>{props.isSignUp? 'Sign Up': 'Sign In'}</Title>
      <SocialMediaLinkContainer>
        {/* <SocialMediaIconBg><SocialMediaIcon src={googleIcon}/></SocialMediaIconBg> */}
        {/* <SocialMediaIconBg><SocialMediaIcon src={twitterIcon}/></SocialMediaIconBg> */}
        {/* <SocialMediaIconBg><SocialMediaIcon src={facebookIcon}/></SocialMediaIconBg> */}
      </SocialMediaLinkContainer>
      <InputContainer>
        <StyledInput
          placeholder="Username"
          ref={loginInput}
        />
        {/* <InputIcon className="user" src={userIcon} /> */}
      </InputContainer>
      <InputContainer>
        <StyledInput
          placeholder="Password"
          ref={passwordInput}
        />
        {/* <InputIcon src={lockIcon} /> */}
      </InputContainer>
      {
        props.isSignUp ?
          <>
            <SubmitButton onClick={() => reg(loginInput.current!.value, passwordInput.current!.value)}>
              Sign Up
            </SubmitButton>
            <StyledLink to={routes.home}>
              Sign In
            </StyledLink>
          </>:
        <>
          <SubmitButton onClick={() => {
            login(loginInput.current!.value, passwordInput.current!.value);
          }
          }>Sign In</SubmitButton>
          <StyledLink to={routes.signUp}>
            Do not have account?
          </StyledLink>
        </>
      }
    </Container>
  );
});

export default LoginPanel;