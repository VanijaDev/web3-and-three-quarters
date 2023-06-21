const minPassphraseLength = 15;

// The rules for generating the passphrase are separated to make the user interface easier to implement.
const passphraseRules = {
  rule_1: "Minimum 1 digit.",
  rule_0: "Use minimum 15 characters.",
  
}
const invalidPassphraseDuringWalletGeneration = "TODO: Invalid passphrase. Please ensure your passphrase is strong enough";

export { minPassphraseLength, invalidPassphraseDuringWalletGeneration, passphraseRules };