require('dotenv').config();

// /api/getusernft/${walletaddress}
export default async function handler(req, res) {
  try{
    const { walletaddress } = req.query;

    const nft = await fetch(`https://api.covalenthq.com/v1/137/address/${walletaddress}/balances_v2/?nft=true&key=${process.env.COVALENT_APIKEY}`);
    const { data } = await nft.json();

    return res.status(200).json({ msg: data });
  } catch(error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}