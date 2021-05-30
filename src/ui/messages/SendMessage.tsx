import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmojiPicker from './EmojiPicker';
import MessageInput from './MessageInput';
import { IEmojiData } from 'emoji-picker-react';
import { useChatStore } from 'src/store/ChatStore';
import { MessageType } from 'src/types';
import { uploadFile } from 'src/components/main-app/helper/helpers';
import UploadSelector from '../upload/UploadSelector';
import RecordAudio from '../RecordAudio';
import { useChatApi } from 'src/api/ChatApi';

const Container = styled.div`
  min-width: 100%;
  min-height: 55px;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  background-color: ${props => props.theme.static.colors.dark};
`;

interface MediumIconProps {
  color?: string
}
export const MediumIcon = styled(FontAwesomeIcon)<MediumIconProps>`
  cursor: pointer;
  color: ${props => props.color ? props.color : props.theme.personal.color};
  font-size: ${props => props.theme.static.font.title + 'px'};
`;

const ButtonContainer = styled.div`
  width: 60px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media screen and (max-width: 800px) {
    position: inherit;
  }
`;

export const SendButton = styled.button`
  background: transparent;
  position: relative;
  border: none;
  outline: none;
  /* transform: scale(0); */
  /* opacity: 0; */
  transition: opacity 0.3s;
  /* transition: transform 0.3s ease; */

  &.show {
    cursor: pointer;
    opacity: 1;
    /* transform: scale(1); */
  }
`;

// !!! пробрасывать стор или нет?
// interface SendMessageProps {
//   chatStore: Chat;
// }

export const SendMessage: React.FC = () => {
  const chatStore = useChatStore();
  const chatApi = useChatApi();
  const input = useRef<HTMLDivElement>(null);

  const [showSendButton, setShowSendButton] = useState('');
  
  const send = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const message = e.currentTarget.innerText.trim();
    if(message !== '') {
      chatApi.sendMessage(message, MessageType.text);
      e.currentTarget.innerText = '';
    }
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if(e.key === 'Enter' && !e.ctrlKey) {
      send(e);
      e.currentTarget!.innerText = '';
      e.preventDefault();
    }
    if(e.key === 'Enter' && e.ctrlKey) {
      const brNode = document.createElement('br');
      const range = window.getSelection()?.getRangeAt(0);
      range!.deleteContents();
      range!.insertNode(brNode);
      range!.collapse();
    }
  }

  const updateShowSendButtonState = (e: React.KeyboardEvent<HTMLDivElement>) => {
    (e.currentTarget!.innerText === '')?
    setShowSendButton(''):
    setShowSendButton('show');
  }

  const onEmojiClick = (event: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => {
    input.current!.insertAdjacentText('beforeend', emojiObject.emoji)
  }

  const onRecordEnd = (file: File) => (
    uploadFile(
      file,
      '/upload/audio',
      (res) => {chatApi.sendMessage(res[0], MessageType.audio)},
    )
  )

  // перенести StyledMessageInput в отедльный ui компонент
  return (
    <Container>
      <UploadSelector onSendMessages={(text, type) => chatApi.sendMessage(text, type)} />
      <MessageInput
        placeholder="Type message here..."
        editable={!!chatStore.room}
        onKeyCapture={updateShowSendButtonState}
        onKeyPress={onKeyPress}
        ref={input}
      />
      <EmojiPicker onEmojiClick={onEmojiClick} />
      <ButtonContainer>
        {
          showSendButton?
          <SendButton>
            <MediumIcon icon={faPaperPlane}/>
          </SendButton>:
          <RecordAudio onRecordEnd={onRecordEnd} />
        }
      </ButtonContainer>
    </Container>
  )
}

export default SendMessage;