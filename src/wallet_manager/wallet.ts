import type { HDNodeWallet } from 'ethers';
import { isPassphraseValid } from '../utils/utils';

/**
 * @description Generates a wallet instance.
 * @returns { HDNodeWallet } Wallet Instance.
 */
async function generateWallet(): Promise<HDNodeWallet> {
  const ethers = await import('ethers');
  
  const wallet = ethers.Wallet.createRandom();
  return wallet;
}

async function storeEncryptedWallet(_wallet: HDNodeWallet, _passphrase: string): Promise<string> {
  if (!isPassphraseValid(_passphrase)) {
    throw new Error("Invalid passphrase for wallet encryption and storing. Use _passphraseRules_ for inform users.");
  }

  // const encrypted = _wallet.encrypt(_passphrase);

  return "";
}

export {
  generateWallet,
  storeEncryptedWallet
}