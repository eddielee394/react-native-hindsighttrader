const data = [
  {
    symbol: 'AAPL',
    companyName: 'Apple Inc',
    bidPrice: 256.35,
    askPrice: 258.35,
    latestPrice: 256.35,
  },
  {
    symbol: 'AA',
    companyName: 'American Airlines Inc',
    bidPrice: 256.35,
    askPrice: 258.35,
    latestPrice: 256.35,
  },
  {
    symbol: 'ANF',
    companyName: 'ANF Inc',
    bidPrice: 256.35,
    askPrice: 258.35,
    latestPrice: 256.35,
  },
  {
    symbol: 'TSLA',
    companyName: 'Tesla Inc.',
    bidPrice: 356.35,
    askPrice: 358.35,
    latestPrice: 359.78,
  },
  {
    symbol: 'TNT',
    companyName: 'TNT Inc.',
    bidPrice: 356.35,
    askPrice: 358.35,
    latestPrice: 359.78,
  },
];

function random_character(length) {
  const chars = 'abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
  return chars.substr(Math.floor(Math.random() * chars.length), 4);
}
let i = 0;
for (i = 0; i < 100; i++) {
  let obj = {
    symbol: `a${random_character()}`,
    companyName: `${random_character()} Inc`,
  };
  data.push(obj);
}

export const symbols = { data: data };
