const minPassphraseLength = 15;
const invalidPassphraseDuringWalletGeneration = `Invalid passphrase. Please ensure your passphrase is strong enough - minimum ${minPassphraseLength} characters, at least one uppercase letter, one lowercase letter, one number and one special character (*.!@#$%^&*()_=+<>-)`;

export { minPassphraseLength, invalidPassphraseDuringWalletGeneration };