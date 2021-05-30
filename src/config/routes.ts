export const routes = {
  home: '/',
  signUp: '/sign-up',
  chat: '/chat',
  settings: '/chat/settings',
  room: {
    path: '/chat/:roomId',
    url: (roomId: number) => `/chat/${roomId}`,
  },
  createRoom: '/chat/create-room'
  // setting: {
  //   path: '/chat/settings/:setting',
  //   url: (setting: string) => `/chat/settings/${setting}`
  // }
  // rooms: '/rooms',
}

export interface RoomParams {
  roomId: string;
}