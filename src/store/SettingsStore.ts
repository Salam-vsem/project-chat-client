import { action, observable } from 'mobx';
import { createContext, useContext } from 'react';

// !!! переделать в рекорд
export enum SettingsOptionsList {
  profile = 'profile',
  // general,
  // activeSessions ,
  theme = 'theme',
  // language,
  // aboutUs,
}

type SettingName = Record<SettingsOptionsList, string>;

export const settingNames: SettingName = {
  [SettingsOptionsList.profile]: 'Профиль',
  // [SettingsOptionsList.general]: 'Общие',
  // [SettingsOptionsList.activeSessions]: 'Активные Сессии',
  [SettingsOptionsList.theme]: 'Тема',
  // [SettingsOptionsList.language]: 'Язык',
  // [SettingsOptionsList.aboutUs]: 'О нас',
}

export class SettingsStore {
  @observable
  selectedSetting?: SettingsOptionsList;

  constructor() {
    // this.selectedSetting = SettingsOptionsList.general;
  }

  @action
  updateSelectedSetting(newSetting: SettingsOptionsList | undefined) {
    this.selectedSetting = newSetting;
  }
}

export const settingsStore = createContext(new SettingsStore());
export const useSettingsStore = () => useContext(settingsStore);