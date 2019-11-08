import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Icon, Left, Right, Spinner, Subtitle, Text, Title } from 'native-base';
import theme from '../../theme';
import {
  formatPercent,
  formatTimeFromNow,
  isPositiveChange,
} from '../../utils/helpers';

export function StockQuote(props) {
  const { updateTimestamp } = props;
  const quote = useSelector(({ stock }) => stock.quote.data);
  const {
    latestPrice,
    change,
    changePercent,
    bidPrice,
    bidSize,
    askPrice,
    askSize,
  } = quote;

  const handlePosNegStyle = val => {
    return val < 0 ? styles.negative : styles.positive;
  };

  const _renderQuoteChangeIcon = isPositiveChange(change)
    ? 'caretup'
    : 'caretdown';

  if (!latestPrice)
    return (
      <View style={styles.container}>
        <Spinner style={styles.spinner} />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.quoteDataContainer}>
        <Left style={styles.quoteContainer}>
          <Title>
            {latestPrice ?? <Spinner />}{' '}
            <Icon
              name={_renderQuoteChangeIcon}
              type="AntDesign"
              style={[handlePosNegStyle(change), styles.quoteIcon]}
            />
          </Title>
          <Subtitle note style={handlePosNegStyle(change)}>
            {change} ({formatPercent(changePercent)})
          </Subtitle>
        </Left>
        <Right style={styles.baContainer}>
          <Text style={styles.baPrice}>{bidPrice}</Text>
          <Text note style={styles.baSize}>
            Bid Size: {bidSize}
          </Text>
        </Right>
        <Right style={styles.baContainer}>
          <Text style={styles.baPrice}>{askPrice}</Text>
          <Text note style={styles.baSize}>
            Ask Size: {askSize}
          </Text>
        </Right>
      </View>
      <View style={styles.updateTimestampContainer}>
        <Text note style={styles.updateTimestampText}>
          Last updated {formatTimeFromNow(updateTimestamp)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingBottom: 10,
    backgroundColor: theme.dark.blue2,
  },
  negative: {
    color: theme.dark.red,
  },
  positive: {
    color: theme.dark.green,
  },
  quoteDataContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 60,
  },
  quoteContainer: {
    flex: 3,
  },
  quoteIcon: {
    fontSize: theme.dark.noteFontSize,
    marginLeft: 5,
  },
  baContainer: {
    flex: 1,
  },
  baPrice: { paddingTop: 10, paddingBottom: 5 },
  baSize: {
    fontSize: 11,
  },
  updateTimestampContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  updateTimestampText: {
    fontSize: 8,
  },
});
