import React, { Fragment, useEffect, useState } from 'react';
import { mapping } from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import { StyleSheet, StatusBar } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { theme } from './theme';
import { Router, Scene, Stack, Tabs } from 'react-native-router-flux'; //TODO move nav screens to global route component
import Api from './services/api';
import Toast from 'react-native-toast-native';
import BottomNavigationContainer from './components/Navigation/BottomNavigationContainer';
import { StockScreen } from './screens/StockScreen';
import { SearchScreen } from './screens/SearchScreen';
import { WatchlistScreen } from './screens/WatchlistScreen';

const renderToast = message => {
  return Toast.show(
    `There was an issue with rendering the data. Please refresh the application.\nError:${message}`,
    Toast.LONG,
    Toast.TOP,
    style.toastBody,
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState({ isLoading: false });
  const [data, setData] = useState({ data: [] });

  useEffect(() => {
    setIsLoading({ isLoading: true });
    //TODO-EP move to global state manager
    Api.getQuoteData('aapl')
      .then(response => {
        //let's set the state with the retrieved data & disable the loader
        setData({ ...data, response });
        setIsLoading({ isLoading: false });
      })
      .catch(error => {
        console.log(error);
        //there was an error so notify the user
        renderToast(error.message);
      });
  }, []);

  return (
    <Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <StatusBar barStyle="dark-content" />
        <Router>
          <Tabs
            key="bottomNavigation"
            tabBarComponent={BottomNavigationContainer}
            headerMode="none">
            <Scene key="watchlistScreen" component={WatchlistScreen} />
            <Scene key="searchScreen" component={SearchScreen} />
            <Scene key="stockScreen" component={StockScreen} />
          </Tabs>
        </Router>
      </ApplicationProvider>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  toastBody: {
    textAlign: 'center',
  },
});

export default App;
