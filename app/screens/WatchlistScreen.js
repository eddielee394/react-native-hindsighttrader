import React, { useState } from 'react';
import { Container, Header } from 'native-base';
import WatchlistContainer from '../components/Watchlist/WatchlistContainer';

function WatchlistScreen(props) {
  return (
    <Container>
      <WatchlistContainer />
    </Container>
  );
}

export default WatchlistScreen;
