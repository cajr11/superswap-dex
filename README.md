# Superswap Dex

A multi-chain decentralised exchange(DEX) where users can authenticate themselves using Metamask or Wallet connect, across web and mobile in order to swap/buy tokens on the blockchain.

## Demo

![](/src/assets/images/demo.gif)



#### Live application link

```
https://superswap-dex.vercel.app/
```



## Stack

<div style="display: flex; width: 300px justify-content: space-between;">
    <img src="https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png" alt="react" width="50" height="50">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png" alt="tailwind css" width="50" height="50">
    <img src="https://moralis.io/wp-content/uploads/2021/06/cropped-Moralis-Favicon-Glass.png" alt="moralis" width="50" height="50">
</div>


## Usage

**NOTE** - For users to exchange/buy tokens and access wallet details and view transactions, the MetaMask extension(web) or app(mobile) should be installed. Alternatively any of the wallets that WalletConnect provides should also be installed on their devices.

### Exchange/Buy

![](/src/assets/images/transfer-demo.gif)

In order to exchange tokens on superswap, users need to authenticate themselves as shown in the demo above. Upon authentication, users can switch chains between bsc, eth(default) and polygon. Once a desired chain has been selected, users can select then select the tokens they wish to exchange by clicking on the token logo in the input fields.

After token selection, amounts can be input which will be automatically converted to the desired currency's amount, along with a gas fee estimat at the bottom. To complete the transaction, click the swap button and wait for your wallet to request approval to sign off on the transaction.


### Language

![](/src/assets/images/translation.gif)

The app offers a language feature. The language can be toggled between English and Spanish.



### Theme

![](/src/assets/images/theme.gif)

The has a themeing feature which allows day oe night selection


## Running Locally

### Installation Steps

```
yarn install
```
then

```
yarn start
```

### Environment Variables

A .env file will need to be created at the highest level of the project folder, within this file 3 environment variables will need to be created. These will be for the moralis server url, app id and web key which is used to initialise your dapp. Can be retrieved from your moralis account.

```
REACT_APP_SERVER_URL_MORALIS=key
REACT_APP_ID_MORALIS=id
REACT_APP_WEB_API_KEY=key
```

**NOTE** - This dapp uses V1 of the moralis react SDK.