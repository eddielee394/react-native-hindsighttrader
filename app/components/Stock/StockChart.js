import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Container, Item, Spinner, Text } from 'native-base';
import {
  LineSegment,
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
} from 'victory-native';
import theme from '../../theme';
import { formatDateMonthDay } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

export function StockChart(props) {
  const symbol = useSelector(({ stock }) => stock.data.symbol);
  const chart = useSelector(({ stock }) => stock.chart.data);
  const chartRange = useSelector(({ stock }) => stock.chart.range);
  const isLoading = useSelector(({ stock }) => stock.chart.isLoading);
  const ranges = Object.keys(Actions.RANGE).map(key => Actions.RANGE[key]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getChart(symbol, chartRange));
  }, [dispatch, chartRange]);

  const handleSelectRange = range => {
    dispatch(Actions.toggleRange(range));
  };

  const label = <VictoryLabel style={svgStyles.chartLabel} />;
  const lineSegment = <LineSegment style={svgStyles.chartGrid} type={'grid'} />;

  const _renderRangeContainer = () => (
    <Item>
      {ranges.map(({ range, label }, index) => (
        <Button
          key={index}
          bordered={range === chartRange}
          onPress={() => handleSelectRange(range)}
          style={styles.rangesButton}>
          <Text style={[styles.rangesLabel]}>{label}</Text>
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
