import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Stage, Layer, Circle, Transformer, Group, Rect, Shape } from 'react-konva';
import Konva from 'konva';
import { dragBoundFunc, boundBoxFunc } from '../../components/main-app/settings/profile/helper/image-edit';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledImg = styled.img`
  /* height: 70vh; */
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
  /* object-fit: cover; */

  /* @media screen and (max-width: 800px) {
    max-width: 90vw;
    max-height: 90vh;
  } */
`;

const StyledStage = styled(Stage)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;

//!!! theme
const BottomMenu = styled.div`
  width: 20vw;
  height: 50px;
  /* padding: 10px; */
  min-width: 200px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  background-color: #1A1B1D;
`;

const BottomMenuOptions = styled.div`
  height: 100%;
  width: 100%;
  /* background-color: #FF9403; */
  box-sizing: border-box;
  border-width: 0px 1px;
  border-style: solid;
  /* border-color: ; */
`;

const BottomMenuButton = styled.button`
  min-width: 80px;
  width: 20%;
  min-height: 100%;
  outline: none;
  border: none;
  background: transparent;
  /* border-radius: 5px 0px 0px 5px; */
  color: #EEEEEE;
  cursor: pointer;

  /* &.right {
    border-radius: 0px 5px 5px 0px;
  } */
`;

export interface OnSubmitProps {
  x: number;
  y: number;
  width: number;
  imgWidth: number;
  img: File;
  imgSrc: string;
}

export interface ImgSize {
  width: number;
  height: number;
}

export interface AvatarClipProps {
  onSubmitFunc: (props: OnSubmitProps) => void;
  onClose: () => void;
  imgSrc: string;
  boundsColor: string;
  img?: File;
}


export const AvatarClip: React.FC<AvatarClipProps> = (props) => {
  const { onClose, img, imgSrc, onSubmitFunc, boundsColor } = props;
  const imgRef = useRef<HTMLImageElement>(null);
  const shapeRef = useRef<Konva.Circle>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    const width = imgRef.current!.width | 0;
    const height = imgRef.current!.height | 0;
    setImgWidth(width);
    setImgHeight(height);
    trRef.current!.nodes([shapeRef.current!]);
  }, [imgRef]);

  
  const uploadAvatar = async () => {
    if(!img) {
      return;
    }
    try {
      onSubmitFunc({
        x: trRef.current!.x()!,
        y: trRef.current!.y()!,
        width: trRef.current!.width()!,
        imgWidth,
        img,
        imgSrc
      })
    }catch(e) {
      alert('ошибка сохранения');
    }
    onClose();
  }

  return (
    <Container>
      <ImageContainer>
        <StyledImg ref={imgRef} src={imgSrc} />
        <StyledStage width={imgWidth} height={imgHeight}>
          <Layer>
            <Group>
              <Rect
                fill="black"
                opacity={0.7}
                x={0}
                y={0}
                width={imgWidth}
                height={imgHeight}
              />
              <Circle
                globalCompositeOperation="destination-out"
                ref={shapeRef}
                x={imgWidth / 2}
                y={imgHeight / 2}
                radius={(imgWidth > imgHeight? imgHeight / 2: imgWidth / 2)}
                fill="white"
                draggable
                dragBoundFunc={(pos) => dragBoundFunc(imgWidth, imgHeight, trRef.current!.width() * trRef.current!.scaleX() / 2, pos)}
              />
              <Transformer
                anchorFill={boundsColor}
                anchorStroke={boundsColor}
                anchorSize= {14}
                borderEnabled = {false}
                rotateEnabled={false}
                enabledAnchors={[
                  'top-left',
                  'top-right',
                  'bottom-left',
                  'bottom-right',
                ]}
                ref={trRef}
                boundBoxFunc={(oldBox, newBox) => boundBoxFunc(imgWidth, imgHeight, oldBox, newBox)}
              />
            </Group>
          </Layer>
        </StyledStage>
      </ImageContainer>
      <BottomMenu>
        <BottomMenuButton onClick={onClose}>Отмена</BottomMenuButton>
        <BottomMenuOptions />
        <BottomMenuButton className="right" onClick={uploadAvatar}>Готово</BottomMenuButton>
      </BottomMenu>
    </Container>
  )
}

export default AvatarClip;