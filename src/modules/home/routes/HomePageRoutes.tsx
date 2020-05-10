import React from 'react';
import { Switch } from 'react-router';

import PrivateRoute from '@/core/authentication/components/PrivateRoute';
import useRouter from '@/core/authentication/hooks/useRouter';
import HomePage from '@/modules/home/pages';

const HomePageRoutes = (): JSX.Element => {
  const { match } = useRouter();
  return (
    <Switch>
      <PrivateRoute path={`${match.path}`} component={HomePage} canAccess />
    </Switch>
  );
};

export default HomePageRoutes;
