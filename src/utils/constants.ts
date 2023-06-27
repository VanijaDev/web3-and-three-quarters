const minPassphraseLength = 15;

const errorMsg = {
  invalidPassphraseDuringWalletGeneration: `Invalid passphrase. Please ensure your passphrase is strong enough - minimum ${minPassphraseLength} characters, at least one uppercase letter, one lowercase letter, one number and one special character (*.!@#$%^&*()_=+<>-)`,
  failedToDecryptPrefix: "dencryptWallet -> error: ",
  failedToSignMessagePrefix: "signMessage -> error: ",
  emptyEncryptedWallet: "Empty string for encrypted wallet.",
  emptyPassphrase: "Empty string for passphrase.",
  emptyMessageToSign: "Empty message to sign.",
  emptyMessageInGetMessageSigner: "Empty message to verify signer.",
  emptySignatureInGetMessageSigner: "Empty signature to verify signer.",

};

export { minPassphraseLength, errorMsg };