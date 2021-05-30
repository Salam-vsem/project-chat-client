import { createContext } from "react";
import { useContext } from "react";
import { observable, computed, action, runInAction } from "mobx";
import { Message, MessageType, RoomEvent, RoomProps, UserCache, UserInfo } from "../types";

interface JoinEventProps {
  roomId: number;
  user: UserInfo;
}
interface LeaveEventProps {
  roomId: number;
  userId: number;
}

export class Chat {

  @observable
  private _room?: RoomProps;

  @observable
  private _selectedMessages: Message[];

  @observable
  private _loading: boolean;

  @observable
  fullScreenMediaSrc?: string;

  // @observable
  // private _rooms?: RoomDescription[];

  @computed
  get room(): RoomProps | undefined {
    return this._room;
  }

  @computed
  get selectedMessages(): Message[] {
    return this._selectedMessages;
  }

  @computed
  get loading(): boolean {
    return this._loading;
  }

  set selectedMessages(arr: Message[]) {
    this._selectedMessages = arr;
  }

  set loading(v: boolean) {
    this._loading = v;
  }

  constructor() {
    this._loading = false;
    this._selectedMessages = [];
  }

  @action
  joinRoom(room: RoomProps) {
    this._room = room;
  }

  @action
  leaveRoom() {
    this._room = undefined;
  }

  @action
  addMessage(message: Message) {
    this._room?.messages.push(message)
  }

  @action
  deleteMessages(messages: Message[]) {
    if(!this._room) {
      return;
    }
    messages.map(message => {
      const index = this._room!.messages.findIndex(v => v.id === message.id);
      this._room!.messages.splice(index, 1);
    })
  }

  @action
  onLeaveUser(roomId: number, userId: number) {
    if(this._room) {
      const index = this._room?.users.findIndex(user => user.id === userId);
      if(index !== undefined) {
        this._room.usersAmount--;
        this._room.users.splice(index, 1)
      }
    }
  }

  @action
  onJoinUser(user: UserCache, roomId: number) {
    if(this._room) {
      this._room.users.push(user);
      this._room.usersAmount++;
    }
  }

  @action
  pushMessages(messages: Message[]) {
    this._room?.messages.unshift(...messages);
  }
}

export const chatContext = createContext(new Chat());
export const useChatStore = () => useContext(chatContext);
