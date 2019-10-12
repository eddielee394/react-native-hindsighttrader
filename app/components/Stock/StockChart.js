import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Container, Spinner, Button, Item } from 'native-base';
import {
  LineSegment,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryTheme,
  VictoryCandlestick,
} from 'victory-native';
import Api from '../../services/api';
import theme from '../../theme';
import { formatDateMonthDay } from '../../utils/helpers';
import ErrorHandler from '../../services/errorHandler';

const ranges = [
  { label: '1m', range: '1m' },
  { label: '3m', range: '3m' },
  { label: '6m', range: '6m' },
  { label: '1y', range: '1y' },
];

export function StockChart(props) {
  const [range, setRange] = useState(ranges[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [chart, setChart] = useState(null);
  const { symbol } = props;

  useEffect(() => {
    setIsLoading(true);
    Api.getChartData(symbol, range.range)
      .then(response => {
        setChart(response.data.chart);
        setIsLoading(false);
      })
      .catch(error => {
        ErrorHandler.renderErrorNotification(error);
      });
  }, [symbol, range]);

  const handleSelectRange = item => {
    setRange(item);
  };

  const label = <VictoryLabel style={svgStyles.chartLabel} />;
  const lineSegment = <LineSegment style={svgStyles.chartGrid} type={'grid'} />;

  const _renderRangeContainer = () => (
    <Item>
      {ranges.map((item, index) => (
        <Button
          key={index}
          bordered={item.range === range.range}
          onPress={() => handleSelectRange(item)}
          style={styles.rangesButton}>
          <Text style={[styles.rangesLabel]}>{item.label}</Text>
        </Button>
      ))}
    </Item>
  );

  const _renderChartContainer = () => (
    <Item style={styles.chartContainer}>
      <VictoryChart height={250} theme={VictoryTheme.material}>
        <VictoryAxis
          crossAxis
          gridComponent={lineSegment}
          tickCount={4}
          tickLabelComponent={<VictoryLabel style={svgStyles.chartLabel} />}
          tickFormat={t => formatDateMonthDay(t)}
        />
        <VictoryAxis
          dependentAxis
          gridComponent={lineSegment}
          tickLabelComponent={label}
          tickFormat={t => t.toLocaleString('en-US')}
        />
        <VictoryCandlestick
          data={chart}
          candleColors={{
            positive: svgStyles.positive,
            negative: svgStyles.negative,
          }}
          y="close"
          x="label"
        />
      </VictoryChart>
    </Item>
  );

  return (
    <Container style={styles.container}>
      {_renderRangeContainer()}
      {isLoading ? <Spinner style={styles.spinner} /> : _renderChartContainer()}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 250,
  },
  chartContainer: {
    flex: 0,
    marginTop: -20,
  },
  rangesButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 12,
    borderBottomColor: theme.dark.blue3,
  },
  rangesLabel: {
    color: theme.dark.brandDark,
    fontSize: 12,
  },
  spinner: {
    height: 250,
    justifyContent: 'center',
  },
});

const svgStyles = {
  positive: theme.dark.green,
  negative: theme.dark.red,
  chartGrid: {
    stroke: theme.dark.blue2,
  },
  chartLabel: {
    fill: theme.dark.brandDark,
    fontSize: '11',
    stroke: 'transparent',
  },
};
