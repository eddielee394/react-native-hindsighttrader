import React from 'react';
import { StyleSheet } from 'react-native';
import { VictoryGroup, VictoryLine, VictoryTheme } from 'victory-native';
import theme from '../../theme';

export function WatchlistChart(props) {
  const { data } = props;

  const positiveOrNegativeOverTime = (x, y) => {
    return x > y
      ? { ...svgStyles.chartLine, ...svgStyles.negative }
      : { ...svgStyles.chartLine, ...svgStyles.positive };
  };

  const chartData = data
    .filter(interval => {
      return interval.close || interval.uClose;
    })
    .map(interval => ({
      close: interval.close || interval.uClose,
      label: interval.label,
    }));

  return (
    <VictoryGroup
      style={styles.chartContainer}
      height={160}
      width={325}
      theme={VictoryTheme.material}>
      <VictoryLine
        data={chartData}
        style={positiveOrNegativeOverTime(
          chartData[0].close,
          chartData[chartData.length - 1].close,
        )}
        y="close"
        x="label"
        interpolation="monotoneX"
      />
    </VictoryGroup>
  );
}

const styles = StyleSheet.create({
  chartContainer: {},
});

const svgStyles = {
  positive: { data: { stroke: theme.dark.green } },
  negative: { data: { stroke: theme.dark.red } },
  chartLine: {
    labels: {
      fill: 'transparent',
    },
    data: { strokeWidth: 3 },
  },
};
