import React from 'react';
import { Container, Content, H1, H3, Text } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import theme from '../theme';

const images = {
  comingSoonDuck: require('../assets/images/cool_looking_duck.png'),
};

const LightBoxScreen = props => {
  return (
    <Container style={styles.container}>
      <Image
        source={images.comingSoonDuck}
        style={styles.contentContainerImage}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    right: 0,
    left: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  textStyle: {
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    zIndex: 100,
  },
  contentContainerImage: {
    position: 'absolute',
    bottom: -20,
    zIndex: 100,
  },
});
export default LightBoxScreen;
