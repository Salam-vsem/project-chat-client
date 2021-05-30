import { createContext, useContext } from "react";
import axios from 'axios';
import socket from "socket.io-client";

import { UserInfo, LoginProps, ResProps, Rooms, UserThemeProps, RoomCache } from "../types";
import { observable, action, runInAction } from "mobx";

// !!!
export class Account {
  @observable
  private _user?: UserInfo // !!! create UserInfo
  
  get user(): Readonly<UserInfo> | undefined {
    return this._user;
  }

  // @observable
  // private _rooms: Rooms;

  // get rooms(): Rooms {
  //   return this._rooms;
  // }
  
  constructor() {
    // this._rooms = {}
  }

  @action
  auth(user: UserInfo) {
    this._user = user;
    // this._rooms = rooms;
  }

  @action
  login(user: UserInfo) {
    console.log(user)
    this._user = user;
  }

  @action
  logout() {
    this._user = undefined;
  }

  @action
  updateLogin(login: string) {
    this._user && (this._user.login = login);
  }

  @action
  updateAvatar(avatar: string, avatarMin: string) {
    if(!this._user) {
      return;
    }
    this._user.avatar = avatar;
    this._user.avatarMin = avatarMin;
  }

  @action
  updateTheme(theme: UserThemeProps) {
    if(!this._user) {
      return
    }
    this._user.theme = theme;
  }
}

export const accountContext = createContext(new Account());
export const useAccountStore = () => useContext(accountContext);
