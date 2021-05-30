import styled from "styled-components";
import { formMessageBorder } from "../../helper/helpers";
import React from 'react';

export const ChatExampleContainer = styled.div`
    width: 200px;
    height: 200px;
    padding: 10px;
    border-radius: 12px;
    background-color: ${props => props.theme.static.colors.mediumBg};
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-bottom: 20px;
    overflow-y: scroll;
`;

interface MessageExampleProps {
    widthPercent?: number;
}
const MessageExample = styled.div<MessageExampleProps>`
    width: ${props => props.widthPercent? props.widthPercent + '%': 'auto'};
    padding: 0px 10px;
    /* min-height: 30px; */
    line-height: 30px;
    margin-right: auto;
    border-radius: ${props => formMessageBorder(props.theme.personal.borderRadius)};
    font-size: ${props => (props.theme.static.font.default * props.theme.personal.fontScale) + 'px'};
    background-color: ${props => props.theme.static.colors.message};

    &.personal {
        /* margin-top: 10px; */
        margin-right: 0;
        margin-left: auto;
        border-radius: ${props => formMessageBorder(props.theme.personal.borderRadius, true)};
        background-color: ${props => props.theme.personal.color};
    }
`;

export const BlockMessagesExample: React.FC = () => (
  <ChatExampleContainer>
      <MessageExample>Hey</MessageExample>
      <MessageExample>How are you?</MessageExample>
      <MessageExample className="personal">Hello Dattebao, I'm good, thanks</MessageExample>
  </ChatExampleContainer>
)

export default BlockMessagesExample;