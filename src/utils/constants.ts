const minPassphraseLength = 15;

const errorMsg = {
  invalidPassphraseDuringWalletGeneration: `Invalid passphrase. Please ensure your passphrase is strong enough - minimum ${minPassphraseLength} characters, at least one uppercase letter, one lowercase letter, one number and one special character (*.!@#$%^&*()_=+<>-)`,
  failedToDecrypt: "Failed to decrypt wallet.",
  emptyEncryptedWallet: "Empty string for encrypted wallet.",
  emptyPassphrase: "Empty string for passphrase.",

};

export { minPassphraseLength, errorMsg };