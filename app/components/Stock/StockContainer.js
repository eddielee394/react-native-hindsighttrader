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

function StockContainer(props) {
  const symbol = useSelector(({ stock }) => stock.data.symbol);
  const companyInfo = useSelector(({ stock }) => stock.data.companyInfo);

  const dispatch = useDispatch();
  const isLoading = useSelector(({ stock }) => stock.isLoading);

  useEffect(() => {
    dispatch(Actions.getQuote(symbol));
    dispatch(Actions.pollQuote(symbol, 5000));

  }, [dispatch, symbol]);

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
          <Title>{symbol}</Title>
          <Subtitle>{companyInfo.companyName}</Subtitle>
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
      <StockChart />
    </Container>
  );
}

export default withReducer('stock', reducer)(StockContainer);
