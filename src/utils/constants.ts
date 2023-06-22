const minPassphraseLength = 15;

// The rules for generating the passphrase are separated to make the user interface easier to implement.
const passphraseRules = {
  rule_0: "Use a passphrase instead of a password. Start each word with a capital letter.",
  rule_1: "Use minimum 15 characters.",
  rule_2: "Minimum 4 uppercase letters (4 words).",
  rule_3: "Minimum 10 lowercase letters.",
  rule_4: "Minimum 1 digit.",
  rule_5: "Minimum 1 special character.",
  
}
const invalidPassphraseDuringWalletGeneration = "TODO: Invalid passphrase. Please ensure your passphrase is strong enough";

export { minPassphraseLength, invalidPassphraseDuringWalletGeneration, passphraseRules };