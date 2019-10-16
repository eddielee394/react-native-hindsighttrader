import React, { useEffect, useState } from 'react';
import { Body, Icon, Input, Item, Left, ListItem, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import theme from '../../theme';
import Autocomplete from 'native-base-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import * as stockActions from '../Stock/store/actions';
import * as searchActions from './store/actions';
import { Actions as RouteActions } from 'react-native-router-flux';

function SearchContainer() {
  const [query, setQuery] = useState('');
  const results = useSelector(({ search }) => search.data.results);
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
        <Left>
          <Text>{result.symbol}</Text>
        </Left>
        <Body>
          <Text>{result.companyName}</Text>
        </Body>
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
  listContainer: {
    backgroundColor: theme.containerBgColor,
    position: 'relative',
  },
});

export default SearchContainer;
