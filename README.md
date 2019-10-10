## Overview
They say hindsight is 20/20 in the markets right?  Well here's a watchlist app to help you to keep looking ahead.

|    |    |
|:---|:---|
| ![stockScreen.png](https://github.com/eddielee394/react-native-hindsighttrader/tree/develop/docs/images/stockScreen.png)     |  ![welcome.png](https://github.com/eddielee394/react-native-hindsighttrader/tree/develop/docs/images/welcome.png)  |




The application is still a major work in progress and pretty much an effort for me to aggressively get back involved with two things that I've always personally been extremely passionate about:  Coding and the stock market.

Code quality, functionality and performance optimization will be improved over the coming weeks and months.

## Installation
- Clone the repository
- copy the `.env.example` file to `.env`
- `yarn start`
- `react-native run-android`
- `yarn react-devtools` to display react-native devtools

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
- [ ] Add watchlist crud
- [ ] Add mobx for global state management
- [ ] Add localstorage state persistence
- [ ] Add search functionality
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
- [ ] Add storybook support
- [ ] Update documentation

## Shoutouts
- Native Base - UI Library
- Ignite - Boilerplate generator
- Victory Charts - Chart UI
- IEXCloud - Market Data API
