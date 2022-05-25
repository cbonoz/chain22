import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Input } from "antd";
import Moralis from "moralis"
import { useState } from "react";
import { ipfsUrl } from "../util";

function ImageUpload({onUpload, completed}) {
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
      &nbsp;{completed && <CheckCircleTwoTone style={{ marginTop: '5px', fontSize: '14px', color: '#00aa00' }}  />}
    </div>
  );
}

export default ImageUpload;