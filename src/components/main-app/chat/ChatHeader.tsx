import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useChatStore } from '../../../store/ChatStore';
import { useMenuStore } from '../../../store/MenuStore';
import { formDeleteMessagesText, formMembersText } from '../helper/form-text';
import { routes } from '../../../config/routes';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Avatar, AvatarSize } from '../../../ui/Avatar';
import { ChatApi, useChatApi } from 'src/api/ChatApi';
import { useRoomsStore } from 'src/store/RoomsStore';

interface ContainerProps {
  groupInfo?: boolean;
}
const Container = styled.header<ContainerProps>`
  position: relative;
  width: 100%;
  min-height: 55px;
  background-color: ${props => props.theme.static.colors.dark};
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: ${props => props.groupInfo? 'center': 'flex-start'};

  @media screen and (max-width: 800px) {
    justify-content: center;
    position: relative;
  }
`;

const ContainerWrap = styled.div`
  position: relative;
`;

const RoomAvatar = styled(Avatar)`
  margin-left: 10px;
  @media screen and (max-width: 800px) {
    margin-left: 0px;
    position: absolute;
    right: 5px
  }
`;

const Info = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  margin-left: 8px;

  @media screen and (max-width: 800px) {
    box-sizing: border-box;
    max-width: 65%;
    /* margin-left: 50px; */
    /* margin-right: 50px; */
    text-align: center;
  }
`;

const Title = styled.span`
  margin: 0;
  font-weight: 700;
  font-size: ${props => props.theme.static.font.subTitle + 'px'};
  text-overflow: ellipsis;
  white-space: nowrap; /* Запрещаем перенос строк */
  overflow: hidden;

  @media screen and (max-width: 800px) {
    font-size: ${props => props.theme.static.font.default + 'px'};
  }
`;

const Description = styled.span`
  margin: 0;
  font-size: ${props =>  props.theme.static.font.small + 'px'};
`;

export const ExitIcon = styled(FontAwesomeIcon)`
  color: ${props =>  props.theme.personal.color};
  font-size: ${props => props.theme.static.font.bigTitle + 'px'};
  /* margin-right: 5px; */
`;

interface ExitProps {
  show?: boolean
}
export const Exit = styled.button<ExitProps>`
  background: transparent;
  padding: 0;
  border: none;
  outline: none;
  transition: 0.3s ease;
  opacity: 1;
  display: ${props => props.show? 'flex': 'none'};
  align-items: center;
  color: ${props =>  props.theme.personal.color};
  font-size: ${props => props.theme.static.font.default + 'px'};
  /* font-weight: 600; */
  cursor: pointer;
  position: absolute;
  left: 5px;

  @media screen and (max-width: 800px) {
    display: inherit;
  }
`;

const EditMessageMenu = styled.div`
  width: 100%;
  padding: 10px;
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${props => props.theme.static.colors.light};
  z-index: 5;
`;

const Delete = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: ${props => (props.theme.static.font.subTitle * props.theme.personal.fontScale) + 'px'};
`;

const GroupInfoTitle = styled.span`
  font-weight: 600;
`;

export const Header: React.FC = observer(() => {
  const chatStore = useChatStore();
  const roomsStore = useRoomsStore();
  const chatApi = useChatApi();
  const menuStore = useMenuStore();
  const history = useHistory();

  const leaveRoom = async () => {
    roomsStore.updateUsersAmount(chatStore.room!.id, chatStore.room!.usersAmount-1)
    history.push(routes.chat);
  }

  if(!chatStore.room) {
    return (
      <Container />
    )
  }

  if(menuStore.showGroupInfo) {
    return (
      <Container groupInfo={true}>
        <Exit show={true} onClick={() => menuStore.showGroupInfo = false}><ExitIcon icon={faChevronLeft} /></Exit>
        <GroupInfoTitle>Информация</GroupInfoTitle>
      </Container>
    )
  }

  // !!! переверстать эту хрень
  return (
    <ContainerWrap>
      <Container onClick={() => menuStore.showGroupInfo = true} style={{cursor: 'pointer'}}>
        <Exit onClick={async () => await leaveRoom()}><ExitIcon icon={faChevronLeft} />Chats</Exit>
        <RoomAvatar src={chatStore.room.avatarMin} size={AvatarSize.small}>{!chatStore.room.avatarMin && chatStore.room.name[0]}</RoomAvatar>
        <Info>
          <Title>{chatStore.room.name}</Title>
          <Description>{formMembersText(roomsStore.rooms[chatStore.room.id].usersAmount)}</Description>
        </Info>
      </Container>
      {
        chatStore.selectedMessages.length > 0 &&
        <EditMessageMenu>
          <Delete icon={faTrash} onClick={async() => {
            const res = window.confirm(
                `Вы действительно хотите удалить ` + 
                `${formDeleteMessagesText(chatStore.selectedMessages.length)}?`
              )
            if(res) {
              chatApi.deleteMessages(chatStore.selectedMessages)
            }
            return chatStore.selectedMessages = [];
          }} />
        </EditMessageMenu>
      }
    </ContainerWrap>
  )
});

export default Header;