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

/**
 * @description Generates new HDNodeWallet wallet.
 * @returns { HDNodeWallet } Wallet instance.
 */
async function generateWallet() {
  const web3AndThreeQuarters = new Web3AndThreeQuarters();
  const generatedWallet = await web3AndThreeQuarters.generateWallet();

  console.log('generated wallet: ', generatedWallet);
}
```

### Encrypt wallet
```
import { Web3AndThreeQuarters } from "web3-and-three-quarters";

/**
 * @description Encrypts wallet.
 * @param { HDNodeWallet } _wallet Wallet instance to be encrypted.
 * @param { string } Passphrase to be used for the encryption.
 * @returns { string } Encrypted wallet.
 */
async function encryptWallet(_wallet, _passphrase) {
  const web3AndThreeQuarters = new Web3AndThreeQuarters();
  const encryptedWallet = await web3AndThreeQuarters.encryptWallet(_wallet, _passphrase);

  console.log('encrypted wallet: ', encryptedWallet);
}
```

### Decrypt wallet
```
import { Web3AndThreeQuarters } from "web3-and-three-quarters";

/**
 * @description Decrypts wallet.
 * @param { string } _encryptedWallet Encrypted wallet.
 * @param { string } _passphrase Passphrase used for encryption of the wallet.
 * @returns { HDNodeWallet } HDNodeWallet wallet instance.
 */
async function decryptWallet(_encryptedWallet, _passphrase) {
  const web3AndThreeQuarters = new Web3AndThreeQuarters();
  const decryptedWallet = await web3AndThreeQuarters.decryptWallet(_encryptedWallet, _passphrase);

  console.log('decrypted wallet: ', decryptedWallet);
}
```

### Sign message
```
import { Web3AndThreeQuarters } from "web3-and-three-quarters";

/**
 * @description Signs a message.
 * @param { HDNodeWallet } _wallet Wallet instance.
 * @param { string } _msg Message to be signed.
 * @returns {string} Signed message.
 */
async function signMessage(_wallet, _msg) {
  const web3AndThreeQuarters = new Web3AndThreeQuarters();
  const signature = await web3AndThreeQuarters.signMessage(_wallet, _msg);

  console.log('signed message: ', signature);
}
```

### Get message signer
```
import { Web3AndThreeQuarters } from "web3-and-three-quarters";

/**
 * @description Gets message signer.
 * @param { string } _message Signed message.
 * @param { string } _signature Signature of the signed message.
 * @returns { string } Address of the message signer.
 */
async function getMessageSigner(_message, _signature) {
  const web3AndThreeQuarters = new Web3AndThreeQuarters();
  const recoveredSigner = await web3AndThreeQuarters.getMessageSigner(_message, _signature);

  console.log('message signer: ', recoveredSigner);
}
```

### Check whether is message signer
```
import { Web3AndThreeQuarters } from "web3-and-three-quarters";

/**
 * @description Checks whether address is message signer.
 * @param { string } _message Signed message.
 * @param { string } _signature Signature of the signed message.
 * @param { string } _signer Address to be verified as a signer.
 * @returns { boolean } Whether signer or not.
 */
async function isMessageSigner(_message, _signature, _signer) {
  const web3AndThreeQuarters = new Web3AndThreeQuarters();
  const isSigner = await web3AndThreeQuarters.isMessageSigner(_message, _signature, _signer);

  console.log('is message signer: ', isSigner);
}
```

### Sign transaction
```
import { Web3AndThreeQuarters } from "web3-and-three-quarters";

const tx = {
  to: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
  value: ethers.parseEther("0.001"),
  gasLimit: "21000",
  maxPriorityFeePerGas: ethers.parseUnits("5", "gwei"),
  maxFeePerGas: ethers.parseUnits("20", "gwei"),
  nonce: 0, // use correct nonce for your account
  type: 2,
  chainId: 5, // Corresponds to ETH_GOERLI
};

/**
 * @description Signs a transaction.
 * @param { HDNodeWallet } _wallet Wallet instance.
 * @param { TransactionRequest} _tx Transaction to be signed.
 * @returns { string } Signed transaction.
 */
async function signTransaction(_wallet, _tx ) {
  const web3AndThreeQuarters = new Web3AndThreeQuarters();
  const res = await web3AndThreeQuarters.signTransaction(_wallet, _tx);

  console.log('is message signer: ', isSigner);
}
```


## 💡 More information
Not many Internet users are web3-savvy. The more power you have, the more responsibility you also bear. As a blockchain user, you are responsible for wallet creation, storing your private wallet data (key, mnemonic) securely, and using it to sign and broadcast transactions.

Using a private key for signing and broadcasting transactions can be cumbersome and inconvenient in some cases. It requires additional steps, such as showing a pop-up for the users to confirm their intent of using a private key. The mobile experience is even worse, with users having to switch between apps to sign and broadcast transactions. This can make it difficult and frustrating to interact with blockchain frequently, such as when playing a games that requires frequent transaction broadcasting to blockchain.

**Web3 And Three Quarters** library proposes a solution that makes the user experience of web3 interaction very similar to web2, where users can know nothing about web3 that is used under the hood. Secure storage of private keys (mnemonics) and seamless interaction with the blockchain are essential for this idea.

This library provides the following features:
- new wallet generation. Users can generate an wallet compatible with [BIP32 standart](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki);
- seamless blockchain interaction. Users can interact with blockchain without having to switch between apps or interactions with pop ups to sign a transaction;
- familiar web2 user experience. Users will have a web2 user experience, which they are used to, even though they are interacting with the blockchain.
