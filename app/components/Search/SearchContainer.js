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
import _ from 'lodash';

function SearchContainer() {
  const [query, setQuery] = useState('');
  const results = useSelector(({ search }) => search.data.results);
  const watchlist = useSelector(({ watchlist }) => watchlist);
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
    let q = text.trim();

    setQuery(q);
  };

  const handleAddToWatchlist = symbol => {
    return dispatch(watchlistActions.addWatchlistSymbol(symbol));
  };

  const handleWatchlistIconStyles = symbol => {
    return _.includes(watchlist.symbols, symbol)
      ? styles.negative
      : styles.positive;
  };

  const renderWatchlistIcon = symbol => {
    return _.includes(watchlist.symbols, symbol)
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
    return (
      <ListItem
        key={result.symbol}
        onPress={() => handleSelectItem(result.symbol)}>
        <Left style={styles.leftContainer}>
          <Text>{result.symbol}</Text>
        </Left>
        <Body style={styles.bodyContainer}>
          <Text numberOfLines={2}>{result.companyName}</Text>
        </Body>
        <View styl={styles.rightContainer}>
          <TouchableOpacity onPress={() => handleAddToWatchlist(result.symbol)}>
            <Icon
              name={renderWatchlistIcon(result.symbol)}
              style={[handleWatchlistIconStyles(result.symbol), styles.icon]}
            />
          </TouchableOpacity>
        </View>
      </ListItem>
    );
  };

  return (
    <Autocomplete
      listContainerStyle={{ flex: 0 }}
      listStyle={styles.listContainer}
      autoCapitalize="none"
      autoCorrect={false}
      data={results}
      renderTextInput={_renderInput}
      defaultValue={query}
      hideResults={results.length < 1 || query === ''}
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
  listContainer: {
    backgroundColor: theme.containerBgColor,
    position: 'relative',
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
