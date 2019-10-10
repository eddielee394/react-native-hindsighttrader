import React from 'react';
import { Container } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import { images } from '../assets/images';
import { SocialLinks } from '../components/SocialLinks';

function WelcomeScreen(props) {
  return (
    <Container>
      <Container style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={images.htLogoWhite}
        />
      </Container>
      <Container style={styles.iconContainer}>
        <SocialLinks />
      </Container>
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
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  logo: {
    flex: 1,
  },
});

export default WelcomeScreen;
