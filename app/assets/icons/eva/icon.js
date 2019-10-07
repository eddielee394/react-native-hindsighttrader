import React from 'react';
import { Image } from 'react-native';
import { Icon } from 'react-native-ui-kitten';

export const IconSource = (source, style) => {
  return <Image style={style} source={source.imageSource} />;
};

export const EvaIcon = props => {
  return <Icon name={props.name} {...props.style} />;
};
