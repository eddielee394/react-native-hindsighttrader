import React from 'react';
import { Container, H1, H3, Text } from 'native-base';
import { StyleSheet } from 'react-native';

function ComingSoonScreen(props) {
  return (
    <Container style={styles.container}>
      <H1 style={styles.textStyle}>
        Sorry... Not quite done with this page yet.
      </H1>
      <H3 style={styles.textStyle}>
        While you're waiting check out this cool looking duck.
      </H3>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
export default ComingSoonScreen;
