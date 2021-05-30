import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useAccountStore } from '../../../store/Account';
import { ExitIcon } from './ChatHeader';
import { StyledInput } from '../settings/profile/ProfilePage';
import AvatarEditor from '../../../ui/avatar-editor/AvatarEditor';
import { defaultUserTheme } from '../../../theme/Theme';
import { useHistory } from 'react-router';
import { routes } from '../../../config/routes';
import { SubmitChanges } from '../settings/SettingsHeader';
import { ImgSize, OnSubmitProps } from '../../../ui/avatar-editor/AvatarClip';
import { ClipProps } from '../../../ui/avatar-editor/UploadAvatar';
import axios from 'axios';
import { useAccountApi } from 'src/api/AccountApi';
import { LoadingSpinner } from 'src/ui/LoadingSpinner';
import { useRoomsStore } from 'src/store/RoomsStore';
const browserImageSize = require('browser-image-size');

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background-color: ${props => props.theme.static.colors.mediumBg};
`;

const LoadingContainer = styled.div`
  position: absolute;
  left: -30px;
  top: -11px;
`;

const InputContainer = styled.div`
  width: 70%;
  border-radius: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  background-color: ${props => props.theme.static.colors.dark};

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Header = styled.div`
  min-height: 55px;
  background-color: ${props => props.theme.static.colors.dark};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.theme.static.font.subTitle + 'px'};
  font-weight: 700;
  position: relative;
`;

const Exit = styled.div`
  padding: 5px 10px;
  position: absolute;
  left: 5px;
  cursor: pointer;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  & > * {
    margin-top: 20px;
    &:first-child {
        margin-top: 0;
    }
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 5px 0px;
  color: #fff;
  margin-left: 15px;
  outline: none;
  border: none;
  background: transparent;
  border-width: 0px 0px 2px 0px;
  border-style: solid;
  border-color: #333539;
  transition: border-color 0.3s ease;
  font-size: ${props => props.theme.static.font.default + 'px'};
  font-family: 'PT Sans';

  &:focus {
    border-color: ${props => props.theme.personal.color};
  }
`;

interface AvatarData {
  img: File;
  x: number;
  y: number;
  width: number;
}
let description = ''
let avatarData: AvatarData;
export const CreateRoom: React.FC = () => {
  const accountStore = useAccountStore();
  const roomsStore = useRoomsStore()
  const accountApi = useAccountApi();
  const history = useHistory();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState<string>('');
  const [clip, setClip] = useState<ClipProps>();

  if(!accountStore.user) {
    history.replace(routes.home);
    return null;
  }
  if(!accountStore.user.isAdmin) {
    history.replace(routes.chat);
    return null;
  }

  const createRoom = async () => {
    let avatar = undefined;
    if(avatarData) {
      const formData = new FormData();
      formData.append('avatar', avatarData.img);
      formData.append('x', (avatarData.x).toString());
      formData.append('y', (avatarData.y).toString());
      formData.append('width', (avatarData.width).toString());
      const res = await axios.post('/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      avatar = res.data.avatar;
    }
    setLoading(true);
    const room = await accountApi.createRoom( // !!! перенести в roomApi?
      {
        name,
        description: description === '' ? undefined: description,
        avatar
      }
    )
    roomsStore.create(room);
    history.push(routes.room.url(room.id));
  }

  const onSubmitFunc = async ({x, y, imgWidth, width, img, imgSrc}: OnSubmitProps) => {
    setImg(imgSrc)
    const size: ImgSize = await browserImageSize(img);
    const diff = size.width / imgWidth;
    avatarData = {
      img,
      x: x * diff,
      y: y * diff,
      width: width * diff
    }
    setClip({x: x * diff, y: y * diff, width: width * diff})
  }

  return (
    <>
      <Container>
        <Header>
          <Exit onClick={() => history.goBack()}><ExitIcon icon={faChevronLeft} /></Exit>
          <span>Создать новый чат</span>
          <SubmitChanges disabled={name === ''} onClick={() => createRoom()}>
            {
              loading &&
              <LoadingContainer>
                <LoadingSpinner size={10} />
              </LoadingContainer>
            }
            Готово
          </SubmitChanges>
        </Header>
        <EditContainer>
          <InputContainer>
            <AvatarEditor
              onSubmitFunc={onSubmitFunc}
              boundsColor={accountStore.user?.theme.color ?? defaultUserTheme.color}
              avatarSrc={img}
              clip={clip}
            />
            <StyledInput
              placeholder="Введите название"
              required={true}
              onChange={(e) => setName(e.currentTarget.value.trim())}
            />
          </InputContainer>
          <InputContainer>
            <StyledTextArea
              rows={5}
              placeholder="Введите описание"
              required={true}
              onChange={(e) => description = e.currentTarget.value.trim()}
            />
          </InputContainer>
        </EditContainer>
      </Container>
    </>
  )
}

export default CreateRoom;