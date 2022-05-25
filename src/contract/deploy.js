import Moralis from "moralis";
import Web3 from 'web3';
import * as ethers from "ethers";
import { CONTRACT } from "./metadata";
import { COVALENT_KEY } from "../util/constants";

export const validAddress = (addr) => {
  try {
    ethers.utils.getAddress(addr);
    return true;
  } catch (e) {
    return false;
  }
};


export const getProvider = async () => {
  await Moralis.enableWeb3()
  const provider = new ethers.providers.Web3Provider(Moralis.provider);
  return provider;
}

export const getSigner = async () => {
  const p = await getProvider()
  return p.getSigner()
};


// https://dapp-world.com/smartbook/how-to-use-ethers-with-polygon-k5Hn
export async function deployContract({name, customId, callbackUrl}) {
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
  console.log('deploy', name, customId, callbackUrl);
  const contract = await factory.deploy(name, customId, callbackUrl, "");
  await contract.deployed();
  console.log("Contract deployed to address:", contract.address);
  return contract;
}

export const checkResult = async (contractAddress, value, keyword) => {
  console.log('checkResult', contractAddress, value, keyword)
  const signer = await getSigner();
  const c = new ethers.Contract(
    contractAddress,
    CONTRACT.abi,
    signer
  );
  const result = await c.attempt(value, keyword);
  return result;
};

export const loadValue = async (cAddress) => {
  const signer = await getSigner();
  const c = new ethers.Contract(
    cAddress,
    CONTRACT.abi,
    signer
  );
  const result = await c.loadValue(COVALENT_KEY);
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