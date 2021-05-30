import React from 'react';
import styled from 'styled-components';
import { Exit, ExitIcon } from '../chat/ChatHeader';
import { useMenuStore } from '../../../store/MenuStore';
import { observer } from 'mobx-react-lite';
import { useSettingsStore, settingNames, SettingsOptionsList } from '../../../store/SettingsStore';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  min-height: 55px;
  background-color: ${props => props.theme.static.colors.dark};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 800px) {
    width: 100vw;
  }
`;

export const SubmitChanges = styled.button`
  background: transparent;
  position: relative;
  /* padding: 5px 10px; */
  border: none;
  outline: none;
  transition: 0.3s ease;
  opacity: 1;
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.personal.color};
  cursor: pointer;

  display: inherit;
  position: absolute;
  right: 10px;

  &:disabled,
  &[disabled]{
    color: #666666;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: ${props => props.theme.static.font.subTitle + 'px'};
`;

interface SubmitButtonProps {
  onSubmitFunc: (props: any) => void;
  disabled: boolean;
}

interface SettingsHeaderProps {
  selectedSetting?: SettingsOptionsList
  submitButtonProps?: SubmitButtonProps;
  updateSelectedSetting: (newSetting: SettingsOptionsList | undefined) => void;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = (props) => {
  const { submitButtonProps, selectedSetting, updateSelectedSetting} = props;

  return (
    <Container>
      <Exit onClick={() => updateSelectedSetting(undefined)}><ExitIcon icon={faChevronLeft} /></Exit>
      <Title>{selectedSetting !== undefined && settingNames[selectedSetting]}</Title>
      {
        submitButtonProps &&
        <SubmitChanges disabled={submitButtonProps.disabled} onClick={submitButtonProps.onSubmitFunc}>Готово</SubmitChanges>
      }
    </Container>
  );
}

export default SettingsHeader;