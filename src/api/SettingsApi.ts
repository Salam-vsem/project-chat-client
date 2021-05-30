import { createContext, useContext } from "react";
import axios from 'axios';
import socket from "socket.io-client";

import { UserInfo, LoginProps, ResProps, Rooms, UserThemeProps } from "../types";

interface UpdateAvatarData {
  avatar: string;
  avatarMin: string;
}

// !!!
export class SettingsApi {
  private _settingsIo: SocketIOClient.Socket;

  
  constructor() {
    this._settingsIo = socket('/settings');
  }

  updateAvatar({avatar, avatarMin}: UpdateAvatarData) {
    return new Promise<UpdateAvatarData>((res) => {
      this._settingsIo.emit('update-avatar', avatar, avatarMin, (data: UpdateAvatarData) => {
          res(data)
      });
    })
  }

  updateTheme(theme: UserThemeProps) {
    return new Promise<void>((res) => {
      this._settingsIo.emit('update-theme', theme, res)
    })
  }

  updateLogin(newLogin: string) {
    return new Promise<void>((res) => {
      this._settingsIo.emit('update-login', newLogin, res)
    })
  }
}

export const settingsContext = createContext(new SettingsApi());
export const useSettingsApi = () => useContext(settingsContext);