import { Wallet, type HDNodeWallet } from 'ethers';
import { isPassphraseValid } from '../utils/utils';
import { errorMsg } from '../utils/constants';


/**
 * @description Generates a wallet instance.
 * @returns { HDNodeWallet } Wallet Instance.
 */
async function generateWallet(): Promise<HDNodeWallet> {
  const ethers = await import('ethers');
  
  return ethers.Wallet.createRandom();
}

/**
 * @description Encrypts wallet with passphrase.
 * @param { HDNodeWallet } _wallet Wallet to be encrypted.
 * @param { string } _passphrase Passphrase to be used for encryption.
 * @returns { Promise<string> } Encrypted wallet object.
 */
async function encryptWallet(_wallet: HDNodeWallet, _passphrase: string): Promise<string> {
  if (!isPassphraseValid(_passphrase)) {
    throw new Error(errorMsg.invalidPassphraseDuringWalletGeneration);
  }

  return await _wallet.encrypt(_passphrase);
}

/**
 * @description Dencrypts encrypted wallet.
 * @param { string } _encryptedWallet Encrypted wallet object.
 * @param { string } _passphrase Passphrase used for encryption.
 * @returns { Promise<HDNodeWallet> } Decrypted wallet.
 */
async function dencryptWallet(_encryptedWallet: string, _passphrase: string): Promise<Wallet | HDNodeWallet> {
  if (_encryptedWallet.length == 0) {
    throw new Error(errorMsg.emptyEncryptedWallet);
  }

  if (_passphrase.length == 0) {
    throw new Error(errorMsg.emptyPassphrase);
  }

  try {
    const decryptedWallet = await Wallet.fromEncryptedJson(_encryptedWallet, _passphrase);
    return decryptedWallet;
  } catch (error) {
    console.error("dencryptWallet -> ", error);
    throw new Error(errorMsg.failedToDecrypt);
  }
}

async function signMessage(_message: string) {
  if (_message.length == 0) {
    throw new Error(errorMsg.emptyEncryptedWallet);
  }
}

// async function test_createTxTransferEth(_wei: string): 

export {
  generateWallet,
  encryptWallet,
  dencryptWallet
}