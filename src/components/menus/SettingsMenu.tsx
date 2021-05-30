import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAccountStore } from 'src/store/Account';
import { useMenuStore } from 'src/store/MenuStore';
import { SettingsOptionsList, useSettingsStore } from '../../store/SettingsStore';
import { MenuContainer } from './ChatMenu';
import BottomMenu from './general-components/BottomMenu';
import TopMenu from './general-components/TopMenu';
import SettingsList from '../../ui/menu/SettingsList';

export const SettingsMenu: React.FC = () => {
  const settingsStore = useSettingsStore();
  const accountStore = useAccountStore();
  const menuStore = useMenuStore();

  const onUpdateSearchValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    menuStore.search = e.currentTarget.value;
  }

  const updateSelectedSetting = (newSetting: SettingsOptionsList) => {
    settingsStore.selectedSetting = newSetting;
  }

  return (
    <MenuContainer show={!settingsStore.selectedSetting}>
      <TopMenu
        onUpdateSearchValue={onUpdateSearchValue}
        showCreateRoomButton={accountStore.user?.isAdmin}
      />
      <SettingsList
        updateSelectedSetting={updateSelectedSetting}
        user={accountStore.user}
        selectedSetting={settingsStore.selectedSetting}
      />
      <BottomMenu />
    </MenuContainer>
  )
}

export default SettingsMenu;