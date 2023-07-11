const minPassphraseLength = 15;

const errorMsg = {
  invalidPassphraseDuringWalletGeneration: `Invalid passphrase. Please ensure your passphrase is strong enough - minimum ${minPassphraseLength} characters, at least one uppercase letter, one lowercase letter, one number and one special character (*.!@#$%^&*()_=+<>-)`,
  failedToDecrypt: "decryptWallet -> error",
  failedToSignMessage: "signMessage -> error",
  emptyEncryptedWallet: "Empty string for encrypted wallet.",
  emptyPassphrase: "Empty string for passphrase.",
  emptyMessageToSign: "Empty message to sign.",
  emptyMessageInGetMessageSigner: "Empty message to verify signer.",
  emptySignatureInGetMessageSigner: "Empty signature to verify signer.",
  emptySignerInIsMessageSigner: "Empty signer provided to verify message signer.",
  emptyTransactionStirngInSignTransaction: "Empty signer provided to verify message signer.",
};

export { minPassphraseLength, errorMsg };