import { Message, MessageStructure } from "src/types";

export interface MessageProps {
  userStoreId: number;
  prevMessage: Message;
  message: Message;
  isSelected: boolean;
  onSelect: () => void;
  theme: MessageStructure;
  updateFullScreenMediaSrc: (src: string) => void;
}