import { useEffect } from "react";
import { ChatApi, useChatApi } from "src/api/ChatApi";
import { useRoomsStore } from "src/store/RoomsStore";
import { useAccountStore } from "../../store/Account";
import { useChatStore } from "../../store/ChatStore";

export const useChatEvent = () => {
  const chatStore = useChatStore();
  const chatApi = useChatApi();
  const roomsStore = useRoomsStore();
  useEffect(() => chatApi.useUserJoin((user, roomId) => chatStore.onJoinUser(user, roomId)), []);
  useEffect(() => chatApi.useUserLeave((roomId, userId) => chatStore.onLeaveUser(roomId, userId)), []);
  useEffect(() => chatApi.useDeleteMessages((messages) => chatStore.deleteMessages(messages)), []);
  useEffect(() => chatApi.useRoomsUpdate((roomId, usersAmount) => roomsStore.updateUsersAmount(roomId, usersAmount)), []);
}

// export const useAppEvent = () => {
//   const chatApi = useChatApi();
//   const accountStore = useAccountStore();

//   useEffect(() => chatApi.useRoomsUpdate((roomId, usersAmount) => accountStore.updateRoomsUsersAmount(roomId, usersAmount)), [])
// }

// export const useRoomEvent = () => {
//   const accountStore = useAccountStore();
//   useEffect(() => accountStore.useRoomEvent(), []);
// }

// export const useMessageEvent = () => {
//   const chatStore = useChatStore();
//   useEffect(() => chatStore.useMessage(), []);
// }

// export const useUpdateAvatarEvent = () => {
//   const accountStore = useUserStore();
//   useEffect(() => accountStore.onUpdateAvatar(), []);
// }
