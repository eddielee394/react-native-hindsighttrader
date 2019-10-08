import React, { useEffect, useState } from 'react';
import { VictoryChart, VictoryCandlestick } from 'victory-native';
import Api from '../../services/api';
import { Container } from 'native-base';

const initialCandleData = [
  { x: 1, open: 9, close: 30, high: 56, low: 7 },
  { x: 2, open: 80, close: 40, high: 120, low: 10 },
  { x: 3, open: 50, close: 80, high: 90, low: 20 },
  { x: 4, open: 70, close: 22, high: 70, low: 5 },
  { x: 5, open: 20, close: 35, high: 50, low: 10 },
  { x: 6, open: 35, close: 30, high: 40, low: 3 },
  { x: 7, open: 30, close: 90, high: 95, low: 30 },
  { x: 8, open: 80, close: 81, high: 83, low: 75 },
];

export default function StockChart(props) {
  // const [transitionData, setTransitionData] = useState(getTransitionData());

  const [candleData, setCandleData] = useState(initialCandleData);

  const intervals = () => {
    window.setInterval(() => {
      Api.getIntradayPrice('msft', '1d').then(data =>
        console.log('data', data),
      );
    }, 20000);
  };

  useEffect(() => {
    Api.getChartData('aapl', '1d', 78).then(data =>
      console.log('chartData', data),
    );
    // intervals();
    //
    // setCandleData();
    // const updateDataHandle = setInterval(() => {
    //   setTransitionData(getTransitionData());
    // }, 3000);
    // return () => {
    //   clearInterval(updateDataHandle);
    // };
  }, []);

  return (
    <Container>
      {console.log('candleData: ', candleData)}
      <VictoryChart>
        <VictoryCandlestick data={candleData} />
      </VictoryChart>
    </Container>
  );
}

function counter() {
  let count = 1;
  ++count;
}
StockChart.navigationOptions = {
  headerTitle: 'VictoryChart',
};
