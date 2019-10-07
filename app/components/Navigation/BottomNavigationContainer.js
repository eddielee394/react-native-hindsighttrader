import React from 'react';
import {
  EyeOutline,
  MenuIconDashboards,
  SearchIconOutline,
} from '../../assets/icons';
import { BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten';

const BottomNavigationContainer = props => {
  const { index } = props.navigation.state;

  const onTabSelect = index => {
    const { [index]: selectedRoute } = props.navigation.state.routes;

    props.navigation.navigate({
      routeName: selectedRoute.routeName,
    });
  };

  return (
    <BottomNavigation
      appearance="noIndicator"
      selectedIndex={index}
      onSelect={onTabSelect}>
      <BottomNavigationTab title="Watchlists" icon={EyeOutline} />
      <BottomNavigationTab title="Search" icon={SearchIconOutline} />
      <BottomNavigationTab title="News" icon={MenuIconDashboards} />
    </BottomNavigation>
  );
};

export default BottomNavigationContainer;
