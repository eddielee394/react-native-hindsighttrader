import React, { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'native-base';
import theme from '../../../theme';
import { formatTimeFromNow } from '../../../utils/helpers';
import * as Actions from '../store/actions';

export function StockNews(props) {
  const dispatch = useDispatch();
  const symbol = useSelector(({ stock }) => stock.data.symbol);
  const data = useSelector(({ stock }) => stock.news.data);

  useEffect(() => {
    dispatch(Actions.getNewsData(symbol));
  }, [dispatch, symbol]);

  return data.map(({ image, title, source, timeStamp }) => (
    <View style={styles.cardContainer}>
      <View style={styles.cardItemContainer}>
        <View style={styles.thumbContainer}>
          <Image source={{ uri: image }} style={styles.thumb} />
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={2} style={{ fontSize: 16 }}>
              {title}
            </Text>
          </View>
          <View style={styles.footerContainer}>
            <Text style={[styles.authorText, styles.smallText]}>{source}</Text>
            <Text style={[styles.timeStampText, styles.smallText]} note>
              {formatTimeFromNow(timeStamp)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  ));
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: theme.dark.blue3,
    elevation: 3,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 30,
  },
  cardItemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  thumbContainer: {
    margin: 10,
    elevation: 4,
    flex: 1,
  },
  thumb: {
    marginTop: -30,
    borderRadius: 10,
    height: 100,
    width: 120,
    backgroundColor: 'white',
  },
  bodyContainer: {
    padding: 10,
    flex: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    flex: 3,
  },
  footerContainer: {
    flexDirection: 'row',
    flex: 0,
  },
  authorText: {
    flex: 1,
  },
  timeStampText: {
    flex: 1,
    fontStyle: 'italic',
  },
  smallText: {
    flex: 1,
    fontSize: 12,
  },
});
