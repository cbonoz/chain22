import { Button, Input } from "antd";
import Moralis from "moralis"
import { useState } from "react";
import { ipfsUrl } from "../util";

function ImageUpload({onUpload}) {
  const [fileTarget, setFileTarget] = useState("");

//   https://docs.moralis.io/moralis-dapp/files/ipfs#saving-files
  const uploadFile = async () => {
    const f = new Moralis.File("photo.jpg", fileTarget, "image/png")
    try {
        const result = await f.saveIPFS()
        const hash = result.hash()
        const url = ipfsUrl(hash)
        console.log('upload', result, url)
        onUpload(url)
    } catch (e) {
        console.error('file err', e)
    }
  };

  const fileInput = (e) => setFileTarget(e.target.files[0]);

  return (
    <div>
      <input type="file" onChange={fileInput} />
      <Button className="standard-btn" onClick={uploadFile}>Upload</Button>
    </div>
  );
}

export default ImageUpload;