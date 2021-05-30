import React from 'react';
import styled from 'styled-components';
import Room from './Room';
import { Rooms } from 'src/types';

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

interface RoomsListProps {
  searchValue: string;
  rooms: Rooms;
  currRoomId?: number;
  onRoomSelect: (id: number) => void
}
export const RoomsList: React.FC<RoomsListProps> = (props) => {
  const {searchValue, rooms, currRoomId, onRoomSelect} = props

  return (
    <Container>
      {
        Object.values(rooms).filter(room => room.name.toLowerCase().includes(searchValue.toLowerCase())).map((room, index) => (
          <Room
            key={index}
            currRoomId={currRoomId}
            onClick={onRoomSelect}
            room={room}
          />
        ))
      }
    </Container>
  )
}

export default RoomsList;