import { minPassphraseLength } from "./constants";

/**
 * @description Chacks passphrase to be strong enough.
 * @param { string } _passphrase Passphrase string.
 * @returns { boolean } Whether strong enough.
 */
function isPassphraseValid(_passphrase: string): boolean {
  const regex = new RegExp(`^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&*()_=+<>-]).{${minPassphraseLength},}$`);
  return regex.test(_passphrase);
}

export { isPassphraseValid };