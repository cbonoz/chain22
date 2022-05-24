import Moralis from "moralis";
import * as ethers from "ethers";
import { CONTRACT } from "./metadata";

export const validAddress = (addr) => {
  try {
    ethers.utils.getAddress(addr);
    return true;
  } catch (e) {
    return false;
  }
};


export const getProvider = async () => {
  return Moralis.provider
}

export const getSigner = async () => {
  const provider = await getProvider()
  const signer = provider.getSigner();
  return signer;
};


// https://dapp-world.com/smartbook/how-to-use-ethers-with-polygon-k5Hn
export async function deployContract(company, name, code) {
  const signer = await getSigner();

  //   https://dev.to/yosi/deploy-a-smart-contract-with-ethersjs-28no

  // Create an instance of a Contract Factory
  const factory = new ethers.ContractFactory(
    CONTRACT.abi,
    CONTRACT.bytecode,
    signer
  );

  // const validatedAddress = ethers.utils.getAddress(signerAddress);

  // Start deployment, returning a promise that resolves to a contract object
  console.log('deploy', company, name, code)
  const contract = await factory.deploy(company, name, code);
  await contract.deployed();
  console.log("Contract deployed to address:", contract.address);
  return contract;
}

// // An example of a deploy script that will deploy and call a simple contract.
// export async function deployZkContract(hre) {
//   console.log(`Running deploy script for the Greeter contract`);

//   // Initialize the wallet.
//   const wallet = new Wallet("<WALLET-PRIVATE-KEY>");

//   // Create deployer object and load the artifact of the contract we want to deploy.
//   const deployer = {} // new Deployer(hre, wallet);
//   const artifact = await deployer.loadArtifact("captchain");

//   // Deposit some funds to L2 in order to be able to perform L2 transactions.
//   const depositAmount = ethers.utils.parseEther("0.001");
//   const depositHandle = await deployer.zkWallet.deposit({
//     to: deployer.zkWallet.address,
//     token: utils.ETH_ADDRESS,
//     amount: depositAmount,
//   });
//   // Wait until the deposit is processed on zkSync
//   await depositHandle.wait();

//   // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
//   // `greeting` is an argument for contract constructor.
//   const greeting = "Hi there!";
//   const greeterContract = await deployer.deploy(artifact, [greeting]);

//   // Show the contract info.
//   const contractAddress = greeterContract.address;
//   console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
// }

export const checkCode = async (cAddress, code) => {
  const signer = await getSigner();
  const c = new ethers.Contract(
    cAddress,
    CONTRACT.abi,
    signer
  );
  const result = await c.checkCode(code);
  return result;
};

export const getCaptchainName = async (cAddress) => {
  const signer = await getSigner();
  const c = new ethers.Contract(
    cAddress,
    CONTRACT.abi,
    signer
  );
  const result = await c.getName();
  return result;
};