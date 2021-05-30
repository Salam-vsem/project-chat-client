import React, { useState } from 'react';
import styled from 'styled-components';
import { faPaperclip, faImages, faFile, faVideo } from '@fortawesome/free-solid-svg-icons';
import OutsideAlerter from '../../components/main-app/helper/OutsideAlerter';
import { Message, MessageType } from '../../types';
import  UploadItem from './UploadItem';
import { MediumIcon } from '../messages/SendMessage';

const AttachIconContainer = styled.div`
  width: 60px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media screen and (max-width: 800px) {
    width: 95vw;
    /* inset: auto auto 50px 0px; */
  }
`;

const DropMenu = styled.ul`
  position: absolute;
  list-style-type: none;
  inset: auto auto 50px 15px;
  z-index: 1035;
  width: 140px;
  background-color: ${props => props.theme.static.colors.light};
  border-radius: 4px;
  padding: 5px 0px;

  @media screen and (max-width: 800px) {
    width: 95%;
    inset: auto auto 50px auto;
    left: 2.5%;
    /* margin-left: -42.5%; */
  }
`;

const AttachButton = styled.div`
  width: 40px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media screen and (max-width: 800px) {
    position: inherit;
  }
`;

const items: UploadItem[] = [
  {
    type: MessageType.img,
    label: 'Фото',
    path: '/upload/images',
    icon: faImages,
    accept: "image/x-png,image/gif,image/jpeg",
    multiple: true
  },
  {
    type: MessageType.video,
    label: 'Видео',
    path: '/upload/video',
    icon: faVideo,
    accept: "video/mp4,video/x-m4v,video/*",
  },
  {
    type: MessageType.doc,
    label: 'Документы',
    path: '/upload/documents',
    icon: faFile,
    accept: ".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf",
    multiple: true,
    last: true,
  },
]

interface UploadSelectorProps {
  onSendMessages: (image: string, type: MessageType) => void;
}
export const UploadSelector: React.FC<UploadSelectorProps> = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOutside = () => {
    setOpen(false);
  }

  const upload = (messages: string[], type: MessageType) => {
    setOpen(false);
    switch(type) {
      case MessageType.img: {
        return (
          messages.forEach(message => {
            const image = new Image();
            image.onload = () => {
              props.onSendMessages(JSON.stringify({src: message, ratio: image.width / image.height}), type)
            };
            image.src = message;
          })
        )
      }
      case MessageType.video: {
        return (
          messages.forEach(message => {
            const video = document.createElement('video')
            video.onloadedmetadata = () => {
              props.onSendMessages(JSON.stringify({src: message, ratio: video.videoWidth / video.videoHeight}), type)
            }
            video.src = message;
          })
        )
      }
      default: {
        return (
          messages.forEach(message => {
            props.onSendMessages(message, type)
          })
        )
      }
    }
  }

  return (
    <OutsideAlerter handleClickOutside={handleClickOutside}>
      <AttachButton>
        <MediumIcon onClick={() => setOpen(!open)} icon={faPaperclip} size="1x" />
        {
          open &&
          <DropMenu>
            {
              items.map((item, index) => (
                <UploadItem
                  key={index}
                  uploadFunc={(res) => upload(res, item.type)}
                  item={item}               
                />
              ))
            }
          </DropMenu>
        }
      </AttachButton>
    </OutsideAlerter>
  )
}

export default UploadSelector;