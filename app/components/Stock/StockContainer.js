import React, { useEffect } from 'react';
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
import { StockChart } from './StockChart';
import { Actions as RouteActions } from 'react-native-router-flux';
import { StockQuote } from './StockQuote';
import { LoadingScreen } from '../../screens';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import withReducer from '../../store/withReducer';

const initialData = {
  symbol: 'AAPL',
};

function StockContainer(props) {
  const { symbol } = initialData;

  const dispatch = useDispatch();
  const quote = useSelector(({ stock }) => stock.quote);
  const isLoading = useSelector(({ stock }) => stock.isLoading);

  useEffect(() => {
    //make the first call to the api when the component is initially mounted, but don't do it again on any subsequent rerenders. We'll handle that in another hook.
    dispatch(Actions.getQuote(symbol));
  }, [dispatch]);

  useEffect(() => {
    //now we fire the setTimeout & add the state dependency so it it triggers again after the initial update
    const timerId = setInterval(() => {
      dispatch(Actions.getQuote(symbol));
    }, 5000);

    return function cleanup() {
      console.log('timer cleared', timerId, new Date());
      clearInterval(timerId);
    };
  }, [dispatch]);

  const handleAddToWatchlist = () => {
    //TODO addtowatchlist
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
          <Title>{quote.symbol}</Title>
          <Subtitle>{quote.companyName}</Subtitle>
        </Body>
        <Right>
          <Button transparent onPress={() => handleAddToWatchlist}>
            <Icon name="heart" active />
          </Button>
          <Button transparent onPress={() => RouteActions.searchScreen()}>
            <Icon name="more" />
          </Button>
        </Right>
      </Header>
      <StockQuote />
      <StockChart symbol={symbol} />
    </Container>
  );
}

export default withReducer('stock', reducer)(StockContainer);
