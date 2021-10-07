const fs = require('fs');
const FormData = require('form-data');
const download = require('image-downloader')

require('dotenv').config();

// /api/mintnft
export default async function handler(req, res) {
  try{
    const url = req.body.imageUrl;
    const message = req.body.message;

    const { filename } = await download.image({
      url: url,
      dest: './serverImage'
    })
    console.log(filename);

    const form = new FormData();
    const fileStream = fs.createReadStream('./' + filename);
    form.append('file', fileStream);
    
    const options = {
      method: 'POST',
      body: form,
      headers: {
        "Authorization": process.env.NFTPORT_APIKEY,
      },
    };

    const tx = await fetch("https://api.nftport.xyz/easy_mint?" + new URLSearchParams({
      chain: 'polygon',
      name: "Test",
      description: message,
      mint_to_address: "0xd173313a51f8fc37bcf67569b463abd89d81844f",
    }), options)

    const txData = await tx.json();
    console.log(txData);
    return res.status(200).json({ msg: txData });
  } catch(error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}