import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Dialog from 'react-native-dialog';
import theme from '../../theme';

export function StyledDialog(props) {
  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => {
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setDialogVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={showDialog}>
        <Text>Show Dialog</Text>
      </TouchableOpacity>
      <Dialog.Container
        visible={dialogVisible}
        contentStyle={{ backgroundColor: theme.dark.blue1 }}>
        <Dialog.Title style={{ color: theme.dark.brandLight }}>
          Account delete
        </Dialog.Title>
        <Dialog.Description style={{ color: theme.dark.brandLight }}>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Delete" onPress={handleDelete} />
      </Dialog.Container>
    </View>
  );
}
