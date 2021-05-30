import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useMenuStore, MenuOptionsEnum } from '../../../store/MenuStore';
import ProfilePage from './profile/ProfilePage';
import { SettingsOptionsList, useSettingsStore } from '../../../store/SettingsStore';
import SettingsHeader from './SettingsHeader';
import ThemeSettings from './theme/ThemeSettings';
import { observer } from 'mobx-react-lite';
import SettingsMenu from '../../menus/SettingsMenu';

interface ContainerProps {
  show?: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${props => props.theme.static.colors.mediumBg};

  @media screen and (max-width: 800px) {
    width: 100vw;
    /* display: ${props => props.show? 'inherit': 'none'}; */
    z-index: 2;
  }
`;

export const Settings: React.FC = observer(() => {
  const settingsStore = useSettingsStore();

  // useEffect(() =>{
  //   menuStore.selectedItem = MenuOptionsEnum.settings;
  // }, []);

  const settingsContent = () => {
    switch(settingsStore.selectedSetting) {
      case SettingsOptionsList.profile: return <ProfilePage />;
      case SettingsOptionsList.theme: return <ThemeSettings />;
    }
  }
  return (
    <>
    <SettingsMenu />
    <Container>
      {
        settingsContent()
      }
    </Container>
    </>
  )
});

export default Settings;