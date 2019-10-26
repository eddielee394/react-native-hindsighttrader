import React, { useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Item,
  Right,
  Text,
  Title,
  View,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import { images } from '../../assets/images';
import theme from '../../theme';
import Dialog from 'react-native-dialog';
import SwipeableList from '../UI/SwipeableList';

function WatchlistList(props) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [watchlistName, setWatchlistName] = useState('');

  const watchlists = useSelector(({ watchlists }) => watchlists);
  const watchlist = useSelector(({ watchlist }) => watchlist);
  const { handleShowModal } = props;

  const dispatch = useDispatch();

  const showConfirmDialogue = (content, callback = null) => {
    //TODO-EP move showConfirmDialogue into an action
    const defaultButtons = [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => (callback && callback()) || console.log('ok!'),
      },
    ];
    const title = (content && content.title) || 'Are you sure?';
    const message =
      (content && content.message) ||
      'This will permenantly remove this item.  Click "OK" to continue';
    const buttons = (content && content.buttons) || defaultButtons;
    const options = (content && content.options) || {};

    return Alert.alert(title, message, buttons, options);
  };

  const handleToggleWatchlist = id => {
    dispatch(Actions.toggleWatchlist(id));
  };

  const handleAddWatchlist = () => {
    dispatch(Actions.createWatchlist(watchlistName));
    setDialogVisible(false);
  };

  const handleDeleteWatchlist = data => {
    const { id } = data;

    if (watchlist.id === id) {
      const content = {
        title: "Whoa! That's not gonna work...",
        message: "You can't delete an active watchlist.",
        buttons: [{ text: 'OK' }],
      };
      return showConfirmDialogue(content);
    }
    return showConfirmDialogue(null, () =>
      dispatch(Actions.deleteWatchlist(id)),
    );
  };

  const _renderItem = (data, rowMap) => {
    const { item } = data;

    return (
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => handleToggleWatchlist(item.id)}>
          <View style={styles.iconLeftContainer}>
            {item.id === watchlist.id && (
              <Icon
                name="md-checkmark-circle-outline"
                style={styles.iconLeft}
              />
            )}
          </View>
        </TouchableOpacity>
        <View>
          <Text style={styles.rowTitle}>{item.name}</Text>
          <Text style={styles.rowSubtitle}>Category Placeholder</Text>
        </View>
        <View style={styles.iconRightContainer}>
          <Icon name="md-reorder" style={styles.icon} />
        </View>
      </View>
    );
  };

  const _renderCreateDialogue = () => (
    <Dialog.Container
      visible={dialogVisible}
      contentStyle={styles.dialogContainer}>
      <Dialog.Title style={[styles.dialogText, styles.dialogTitle]}>
        Add Watchlist
      </Dialog.Title>
      <Dialog.Description style={[styles.dialogText, styles.dialogDescription]}>
        Enter a watchlist name
      </Dialog.Description>
      <Dialog.Input
        underlineColorAndroid={theme.dark.blue3}
        style={[styles.dialogText, styles.dialogInput]}
        onChangeText={text => setWatchlistName(text)}
      />
      <Dialog.Button
        label="Cancel"
        color={theme.dark.orange}
        onPress={() => setDialogVisible(false)}
      />
      <Dialog.Button
        label="OK"
        color={theme.dark.orange}
        onPress={handleAddWatchlist}
      />
    </Dialog.Container>
  );

  return (
    <Container>
      <Header>
        <Body noLeft={true}>
          <Title>My Watchlists</Title>
        </Body>
        <Right>
          <Button onPress={handleShowModal} transparent>
            <Icon name="md-close" />
          </Button>
        </Right>
      </Header>
      <Content padder>
        <Item style={styles.buttonContainer}>
          <Button
            onPress={() => setDialogVisible(true)}
            style={styles.button}
            block
            success
            bordered>
            <Text>Create Watchlist</Text>
          </Button>
        </Item>
        <SwipeableList
          data={watchlists}
          rowItem={_renderItem}
          drawerBackgroundColor={styles.rowDrawerBackgroundColor}
          buttonImage={images.iconTrash}
          buttonCallback={data => handleDeleteWatchlist(data)}
        />
        {_renderCreateDialogue()}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  rowDrawerBackgroundColor: {
    backgroundColor: theme.dark.brandDanger,
  },
  rowStyle: {
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: theme.dark.brandPrimary,
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  rowSubtitle: {
    fontSize: 18,
    color: 'gray',
  },
  buttonContainer: {
    marginVertical: 15,
  },
  button: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: theme.dark.listBorderColor,
    backgroundColor: theme.dark.brandPrimary,
  },
  iconLeftContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderColor: theme.dark.blue2,
    borderWidth: 1,
    margin: 20,
    marginLeft: 0,
    backgroundColor: theme.dark.blue1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 36,
  },
  iconLeft: {
    color: theme.dark.brandSuccess,
  },
  iconRightContainer: {
    flex: 0,
    marginLeft: 'auto',
    marginRight: 10,
  },
  dialogContainer: {
    backgroundColor: theme.dark.blue2,
  },
  dialogText: { color: theme.dark.brandLight },
  dialogTitle: {},
  dialogDescription: {},
  dialogInput: {},
});

export default WatchlistList;
