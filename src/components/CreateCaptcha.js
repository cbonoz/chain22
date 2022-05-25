import React, { useState, useEffect, useMemo } from "react";
import { Button, Input, Row, Col, Radio, Steps, Result, Checkbox } from "antd";
import { getExplorerUrl, captchaUrl } from "../util";
import { EXAMPLE_FORM } from "../util/constants";
import { saveCaptcha } from "../util/moral";
import ImageUpload from "./ImageUpload";

const { Step } = Steps;

function CreateCaptcha({address}) {
  const [data, setData] = useState({ ...EXAMPLE_FORM });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const updateData = (key, value) => {
    console.log('update', data)
    setData({ ...data, [key]: value });
  };

  const isValid = (data) => {
    return (
      data.name &&
      data.callbackUrl &&
      data.imageUrl
    );
  };

  const isValidData = isValid(data);

  const create = async () => {
    setError(undefined);

    if (!isValidData) {
      setError(
        "Please provide a name, description, valid address, and at least one file."
      );
      return;
    }

    setLoading(true);
    let res = { ...data };

    // if (!res.customId) {
    //   res.customId = res.name;
    // }

    let contract = {address: '123'}

    try {
      // 1) deploy base contract with metadata,
      // const contract = await deployContract(res);
      // res["contract"] = contract;

      // 2) Upload files to moralis/ipfs,
      // const metadata = await uploadFiles(
      //   files,
      //   data.name,
      //   data.description,
      //   data.signerAddress,
      //   contract.address
      // );
      const metadata = {}

      // 3) return shareable url.
      res["address"] = res.cid || contract.address;
      res["owner"] = address;
      // res["hash"] = metadata.hash();
      res["contractUrl"] = getExplorerUrl(contract.address);
      res["captchaUrl"] = captchaUrl(contract.address, data.code)

      // Result rendered after successful doc upload + contract creation.
      setResult(res);

      // Save result to moralis record set.
      await saveCaptcha(res)
    } catch (e)  {
      const msg = `Error saving captcha: ${e.toString()}`;
      console.error(msg);
      setError(msg)
    } finally {
      setLoading(false);
    }
  };

  const activeStep = useMemo(() => {
    if (!!result) {
      return 2;
    } else if (isValidData) {
      return 1;
    }
    return 0;
  }, [result, isValidData]);

  return (
    <div>
      <Row>
        <Col span={16}>
          <div className="create-form white boxed">
            <h1>Create new Captcha</h1>

            <h3 className="vertical-margin">General information</h3>
            <Input
              placeholder="Name of the Captcha"
              value={data.name}
              prefix="Name:"
              className="standard-input"
              onChange={(e) => updateData("name", e.target.value)}
            />
            <br/>
            <hr/>

            <div>Upload Captcha base image:</div>

            <ImageUpload onUpload={(url) => updateData("imageUrl", url)}/>

            <div>Enter a single keyword (lowercase) that should be guessable by your uploaded image.</div>

            <Input
              placeholder="Target keyword"
              value={data.keyword}
              prefix="Keyword:"
              className="standard-input"
              onChange={(e) => updateData("keyword", e.target.value)}
            />
            <br/>
            <br/>
           
            <div>The user will be sent to this url if the authentication request is successful.</div>
            <Input
              aria-label="Callback url"
              onChange={(e) => updateData("callbackUrl", e.target.value)}
              placeholder="Enter callback url for the Captcha"
              prefix="Callback url:"
              className="standard-input"
              value={data.callbackUrl}
            />
            <br/>


            <Button
              type="primary"
              className="standard-button"
              onClick={create}
              disabled={loading || !isValidData}
              loading={loading}
            >
              Create!
            </Button>
            {!error && !result && loading && (
              <span>&nbsp;Note this may take a few moments.</span>
            )}
            <br />
            <br />
            {error && <div className="error-text">{error}</div>}
            {result && (
              <div>
                <Result
                  status="success"
                  name="Successfully created Captcha!"
                  subname="View created contract and embeddable captcha below"
                />
                <br />
                <a href={result.contractUrl} target="_blank">
                  View created contract
                </a>
                <br />
                <br />
                <p>
                  Share this url with your friends/colleagues.
                  <br />
                  <a href={result.captchaUrl} target="_blank">
                    Open Captcha url
                  </a>
                </p>

                {/* <div>{JSON.stringify(result, null, "\t")}</div> */}
              </div>
            )}
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <div className="white boxed">
            <Steps
              className="standard-margin"
              direction="vertical"
              size="small"
              current={activeStep}
            >
              <Step name="Fill in fields" description="Enter required data." />
              <Step
                name="Create Captcha"
                description="Create the initial contract and get an embeddable Captcha url"
              />
              <Step
                name="Embed the Captcha on your website"
                description="Your Captcha will be live to embed wherever you want"
              />
            </Steps>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CreateCaptcha