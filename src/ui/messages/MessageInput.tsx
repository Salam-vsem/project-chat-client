import React from 'react';
import styled from 'styled-components';

export const StyledMessageInput = styled.div`
  width: 100%;
  min-height: 55px;
  max-height: 200px;
  padding: 18px 0px;
  word-break: break-all;
  box-sizing: border-box;
  overflow-y: auto;
  border: none;
  color: #fff;
  display:inline-block;

  &::-webkit-scrollbar { 
    display: none; 
  }

  [contentEditable=true]:empty:not(:focus):before {
    content:attr(data-text)
  }

  &:empty:before {
    content:attr(data-placeholder);
    color:gray
  }

  &:focus {
    outline: none;
  }
`;

interface MessageInputProps {
  editable?: boolean;
  placeholder?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  onKeyCapture?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}
export const MessageInput = React.forwardRef((props: MessageInputProps, ref: any) => {
  const { onKeyPress, onKeyCapture, editable, placeholder} = props;

  return (
    <StyledMessageInput
      ref={ref}
      contentEditable={editable}
      data-placeholder={placeholder}
      onKeyUpCapture={onKeyCapture}
      onKeyPress={onKeyPress}
    />
  )
})

export default MessageInput;