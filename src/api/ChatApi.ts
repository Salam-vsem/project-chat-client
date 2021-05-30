import { createContext, useContext } from "react";
import socket from "socket.io-client";

import { RoomProps, MessageType, Message, UserCache, CreateRoomProps, RoomCache } from "../types";

export class ChatApi {
  private _io: SocketIOClient.Socket;
  
  constructor() {
    this._io = socket('/chat');
  }

  joinRoom(id: number) {
    return new Promise<RoomProps>(resolve => {
      this._io.emit('join', id, (result: RoomProps) => {
        resolve(result);
      });
    });
  }

  leaveRoom() {
    return new Promise<void>((resolve, reject) => {
      this._io.emit('leave-room', (successful?: true) => {
        if(successful) {
          resolve();
        }
        reject();
      });
    });
  }

  sendMessage(text: string, type: MessageType) {
    this._io.emit('message', text, type);
  }

  useMessage(onMessages: (message: Message) => void) {
    const action = (message: Message) => {
      onMessages(message);
    };
    this._io.on('message', action);
    return () => {
      this._io.off('message', action);
    };
  }

  deleteMessages(selectedMessages: Message[]) {
    return new Promise<void>((resolve, reject) => {
      this._io.emit('delete-messages', selectedMessages, () => {
        resolve()
      })
    })
  }

  useUserLeave(onUserLeave: (roomId: number, userId: number) => void) {
    const action = async (roomId: number, userId: number) => {
      onUserLeave(roomId, userId)
    }
    this._io.on('leave-room', action);
    return () => {
      this._io.off('leave-room', action);
    }
  }

  useUserJoin(onUserJoin: (user: UserCache, roomId: number) => void) {
    const action = async (user: UserCache, roomId: number) => {
      onUserJoin(user, roomId);
    }
    this._io.on('join-room', action);
    return () => {
      this._io.off('join-room', action);
    }
  }

  useDeleteMessages(onDelete: (messages: Message[]) => void) {
    const action = async (messages: Message[]) => {
      onDelete(messages);
    }
    this._io.on('delete-messages', action);
    return () => {
      this._io.off('delete-messages', action);
    }
  }

  loadMessages(roomId: number, offset: number) {
    return new Promise<Message[]>((res) => {
      this._io.emit('load-messages', roomId, offset, (messages: Message[]) => {
        res(messages);
      })
    })
  }

  loadMedia(roomId?: number) {
    return new Promise<string[]>((res) => {
      if(!roomId) {
        return;
      }
      this._io.emit('load-media', roomId, (media: string[]) => {
        res(media)
      })
    })
  }

  // !!! перенести в RoomsApi
  useRoomsUpdate(onRoomsUpdate: (roomId: number, usersAmount: number) => void) {
    const action = async (roomId: number, usersAmount: number) => {
      onRoomsUpdate(roomId, usersAmount);
    }
    this._io.on('menu-update-room', action);
    return () => {
      this._io.off('menu-update-room', action);
    }
  }
}

export const chatContext = createContext(new ChatApi());
export const useChatApi = () => useContext(chatContext);