import Moralis from "moralis";
const Captcha = Moralis.Object.extend("Captcha");

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
export const getCaptcha = async cid => {
  const query = new Moralis.Query(Captcha);
  query.equalTo("cid", cid);
  const results = await query.find();
  return results;
};

export const getCaptchas = async (skip, limit) => {
  limit = limit || 25;
  skip = skip || 0;

  const query = new Moralis.Query(Captcha);
  query.skip(skip);
  query.withCount();
  const { results } = await query.find();
  const Captchas = results.map(x => x.attributes);
  console.log("Captchas", Captchas);
  return Captchas;
};