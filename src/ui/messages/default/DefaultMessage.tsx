import { faFile } from '@fortawesome/free-solid-svg-icons';
import ReactAudioPlayer from 'react-audio-player';
import React from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Message, MessageType } from '../../../types';
import { formMessageDateText, parseMessageText } from '../../../components/main-app/helper/form-text';
import { calcShowAvatar, downloadFile } from '../../../components/main-app/helper/helpers';
import { SelectContainer } from '../block/BlockMessage';
import { DocumentIcon, DocumentInfoWrap, DocumentTitle, DocumentInfo, VideoWrap, RoomCreatedMessage } from '../block/BlockMessagesComponents';
import { MessageProps } from '../types';
import UserAvatar from '../UserAvatar';

const Container = styled.div`
  width: 100%;
  margin: 5px 0px;
  padding: 5px 20px;
  display: flex;
  box-sizing: border-box;
  font-size: ${props => props.theme.static.font.default * props.theme.personal.fontScale + 'px'};
  position: relative;

  &.selected {
    background-color: ${props => props.theme.static.colors.hover};
  }
`;

// const MessageItemsWrap = styled.`
//   z-index: 3;
// `;

export const MessageContentWrap = styled.div`
  max-width: 70%;
  display: flex;
  flex-direction: column;
  align-self: center;
  z-index: 3;
  /* font-size: ${props => props.theme.static.font.default * props.theme.personal.fontScale + 'px'}; */
`;

export const IconContainer = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  align-items: flex-start;
  margin-right: 12px;
  z-index: 3;
`;

export const UserLogin = styled.span`
  margin-bottom: 5px;
  font-weight: 700;
  color: ${props => props.theme.personal.color}; //!!! цвет брать из темы автора сообщения
`;

const DateWrap = styled.span`
  font-size: ${props => (props.theme.static.font.verySmall * props.theme.personal.fontScale) + 'px'};
  color: #A5B7C9;
  margin-left: auto;
  font-style: italic;
`;

const switchMessageType = (message: Message, updateFullScreenMediaSrc: (src: string) => void) => {
  switch (message.type) {
    case MessageType.text: {
      return TextMessage(message);
    }
    case MessageType.img: {
      return ImgMessage(message, updateFullScreenMediaSrc);
    }
    case MessageType.video: {
      return VideoMessage(message);
    }
    case MessageType.doc: {
      return DocumentMessage(message);
    }
    case MessageType.audio: {
      return AudioMessage(message);
    }
  }
}

interface ImageProps {
  ratio: number;
}
const StyledImage = styled(LazyLoadImage)`
  border-radius: 8px;
  max-width: 400px;
  max-height: 400px;
  object-fit: contain;
  cursor: pointer;
  @media screen and (max-width: 800px) {
    width: 100%;
    height: auto;
  }
`;

const MAX_SIZE = 400;
const ImgMessage = (message: Message, updateFullScreenMediaSrc: (src: string) => void): JSX.Element => {
  const file = JSON.parse(message.content);
  return (
      <StyledImage
        onClick={() => updateFullScreenMediaSrc(file.src)}
        width={MAX_SIZE * file.ratio}
        height={MAX_SIZE / file.ratio}
        src={file.src}
      />
  )
}

const MessageTextWrap = styled.span`
  font-size: ${props => (props.theme.static.font.default * props.theme.personal.fontScale) + 'px'};
`;
const TextMessage = (message: Message): JSX.Element => (
  <MessageTextWrap>
    {parseMessageText(message.content)}
  </MessageTextWrap>
)

const VideoMessage = (message: Message): JSX.Element => {
  const file = JSON.parse(message.content);
  return (
    <VideoWrap
      width={MAX_SIZE * file.ratio}
      height={MAX_SIZE / file.ratio}
      src={file.src}
      controls={true}
    />
  )
}

const DocumentMessageContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DocumentMessage = (message: Message): JSX.Element => {
  const file = JSON.parse(message.content);
  return (
    <DocumentMessageContainer>
      <DocumentIcon icon={faFile} />
      <DocumentInfoWrap>
        <DocumentTitle
          onClick={() => {
            downloadFile(file.path, file.name, (e) => {})
          }}
        >
          {file.name}
        </DocumentTitle>
        <div>
          <DocumentInfo>size - {(file.size / 10000).toFixed(2)}KB</DocumentInfo> 
        </div>
      </DocumentInfoWrap>
    </DocumentMessageContainer>
  )
}

export const StyledPlayer = styled(ReactAudioPlayer)`
  height: 30px;
  max-width: 100%;
  &:focus {
    outline: none;
  }
`;

const AudioMessage = (message: Message): JSX.Element => {
  return (
    <StyledPlayer src={message.content} controls />
  )
}

export const DefaultMessage: React.FC<MessageProps> = (props) => {
  const {message, prevMessage, isSelected, onSelect, updateFullScreenMediaSrc} = props;
  const showAvatar = calcShowAvatar(message, prevMessage);

  if(message.type === MessageType.room_created) {
    return RoomCreatedMessage(message);
  }

  return (
    <Container
      className={isSelected? 'selected': ''}
    >
      <IconContainer>
        {
          showAvatar &&
          <UserAvatar
            firstLoginChar={message.userLogin[0]}
            avatarSrc={message.userAvatarMin}
          />
        }
      </IconContainer>
      <MessageContentWrap>
        {
          showAvatar &&
          <UserLogin>{message.userLogin}</UserLogin>
        }
        {switchMessageType(message, updateFullScreenMediaSrc)}
      </MessageContentWrap>
      <DateWrap>{formMessageDateText(message.date)}</DateWrap>
      <SelectContainer className={isSelected? 'selected': ''} onClick={onSelect} />
    </Container>
  )
}

export default DefaultMessage;