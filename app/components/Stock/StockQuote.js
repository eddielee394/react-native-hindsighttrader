import React from 'react';
import {
  Icon,
  Item,
  Left,
  Right,
  Subtitle,
  Text,
  Title,
  View,
} from 'native-base';
import { StyleSheet } from 'react-native';
import theme from '../../theme';
import {
  formatPercent,
  formatTimeFromNow,
  isPositiveChange,
} from '../../utils/helpers';
import { useSelector } from 'react-redux';

export function StockQuote(props) {
  const { updateTimestamp } = props;
  const quote = useSelector(({ stock }) => {
    return stock.quote.data;
  });

  const handlePosNegStyle = val => {
    return val < 0 ? styles.negative : styles.positive;
  };

  const _renderQuoteChangeIcon = () => {
    return isPositiveChange(quote.change) ? 'caretup' : 'caretdown';
  };

  return (
    <Item style={styles.container}>
      <Left style={styles.quoteContainer}>
        <Title>
          {quote.latestPrice}{' '}
          <Icon
            name={_renderQuoteChangeIcon()}
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
      <View style={styles.updateTimestampContainer}>
        <Text note style={styles.updateTimestampText}>
          Last updated {formatTimeFromNow(updateTimestamp)}
        </Text>
      </View>
    </Item>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.dark.blue2,
  },
  negative: {
    color: theme.dark.red,
  },
  positive: {
    color: theme.dark.green,
  },
  quoteIcon: {
    fontSize: theme.dark.noteFontSize,
    marginLeft: 5,
  },
  baContainer: {
    flex: 0,
    paddingHorizontal: 10,
    marginTop: -10,
    marginBottom: 10,
    justifyContent: 'flex-end',
  },
  baPrice: { paddingTop: 10, paddingBottom: 5 },
  baSize: {
    fontSize: 11,
  },
  quoteContainer: {
    flex: 1,
    marginTop: -15,
  },
  updateTimestampContainer: {
    position: 'absolute',
    right: 25,
    bottom: 5,
  },
  updateTimestampText: {
    flex: 1,
    fontSize: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  spinner: {
    height: 250,
    justifyContent: 'center',
  },
});
