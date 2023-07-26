# Web3 and Three Quarters: A Library for Secure Web3 Interaction.
[![Build](https://github.com/VanijaDev/web3-and-three-quarters/actions/workflows/build.yml/badge.svg)](https://github.com/VanijaDev/web3-and-three-quarters/actions/workflows/build.yml)
![Coverage](./coverage/badges.svg)
[![npm version](https://img.shields.io/npm/v/web3-and-three-quarters.svg?style=flat)](https://www.npmjs.com/package/web3-and-three-quarters)
[![install size](https://packagephobia.com/badge?p=web3-and-three-quarters)](https://www.npmjs.com/package/web3-and-three-quarters)
[![Downloads](https://img.shields.io/npm/dm/web3-and-three-quarters.svg)](https://www.npmjs.com/package/web3-and-three-quarters)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is the library for users who want to interact with blockchain-based applications without having to worry about the underlying technology. It allows secure managing private data (private keys, mnemonic, etc) on behalf of users, while they focus on [DApp](https://ethereum.org/en/dapps/#what-are-dapps) interaction in web2 manner. Using **Web3 And Three Quarters** library users can:
- geneate a [BIP32 standart](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) wallet;
- securely store generated wallet data locally on device used while generation;
- create & sign transactions with [private key](https://ethereum.org/en/developers/docs/accounts/#externally-owned-accounts-and-key-pairs), broadcast them to blockchain;
- interact with [DApps](https://ethereum.org/en/dapps/#what-are-dapps) when all web3-related processes (e.g., transaction creation, signing, verification & broadcasting to the blockchain) are performed implicitly;
- basically, interact with Blockchain DApps similar to usual web2 applications.

The main use cases that can benefit from this library are:
- services / applications that want to onboard users, who don't know (or have little to nothing) about Blockchain, public - private keys, the importance of responsibility of managing sensitive data, but... At the same, they time want to use blockchain [Decentralized Applications](https://ethereum.org/en/dapps/#what-are-dapps);
- games (or other apps) that require frequent interactions with blockchain. For example shooters, fast items collecting games normally would require [crypto wallet](https://ethereum.org/en/wallets/) to show a promt to sign a transaction for DApp interaction. Imagine users have to perform this actions multiple times a minute or a second. In this case, the user experience would be unacceptable (better to say awful).

You can think of **Web3 And Three Quarters** library as a crypto wallet that allows users to interact with blockchain without even knowing they do so. Please read the following section to get more details.


## 🛠 How to use

### Installation
```npm i web3-and-three-quarters```

### Generate new wallet
```
import { Web3AndThreeQuarters } from "web3-and-three-quarters";

const wallet = await new Web3AndThreeQuarters().generateWallet();
```

### Encrypt wallet
```
import { Web3AndThreeQuarters } from "web3-and-three-quarters";

const encryptedWallet = await new Web3AndThreeQuarters().encryptWallet(wallet, 'PassphraseUsedFor_encryption_2023@');
```

### Decrypt wallet
```
import { Web3AndThreeQuarters } from "web3-and-three-quarters";

const decryptedWallet = await new Web3AndThreeQuarters().decryptWallet(encryptedWallet, 'PassphraseUsedFor_encryption_2023@');
```

### Sign message
```
import { Web3AndThreeQuarters } from "web3-and-three-quarters";

const signature = await new Web3AndThreeQuarters().signMessage(wallet, 'Hello Web3 World');
```

### Get message signer
```
import { Web3AndThreeQuarters } from "web3-and-three-quarters";

const recoveredSigner = await new Web3AndThreeQuarters().getMessageSigner('Hello Web3 World', signature);
```

### Check whether address is message signer
```
import { Web3AndThreeQuarters } from "web3-and-three-quarters";

const isSigner = await new Web3AndThreeQuarters().isMessageSigner('Hello Web3 World', signature, '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B');  // use correct address to check
```

### Sign transaction
```
import { Web3AndThreeQuarters } from "web3-and-three-quarters";

const tx = {
  to: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
  value: ethers.parseEther('0.001'),
  gasLimit: '21000',
  maxPriorityFeePerGas: ethers.parseUnits('5', 'gwei'),
  maxFeePerGas: ethers.parseUnits('20', 'gwei'),
  nonce: 0, // use correct nonce for your account
  type: 2,
  chainId: 5, // Corresponds to ETH_GOERLI
};

const res = await web3AndThreeQuarters.signTransaction(wallet, tx);
```


## 💡 Motivation for developing
Not many Internet users are web3-savvy. The more power you have, the more responsibility you also bear. As a blockchain user, you are responsible for wallet creation, storing your private wallet data (key, mnemonic) securely, and using it to sign and broadcast transactions.

Using a private key for signing and broadcasting transactions can be cumbersome and inconvenient in some cases. It requires additional steps, such as showing a pop-up for the users to confirm their intent of using a private key. The mobile experience is even worse, with users having to switch between apps to sign and broadcast transactions. This can make it difficult and frustrating to interact with blockchain frequently, such as when playing a games that requires frequent transaction broadcasting to blockchain.

**Web3 And Three Quarters** library proposes a solution that makes the user experience of web3 interaction very similar to web2, where users can know nothing about web3 that is used under the hood. Secure storage of private keys (mnemonics) and seamless interaction with the blockchain are essential for this idea.

This library provides the following features:
- new wallet generation. Users can generate an wallet compatible with [BIP32 standart](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki);
- seamless blockchain interaction. Users can interact with blockchain without having to switch between apps or interactions with pop ups to sign a transaction;
- familiar web2 user experience. Users will have a web2 user experience, which they are used to, even though they are interacting with the blockchain.
