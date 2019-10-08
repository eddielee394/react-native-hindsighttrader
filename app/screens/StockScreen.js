import React from 'react';
import { Container, Text } from 'native-base';
import StockChart from '../components/Stock/StockChart';

const StockScreen = props => {
  return (
    <Container>
      <StockChart />
    </Container>
  );
};

export default StockScreen;
