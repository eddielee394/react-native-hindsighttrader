import React, { useEffect, useState } from 'react';
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
import { WatchlistList } from './WatchlistList';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import { Modal, TouchableHighlight } from 'react-native';
import { WatchlistSymbolList } from './WatchlistSymbolList';

function WatchlistContainer(props) {
  const [showModal, setShowModal] = useState(false);

  const watchlists = useSelector(({ watchlists }) => watchlists.data);
  const watchlist = useSelector(({ watchlist }) => watchlist.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.getWatchlists());
    dispatch(Actions.getWatchlist(watchlist.id));
  }, [dispatch]);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const _renderModal = () => (
    <Container>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <WatchlistList handleShowModal={handleShowModal} />
      </Modal>
    </Container>
  );
  
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
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
          <Button transparent>
            <Icon name="ios-create" />
          </Button>
        </Right>
      </Header>
      <WatchlistSymbolList />
      {_renderModal()}
    </Container>
  );
}

export default WatchlistContainer;
