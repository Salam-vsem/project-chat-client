import React from 'react';
import styled from 'styled-components';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { downloadFile, formImageMessageBorder, formMessageBorder } from 'src/components/main-app/helper/helpers';
import { Message, MessageType } from 'src/types';
import { formMessageDateText, parseMessageText } from 'src/components/main-app/helper/form-text';
import { StyledPlayer } from 'src/ui/messages/default/DefaultMessage';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const TextMessageWrap = styled.div`
  z-index: 3;
  min-width: 50px;
	background-color: ${props => props.theme.static.colors.message};
	border-radius: ${props => formMessageBorder(props.theme.personal.borderRadius)};
  align-self: flex-start;
  display: inline-flex;
  align-items: flex-end;
  max-width: 40vw;
  padding: 5px;

  &.own {
    border-radius: ${props => formMessageBorder(props.theme.personal.borderRadius, true)};
    align-self: flex-end;
    background-color: ${props => props.theme.personal.color};
  }

  @media screen and (max-width: 800px) {
    max-width: 80vw;
  }
`;

const ImgMessageWrap = styled(TextMessageWrap)`
  padding: 0;
  flex-direction: column;
  max-width: 400px;

  @media screen and (max-width: 800px) {
    max-width: 75vw;
  }
`;

const VideoMessageWrap = styled(ImgMessageWrap)`
  overflow-x: hidden;
`;

const TextMessageDateContainer = styled.div`
  font-size: ${props => (props.theme.personal.fontScale * props.theme.static.font.verySmall) + 'px'};
  font-style: italic;
  height: 100%;
  text-align: end;
  margin-right: 8px;
  /* margin-bottom: 5px; */
  &.own {
    margin-right: 4px;
    margin-bottom: 2px;
    align-self: flex-end;
  }
`;

const ImgMessageDateContainer = styled(TextMessageDateContainer)`
  margin: 0;
  padding: 3px 0px;
  margin-right: 10px;

  &.own {
    margin: 0;
    margin-right: 6px;
    align-self: flex-end;
  }
`;

const MessageImg = styled(LazyLoadImage)`
  border-radius: ${props => formImageMessageBorder(props.theme.personal.borderRadius)};
  max-width: 400px;
  max-height: 400px;
  object-fit: cover;
  cursor: pointer;

  @media screen and (max-width: 800px) {
    max-width: 75vw;
    height: auto;
  }
`;

const MessageTextWrap = styled.span`
  padding: 5px 10px 5px 5px;
  font-size: ${props => (props.theme.static.font.default * props.theme.personal.fontScale) + 'px'};
`;


const DocumentsMessageWrap = styled(TextMessageWrap)``;

const DocumentIconContainer = styled.div`
  padding: 5px 10px 5px 5px;
  display: flex;
  align-items: center;
`;

export const DocumentInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const DocumentTitle = styled.a`
  font-size: ${props => (props.theme.static.font.small * props.theme.personal.fontScale) + 'px'};
  font-weight: 700;
  padding: 0;
  text-align: left;
  cursor: pointer;
`;

export const DocumentInfo = styled.span`
  font-size: ${props => (props.theme.static.font.small * props.theme.personal.fontScale) + 'px'};
`;

export const DocumentIcon = styled(FontAwesomeIcon)`
  font-size: ${props => (props.theme.static.font.bigTitle * props.theme.personal.fontScale) + 'px'};
`;

export const VideoWrap = styled.video`
  max-width: 400px;
  max-height: 400px;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 800px) {
    max-width: 100%;
  }
`;

const AudoMessageWrap = styled(TextMessageWrap)`
  background: transparent;
  &.own {
    background: transparent;
  }
`;

const RoomCreatedMessageWrap = styled.div`
  width: 100%;
  text-align: center;
  vertical-align: middle;
  padding: 10px 0px 0px 0px;
  font-size: ${props => props.theme.static.font.small + 'px'};
  font-weight: 600;
`

export const RoomCreatedMessage = (message: Message): JSX.Element => (
  <RoomCreatedMessageWrap>
    <span>room was created</span>
  </RoomCreatedMessageWrap>
)

export const BlockTextMessage = (message: Message, own: boolean): JSX.Element => {
  return (
    <TextMessageWrap className={(own? 'own ': '')}>
        <MessageTextWrap>
          {parseMessageText(message.content)}
        </MessageTextWrap>
      <TextMessageDateContainer className={own? 'own ': ''}>{formMessageDateText(message.date)}</TextMessageDateContainer>
    </TextMessageWrap>
  )
}

const MAX_SIZE = 400;
export const BlockImageMessage = (message: Message, own: boolean, updateFullScreenMediaSrc: (src: string) => void): JSX.Element => {
  const file = JSON.parse(message.content);
  return (
    <ImgMessageWrap className={(own? 'own ': '')}>
      <MessageImg
        onClick={() => updateFullScreenMediaSrc(file.src)}
        width={MAX_SIZE * file.ratio}
        height={MAX_SIZE / file.ratio}
        src={file.src}
      />
      <ImgMessageDateContainer className={own? 'own ': ''}>{formMessageDateText(message.date)}</ImgMessageDateContainer>
    </ImgMessageWrap>
  )
}

export const BlockVideoMessage = (message: Message, own: boolean): JSX.Element => {
  const file = JSON.parse(message.content);
  return (
    <VideoMessageWrap className={(own? 'own ': '')}>
      <VideoWrap
        width={MAX_SIZE * file.ratio}
        height={MAX_SIZE / file.ratio}
        src={file.src}
        controls={true}
       />
      <ImgMessageDateContainer className={own? 'own ': ''}>{formMessageDateText(message.date)}</ImgMessageDateContainer>
    </VideoMessageWrap>
  )
}

export const BlockDocumentMessage = (message: Message, own: boolean): JSX.Element => {
  const file = JSON.parse(message.content);
  return (
    <DocumentsMessageWrap className={(own? 'own ': '')}>
      <DocumentIconContainer>
        <DocumentIcon
          icon={faFile}
      />
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
      </DocumentIconContainer>
      <ImgMessageDateContainer className={own? 'own ': ''}>{formMessageDateText(message.date)}</ImgMessageDateContainer>
    </DocumentsMessageWrap>
  )
}

const AudioMessage = (message: Message, own: boolean): JSX.Element => {
  return (
    <AudoMessageWrap className={(own? 'own ': '')}>
      <StyledPlayer src={message.content} controls />
    </AudoMessageWrap>
  )
}

export const switchBlockMessage = (message: Message, own: boolean, updateFullScreenMediaSrc: (src: string) => void) => {
  switch(message.type) {
    case (MessageType.text): {
      return BlockTextMessage(message, own);
    }
    case (MessageType.img): {
      return BlockImageMessage(message, own, updateFullScreenMediaSrc);
    }
    case (MessageType.video): {
      return BlockVideoMessage(message, own);
    }
    case (MessageType.doc): {
      return BlockDocumentMessage(message, own);
    }
    case (MessageType.audio): {
      return AudioMessage(message, own);
    }
    default: {
      return (
        <>
          Error
        </>
      )
    }
  }
}