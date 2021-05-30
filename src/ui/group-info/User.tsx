import React from 'react';
import styled from 'styled-components';
import { UserCache, UserInfo } from '../../types';
import { Avatar } from '../Avatar';

const Container = styled.div`
  width: 100%;
  padding: 10px 20px;
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  background-color: transparent;
  transition: background-color 0.3s ease;
  box-sizing: border-box;

  &:hover {
    cursor: pointer;
  }
`;

const IconTitle = styled.span`
  text-transform: uppercase;
  font-weight: 700;
  font-size: ${props => props.theme.static.font.title + 'px'};
`;

const UserName = styled.span`
  width: 100%;
  margin-left: 10px;
  font-size: ${props => props.theme.static.font.subTitle + 'px'};
  padding: 10px 0px;
  border-bottom: 2px solid ${props => props.theme.static.colors.light};
`;

interface UserComponentProps {
  user: UserCache
}
export const User: React.FC<UserComponentProps> = (props) => {
  const {user} = props;
  return (
    <Container>
      <Avatar src={user.avatar}><IconTitle>{!user.avatar && user.name[0]}</IconTitle></Avatar>
      <UserName>{user.name}</UserName>
    </Container>
  )
}

export default User;