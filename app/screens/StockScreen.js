import React, { useEffect } from 'react';
import StockContainer from '../components/Stock/StockContainer';
import { Actions as RouteActions } from 'react-native-router-flux';
import { Button, Container } from 'native-base';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../components/Stock/store/actions';

function StockScreen(props) {
  const timerId = useSelector(({ stock }) => stock.quote.timerId);
  const { navigation } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const focusListener = navigation.addListener('didBlur', payload => {
      dispatch(Actions.clearQuoteTimer(timerId));
    });

    return () => {
      focusListener.remove();
    };
  }, [dispatch, timerId]);

  return (
    <Container>
      <StockContainer />
    </Container>
  );
}

export default StockScreen;
