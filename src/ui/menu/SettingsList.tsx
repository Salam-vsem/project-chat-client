import React, { useState } from 'react';
import styled from 'styled-components';
import { useAccountStore } from '../../store/Account';
import { observer } from 'mobx-react-lite';
import { useSettingsStore } from '../../store/SettingsStore';
import { SettingsOptionsList, settingNames } from '../../store/SettingsStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { Avatar, AvatarSize } from 'src/ui/Avatar';
import { UserInfo } from 'src/types';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Profile = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.selected {
    background-color: ${props => props.theme.static.colors.light};
  }
`;

// const BigUserIcon = styled.div`
//   position: relative;
//   text-align: center;
//   width: 70px;
//   height: 70px;
//   line-height: 70px;
//   border-radius: 100%;
//   background-color: ${props => props.theme.personal.bg};
//   cursor: pointer;
// `;

// const IconTitle = styled.span`
//   text-transform: uppercase;
//   font-size: ${props => props.theme.static.font.bigTitle + 'px'};
//   font-weight: 700;
// `;

// export const BigIcon = styled.div`
//   width: 70px;
//   height: 70px;
//   border-radius: 50%;
//   background: ${props => props.src? `url('${props.src}') center;`: props.theme.personal.bg};
//   line-height: 70px;
//   text-align: center;
//   font-weight: 600;
//   text-transform: uppercase;
// `;

const Name = styled.span`
  font-size: ${props => props.theme.static.font.title + 'px'};
  font-weight: 700;
  margin-top: 10px;
`;

const SettingOption = styled.div`
  width: 100%;
  padding: 10px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
  font-size: ${props => (props.theme.static.font.default * props.theme.personal.fontScale) + 'px'};
  transition: background-color 0.3s ease;
  cursor: pointer;

  @media screen and (min-width: 801px) {
    &.selected {
      background-color:${props => props.theme.static.colors.light};
    }
  }
`;

interface SettingIconProps {
  color?: string;
}
const SettingIcon = styled.div<SettingIconProps>`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 5px;
  background-color: ${props => props.color? props.color: '#EEEEEE'};
  text-align: center;
  line-height: 33px;
`;

interface SettingsListItem {
  type: SettingsOptionsList;
  color: string;
}

const settings: SettingsListItem[] = [
  {
    type: SettingsOptionsList.theme,
    color: "#1aadda"
  }
]

interface SettingsListProps {
  user?: UserInfo;
  selectedSetting?: SettingsOptionsList;
  updateSelectedSetting: (newSetting: SettingsOptionsList) => void;
}
export const SettingsList: React.FC<SettingsListProps> = observer((props) => {
  const {user, selectedSetting, updateSelectedSetting} = props;

  return (
    <>
      <Container>
        <Profile
          className={selectedSetting === SettingsOptionsList.profile? 'selected': ''}
          onClick={() => updateSelectedSetting(SettingsOptionsList.profile)}
        >
          <Avatar size={AvatarSize.big} src={user?.avatarMin}>
            {
              !(user?.avatarMin) && user?.login[0]
            }
          </Avatar>
          <Name>{user?.login}</Name>
        </Profile>
        {
          settings.map((v, index) => (
            <SettingOption
              key={index}
              onClick={() => updateSelectedSetting(v.type)}
              className={selectedSetting === v.type? 'selected': ''}
            >
              <SettingIcon color={v.color}><FontAwesomeIcon icon={faPaintBrush} /></SettingIcon>
              <span>{settingNames[v.type]}</span>
            </SettingOption>
          ))
        }
      </Container>
    </>
  );
});

export default SettingsList;