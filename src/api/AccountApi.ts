import { createContext, useContext } from "react";
import axios from 'axios';
import socket from "socket.io-client";

import { UserInfo, LoginProps, ResProps, Rooms, CreateRoomProps, RoomCache } from "../types";

interface AuthData {
  user: UserInfo;
  rooms: Rooms;
}

export class AccountApi {
  private _sessionIo: SocketIOClient.Socket;
  
  constructor() {
    this._sessionIo = socket('/session');
  }

  auth() {
    return new Promise<AuthData>((resolve) => {
      this._sessionIo.emit('auth', resolve)
    });
  }

  registration(data: LoginProps) {
    return new Promise<UserInfo>((resolve, reject) => {
      this._sessionIo.emit('reg', data, async (data: ResProps | undefined) => {
        if (data) {
          await axios.post('/api/token', {token: data.token});
          resolve(data.user);
        }
        reject();
      });
    });
    // socket reg -> token & user
    // axios -> save token cookie
  }
  login(data: LoginProps) {
    return new Promise<UserInfo>((resolve, reject) => {
      this._sessionIo.emit('login', data, async (data: ResProps | undefined) => {
        if(data) {
          await axios.post('/api/token', {token: data.token});
          resolve(data.user);
        }
        else {
          reject();
        }
      });
    });
    // socket login -> token & user
    // axios -> save token cookie
  }
  logout() {
    return new Promise<void>(resolve => {
      this._sessionIo.emit('logout', async () => {
        await axios.post('/api/token');
        resolve();
      });
    });
    // socket logout
    // axios -> delete token cookie
  }

  createRoom(room: CreateRoomProps) {
    return new Promise<RoomCache>((res) => {
      this._sessionIo.emit('create-room', room, (newRoom: RoomCache) => {
        res(newRoom)
      })
    })
  }
  
}

export const accountContext = createContext(new AccountApi());
export const useAccountApi = () => useContext(accountContext);