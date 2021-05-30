import React from 'react';
import styled from 'styled-components';
import { useChatStore } from '../../../store/ChatStore';
import { useMenuStore } from '../../../store/MenuStore';
import { useHistory } from 'react-router';
import { routes } from '../../../config/routes';
import { RoomCache } from '../../../types';
import { observer } from 'mobx-react-lite';
import { Avatar, AvatarSize } from 'src/ui/Avatar';

const Container = styled.div`
  padding: 10px 20px;
  /* position: relative; */
  display: flex;
  align-items: center;
  user-select: none;
  background-color: transparent;
  transition: background-color 0.3s ease;

  &:hover {
    cursor: pointer;
  }

  @media screen and (min-width: 801px) {
    &.selected {
      background-color: ${props => props.theme.static.colors.light};
    }
  }
`;

interface UserAmountProps {
  usersAmount: number;
}
const UsersAmount = styled.div<UserAmountProps>`
  position: absolute;
  top: 65%;
  right: -10%;
  background-color: #222426;
  width: ${props => props.usersAmount > 10 ? 'auto': '15px'};
  height: ${props => props.usersAmount > 10 ? 'auto': '15px'};
  padding: 4px;
  border-radius: 5em;
  text-align: center;
  line-height: 15px;
  font-size: 10px;
  font-weight: 700;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Title = styled.div`
  margin: 0;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${props => (props.theme.static.font.subTitle * props.theme.personal.fontScale) + 'px'};
`;

const Description = styled.p`
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap; /* Запрещаем перенос строк */
  overflow: hidden;
  font-size: ${props => (props.theme.static.font.small * props.theme.personal.fontScale) + 'px'};
`;

const MessagesCountWrap = styled.div`
  justify-self: flex-end;
  height: 100%;
  /* box-sizing: border-box; */
  padding: 0px 0px 0px 20px;
`;

interface MessagesCountProps {
  messagesCount: number;
}
const MessagesCount = styled.div<MessagesCountProps>`
  min-width: ${props => props.messagesCount > 10 ? 'auto': '10px'};
  min-height: ${props => props.messagesCount > 10 ? 'auto': '10px'};
  border-radius: 5em;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  background-color: ${props => props.theme.personal.color};
  line-height: 1;
  white-space: nowrap;
  padding: 5px;
`;

export interface RoomComponentProps {
  currRoomId?: number
  room: RoomCache;
  onClick: (id: number) => void;
}
export const Room: React.FC<RoomComponentProps> = observer((props) => {
  const {onClick, currRoomId} = props
  const {id, name, description, usersAmount, messagesCount, avatarMin} = props.room;

  return (
    <Container className={currRoomId === id? 'selected': ''} onClick={() => onClick(id)}>
      <Avatar src={avatarMin}> 
        {!avatarMin && name[0]}
        <UsersAmount usersAmount={usersAmount}>{usersAmount}</UsersAmount>
      </Avatar>
      <Info>
        <Title>{name}</Title>
        <Description>{description}</Description>
      </Info>
      <MessagesCountWrap>
        <MessagesCount messagesCount={messagesCount}>{messagesCount}</MessagesCount>
      </MessagesCountWrap>
    </Container>
  )
});

export default Room;