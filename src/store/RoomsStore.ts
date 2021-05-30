import { createContext, useContext } from "react";
import axios from 'axios';
import socket from "socket.io-client";

import { UserInfo, LoginProps, ResProps, Rooms, UserThemeProps, RoomCache } from "../types";
import { observable, action, runInAction } from "mobx";

// !!!
export class Room {

  @observable
  private _rooms: Rooms;

  get rooms(): Rooms {
    return this._rooms;
  }
  
  constructor() {
    this._rooms = {}
  }

  @action
  auth(rooms: Rooms) {
    this._rooms = rooms;
  }

  @action
  create(room: RoomCache) {
    this._rooms[room.id.toString()] = room;
  }

  @action
  updateUsersAmount(roomId: number, usersAmount: number) {
    if(!this._rooms[roomId.toString()]) {
      return
    }
    this._rooms[roomId.toString()].usersAmount = usersAmount;
  }
}

export const roomsContext = createContext(new Room());
export const useRoomsStore = () => useContext(roomsContext);
