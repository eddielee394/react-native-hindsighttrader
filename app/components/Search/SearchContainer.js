import React, { useEffect, useState } from 'react';
import {
  Body,
  Icon,
  Input,
  Item,
  Left,
  ListItem,
  Text,
  View,
} from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../../theme';
import Autocomplete from 'native-base-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import * as stockActions from '../Stock/store/actions';
import * as searchActions from './store/actions';
import * as watchlistActions from '../Watchlist/store/actions';
import { Actions as RouteActions } from 'react-native-router-flux';
import { includes } from 'lodash';

function SearchContainer() {
  const [query, setQuery] = useState('');
  const results = useSelector(({ search }) => search.data.results);
  const symbols = useSelector(({ watchlist }) => watchlist.symbols);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchActions.getSymbols());
  }, []);

  useEffect(() => {
    dispatch(searchActions.getResults(query));
  }, [query]);

  const handleSelectItem = item => {
    dispatch(stockActions.setSymbol(item));
    RouteActions.stockScreen();
  };

  const handleSearch = text => {
    const q = text.trim();

    setQuery(q);
  };

  const handleAddToWatchlist = symbol => {
    return dispatch(watchlistActions.addWatchlistSymbol(symbol));
  };

  const handleWatchlistIconStyles = symbol => {
    return includes(symbols, symbol) ? styles.negative : styles.positive;
  };
  
  const renderWatchlistIcon = symbol => {
    return includes(symbols, symbol)
      ? 'md-remove-circle-outline'
      : 'md-add-circle-outline';
  };

  const _renderInput = props => {
    return (
      <Item>
        <Icon active name="search" />
        <Input {...props} />
      </Item>
    );
  };

  const _renderListItem = result => {
    const { symbol, companyName } = result;

    return (
      <ListItem key={symbol} onPress={() => handleSelectItem(symbol)}>
        <Left style={styles.leftContainer}>
          <Text>{symbol}</Text>
        </Left>
        <Body style={styles.bodyContainer}>
          <Text numberOfLines={2}>{companyName}</Text>
        </Body>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={() => handleAddToWatchlist(symbol)}>
            <Icon
              name={renderWatchlistIcon(symbol)}
              style={[handleWatchlistIconStyles(symbol), styles.icon]}
            />
          </TouchableOpacity>
        </View>
      </ListItem>
    );
  };

  return (
    <Autocomplete
      listContainerStyle={styles.listContainer}
      listStyle={styles.list}
      autoCapitalize="none"
      autoCorrect={false}
      data={results}
      renderTextInput={_renderInput}
      defaultValue={query}
      onChangeText={handleSearch}
      placeholder="Enter symbol"
      renderItem={_renderListItem}
      keyboardShouldPersistTaps="always"
    />
  );
}

const styles = StyleSheet.create({
  positive: { color: theme.dark.green },
  negative: { color: theme.dark.red },
  list: {
    backgroundColor: theme.containerBgColor,
    position: 'relative',
  },
  listContainer: {
    flex: 0,
  },
  icon: {
    fontSize: 36,
    marginLeft: 10,
  },
  iconRight: {
    color: theme.dark.orange,
  },
  leftContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  rightContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchContainer;
