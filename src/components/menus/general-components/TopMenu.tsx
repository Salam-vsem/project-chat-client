import React, { useRef } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useMenuStore } from '../../../store/MenuStore';
import { routes } from '../../../config/routes';
import { useAccountStore } from '../../../store/Account';
import { Search } from 'src/ui/Search';

const Container = styled.div`
  width: 300px;
  min-height: 35px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 5px;
  box-sizing: border-box;

  @media screen and (max-width: 800px) {
    width: 100vw;
  }
`;

const CreateChannelButton = styled(FontAwesomeIcon)`
  color: ${props => props.theme.personal.color};
  font-size: ${props => props.theme.static.font.title + 'px'};
  cursor: pointer;
`;

interface TopMenuProps {
  showCreateRoomButton?: boolean;
  onUpdateSearchValue: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
export const TopMenu: React.FC<TopMenuProps> = (props) => {
  return (
    <Container>
      <Search onUpdateSearchValue={props.onUpdateSearchValue} />
      {
        props.showCreateRoomButton &&
        <Link to={routes.createRoom}><CreateChannelButton icon={faEdit} /></Link>
      }
    </Container>
  )
}

export default TopMenu;