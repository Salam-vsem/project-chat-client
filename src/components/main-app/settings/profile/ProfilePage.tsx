import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useAccountStore } from '../../../../store/Account';
import AvatarEditor from '../../../../ui/avatar-editor/AvatarEditor';
import { defaultUserTheme } from '../../../../theme/Theme';
import SettingsHeader from '../SettingsHeader';
import axios from 'axios';
import { ImgSize, OnSubmitProps } from '../../../../ui/avatar-editor/AvatarClip';
import { useAccountApi } from 'src/api/AccountApi';
import { useSettingsApi } from 'src/api/SettingsApi';
import { settingsStore, useSettingsStore } from 'src/store/SettingsStore';
const browserImageSize = require('browser-image-size');

const Container = styled.div`
  /* width: 80vw; */
  /* height: 100%; */
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  /* box-sizing: border-box; */
  padding: 30px 0px;
`;


const SettingContainer = styled.div`
  width: 70%;
  border-radius: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  background-color: ${props => props.theme.static.colors.dark};
`;

export const StyledInput = styled.input`
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

  &:focus {
    border-color: ${props => props.theme.personal.color};
  }
`;

export const ProfilePage: React.FC = observer(() => {
  const settingsApi = useSettingsApi();
  const settingsStore = useSettingsStore();
  const accountStore = useAccountStore();
  const [disabled, setDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    if(input === '' || !inputRef.current) {
      setDisabled(true)
    }
    else {
      setDisabled(false)
    }
  }

  const updateLogin = async () => {
    const login = inputRef.current!.value.trim()
    await settingsApi.updateLogin(login)
    accountStore.updateLogin(login);
    setDisabled(true);
    inputRef.current?.blur();
  }

  const changeAvatarOnSubmitFunc = async ({img, width, x, y, imgWidth}: OnSubmitProps) => {
      const size: ImgSize = await browserImageSize(img);
      const diff = size.width / imgWidth;
      const formData = new FormData();
      formData.append('avatar', img);
      formData.append('x', (x * diff).toString());
      formData.append('y', (y * diff).toString());
      formData.append('width', (width * diff).toString());

      const res = await axios.post('/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((data) => data.data);
      const avatar = await settingsApi.updateAvatar({avatar: res.avatar, avatarMin: res.avatarMin})
      accountStore.updateAvatar(avatar.avatar, avatar.avatarMin)
  }

  return (
    <>
      <SettingsHeader
        submitButtonProps={{disabled: disabled, onSubmitFunc: updateLogin}}
        selectedSetting={settingsStore.selectedSetting}
        updateSelectedSetting={(newSetting) => settingsStore.selectedSetting = newSetting}
      />
      <Container>
        <SettingContainer>
          <AvatarEditor
            boundsColor={accountStore.user?.theme.color ?? defaultUserTheme.color}
            avatarSrc={accountStore.user?.avatarMin}
            onSubmitFunc={changeAvatarOnSubmitFunc}
          />
          <StyledInput
            ref={inputRef}
            onChange={handleChangeFunc}
            onKeyDown={(e) => (!disabled && e.keyCode === 13) && updateLogin()}
            defaultValue={accountStore.user?.login}
          />
        </SettingContainer>
      </Container>
    </>
  );
});

export default ProfilePage;