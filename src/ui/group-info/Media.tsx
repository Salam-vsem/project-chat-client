import { randomInt } from 'crypto';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useChatStore } from '../../store/ChatStore';

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* height: 100%; */

  & > div::before {
    content: "";
    padding-bottom: 100%;
    display: inline-block;
    vertical-align: top;
  }
`;

interface MediaContainerProps {
  src: string;
}
const MediaContainer = styled.div<MediaContainerProps>`
  background: ${props => props.src && `url('${props.src}') center;`};
  background-size: cover;
`;

// !!! не функцией а через свойства сделать
interface MediaProps {
  loadMedia: () => Promise<string[]>
}
export const Media: React.FC<MediaProps> = (props) => {
  const [media, setMedia] = useState<string[]>([]);

  useEffect(() => {
    props.loadMedia().then(setMedia)
  }, [])

  return (
    <Container>
      {
        media.map((item, index) => {
          const file = JSON.parse(item);
          return (
            <MediaContainer
              key={index}
              src={file.src}
            >
              <img style={{display: 'none'}} src={file.src} onError={(e) => {e.currentTarget.parentElement!.style.display = 'none'}}/>
            </MediaContainer>
          )
        })
      }
    </Container>
  )
}

export default Media;