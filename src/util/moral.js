import Moralis from "moralis";
import { MORALIS_ID, MORALIS_SERVER } from "./constants";
const Captcha = Moralis.Object.extend("Captcha");

export const initMoralis = () => {
  const body = {serverUrl: MORALIS_SERVER, appId: MORALIS_ID}
  console.log('init moralis', body)
  Moralis.start(body)
}

export const saveCaptcha = async prop => {
  delete prop["id"];
  const keys = Object.keys(prop);

  const obj = new Captcha();
  keys.forEach(k => {
    obj.save(k, prop[k]);
  });
  console.log("save", prop);
  return await obj.save();
};

// https://docs.moralis.io/moralis-server/database/queries
export const getCaptcha = async address => {
  const query = new Moralis.Query(Captcha);
  query.equalTo("address", address);
  const results = await query.find();
  console.log('get', address, results)
  if (results) {
    return results[0].attributes
  }
  return undefined
};

export const getCaptchas = async (ownerAddress, skip, limit) => {
  limit = limit || 25;
  skip = skip || 0;

  const query = new Moralis.Query(Captcha);
  query.equalTo("owner", ownerAddress)
  query.skip(skip);
  query.withCount();
  const { results } = await query.find();
  const Captchas = results.map(x => x.attributes);
  console.log("Captchas", Captchas);
  return Captchas;
};

export const transfer = async (amountInTokenString, receiver, contractAddress) => {
  const options = {type: "erc20", 
                 amount: Moralis.Units.Token(amountInTokenString, "18"),  // ex: ".5", "18"
                 receiver,
                 contractAddress}
  console.log('transfer request', options)
  await Moralis.enableWeb3();
  let result = await Moralis.transfer(options)
  return result
}