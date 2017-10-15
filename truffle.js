module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      host: "localhost",
      port: 8545,
      network_id: 3,
      from: "0xDC2c7AEbd98569629fe249522080d6F5f2CCEE7E",
    },
    live: {
      host: "localhost",
      port: 8545,
      network_id: 1,
      from: "0xDC2c7AEbd98569629fe249522080d6F5f2CCEE7E",
    }
  }
};
