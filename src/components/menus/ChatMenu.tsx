import { observer } from 'mobx-react-lite';
import React from 'react';
import { useHistory } from 'react-router';
import { routes } from 'src/config/routes';
import { useAccountStore } from 'src/store/Account';
import { useMenuStore } from 'src/store/MenuStore';
import { useRoomsStore } from 'src/store/RoomsStore';
import RoomsList from 'src/ui/menu/room/RoomsList';
import styled from 'styled-components';
import { useChatStore } from '../../store/ChatStore';
import BottomMenu from './general-components/BottomMenu';
import TopMenu from './general-components/TopMenu';

export interface ContainerProps {
  show: boolean;
}

export const MenuContainer = styled.div<ContainerProps>`
  position: relative;
  min-width: 300px;
  max-width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.static.colors.dark};

  @media screen and (max-width: 800px) {
    position: absolute;
    top: 0;
    min-width: 100vw;
    height: 100%;
    box-sizing: border-box;
    display: ${props => props.show? 'inherit': 'none'};
    z-index: 3;
  }
`;

export const ChatMenu: React.FC = observer(() => {
  const chatStore = useChatStore();
  const accountStore = useAccountStore();
  const roomsStore = useRoomsStore();
  const menuStore = useMenuStore();
  const history = useHistory();

  const onRoomSelect = (roomId: number) => {
    history.push(routes.room.url(roomId));
    menuStore.showGroupInfo = false;
  }

  const onUpdateSearchValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    menuStore.search = e.currentTarget.value;
  }

  return (
    <MenuContainer show={!chatStore.room}>
      <TopMenu
        onUpdateSearchValue={onUpdateSearchValue}
        showCreateRoomButton={accountStore.user?.isAdmin}
      />
      <RoomsList
        searchValue={menuStore.search}
        rooms={roomsStore.rooms}
        currRoomId={chatStore.room?.id}
        onRoomSelect={onRoomSelect}
      />
      <BottomMenu />
    </MenuContainer>
  )
});

export default ChatMenu;