import React from 'react';
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchContainer = styled.div`
width: 75%;
position: relative;

@media screen and (max-width: 800px) {
  display: flex;
  justify-content: center;
}
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 5px 5px 5px 28px;
  box-sizing: border-box;
  font-size: ${props => props.theme.static.font.default + 'px'};
  border-radius: 10px;
  border: none;
  background-color: ${props => props.theme.static.colors.mediumBg};
  color: #fff;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: ${props => props.theme.static.font.default + 'px'};
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  color: #9F9F9F;
  font-size: ${props => props.theme.static.font.small + 'px'};
  position: absolute;
  top: 6px;
  left: 10px;
  z-index: 5;
`;

interface SearchProps {
  onUpdateSearchValue: (e: React.KeyboardEvent<HTMLInputElement>) => void
}
export const Search: React.FC<SearchProps> = (props) => {
  return (
    <SearchContainer>
      <SearchInput
        onKeyUp={props.onUpdateSearchValue}
        placeholder="Поиск"
        contentEditable={true}
      />
      <SearchIcon icon={faSearch} />
    </SearchContainer>
  )
}