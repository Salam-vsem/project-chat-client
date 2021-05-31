import { IEmojiData } from 'emoji-picker-react';
import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import OutsideAlerter from '../../components/main-app/helper/OutsideAlerter';

const Icon = styled(FontAwesomeIcon)`
  width: 100px;
  color: ${props => props.theme.personal.color};
`;

const ButtonContainer = styled.div`
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-left: 15px;
  /* margin-right: 15px; */

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const pickerStyle = {
  width: '250px',
  position: 'absolute',
  inset: 'auto -15px 65px auto',
  zIndex: '9999',
  borderRadius: '4px',
}

interface EmojiPickerProps {
  onEmojiClick: (e: React.MouseEvent<Element, MouseEvent>, emojiObject: IEmojiData) => void
}
export const EmojiPicker: React.FC<EmojiPickerProps> = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOutside = () => setOpen(false)
  return (
    <OutsideAlerter handleClickOutside={handleClickOutside}>
      <ButtonContainer>
        {
          open && 
          <Picker
            onEmojiClick={props.onEmojiClick}
            pickerStyle={pickerStyle}
          />
        }
        <Icon
          onClick={() => setOpen(!open)}
          icon={faSmile}
        />
      </ButtonContainer>
    </OutsideAlerter>
  )
}

export default EmojiPicker;