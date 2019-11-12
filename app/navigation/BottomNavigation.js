import React from 'react';
import {
  Footer,
  Icon,
  ScrollableTab,
  Tab,
  TabHeading,
  Tabs,
  Text,
} from 'native-base';
import { StyleSheet } from 'react-native';
import theme from '../theme';

export function BottomNavigation(props) {
  const { index, routes } = props.navigation.state;

  const onTabSelect = index => {
    const { [index]: selectedRoute } = routes;

    props.navigation.navigate({
      routeName: selectedRoute.routeName,
    });
  };

  const filteredTabRoutes = routes.filter(
    route => route.routes[0].params.tabNav === true,
  );

  const renderTabHeading = (title, icon, iconType) => (
    <TabHeading style={styles.navTabHeading}>
      <Icon
        name={icon}
        type={iconType ?? 'Ionicons'}
        style={styles.navTabIcon}
      />
      <Text style={styles.navTabHeadingTitle}>{title}</Text>
    </TabHeading>
  );

  return (
    <Footer>
      <Tabs
        renderTabBar={() => <ScrollableTab style={styles.navTabBar} />}
        initialPage={index}
        tabBarUnderlineStyle={styles.navTabUnderlineStyle}
        tabBarPosition="bottom"
        onChangeTab={tab => onTabSelect(tab.i)}
        style={styles.navTabBar}
        tabBgColor={styles.navTabBar.backgroundColor}>
        {filteredTabRoutes.map(route => {
          return (
            <Tab
              key={route.key}
              heading={renderTabHeading(
                route.routes[0].params.title,
                route.routes[0].params.icon,
                route.routes[0].params.iconType,
              )}
              tabStyle={styles.navTabContent}
            />
          );
        })}
      </Tabs>
    </Footer>
  );
}

const styles = StyleSheet.create({
  navTabBar: {
    backgroundColor: theme.dark.tabBgColor,
    borderBottomWidth: 0,
  },
  navTabUnderlineStyle: {
    top: 0,
  },
  navTabHeading: {
    flexDirection: 'column',
  },
  navTabHeadingTitle: {
    fontSize: 12,
  },
  navTabIcon: {
    fontSize: 20,
  },
  navTabContent: {
    display: 'none',
  },
});
