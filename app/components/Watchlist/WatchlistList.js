import React from 'react';
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
} from 'native-base';
import Api from '../../services/api';

export const WatchlistList = props => {
  const { style, themedStyle, ...restProps } = props;
  const data = [
    {
      symbol: 'AAPL',
      companyName: 'Apple Inc',
      bidPrice: 256.35,
      askPrice: 258.35,
      latestPrice: 259,
    },
    {
      symbol: 'TSLA',
      companyName: 'Tesla Inc.',
      bidPrice: 356.35,
      askPrice: 358.35,
      latestPrice: 359,
    },
  ];
  const onItemPress = index => {
    // Handle item press
  };
  console.log('data', data);

  return (
    <List>
      {data.map(d => (
        <ListItem key={d.symbol} avatar>
          <Left>
            <Thumbnail source={{}} />
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
  );
};
