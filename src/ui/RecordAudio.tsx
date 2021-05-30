import React, { useEffect, useRef, useState } from 'react';
import { faPaperPlane, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { useChatStore } from '../store/ChatStore';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uploadFile } from '../components/main-app/helper/helpers';
import { MessageType } from '../types';
import { MediumIcon, SendButton } from './messages/SendMessage';
const MicRecorder = require('mic-recorder-to-mp3');

const RecordingContainer = styled.div`
  width: 50px;
  text-align: center;
  line-height: 50px;
  /* background-color: ${props => props.theme.personal.color}; */
  /* border-radius: 50px; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${props => props.theme.static.font.title + 'px'};
`;

interface PulsingWaveProps {
  color: string;
}
const PulsingWave = styled.div<PulsingWaveProps>`
  position: relative;
  text-align: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${props => props.color};
  opacity: 0;
  z-index: -1;
  pointer-events: none;
  animation: Waveeffects 1.8s linear infinite;

  @keyframes Waveeffects {
    from {
      opacity: 0.8;
    }
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

const recorder = new MicRecorder({
  bitRate: 128
});

interface RecordAudioProps {
  onRecordEnd: (file: File) => void;
}
export const RecordAudio: React.FC<RecordAudioProps> = (props) => {

  const ref = useRef<HTMLButtonElement>(null)
  const [recording, setRecording] = useState(false);
  const [mouseLeave, setMouseLeave] = useState(false);

  const onMouseUp = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      return stopRecording();
    }
  }

  const onClickHandler = () => {
    if(!recording) {
      return recordStart();
    }
    if(mouseLeave) {
      return stopRecording()
    }
    return recordEnd();
  }

  const recordStart = () => {
    recorder.start().then(() => {
      setRecording(true);
    }).catch((e: any) => {
      setRecording(false);
      console.error(e);
    });
  }

  const stopRecording = () => {
    recorder.stop()
    setRecording(false)
    setMouseLeave(false)
  }

  const recordEnd = () => {
    recorder
    .stop()
    .getMp3().then(([buffer, blob]: any) => {
      // do what ever you want with buffer and blob
      // Example: Create a mp3 file and play
      const file = new File(buffer, 'audio.mp3', {
        type: blob.type,
        lastModified: Date.now()
      });
      setRecording(false);
      setMouseLeave(false);
    
      // const player = new Audio(URL.createObjectURL(file));
      // player.play();
      props.onRecordEnd(file);
      // uploadFile(
      //   file,
      //   '/upload/audio',
      //   (res) => {chatStore.sendMessage(res.audio, MessageType.audio)},
      // )
    
    }).catch((e: any) => {
      setRecording(false);
      setMouseLeave(false);
      alert('We could not retrieve your message');
    });
  }

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp)
    return () => document.removeEventListener('mouseup', onMouseUp)
  }, [ref])

  return (
    <SendButton
      ref={ref}
      onMouseLeave={() => recording && setMouseLeave(true)}
      onMouseEnter={() => setMouseLeave(false)}
      onClick={onClickHandler}
      onTouchStart={recordStart}
      onTouchEnd={recordEnd}
      onMouseDown={recordStart}
      onMouseUp={recordEnd}
    >
      {
        recording?
        <RecordingContainer>
          <Icon icon={faMicrophone} color="#fff" />
          <PulsingWave color={mouseLeave? 'red': 'deepskyblue'} />
        </RecordingContainer>:
        <MediumIcon icon={faMicrophone} />
      }
    </SendButton>
  )
}

export default RecordAudio;