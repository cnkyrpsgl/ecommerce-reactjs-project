import { LocationDescriptorObject } from 'history';
import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import IdentityContext from '@/core/authentication/contexts/IdentityContext';

type PrivateRouteProps = Omit<RouteProps, 'component'> & {
  component: React.ElementType;
  allowedRoles?: string[];
  canAccess?: boolean;
};

const getReferrer = (location?: LocationDescriptorObject): string => {
  return location && location.pathname
    ? location.search
      ? location.pathname + location.search
      : location.pathname
    : '/';
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  location,
  allowedRoles = [],
  canAccess: maybeCanAccess,
  ...rest
}): JSX.Element => {
  const { loggedIn } = useContext(IdentityContext);
  return (
    <Route
      {...rest}
      render={(props): JSX.Element =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { referrer: getReferrer(location) } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
