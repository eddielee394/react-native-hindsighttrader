import React from 'react';
import {
  Actions,
  Lightbox,
  Router,
  Scene,
  Stack,
  Tabs,
} from 'react-native-router-flux';
import {
  ComingSoonScreen,
  LightboxScreen,
  NewsScreen,
  SearchScreen,
  StockScreen,
  WatchlistScreen,
  WelcomeScreen,
} from '../screens';
import { BottomNavigation } from './BottomNavigation';

export function RootNavigator() {
  return (
    <Router>
      <Lightbox key="comingSoonOverlay">
        <Stack key="rootNavigation" headerMode="none">
          <Scene
            key="welcomeScreen"
            title="Welcome"
            component={WelcomeScreen}
          />
          <Tabs
            key="bottomNavigation"
            tabBarComponent={BottomNavigation}
            headerMode="none">
            <Scene
              key="watchlistScreen"
              title="Watchlist"
              icon="eye"
              tabNav
              component={WatchlistScreen}
            />
            <Scene
              key="searchScreen"
              icon="search"
              title="Search"
              tabNav
              component={SearchScreen}
            />
            <Scene
              key="newsScreen"
              icon="ios-megaphone"
              title="News"
              tabNav
              component={NewsScreen}
            />
            <Scene
              key="sectorsScreen"
              icon="home-city-outline"
              iconType="MaterialCommunityIcons"
              title="Sectors"
              onEnter={() => Actions.lightBoxScreen()}
              tabNav
              component={ComingSoonScreen}
            />
            <Scene
              key="learnScreen"
              icon="graduation-cap"
              iconType="FontAwesome5"
              title="Learn"
              lightbox={true}
              onEnter={() => Actions.lightBoxScreen()}
              tabNav
              component={ComingSoonScreen}
            />
            <Scene
              key="tradeScreen"
              icon="rocket"
              iconType="MaterialCommunityIcons"
              title="Trade"
              lightbox={true}
              onEnter={() => Actions.lightBoxScreen()}
              tabNav
              component={ComingSoonScreen}
            />
            <Scene
              key="stockScreen"
              title="Stock"
              icon="area-chart"
              iconType="FontAwesome"
              component={StockScreen}
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
  );
}
