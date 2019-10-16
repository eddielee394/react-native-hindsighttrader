import React from 'react';
import { Button, Container, Spinner, Text, View } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import { images } from '../assets/images';

function LoadingScreen(props) {
  return (
    <Container>
      <View style={styles.spinnerContainer}>
        <Spinner />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  spinnerContainer: {
    flex: 1,
  },
  logo: {
    flex: 1,
  },
});

export default LoadingScreen;
