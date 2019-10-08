import React, { Fragment, useEffect, useState } from 'react';
import getTheme from './theme/components';
import theme from './theme';
import { StatusBar, StyleSheet } from 'react-native';
import {
  Actions,
  Lightbox,
  Router,
  Scene,
  Stack,
  Tabs,
} from 'react-native-router-flux';
//TODO move nav screens to global route component
import Api from './services/api';
import Toast from 'react-native-toast-native';
import BottomNavigationContainer from './components/Navigation/BottomNavigationContainer';
import {
  ComingSoonScreen,
  LightBoxScreen,
  NewsScreen,
  SearchScreen,
  StockScreen,
  WatchlistScreen,
} from './screens';
import { Container, StyleProvider } from 'native-base';

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
      <StyleProvider style={getTheme(theme.dark)}>
        <Container>
          <StatusBar barStyle="dark-content" />
          <Router>
            <Lightbox key="comingSoonOverlay">
              <Stack key="root" headerMode="none">
                <Tabs
                  key="bottomNavigation"
                  tabBarComponent={BottomNavigationContainer}
                  headerMode="none">
                  <Scene
                    key="watchlistScreen"
                    title="Watchlist"
                    icon="eye"
                    component={WatchlistScreen}
                  />
                  <Scene
                    key="searchScreen"
                    icon="search"
                    title="Search"
                    component={SearchScreen}
                  />
                  <Scene
                    key="newsScreen"
                    icon="ios-megaphone"
                    title="News"
                    component={NewsScreen}
                  />
                  <Scene
                    key="sectorsScreen"
                    icon="home-city-outline"
                    iconType="MaterialCommunityIcons"
                    title="Sectors"
                    onEnter={() => Actions.lightBoxScreen()}
                    component={ComingSoonScreen}
                  />
                  <Scene
                    key="learnScreen"
                    icon="graduation-cap"
                    iconType="FontAwesome5"
                    title="Learn"
                    lightbox={true}
                    onEnter={() => Actions.lightBoxScreen()}
                    component={ComingSoonScreen}
                  />
                  <Scene
                    key="tradeScreen"
                    icon="rocket"
                    iconType="MaterialCommunityIcons"
                    title="Trade"
                    lightbox={true}
                    onEnter={() => Actions.lightBoxScreen()}
                    component={ComingSoonScreen}
                  />
                </Tabs>
                <Stack key="searchNavigation">
                  <Scene key="stock" title="Stock" component={StockScreen} />
                </Stack>
              </Stack>
              <Scene
                key="lightBoxScreen"
                hideNavBar={true}
                component={LightBoxScreen}
              />
            </Lightbox>
          </Router>
        </Container>
      </StyleProvider>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  toastBody: {
    textAlign: 'center',
  },
});

export default App;
