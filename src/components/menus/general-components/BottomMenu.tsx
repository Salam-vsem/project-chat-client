import React, { useEffect } from 'react';
import styled from 'styled-components';
import { faSignOutAlt, faComments, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react-lite';
import { useChatStore } from '../../../store/ChatStore';
import { useAccountStore } from '../../../store/Account';
import { useHistory, useLocation } from 'react-router';
import { routes } from '../../../config/routes';
import { MenuOptionsEnum, useMenuStore } from '../../../store/MenuStore';
import { useAccountApi } from 'src/api/AccountApi';
import { useChatApi } from 'src/api/ChatApi';

const Container = styled.div`
  justify-self: flex-end;
  min-height: 35px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

interface IconProps {
  selected?: boolean;
}
const BigIcon = styled(FontAwesomeIcon)<IconProps>`
  color: ${props => props.selected? props.theme.personal.color: '#fff'};
  cursor: pointer;
  font-size: ${props => props.theme.static.font.bigTitle + 'px'};
`;


export const BottomMenu: React.FC = observer(() => {
  const chatApi = useChatApi();
  const chatStore = useChatStore();
  const accountStore = useAccountStore();
  const accountApi = useAccountApi();
  const history = useHistory();
  const props = useLocation();

  const logout = async() => {
    if (chatStore.room) {
      await chatApi.leaveRoom()
    }
    await accountApi.logout();
    accountStore.logout();
    history.push(routes.home);
  }

  return (
    <Container>
      <BigIcon
        icon={faSignOutAlt}
        onClick={logout}
      />
      <BigIcon
        icon={faComments}
        selected={props.pathname === routes.chat || !!chatStore.room}
        onClick={() => history.push(routes.chat)}
      />
      <BigIcon
        icon={faCog}
        selected={props.pathname === routes.settings}
        onClick={() => history.push(routes.settings)}
      />
    </Container>
  )
});

export default BottomMenu;