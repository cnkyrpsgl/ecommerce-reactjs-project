import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import FallbackSpin from '@/common/components/FallbackSpin';
import PrivateRoute from '@/core/authentication/components/PrivateRoute';
import HomePageRoutes from '@/modules/home/routes/HomePageRoutes';

const LoginComponent = lazy(() => import('@/modules/login'));

const Routes: React.FC<{}> = (): JSX.Element => {
  return (
    <Suspense fallback={<FallbackSpin />}>
      <Switch>
        <PrivateRoute exact path="/" component={HomePageRoutes} canAccess />
        <Route path="/login" component={LoginComponent} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
