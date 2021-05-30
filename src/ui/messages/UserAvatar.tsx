import React, { useState } from 'react';
import { Avatar, AvatarSize } from '../Avatar';

interface UserAvatarProps {
  firstLoginChar: string;
  avatarSrc?: string;
}
export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  const {firstLoginChar: firstLoginLetter, avatarSrc} = props;
  const [show, setShow] = useState(!!avatarSrc)

  return (
    <>
    <Avatar
      size={AvatarSize.small}
      src={avatarSrc && avatarSrc}
    >
      {!show && firstLoginLetter}
    </Avatar>
    <img
      style={{display: 'none'}}
      src={avatarSrc}
      onError={() => setShow(true)}
      />
    </>
  )
}

export default UserAvatar