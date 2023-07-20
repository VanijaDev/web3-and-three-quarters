# Web3 And Three Quarters
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build](https://github.com/VanijaDev/web3-and-three-quarters/actions/workflows/build.yml/badge.svg)](https://github.com/VanijaDev/web3-and-three-quarters/actions/workflows/build.yml)
![Coverage](./coverage/badges.svg)
[![npm version](https://img.shields.io/npm/v/web3-and-three-quarters.svg?style=flat)](https://www.npmjs.com/package/web3-and-three-quarters)
[![install size](https://packagephobia.com/badge?p=web3-and-three-quarters)](https://www.npmjs.com/package/web3-and-three-quarters)
[![Downloads](https://img.shields.io/npm/dm/web3-and-three-quarters.svg)](https://www.npmjs.com/package/web3-and-three-quarters)

## Problem
Not many Internet users are web3-savvy. The more power you have, the more responsibility you also bear. As a blockchain user, you are responsible for account creation, storing your private key (mnemonic) securely, and using it to sign and broadcast transactions.

Using a private key for signing and broadcasting transactions can be cumbersome and inconvenient. It requires additional steps, such as showing a pop-up for the user to confirm their intent of using a private key. The mobile experience is even worse, with users having to switch between apps to sign transactions. This can make it difficult and frustrating to interact with the blockchain frequently, such as when playing a game that requires multiple transactions.

## Solution
This service (library) proposes a solution that makes the user experience of web3 interaction very similar to web2, where users may know nothing about web3 that is used under the hood. Secure storage of private keys (mnemonics) and seamless interaction with the blockchain are essential for this idea.

This service will provide the following features:
* New wallet generation: Users can generate a wallet compatible with [BIP32 standart](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki).
* Seamless blockchain interaction: Users can interact with the blockchain without having to switch between apps or interactions with pop ups to sign a transaction.
* Familiar web2 user experience: Users will have a familiar web2 user experience, even though they are interacting with the blockchain.

This service will make it easier and more convenient for users to interact with the blockchain. This will help to onboard more users to the blockchain and accelerate the adoption of web3.

## How to use
### 1. Installation
```npm i web3-and-three-quarters```

### 2. Usage
### require
```
const { Web3AndThreeQuarters } = require("web3-and-three-quarters");

async function yourFunction() {
  const web3AndThreeQuarters = new Web3AndThreeQuarters();
  const generatedWallet = await web3AndThreeQuarters.generateWallet();

  console.log(generatedWallet);
}
```

### import
```
import { Web3AndThreeQuarters } from "web3-and-three-quarters";

async function yourFunction() {
  const web3AndThreeQuarters = new Web3AndThreeQuarters();
  const generatedWallet = await web3AndThreeQuarters.generateWallet();

  console.log(generatedWallet);
}
```
