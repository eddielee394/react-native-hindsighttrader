import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions as RouteActions } from 'react-native-router-flux';
import { Animated, StyleSheet } from 'react-native';
import {includes} from 'lodash';
import {
  Body,
  Button,
  Header,
  Icon,
  Left,
  Right,
  Subtitle,
  Tab,
  Tabs,
  Text,
  Title,
} from 'native-base';
import * as Actions from './store/actions';
import * as watchlistActions from '../Watchlist/store/actions';
import { StockChart } from './StockChart';
import { StockQuote } from './StockQuote';
import { LoadingScreen } from '../../screens';
import { StockNews } from './tabs/StockNews';
import { TabBar } from '../UI/TabBar';
import theme from '../../theme';

function StockContainer(props) {
  const symbol = useSelector(({ stock }) => stock.data.symbol);
  const companyName = useSelector(
    ({ stock }) => stock.data.companyInfo.companyName,
  );
  const isLoading = useSelector(({ stock }) => stock.isLoading);
  const symbols = useSelector(({ watchlist }) => watchlist.symbols);
  const dispatch = useDispatch();

  const nativeScroll = new Animated.Value(0);

  useEffect(() => {
    dispatch(Actions.getQuote(symbol));
    dispatch(Actions.pollQuote(symbol, 5000));
  }, [dispatch, symbol]);

  const handleAddToWatchlist = () => {
    return dispatch(watchlistActions.addWatchlistSymbol(symbol));
  };

  const handleWatchlistIconStyles = () =>
    includes(symbols, symbol) && styles.negative;

  const handleScrollEvent = Animated.event(
    [{ nativeEvent: { contentOffset: { y: nativeScroll } } }],
    {
      useNativeDriver: true,
    },
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <Animated.ScrollView onScroll={handleScrollEvent}>
      <Header>
        <Left>
          <Button transparent onPress={() => RouteActions.pop()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{symbol}</Title>
          <Subtitle>{companyName}</Subtitle>
        </Body>
        <Right>
          <Button transparent onPress={() => handleAddToWatchlist(symbol)}>
            <Icon name="heart" active style={[handleWatchlistIconStyles()]} />
          </Button>
          <Button transparent onPress={() => RouteActions.searchScreen()}>
            <Icon name="search" />
          </Button>
        </Right>
      </Header>
      <StockQuote />
      <StockChart />
      <Tabs
        style={styles.tabsContainer}
        renderTabBar={props => (
          <TabBar
            style={styles.tabBarContainer}
            nativeScroll={nativeScroll}
            scrollHeight={405}
            tabBarStyle={styles.tabBar}
            tabStyle={styles.tabHeading}
            backgroundColor={theme.dark.blue2}
            tabHeadingTextStyle={styles.tabHeadingText}
            tabHeadingUnderlineStyle={styles.tabHeadingUnderline}
          />
        )}>
        <Tab heading="News" style={styles.tab}>
          <StockNews />
        </Tab>
        <Tab heading="Fundamentals">
          <Text>Fundamentals</Text>
        </Tab>
        <Tab heading="Profile">
          <Text>Company Profile</Text>
        </Tab>
      </Tabs>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  negative: {
    color: theme.dark.red,
  },
  tabBarContainer: {
    borderWidth: 0,
  },
  tabBar: {
    backgroundColor: theme.dark.blue2,
  },
  tabsContainer: {
    marginTop: 15,
    // height: 40,
  },
  tabHeading: {
    flex: 1,
    height: 40,
    backgroundColor: theme.dark.blue2,
  },
  tabHeadingText: { color: theme.dark.textColor },
  tabHeadingUnderline: {
    backgroundColor: theme.dark.orange,
  },
  tab: {
    padding: 15,
  },
});

export default StockContainer;
