export const APP_NAME = 'Captchains'
export const APP_DESC = 'Chainlink-powered Captchas'

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
   42: { name: "kovan", url: "https://kovan.etherscan.io/", id: 42 },
   4: { name: "rinkeby", url: "https://rinkeby.etherscan.io/tx/", id: 4 },
   5: { name: "goerli", url: "https://goerli.etherscan.io/", addressUrl: "https://goerli.etherscan.io/address/", id: 5 },
}
  
export const ACTIVE_CHAIN_ID = CHAIN_OPTIONS["80001"];

export const AAVE_MUMBAI_RESERVE = "0xb685400156cF3CBE8725958DeAA61436727A30c3"

export const IPFS_BASE_URL = "https://ipfs.moralis.io:2053/ipfs";

export const REWARD_IMAGES = {
    1000:'https://image.shutterstock.com/image-vector/1000-dollars-sign-usd-badge-260nw-1892401765.jpg',
    5000:'https://icon-library.com/images/google-icon-image/google-icon-image-10.jpg',
    10000:'https://www.uwindsor.ca/cces/sites/uwindsor.ca.cces/files/salary_icon2.png',
}

export const PIE_DATA = [["Tempus", 400], ["Aave", 625]]

export const INITIAL_BALANCE = PIE_DATA.map(x => x[1]).reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  0
);

export const COVALENT_KEY = requireEnv('REACT_APP_COVALENT_KEY')
