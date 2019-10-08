// @flow

import variable from '../variables/dark';

export default (variables /* : * */ = variable) => {
  const tabBarTheme = {
    '.tabIcon': {
      height: undefined,
      fontSize: variable.tabBarTextSize,
    },
    '.vertical': {
      height: 60,
    },
    'NativeBase.Button': {
      '.transparent': {
        'NativeBase.Text': {
          fontSize: variables.tabFontSize,
          color: variables.sTabBarActiveTextColor,
          fontWeight: '400',
        },
        'NativeBase.IconNB': {
          color: variables.sTabBarActiveTextColor,
        },
      },
      'NativeBase.IconNB': {
        color: variables.sTabBarActiveTextColor,
      },
      'NativeBase.Text': {
        fontSize: variables.tabFontSize,
        color: variables.sTabBarActiveTextColor,
        fontWeight: '400',
      },
      '.isTabActive': {
        'NativeBase.Text': {
          fontWeight: '900',
        },
      },
      flex: 1,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: null,
      borderBottomColor: 'transparent',
      backgroundColor: variables.tabBgColor,
    },
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderBottomColor: variables.tabBarBorderBottomColor,
    // borderBottomColor: variables.tabBarBorderBottomColor,
    backgroundColor: variables.tabBgColor,
  };

  return tabBarTheme;
};
