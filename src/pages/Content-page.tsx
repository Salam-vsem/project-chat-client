import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';

import { routes } from '../config/routes';
import { useAccountStore } from '../store/Account';
import LoginPage from '../components/login/LoginPage';
import MainApp from './MainApp';
import LoadingPage from '../ui/LoadingPage';
import { useAccountApi } from 'src/api/AccountApi';
import { useRoomsStore } from 'src/store/RoomsStore';

export const ContentPage: React.FC = observer(() => {
  const accountStore = useAccountStore();
  const history = useHistory();
  const accountApi = useAccountApi();
  const roomsStore = useRoomsStore();

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    accountApi.auth().then((data) => {
      if(data) {
        accountStore.auth(data.user)
        roomsStore.auth(data.rooms)
        setAuth(true)
      }
      else {
        history.replace(routes.home)
      }
    })
  })

  if(!auth) {
    return (
      <LoadingPage />
    )
  }

  return (
    <Switch>
      <Route exact path={routes.home} component={LoginPage} />
      <Route path={routes.signUp} component={LoginPage} />
      <Route path={routes.chat} component={MainApp} />
      <Redirect to={routes.home} />
    </Switch>
  )
});

export default ContentPage;