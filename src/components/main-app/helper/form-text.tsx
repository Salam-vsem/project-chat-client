import dayjs from 'dayjs';
import React from 'react';
import Linkify from 'react-linkify';

export const formMembersText = (amount: number): string => {
  const lastChar = amount % 10;

  if (lastChar == 1 && amount !== 11) {
    return `${amount} участник`;
  } else if (lastChar == 2 && amount !== 12) {
    return `${amount} участника`;
  } else if (lastChar == 3 && amount !== 13) {
    return `${amount} участника`;
  }
  else if (lastChar == 4 && amount !== 14) {
    return `${amount} участника`;
  } else {
    return `${amount} участников`;
  }
}

export const formDeleteMessagesText = (amount: number): string => {
  const lastChar = amount % 10;

  if (lastChar == 1 && amount !== 11) {
    return `${amount} сообщение`;
  } else if (lastChar == 2 && amount !== 12) {
    return `${amount} сообщения`;
  } else if (lastChar == 3 && amount !== 13) {
    return `${amount} сообщения`;
  }
  else if (lastChar == 4 && amount !== 14) {
    return `${amount} сообщения`;
  } else {
    return `${amount} сообщений`;
  }
}

export const formMessageDateText = (date: number) => (
  dayjs(date).format('H:mm').toString()
)

export const parseMessageText = (text: string): JSX.Element => (
  <span>
  {
    text.split('\n').map((item, index) => 
    <React.Fragment key={index}>
      <Linkify>{item}</Linkify><br />
    </React.Fragment>
    )
  }
  </span>
)

//.add(-new Date().getTimezoneOffset(), 'm') // !!! перестало работать