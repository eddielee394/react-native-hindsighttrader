import React from 'react';
import { Button, Container, Text, View } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import { images } from '../assets/images';
import { SocialLinks } from '../components/SocialLinks';
import { Actions as RouteActions } from 'react-native-router-flux';
import theme from '../theme';

function WelcomeScreen(props) {
  return (
    <Container>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={images.htLogoWhite}
        />
      </View>
      <View style={styles.iconContainer}>
        <SocialLinks />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          block
          bordered
          style={styles.button}
          onPress={() => RouteActions.bottomNavigation()}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Button>
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
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  button: {
    borderColor: theme.dark.orange,
    color: theme.dark.brandLight,
    marginHorizontal: 15,
  },
  buttonText: {
    color: theme.dark.brandLight,
  },
  logo: {
    flex: 1,
  },
});

export default WelcomeScreen;
