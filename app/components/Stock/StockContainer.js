import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions as RouteActions } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import _ from 'lodash';
import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Left,
  Right,
  Subtitle,
  Title,
} from 'native-base';
import * as Actions from './store/actions';
import * as watchlistActions from '../Watchlist/store/actions';
import reducer from './store/reducers';
import withReducer from '../../store/withReducer';
import { StockChart } from './StockChart';
import { StockQuote } from './StockQuote';
import { LoadingScreen } from '../../screens';
import theme from '../../theme';

function StockContainer(props) {
  const symbol = useSelector(({ stock }) => stock.data.symbol);
  const companyInfo = useSelector(({ stock }) => stock.data.companyInfo);
  const isLoading = useSelector(({ stock }) => stock.isLoading);
  const watchlist = useSelector(({ watchlist }) => watchlist);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getQuote(symbol));
    dispatch(Actions.pollQuote(symbol, 5000));
  }, [dispatch, symbol]);

  const handleAddToWatchlist = () => {
    dispatch(watchlistActions.addWatchlistSymbol(symbol));
  };

  const handleWatchlistIconStyles = () => {
    return _.includes(watchlist.symbols, symbol) && styles.negative;
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => RouteActions.pop()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{symbol}</Title>
          <Subtitle>{companyInfo.companyName}</Subtitle>
        </Body>
        <Right>
          <Button transparent onPress={() => handleAddToWatchlist(symbol)}>
            <Icon name="heart" active style={[handleWatchlistIconStyles()]} />
          </Button>
          <Button transparent onPress={() => RouteActions.searchScreen()}>
            <Icon name="more" />
          </Button>
        </Right>
      </Header>
      <StockQuote />
      <StockChart />
    </Container>
  );
}

const styles = StyleSheet.create({
  negative: {
    color: theme.dark.red,
  },
});

export default withReducer('stock', reducer)(StockContainer);
