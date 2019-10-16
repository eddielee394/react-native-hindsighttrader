import './utils/fixTimerBug';

import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import getTheme from './theme/components';
import theme from './theme';
import { Container, Root, StyleProvider } from 'native-base';
import { StatusBar } from 'react-native';
import { RootNavigator } from './navigation/RootNavigator';
import Reactotron from 'reactotron-react-native';
import { getAllKeys, clear, remove } from './utils/storage';

// Reactotron.onCustomCommand({
//   title: 'Purge persisted storage',
//   description: 'Purges the persisted storage',
//   command: 'persistorPurge',
//   handler: () => {
//     console.tron.log('purging the persisted storage');
//     persistor.purge();
//   },
// });
getAllKeys().then(response => console.log(response));
// remove('persist:root');
const App = () => {
  return (
    <Root>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StyleProvider style={getTheme(theme.dark)}>
            <Container>
              <StatusBar barStyle="dark-content" />
              <RootNavigator />
            </Container>
          </StyleProvider>
        </PersistGate>
      </Provider>
    </Root>
  );
};

export default App;
