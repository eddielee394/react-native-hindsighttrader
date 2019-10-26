import React, { useEffect, useState } from 'react';
import { Modal, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Actions as RouteActions } from 'react-native-router-flux';
import {
  Button,
  Container,
  Header,
  Icon,
  Left,
  Right,
  Subtitle,
  Title,
  View,
} from 'native-base';
import WatchlistList from './WatchlistList';
import WatchlistSymbolList from './WatchlistSymbolList';
import * as Actions from './store/actions';

function WatchlistContainer(props) {
  const [showModal, setShowModal] = useState(false);

  const watchlist = useSelector(({ watchlist }) => watchlist);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getWatchlists());
    dispatch(Actions.getWatchlist(watchlist.id));
  }, [dispatch]);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const _renderModal = () => (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <WatchlistList handleShowModal={handleShowModal} />
    </Modal>
  );

  return (
    <Container>
      <Header>
        <Left>
          <Button onPress={() => RouteActions.pop()} transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <TouchableHighlight onPress={handleShowModal}>
          <View style={{ alignItems: 'flex-start' }}>
            <Title>Watchlist</Title>
            <Subtitle>{watchlist.name}</Subtitle>
          </View>
        </TouchableHighlight>
        <View>
          <Button transparent light>
            <Icon name="md-arrow-dropdown" />
          </Button>
        </View>
        <Right>
          <Button onPress={() => RouteActions.searchScreen()} transparent>
            <Icon name="search" />
          </Button>
        </Right>
      </Header>
      <WatchlistSymbolList />
      {_renderModal()}
    </Container>
  );
}

export default WatchlistContainer;
