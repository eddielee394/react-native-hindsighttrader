import React, { useEffect, useState } from 'react';
import { Container, Text } from 'native-base';
import Chart from '../components/Stock/Chart';
import Api from '../services/api';

const StockScreen = props => {
  return (
    <Container>
      <Chart symbol="tsla" />
    </Container>
  );
};

export default StockScreen;
