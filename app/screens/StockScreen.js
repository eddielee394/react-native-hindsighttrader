import React, { useEffect, useRef, useState } from 'react';
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
import { Chart } from '../components/Stock/Chart';
import Api from '../services/api';
import ErrorHandler from '../services/errorHandler';
import { Actions } from 'react-native-router-flux';
import { Quote } from '../components/Stock/Quote';
import { LoadingScreen } from './';

const initialData = {
  symbol: 'AAPL',
};

function StockScreen() {
  const [quote, setQuote] = useState(null);
  const [updateTimestamp, setUpdateTimestamp] = useState(null);
  const { symbol } = initialData;
  const updatedAt = new Date();

  //useRef hook to keep the timeout from picking up on stale state
  const quoteRef = useRef(quote);
  quoteRef.current = quote;
  const updateTimestampRef = useRef(updateTimestamp);
  updateTimestampRef.current = updateTimestamp;

  useEffect(() => {
    //make the first call to the api when the component is initially mounted, but don't do it again on any subsequent rerenders. We'll handle that in another hook.
    Api.getQuoteData(symbol)
      .then(response => {
        setQuote(response.data);
        setUpdateTimestamp(updatedAt);
      })
      .catch(error => {
        ErrorHandler.renderErrorNotification(error);
      });
  }, []);

  useEffect(() => {
    //now we fire the setTimeout & add the state dependency so it it triggers again after the initial update
    setTimeout(() => {
      Api.getQuoteData(symbol)
        .then(response => {
          setQuote(response.data);
          setUpdateTimestamp(updatedAt);
        })
        .catch(error => {
          ErrorHandler.renderErrorNotification(error);
        });
    }, 5000);
  }, [symbol, updatedAt]);

  const handleAddToWatchlist = () => {
    //TODO addtowatchlist
  };

  if (!quote) return <LoadingScreen />;

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => Actions.pop()}>
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
          <Button transparent>
            <Icon name="more" />
          </Button>
        </Right>
      </Header>
      <Quote quote={quote} updateTimestamp={updateTimestamp} />
      <Chart symbol={quote.symbol} />
    </Container>
  );
}

export default StockScreen;
