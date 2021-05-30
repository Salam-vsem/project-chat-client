import React, { useState } from 'react';
import styled from 'styled-components';

import classnames from 'classnames';
import { switchBlockMessage, RoomCreatedMessage } from './BlockMessagesComponents';
import { MessageProps } from '../types';
import UserAvatar from '../UserAvatar';
import { MessageType } from 'src/types';

const Container = styled.div`
  display: flex;
	justify-content: flex-end;
	flex-direction: column;
	align-self: flex-end;
  padding: 0px 20px;
  margin: 10px 0px;
  box-sizing: border-box;
  position: relative;

  @media screen and (max-width: 800px) {
    padding: 0px 5px;
  }
`;

export const SelectContainer = styled.div`
  position: absolute;
  top: -5px;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: 0;
  padding: 5px 0px;

  &.selected {
    background-color: ${props => props.theme.static.colors.hover};
  }
`;

const InlineContainer = styled.div`
  display: inline-flex;
  align-items: flex-end;
  &.own {
    flex-direction: row-reverse;
  }
`;

const AvatarWrap = styled.div`
  margin: 6px 8px 6px 0px;
`;

export const MessageDateContainer = styled.div`
  font-size: ${props => (props.theme.personal.fontScale * props.theme.static.font.verySmall) + 'px'};
  margin-left: 10px;
  &.own {
    align-self: flex-end;
  }
`;

const MessageContentWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Author = styled.span`
  margin-bottom: 2px;
  margin-left: 6px;
  font-size: ${props => (props.theme.static.font.small * props.theme.personal.fontScale) + 'px'};
  font-weight: 700;
`;

export const BlockMessage: React.FC<MessageProps> = (props) => {
  const {userStoreId, message, isSelected, onSelect, updateFullScreenMediaSrc} = props;

  if(message.type === MessageType.room_created) {
    return RoomCreatedMessage(message);
  }

  if(userStoreId === message.userId) {
    return (
      <Container
          className={classnames({
            own: true,
            selected: isSelected
          })}
        >
          {switchBlockMessage(message, true, updateFullScreenMediaSrc)}
          <SelectContainer className={classnames({selected: isSelected})} onClick={onSelect} />
      </Container>
    )
  }
  return (
    <Container>
      <InlineContainer>
        <AvatarWrap>
          <UserAvatar
            firstLoginChar={message.userLogin[0]}
            avatarSrc={message.userAvatarMin}
          />
        </AvatarWrap>
        <MessageContentWrap>
          <Author>{message.userLogin}</Author>
          {switchBlockMessage(message, false, updateFullScreenMediaSrc)}
        </MessageContentWrap>
      </InlineContainer>
    </Container>
  )
}

export default BlockMessage