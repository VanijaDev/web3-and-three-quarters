const minPassphraseLength = 15;
const invalidPassphraseDuringWalletGeneration = `Invalid passphrase. Please ensure your passphrase is strong enough - minimum ${minPassphraseLength} characters, at least one uppercase letter, one lowercase letter, one number and one special character (*.!@#$%^&*()_=+<>-)`;
const errorEmpty = {
  encryptedWallet: "Empty string for encrypted wallet.",
  passphrase: "Empty string for passphrase."
};
const failedToDecrypt = "Failed to decrypt wallet.";

export { minPassphraseLength, invalidPassphraseDuringWalletGeneration, errorEmpty, failedToDecrypt };