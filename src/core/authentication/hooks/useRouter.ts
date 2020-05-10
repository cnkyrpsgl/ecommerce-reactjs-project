import { useContext } from 'react';
import { __RouterContext, RouteComponentProps } from 'react-router';

const useRouter = () => useContext(__RouterContext) as RouteComponentProps;

export default useRouter;
