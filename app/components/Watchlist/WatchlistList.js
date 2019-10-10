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
} from 'native-base';
import Api from '../../services/api';

export const WatchlistList = props => {
  const [logo1, setLogo1] = useState('');
  const [logo2, setLogo2] = useState('');

  const { style, themedStyle, ...restProps } = props;

  useEffect(() => {
    Api.getLogo('AAPL').then(response => setLogo1(response.data.url));
    Api.getLogo('TSLA').then(response => setLogo2(response.data.url));
  }, []);
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
  const onItemPress = index => {
    // Handle item press
  };
  console.log('data', data);

  return (
    <List>
      {console.log(
        'watchlist data:',
        data,
        'logo1',
        'logo1',
        logo1,
        'logo2',
        logo2,
      )}
      {data.map(d => (
        <ListItem key={d.symbol} avatar>
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
  );
};
