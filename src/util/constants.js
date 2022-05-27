export const APP_NAME = 'Captchains'
export const APP_DESC = 'Chainlink-powered Captchas on demand'

const requireEnv = (k) => {
    const v = process.env[k]
    if (!v) {
        alert('Env variable ' + k + ' is required')
    }
    return v
}

export const IMAGE_INFO = "Users will be prompted to provide the obvious keyword based on the image as part of authentication"
export const VALUE_INFO = ""; // Note on guessing value

export const RPC_ID = process.env.REACT_APP_INFURA_ID
export const RPC_URL = process.env.REACT_APP_RPC_URL || 'https://rpc-matic.mumbai.today'

export const MORALIS_SERVER = requireEnv('REACT_APP_MORALIS_SERVER')
export const MORALIS_ID = requireEnv('REACT_APP_MORALIS_ID')

export const EXAMPLE_FORM = {}
export const LOGIN_MESSAGE = "Captchains would like connect to your wallet."

export const CHAIN_OPTIONS = {
    80001: {
      name: "Mumbai",
      host: `https://rpc-mumbai.matic.today`,
      url: "https://mumbai.polygonscan.com/",
      linkAddress: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
      id: 80001,
    },
   
    97: {
      name: "BSC Testnet",
      linkAddress: "0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06",
      url: "https://testnet.bscscan.com/",
      id: 97,
    },
    137: {
      name: "Matic Mainnet",
      url: "https://polygonscan.com/",
      id: 137,
    },
   1: { name: "ethereum", url: "https://etherscan.io/tx/", id: 1 },
   42: { name: "kovan", url: "https://kovan.etherscan.io/", id: 42, linkAddress: "0xa36085F69e2889c224210F603D836748e7dC0088" },
   4: { name: "rinkeby", url: "https://rinkeby.etherscan.io/tx/", id: 4 },
   5: { name: "goerli", url: "https://goerli.etherscan.io/", addressUrl: "https://goerli.etherscan.io/address/", id: 5 },
}
  

export const IPFS_BASE_URL = "https://ipfs.moralis.io:2053/ipfs";

export const COVALENT_KEY = requireEnv('REACT_APP_COVALENT_KEY')

export const ACTIVE_CHAIN_ID = CHAIN_OPTIONS["97"];
