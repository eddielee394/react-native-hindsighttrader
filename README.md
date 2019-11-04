## Overview
They say hindsight is 20/20 in the markets right?  Well here's a watchlist app to help you to keep looking ahead.

|    |    |
|:---|:---|
| ![welcome_screen] | ![stock_screen] |




The application is still a major work in progress and pretty much an effort for me to aggressively get back involved with two things that I've always personally been extremely passionate about:  Coding and the stock market.

Code quality, functionality and performance optimization will be improved over the coming weeks and months.

## Installation
- Clone the repository
- copy the `.env.example` file to `.env`
- `yarn start`
- `react-native run-android`
- `yarn react-devtools` to display react-native devtools, the application also has a built-in integration with [Reactotron][1] as well.

## Functionality
- User can create, edit, delete watchlists
- User can search stocks
- Charts and basic quote data are displayed for each stock.
- Quote data is updated every 5 seconds
- State is persisted locally

## Todos
- [x] Add initialize ThemeProvider
- [x] Add initial navigation
- [x] Add Iexcloud api service
- [x] Add Api repository class for api service abstraction
- [x] Add historical charts functionality
- [x] Add real time quote data
- [x] Add watchlist crud
- [ ] ~~Add mobx for global state management~~
- [x] Add redux for global state management
- [x] Add localstorage state persistence
- [x] Add search functionality
- [ ] Add news features
- [ ] Add stocktwits integration
- [ ] Add additional watchlist filter functionality
- [ ] Add Chart technical analysis functionality
- [ ] Add stock fundamental analysis functionality
- [ ] Add options data
- [ ] Add intraday charting
- [ ] Add user authentication
- [ ] Add test suites
- [ ] Refactor navigation
- [ ] Redesign UI
- [ ] Performance optimizations
- [ ] Add storybook support
- [ ] Update documentation
- [ ] Add real time paper trading functionality & mock portfolio management

## Known Issues
- Only tested on android.
- ~~There are some performance issues with the live data updates;~~
- ~~When creating a new watchlist, sometimes symbol list component doesn't rerender immediately.~~
- ~~Still issues with local state persistence, particularly with deeply nested state not being persisted correctly.~~
- Performance issues with charts on WatchlistList view;

## Shoutouts
- [Native Base][2] - UI Library
- [Victory Charts][3] - Chart UI
- [IEXCloud][4] - Market Data API

[welcome_screen]:https://raw.githubusercontent.com/eddielee394/react-native-hindsighttrader/develop/docs/images/welcome.png
[stock_screen]:https://raw.githubusercontent.com/eddielee394/react-native-hindsighttrader/develop/docs/images/stockScreen.png

[1]: https://github.com/infinitered/reactotron
[2]: https://github.com/GeekyAnts/NativeBase
[3]: https://github.com/FormidableLabs/victory-native
[4]: https://www.iexcloud.io
