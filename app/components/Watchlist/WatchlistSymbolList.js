import React, { useEffect, useState } from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
} from 'native-base';
import Api from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

//TODO this whole component needs to be completely re-jiggered
export const WatchlistSymbolList = props => {
  const [logo1, setLogo1] = useState('');
  const [logo2, setLogo2] = useState('');

  const { style, themedStyle, ...restProps } = props;
  const watchlists = useSelector(({ watchlists }) => watchlists.data);
  const watchlist = useSelector(({ watchlist }) => watchlist.data);
  const dispatch = useDispatch();

  useEffect(() => {}, [watchlists]);

  const data = [
    {
      symbol: 'AAPL',
      companyName: 'Apple Inc',
      bidPrice: 256.35,
      askPrice: 258.35,
      latestPrice: 256.35,
      logo: logo1,
    },
    {
      symbol: 'TSLA',
      companyName: 'Tesla Inc.',
      bidPrice: 356.35,
      askPrice: 358.35,
      latestPrice: 359.78,
      logo: logo2,
    },
  ];
  const handleItemPress = value => {
    console.tron.log('watchlist Item press', value);
  };

  const handleAddWatchlist = () => {
    console.tron.log('watchlist add button press');
    dispatch(Actions.createWatchlist('test watchlist'));
  };

  const handleDeleteWatchlist = () => {
    dispatch(Actions.deleteWatchlist('ed0d22dc-7f32-4b71-9cf8-d46310728aaa'));
    console.tron.log('watchlist delete button press');
  };

  return (
    <Container>
      <List>
        {data.map(d => (
          <ListItem
            key={d.symbol}
            onPress={() => handleItemPress(d.symbol)}
            avatar>
            <Left>
              <Thumbnail small source={{ uri: d.logo }} />
            </Left>
            <Body>
              <Text>{d.symbol}</Text>
              <Text>{d.companyName}</Text>
            </Body>
            <Right>
              <Text>{d.latestPrice}</Text>
              <Text note>
                B:{d.bidPrice}/A:{d.askPrice}
              </Text>
            </Right>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
