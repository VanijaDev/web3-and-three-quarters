import type { HDNodeWallet } from 'ethers';

/**
 * @description Generates a wallet instance.
 * @returns { HDNodeWallet } Wallet Instance.
 */
async function generateWallet(): Promise<HDNodeWallet> {
  const ethers = await import('ethers');
  
  const wallet = ethers.Wallet.createRandom();
  return wallet;
}

export {
  generateWallet
}