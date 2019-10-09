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

const renderInput = props => {
  return (
    <Item>
      <Icon active name="search" />
      <Input {...props} />
    </Item>
  );
};

const renderListItem = result => {
  return (
    <ListItem key={result.symbol}>
      <Left>
        <Text>{result.symbol}</Text>
      </Left>
      <Body>
        <Text>{result.companyName}</Text>
      </Body>
    </ListItem>
  );
};

const SearchScreen = props => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    Api.getSymbols().then(d => {
      setData(d);
    });
  }, [data]);

  useEffect(() => {
    filterSearchResults(query);
  }, [query]);

  const handleSelectItem = (item, index) => {
    //TODO when item is selected display the stock view
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

  return (
    <Container>
      <Autocomplete
        listContainerStyle={{ flex: 0 }}
        listStyle={styles.listContainer}
        autoCapitalize="none"
        autoCorrect={false}
        data={results}
        renderTextInput={renderInput}
        defaultValue={query}
        hideResults={results.length < 1 || query === ''}
        onChangeText={handleSearch}
        placeholder="Enter symbol"
        renderItem={renderListItem}
        keyboardShouldPersistTaps="always"
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: theme.containerBgColor,
    position: 'relative',
  },
});

export default SearchScreen;
