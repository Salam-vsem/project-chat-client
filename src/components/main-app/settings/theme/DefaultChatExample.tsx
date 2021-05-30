import React from 'react';
import styled from 'styled-components';
import { Avatar, AvatarSize } from '../../../../ui/Avatar';
import { ChatExampleContainer } from './BlockChatExample';
import { IconContainer, MessageContentWrap, UserLogin } from '../../../../ui/messages/default/DefaultMessage';

const MessageExampleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: ${props => props.theme.static.font.default * props.theme.personal.fontScale + 'px'};
`;

const MessageExample = (login: string, text: string): JSX.Element => (
  <MessageExampleContainer>
    <IconContainer>
        <Avatar size={AvatarSize.small}>{login[0]}</Avatar>
      </IconContainer>
      <MessageContentWrap>
          <UserLogin>{login}</UserLogin>
          <span>{text}</span>
      </MessageContentWrap>
  </MessageExampleContainer>
)

export const DefaultMessagesExample: React.FC = () => (
  <ChatExampleContainer>
    {MessageExample('Minato', 'Hello')}
    {MessageExample('Kisame', 'Hey there, how are you guys?')}
    {MessageExample('Itachi', 'Hello, not bad')}
  </ChatExampleContainer>
)

export default DefaultMessagesExample;