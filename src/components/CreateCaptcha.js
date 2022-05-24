import React, { useState, useEffect, useMemo } from "react";
import { Button, Input, Row, Col, Radio, Steps, Result, Checkbox } from "antd";
import { getExplorerUrl, captchaUrl } from "../util";
import { EXAMPLE_FORM } from "../util/constants";
import { deployContract } from "../contract/deploy";
import { saveCaptchain } from "../util/moral";

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

  const onChange = e => {
    console.log('checked = ', e.target.checked);
    updateData('worldId', e.target.checked);
  };

  const actionId = `${data.domain}-${data.title}`

  const isValid = (data) => {
    return (
      data.title &&
      data.code &&
      data.domain
    );
  };
  const isValidData = isValid(data);

  const create = async () => {
    setError(undefined);

    if (!isValidData) {
      setError(
        "Please provide a title, description, valid address, and at least one file."
      );
      return;
    }

    setLoading(true);
    const body = { ...data };
    let res = { ...data };

    try {
      // 1) deploy base contract with metadata,
      const contract = await deployContract(data.domain, data.title, data.code);
      res["contract"] = contract;

      // 2) Upload files to moralis/ipfs,
      // const metadata = await uploadFiles(
      //   files,
      //   data.title,
      //   data.description,
      //   data.signerAddress,
      //   contract.address
      // );
      const metadata = {}

      // 3) return shareable url.
      res["cid"] = res.cid || contract.address
      // res["hash"] = metadata.hash();
      res["contractUrl"] = getExplorerUrl(contract.address);
      res["captchaUrl"] = captchaUrl(contract.address, data.code)

      // Result rendered after successful doc upload + contract creation.
      setResult(res);

      // Save result to moralis record set.
      try {
        await saveCaptchain(res)
      } catch (e) {
        console.error("error saving captchain", e);
      }
    } catch (e) {
      console.error("error creating captchain", e);
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
            <h1>Create new captchain</h1>

            <h3 className="vertical-margin">General information</h3>
            <Input
              placeholder="Title of the captchain"
              value={data.title}
              prefix="Title:"
              className="standard-input"
              onChange={(e) => updateData("title", e.target.value)}
            />
            <Input
              aria-label="Access Code"
              onChange={(e) => updateData("code", e.target.value)}
              placeholder="Enter access code for the Captcha"
              prefix="Access code:"
              className="standard-input"
              value={data.code}
            />

            <Input
            className="standard-input"
              aria-label="Your address:"
              placeholder="Enter access code for the Captcha"
              disabled={true}
              prefix="Your address"
              value={address}
            />
            <br />
            <br />

            <br />

            <Button
              type="primary"
              className="standard-button"
              onClick={create}
              disabled={loading} // || !isValidData}
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
                  title="Successfully created captchain!"
                  subTitle="View created contract and shareable url below"
                />
                {/* <a href={ipfsUrl(result.hash)} target="_blank">
                  View metadata
                </a> */}
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
                    Open captchain url
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
              <Step title="Fill in fields" description="Enter required data." />
              <Step
                title="Create captchain"
                description="Create the initial contract and shareable url for peers to join"
              />
              <Step
                title="Invite others to join"
                description="Your captchain will be live for you and others to view and invest together."
              />
            </Steps>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CreateCaptcha