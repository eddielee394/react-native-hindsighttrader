import React, { useEffect, useState } from 'react';
import {
  Body,
  Container,
  Icon,
  Input,
  Item,
  Left,
  ListItem,
  Text,
} from 'native-base';
import { StyleSheet } from 'react-native';
import theme from '../theme';
import Autocomplete from 'native-base-autocomplete';
import Api from '../services/api';
import { useDispatch } from 'react-redux';
import * as Actions from '../store/actions';

function SearchScreen(props) {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    Api.getSymbols().then(d => {
      setData(d);
    });
  }, [data]);

  useEffect(() => {
    filterSearchResults(query);
  }, [query]);

  const handleSelectItem = (item, index) => {
    dispatch(Actions.setSymbol(item));
    console.log('handleSelectedItem', item);
  };

  const filterSearchResults = query => {
    if (query === '') {
      return [];
    }

    const results = data
      .filter(d => d.symbol.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 20);

    setResults(results);
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
    <Container>
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
    </Container>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: theme.containerBgColor,
    position: 'relative',
  },
});

export default SearchScreen;
