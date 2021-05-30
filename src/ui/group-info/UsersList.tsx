import { observer } from 'mobx-react-lite';
import React from 'react';
import { UserCache, UserInfo } from '../../types';
import User from './User';

interface UsersListProps {
  users: UserCache[]
}
export const UsersList: React.FC<UsersListProps> = observer((props) => (
  <React.Fragment>
    {
      props.users.sort((a, b) => a.id - b.id).map((user, index) => (
        <User key={user.id} user={user} />
      ))
    }
  </React.Fragment>
))

export default UsersList;