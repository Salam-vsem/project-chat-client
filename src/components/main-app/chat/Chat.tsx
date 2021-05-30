import React, { useRef, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { useChatStore } from '../../../store/ChatStore';
import { useAccountStore } from '../../../store/Account';
import { useChatEvent } from '../use-room-events';
import Header from './ChatHeader';
import { useMenuStore } from '../../../store/MenuStore';
import { useParams } from 'react-router-dom';
import { RoomParams } from '../../../config/routes';
import GroupInfo from '../../../ui/group-info/GroupInfo';
import ChatMenu from '../../menus/ChatMenu';
import MessageComponent from 'src/ui/messages/Message';
import SendMessage from 'src/ui/messages/SendMessage';
import { useChatApi } from 'src/api/ChatApi';
import { MessageType } from 'src/types';
import { useRoomsStore } from 'src/store/RoomsStore';
import { LoadingSpinner } from 'src/ui/LoadingSpinner';
import { FullScreenImage } from 'src/ui/FullScreenImage';

const MessagesContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;

  @media screen and (max-width: 800px) {
    min-width: 100vw;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background-color: ${props => props.theme.static.colors.mediumBg};
  position: relative;
`;

const LoadingChatContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingMessagesContainer = styled.div`
  position: absolute;
  top: 65px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 9999;
`;

const DIFF = 150;

export const Chat: React.FC = observer(() => {
  const user = useAccountStore().user;
  const chatStore = useChatStore();
  const chatApi = useChatApi();
  const accountStore = useAccountStore();
  const roomsStore = useRoomsStore();
  const menuStore = useMenuStore();
  const room = chatStore.room;
  const block = useRef<HTMLDivElement>(null);

  const roomId = Number(useParams<RoomParams>().roomId);
  const [loading, setLoading] = useState(true)

  useChatEvent();
  useEffect(() => chatApi.useMessage((message) => {
    chatStore.addMessage(message);
    scrollTop()
  }), []);

  useEffect(() => {
    if (roomId && roomId in roomsStore.rooms) {
      !loading && setLoading(true);
      chatApi.joinRoom(roomId).then((room) => {
        chatStore.joinRoom(room)
        scrollTop()
        setLoading(false);
      })
    }
    return () => {
      chatApi.leaveRoom().then(() => chatStore.leaveRoom())
    }
  }, [roomId]);


  const onChatScroll = async () => {
    if(block.current?.scrollTop && (block.current?.scrollTop <= 50)) {
      const prevScrollHeight = block.current.scrollHeight;
      if(!chatStore.room) {
        return
      }
      const offset = Math.round(chatStore.room.messages.length / 20)
      if(chatStore.loading || chatStore.room.messages[0].type === MessageType.room_created) {
        return;
      }
      chatStore.loading = true;
      const messages = await chatApi.loadMessages(
        chatStore.room.id,
        offset
      );
      chatStore.pushMessages(messages)
      block.current.scrollTop = block.current.scrollHeight - prevScrollHeight;
      chatStore.loading = false;
    }
  }

  const scrollTop = () => {
    block.current && (block.current.scrollTop = block.current.scrollHeight);
  }

  return (
    <>
      {
        chatStore.fullScreenMediaSrc &&
        <FullScreenImage
          src={chatStore.fullScreenMediaSrc}
          onClick={() => chatStore.fullScreenMediaSrc = undefined}
        />
      }
      <ChatMenu />
      <Container>
          <Header />
          {
            (menuStore.showGroupInfo && room)?
            <GroupInfo room={room} loadMedia={() => chatApi.loadMedia(chatStore.room?.id)} />:
            <>
              {
                chatStore.loading &&
                <LoadingMessagesContainer>
                  <LoadingSpinner size={20} />
                </LoadingMessagesContainer>
              }
              {
                loading &&
                <LoadingChatContainer>
                  <LoadingSpinner size={20} />
                </LoadingChatContainer>
              }
              <MessagesContainer ref={block} onScroll={onChatScroll}>
                {
                  (room && user) &&
                  room.messages.map((message, index, messages) => {
                    return (
                      <MessageComponent
                        key={index}
                        theme={user.theme.structure}
                        prevMessage={messages[index - 1]}
                        message={message}
                        userStoreId={user.id}
                        isSelected={chatStore.selectedMessages.includes(message)}
                        updateFullScreenMediaSrc={(src: string) => chatStore.fullScreenMediaSrc = src}
                        onSelect ={() => {
                          if(message.userId !== accountStore.user?.id) {
                            return
                          }
                          if(chatStore.selectedMessages.includes(message)) {
                            return chatStore.selectedMessages.splice(chatStore.selectedMessages.indexOf(message), 1)
                          }
                          chatStore.selectedMessages.push(message)
                        }}
                      />
                    );
                  })
                }
              </MessagesContainer>
              <SendMessage />
            </>
          }
        </Container>
    </>
  )
});

export default Chat;
// (index < messages.length - 1) && message.userId === messages[index + 1].userId