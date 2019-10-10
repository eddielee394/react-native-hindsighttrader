import React from 'react';
import getTheme from './theme/components';
import theme from './theme';
import { Root } from 'native-base';
import { StatusBar, StyleSheet } from 'react-native';
import {
  Actions,
  Lightbox,
  Router,
  Scene,
  Stack,
  Tabs,
} from 'react-native-router-flux';
import BottomNavigationContainer from './components/Navigation/BottomNavigationContainer';
import {
  ComingSoonScreen,
  LightboxScreen,
  NewsScreen,
  SearchScreen,
  StockScreen,
  WatchlistScreen,
} from './screens';
import { Container, StyleProvider, Toast } from 'native-base';

const renderToast = message => {
  return Toast.show({
    text: `There was an issue with rendering the data. Please refresh the application.\nError:${message}`,
    type: 'danger',
  });
};

const App = () => {
  return (
    <Root>
      <StyleProvider style={getTheme(theme.dark)}>
        <Container>
          <StatusBar barStyle="dark-content" />
          <Router>
            <Lightbox key="comingSoonOverlay">
              <Stack key="rootNavigation" headerMode="none">
                <Stack key="searchNavigation">
                  <Scene
                    key="stockScreen"
                    title="Stock"
                    component={StockScreen}
                  />
                </Stack>
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
              </Stack>
              <Scene
                key="lightBoxScreen"
                hideNavBar={true}
                component={LightboxScreen}
              />
            </Lightbox>
          </Router>
        </Container>
      </StyleProvider>
    </Root>
  );
};

export default App;
