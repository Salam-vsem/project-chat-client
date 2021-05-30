import React from 'react';
import { MessageStructure } from 'src/types';
import BlockMessage from './block/BlockMessage';
import DefaultMessage from './default/DefaultMessage';
import { MessageProps } from './types';

export const MessageComponent: React.FC<MessageProps> = (props) => {
    switch(props.theme) {
    case (MessageStructure.block): {
      return <BlockMessage {...props} />
    }
    default: {
      return <DefaultMessage {...props} />
    }
  }
}

export default MessageComponent;