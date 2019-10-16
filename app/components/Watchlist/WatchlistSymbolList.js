import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Actions as RouteActions } from 'react-native-router-flux';
import { Container, Icon, Text, View } from 'native-base';
import * as stockActions from '../Stock/store/actions';
import * as watchlistActions from './store/actions';
import SwipeableRow from '../UI/SwipeableRow';
import LoadingScreen from '../../screens/LoadingScreen';
import { images } from '../../assets/images';
import theme from '../../theme';

//TODO this whole component needs to be completely re-jiggered
function WatchlistSymbolList(props) {
  const [damping] = useState(1 - 0.6);
  const [tension] = useState(300);

  const watchlist = useSelector(({ watchlist }) => watchlist);
  const data = useSelector(({ watchlist }) => watchlist.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(watchlistActions.getWatchlistData(watchlist.symbols));
  }, [dispatch]);

  const handleGetSymbol = symbol => {
    dispatch(stockActions.setSymbol(symbol));
    RouteActions.stockScreen();
  };

  const handleDeleteSymbol = symbol => {
    dispatch(watchlistActions.deleteWatchlistSymbol(symbol, watchlist.id));
  };

  if (!data) return <LoadingScreen />;

  const formattedQuotes = Object.keys(data).map(
    (key, value) => data[key].quote,
  );

  const _renderRows = () =>
    formattedQuotes.map(item => (
      <SwipeableRow
        key={item.symbol}
        rowStyle={styles.rowStyle}
        drawerBackgroundColor={styles.rowDrawerBackgroundColor}
        buttonCallback={() => handleDeleteSymbol(item.symbol)}
        buttonImage={images.iconTrash}
        damping={damping}
        tension={tension}>
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={() => handleGetSymbol(item.symbol)}>
            <View style={styles.iconLeftContainer}>
              <Icon name="md-reorder" style={styles.icon} />
            </View>
          </TouchableOpacity>
          <View style={styles.rowTitleContainer}>
            <Text style={styles.rowTitle}>{item.symbol}</Text>
            <Text style={styles.rowSubtitle}>{item.companyName}</Text>
          </View>
          <View style={styles.rowChartContainer}>
            <Text note>Chart goes here</Text>
          </View>
          <View style={styles.contentRightContainer}>
            <Text style={styles.textMedium}>{item.latestPrice.toFixed(2)}</Text>
            <Text style={styles.textSmall} note>
              B:{item.iexBidPrice.toFixed(2)}
            </Text>
            <Text style={styles.textSmall} note>
              A:{item.iexAskPrice.toFixed(2)}
            </Text>
          </View>
        </View>
      </SwipeableRow>
    ));

  return <Container>{_renderRows()}</Container>;
}

const styles = StyleSheet.create({
  rowDrawerBackgroundColor: {
    backgroundColor: theme.dark.brandDanger,
  },
  rowStyle: {
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: theme.dark.brandPrimary,
  },
  rowTitleContainer: {
    flex: 2,
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  rowSubtitle: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    marginVertical: 15,
  },
  button: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: theme.dark.listBorderColor,
  },
  iconLeftContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    // borderColor: theme.dark.blue2,
    // borderWidth: 1,
    margin: 20,
    marginLeft: 0,
    // backgroundColor: theme.dark.blue1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 36,
  },
  iconLeft: {
    color: theme.dark.brandSuccess,
  },
  contentRightContainer: {
    flex: 2,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rowChartContainer: {
    flex: 3,
    height: 50,
    marginHorizontal: 20,
    borderColor: theme.dark.blue2,
    borderWidth: 1,
    backgroundColor: theme.dark.blue1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSmall: {
    fontSize: 12,
  },
  textMedium: {
    fontSize: 15,
  },
});

export default WatchlistSymbolList;
