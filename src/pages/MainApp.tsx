import React from 'react';
import styled from 'styled-components';
import Chat from '../components/main-app/chat/Chat';
import { observer } from 'mobx-react-lite';
import { routes } from '../config/routes';
import { useHistory, Switch, Route } from 'react-router-dom';
import Settings from '../components/main-app/settings/Settings';
import CreateRoom from '../components/main-app/chat/CreateRoom';
import ChatMenu from '../components/menus/ChatMenu';
import { useAccountStore } from 'src/store/Account';

// !!! в ui наверное
const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    width: 100vw;
  }
`;
// !!! в ui
const EmptyPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.static.colors.mediumBg};

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

// !!! в components
const EmptyPage: React.FC = () => (
  <>
    <ChatMenu />
    <EmptyPageContainer>
      Выберите чат
    </EmptyPageContainer>
  </>
);

export const MainApp: React.FC = observer(() => {
  const accountStore = useAccountStore();
  const history = useHistory();

  if (!accountStore.user) {
    history.replace(routes.home);
    return null;
  }

  return (
    <Container>
      <Switch>
        <Route exact path={routes.chat} component={EmptyPage} />
        <Route path={routes.settings} component={Settings} />
        <Route path={routes.createRoom} component={CreateRoom} />
        <Route path={routes.room.path} component={Chat} />
      </Switch>
    </Container>
  )
});

export default MainApp;