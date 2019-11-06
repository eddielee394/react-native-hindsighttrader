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

  const handlePosNegStyle = val => {
    return val < 0 ? styles.negative : styles.positive;
  };

  const _renderQuoteChangeIcon = isPositiveChange(quote.change)
    ? 'caretup'
    : 'caretdown';

  if (!quote.latestPrice)
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
            {quote.latestPrice ?? <Spinner />}{' '}
            <Icon
              name={_renderQuoteChangeIcon}
              type="AntDesign"
              style={[handlePosNegStyle(quote.change), styles.quoteIcon]}
            />
          </Title>
          <Subtitle note style={handlePosNegStyle(quote.change)}>
            {quote.change} ({formatPercent(quote.changePercent)})
          </Subtitle>
        </Left>
        <Right style={styles.baContainer}>
          <Text style={styles.baPrice}>{quote.bidPrice}</Text>
          <Text note style={styles.baSize}>
            Bid Size: {quote.bidSize}
          </Text>
        </Right>
        <Right style={styles.baContainer}>
          <Text style={styles.baPrice}>{quote.askPrice}</Text>
          <Text note style={styles.baSize}>
            Ask Size: {quote.askSize}
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
  quoteIcon: {
    fontSize: theme.dark.noteFontSize,
    marginLeft: 5,
  },
  baContainer: {
    flex: 0,
    paddingLeft: 10,
  },
  baPrice: { paddingTop: 10, paddingBottom: 5 },
  baSize: {
    fontSize: 11,
  },
  quoteContainer: {
    flex: 1,
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
