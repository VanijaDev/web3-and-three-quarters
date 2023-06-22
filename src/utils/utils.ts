import { minPassphraseLength } from "./constants";

/**
 * @description Chacks passphrase to be strong enough.
 * @param { string } _passphrase Passphrase string.
 * @returns { boolean } Whether strong enough.
 */
function isPassphraseValid(_passphrase: string): boolean {
  const regex = new RegExp(`(^(?=.{${minPassphraseLength},}$))(^([0-9A-Z][0-9a-zA-z]+)([A-Z][0-9a-zA-z]+)([A-Z][0-9a-zA-z]+)([A-Z][0-9a-zA-z]+))$`);
  return regex.test(_passphrase);
}

export { isPassphraseValid };