

<br/>
<p align='center'>
    <img src="./img/logo.png" width=300/>
</p>
<br/>

Captchains
---

Create Captchas backed by chainlink API calls.

Captchains is a platform for validating site visitors or user actions by requiring users to validate they are human by the ability to research the answer to an API-driven question - rather than an image.


<b>Note this project is a hackathon proof of concept and would require additional work in order to be production ready</b>

### Problem

How many Captchas have you filled out that look like this?

<img src='./img/captcha.png' width=600/>

### Technologies used
* Chainlink Services:
* Filecoin storage and tools.
* Covalent API calls: Price fetch and human validation of the price.
* Moralis - Captcha storage and lookup per user (based on active metamask address)


### How it works
1. API-call driven captchas that have character, or have dynamic questions based on the app you're visiting.
2. Have an auditable history.
3. Create a platform managing captchas across many different apps, all for the cost of gas on low cost Polygon chains.
4. Save the result of the c

### Technologies used:

* Polygon: Low cost contract deployment for each Captchain smart contract. Code is privately stored on the contract and used for work Captchain access - only the owner can fetch the active code value.
* Filecoin: Earn NFT rewards as you hit key investment milestones with your group.
* Covalent: Used to pull historic data from Aave. Reference-able by users in the app to determine if it may be a good time to invest/lend based on past rates.

### How to run

Define the following environment variables:
<pre>
    REACT_APP_MORALIS_ID={YOUR_MORALIS_APP_ID} # Moralis app id 
    REACT_APP_MORALIS_SERVER={YOUR_MORALIS_SERVER_URL} # Moralis server url
</pre>

App is currently configured to run against Polygon / Mumbai. Recommend adding your own mumbai-based RPC url (ex: Alchemy/Infura) in order to serve the application.

`yarn; yarn start`

### Updating the Captchain smart contract

Make any changes to `Captchain.sol` in the `contracts` directory.

`cd contracts; yarn; npx hardhat compile`

### Useful links
* https://web3.storage/
* https://hardhat.org/tutorial/creating-a-new-hardhat-project.html

