import React, { useState } from 'react';
import { Avatar, AvatarSize } from 'src/ui/Avatar';
import styled from 'styled-components';
import { RoomProps, UserCache } from '../../types';
import { formMembersText } from '../../components/main-app/helper/form-text';
import Media from './Media';
import UsersList from './UsersList';

const Container = styled.div`
  width: 100%;
  padding: 30px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    max-width: 600px;
  }

  &::-webkit-scrollbar {
    display: none; 
  }

  @media screen and (max-width: 800px) {
    min-width: 100vw;
    padding: 0;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px;
  /* box-sizing: border-box; */
`;

const RoomName = styled.span`
  margin-top: 10px;
  font-weight: 600;
  font-size: ${props => props.theme.static.font.title + 'px'};
  text-align: center;

  @media screen and (max-width: 800px) {
    font-size: ${props => props.theme.static.font.subTitle + 'px'};
  }
`;

const UsersAmount = styled.span`
  margin-top: 2px;
  font-size: ${props => props.theme.static.font.small + 'px'};
`;

const DescriptionContainer = styled.div`
  margin-top: 30px;
  width: 80%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 8px;
  box-sizing: border-box;
  background-color: ${props => props.theme.static.colors.dark};

  @media screen and (max-width: 800px) {
    width: 100%;
    border-radius: 0;
  }
`;

const DescriptionTitle = styled.span`
  font-size: ${props => props.theme.static.font.small + 'px'};
  color: ${props => props.theme.personal.color};
`;

const Description = styled.span`
  font-size: ${props => props.theme.static.font.default + 'px'};
`;

const MenuContainer = styled.div`
  overflow: hidden;
  margin-top: 30px;
  /* padding: 10px 0px; */
  width: 80%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.static.colors.dark};

  @media screen and (max-width: 800px) {
    width: 100%;
    border-radius: 0;
  }
`;

const MenuOptionsWrap = styled.div`
  /* width: 100%; */
  padding: 10px;
  display: flex;
  justify-content: space-around;
`;

const MenuOption = styled.span`
  cursor: pointer;
  font-size: ${props => props.theme.static.font.default + 'px'};
  padding: 10px 0px;
  &.selected {
    color: ${props => props.theme.personal.color};
    border-bottom: 3px solid ${props => props.theme.personal.color};
  }
`;

// const variants = {
//   open: { opacity: 1, display: 'inherit'},
//   closed: { opacity: 0, display: 'none'},
// }

enum MenuOptions {
  users = 'users',
  media = 'media'
}

const menuOptionsToRus: Record<MenuOptions, string> = {
  [MenuOptions.users]: 'Участники',
  [MenuOptions.media]: 'Медиа'
}

const switchMenuElements = (option: MenuOptions, users: UserCache[], loadMedia: () => Promise<string[]>) => {
  switch(option) {
    case (MenuOptions.users): {
      return (
        <UsersList users={users}/>
      )
    }
    case (MenuOptions.media): {
      return (
        <Media loadMedia={loadMedia} />
      )
    }
  }
}

interface GroupInfoProps {
  room: RoomProps;
  loadMedia: () => Promise<string[]>
}
export const GroupInfo: React.FC<GroupInfoProps> = (props) => {
  const {room, loadMedia} = props;
  const [selectedMenuOption, setSelectedMenuOption] = useState<MenuOptions>(MenuOptions.users);

  return (
    <Container>
      <InfoContainer>
        <Avatar src={room.avatarMin} size={AvatarSize.veryBig}>{!room.avatarMin && room.name[0]}</Avatar>
        <RoomName>{room.name}</RoomName>
        <UsersAmount>{formMembersText(room.usersAmount)}</UsersAmount>
      </InfoContainer>
      {
        room.description &&
        <DescriptionContainer>
          <DescriptionTitle>описание</DescriptionTitle>
          <Description>{room.description}</Description>
        </DescriptionContainer>
      }
      <MenuContainer>
        <MenuOptionsWrap>
          {
            Object.values(MenuOptions).map((value, index) => (
              <MenuOption
                key={index}
                className={selectedMenuOption === value? 'selected': ''}
                onClick={() => setSelectedMenuOption(value)}
              >
                {menuOptionsToRus[value]}
              </MenuOption>
            ))
          }
        </MenuOptionsWrap>
          {
            switchMenuElements(selectedMenuOption, room.users, loadMedia)
          }
      </MenuContainer>
    </Container>
  )
}

export default GroupInfo;