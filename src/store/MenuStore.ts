import { action, observable } from 'mobx';
import { createContext, useContext } from 'react';

export enum MenuOptionsEnum {
  rooms,
  settings,
}

export class MenuState {
  @observable
  selectedItem: MenuOptionsEnum;

  @observable
  search: string;

  @observable
  showNav: boolean;

  @observable
  showGroupInfo: boolean;

  @observable
  showDropMenu: boolean;

  constructor() {
    this.selectedItem = MenuOptionsEnum.rooms;
    this.showNav = true;
    this.showGroupInfo = false;
    this.showDropMenu = false;
    this.search = '';
  }
}

export const menuState = createContext(new MenuState());
export const useMenuStore = () => useContext(menuState);