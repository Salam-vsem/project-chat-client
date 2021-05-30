export interface UserInfo {
  id: number;
  isAdmin: boolean;
  login: string;
  connections: number;
  avatar?: string;
  avatarMin?: string;
  theme: UserThemeProps;
}

export interface UserThemeProps {
	color: string;
	fontScale: number;
  borderRadius: number;
	structure: MessageStructure;
}

export interface LoginProps {
  login: string;
  password: string;
}

export interface ResProps {
  user: UserInfo;
  token: string;
}

export interface RoomCache {
  id: number;
  name: string;
  description?: string;
  avatarMin?: string;
  usersAmount: number;
  messagesCount: number;
}

export interface CreateRoomProps {
  name: string;
  description?: string;
  avatar?: string;
}

export type Users = Record<string, UserCache>

export interface UserCache {
  id: number;
  name: string;
  avatar: string;
  connections: number;
}

export type Rooms = Record<string, RoomCache>;

export interface RoomProps extends RoomCache {
  users: UserCache[];
  messages: Message[];
}

export enum MessageStructure {
  block = 'block',
  default = 'default'
}

export enum MessageType {
  text = 'text',
  video = 'video',
  img = 'img',
  room_created = 'room_created',
  doc = 'doc',
  audio = 'audio',
}

export enum RoomEvent {
  join = 'join',
  leave = 'leave',
}

export interface Message {
  type: MessageType;
  userId: number;
  date: number;
  content: string;
  userLogin: string;
  userAvatarMin?: string;
  id: number;
  // delete
  // text: string;
  // userId: number;
}