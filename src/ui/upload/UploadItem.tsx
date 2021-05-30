import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faImages, faFile, faVideo } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';
import { uploadFile } from '../../components/main-app/helper/helpers';
import { MessageType } from 'src/types';

const DropMenuElement = styled.li`
  box-sizing: border-box;
  cursor: pointer;
  padding: .5rem 1.5rem;
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.static.font.default + 'px'};
  &:hover {
    background-color: ${props => props.theme.static.colors.hover}
  }

  @media screen and (max-width: 800px) {
    justify-content: center;
    font-size: ${props => props.theme.static.font.subTitle + 'px'};
    padding: 1.5rem 1.5rem;
    border-bottom: 2px solid ${props => props.theme.static.colors.mediumBg};

    &.last {
      border-bottom: none;
    }
  }
`;

const DropMenuElementIconWrap = styled.div`
  min-height: 1.25rem;
  min-width: 1.25rem;
  margin-right: .2rem;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export interface UploadItem {
  type: MessageType;
  label: string;
  path: string;
  icon: IconProp;
  multiple?: boolean;
  accept?: string;
  last?: boolean;
}

interface UploadItemProps {
  item: UploadItem;
  uploadFunc: (res: any) => void;
}

export const UploadItem: React.FC<UploadItemProps> = (props) => {
  const { label, path, icon, multiple, accept, last } = props.item;

  return (
    <label>
      <input
        multiple={multiple}
        style={{display: 'none'}}
        type="file"
        accept={accept}
        onChange={(e) => uploadFile(e.target.files!, path, props.uploadFunc)}
      />
      <DropMenuElement className={last? 'last': ''}>
      <DropMenuElementIconWrap>
        <FontAwesomeIcon icon={icon} size="sm" />
      </DropMenuElementIconWrap>
        {label}
      </DropMenuElement>
    </label>
  )
}

export default UploadItem;