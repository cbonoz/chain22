

<br/>
<p align='center'>
    <img src="./img/logo.png" width=300/>
</p>
<br/>

CaptChains
---

Create Captchas on-demand backed by Chainlink API calls and smart contracts on the BSC Testnet or Polygon Mumbai chains.

Captchains is a platform for validating site visitors or user actions by requiring users to validate they are human by the ability to research the answer to an API-driven question - rather than images alone.

LIVE DEMO HERE: <a href="https://captchains.surge.sh" target="_blank">captchains.surge.sh</a> (live deployment instance restriction is that you must be on BSC Testnet)

### Technologies used
* Chainlink Services: Every Captcha is saved as a smart contract on the BSC. All login attempts (captcha successes and failures) are emitted from the contract as events.
* Filecoin storage and tools: Each Captcha image is hosted on IPFS.
* Covalent API calls: Price fetch and human validation of the price. When the captcha is loaded the user can submit a low-cost chainlink API call to update the latest value on the contract.
* Moralis - Captcha storage and lookup per user (based on active metamask address).


How many Captchas have you filled out that look like this?

<img src='./img/captcha.png' width=600/>

Captchains enables customers to provision their own captchas, with the resiliency and auditability of blockchain.

Each Captcha:
1. Requests the user to identify a keyword based on an image you specify (not autoselect of images).
2. Second, requires the user state the latest price of ethereum, but this could be in theory any API-call based question that requires user research in order to correctly answer.
3. Attempts (successes and failures) are logged to the contract.

The captcha is also self-driving, operating based on the gas fees of the network in order to process the authentication. This makes Captchain work well with lower-cost networks such as Polygon/BSC.

### How it works
1. Dynamic/API-call driven captchas that have character, or have dynamic questions based on the app you're visiting.
2. Have an auditable history of successes, fails, and interactions with every Captcha stored on the blockchain network.
3. Create a platform managing captchas across many different apps, all for the cost of gas on low cost BSC testnet and polygon chains.

### How to run

Define the following environment variables:
<pre>
    REACT_APP_MORALIS_ID={YOUR_MORALIS_APP_ID} # Moralis app id 
    REACT_APP_MORALIS_SERVER={YOUR_MORALIS_SERVER_URL} # Moralis server url
    REACT_APP_COVALENT_KEY={YOUR COVALENT KEY} # This is passed in as an arg to the chainlink contract. Covalent then issues an API call on each captcha to update the record (Ethereum) price which is used for authentication.
</pre>

App is currently configured to run against Polygon / Mumbai using Moralis as the Web3 RPC client and storage provider.

`yarn; yarn start`

### Changing networks (local deployment)
1. Update job/oracle/fee in `Captchain.sol` to new node provider.
2. Update ACTIVE_CHAIN_ID in `constants.js` to the chain id of your target network. For Polygon Mumbai, use chain id 80001. For BSC testnet use chain id 97.
3. Recompile `Captchain.sol` and add the new code to `metadata.json`.
4. Update moralis credentials above to new target server.

### Updating the Captchain smart contract

Make any changes to `Captchain.sol` in the `contracts` directory.

`cd contracts; yarn; npx hardhat compile`

If unable to estimate gas when completing a captcha, check that you're on a supported network - BSC testnet (default) or Polygon Mumbai, followed by confirming that your contract has been successfully funded; a gas estimation fee can result from calling loadValue on the contract without any LINK balance on it.


<b>Note this project is a hackathon proof of concept and would require additional work in order to be production ready</b>

### Future work
* Production deployment.
* Custom branding of the Captcha widget.
* Export of the Captcha widget to other apps as a react component as a per-usage model.
* Ability to configure the API-call based authentication mechanism.

### Screenshots

#### Home page.
<img src="./img/home.png" width=800/>

#### Login with Moralis
<img src="./img/login.png" width=800/>

#### Creating a new captcha (deployed on BSC or Polygon).
<img src="./img/form.png" width=800/>

#### Dashboard (pulled from Moralis).
<img src="./img/dashboard.png" width=800/>

#### Funding a Captcha contract.
<img src="./img/fund.png" width=800/>

#### Previewing a Captcha.
<img src="./img/preview.png" width=800/>

#### Updating the latest captcha value (using Covalent).
<img src="./img/update.png" width=800/>

#### Created captchas are associated with the owner's wallet address.
<img src="./img/moralis.png" width=800/>

#### Captcha contract interactions on BSC.
<img src="./img/bsc.png" width=800/>

### Useful links
* https://web3.storage/
* https://hardhat.org/tutorial/creating-a-new-hardhat-project.html
* https://testnet.binance.org/faucet-smart

