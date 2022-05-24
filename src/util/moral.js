import Moralis from "moralis";
const Captchain = Moralis.Object.extend("Captchain");

export const saveCaptchain = async prop => {
  delete prop["id"];
  const keys = Object.keys(prop);

  const obj = new Captchain();
  keys.forEach(k => {
    obj.save(k, prop[k]);
  });
  console.log("save", prop);
  return await obj.save();
};

// https://docs.moralis.io/moralis-server/database/queries
export const getCaptchain = async cid => {
  const query = new Moralis.Query(Captchain);
  query.equalTo("cid", cid);
  const results = await query.find();
  return results;
};

export const getCaptchains = async (skip, limit) => {
  limit = limit || 25;
  skip = skip || 0;

  const query = new Moralis.Query(Captchain);
  query.skip(skip);
  query.withCount();
  const { results } = await query.find();
  const Captchains = results.map(x => x.attributes);
  console.log("Captchains", Captchains);
  return Captchains;
};