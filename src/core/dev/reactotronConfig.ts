import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const reactotron =
  process.env.NODE_ENV === 'production'
    ? undefined
    : Reactotron.configure()
        // Logout sagas include history redirect which causes reactotron to crash the react app
        .use(reactotronRedux())
        .use(sagaPlugin({}))
        .connect();

export default reactotron;
