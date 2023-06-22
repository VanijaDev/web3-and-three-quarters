import { HDNodeWallet } from "ethers";
import { generateWallet, encryptWallet, dencryptWallet } from "../src/wallet_manager/wallet";
import { expect, should } from "chai";
import { errorEmpty, failedToDecrypt, invalidPassphraseDuringWalletGeneration } from "../src/utils/constants";

describe("Walletmanager", () => {
  const chai = require('chai');
  const expect = chai.expect;
  chai.use(require('chai-as-promised'));
  
  const encryptionPassphrase = "HelloWorldFrom_me_1987@";

  let wallet: HDNodeWallet;
  let walletEncrypted: string;

  before("generate new wallet", async () => {
    wallet = await generateWallet();
    // console.log("In test wallet: ", wallet);
  });
  
  describe("generateWallet", () => {
    it("should generate correct address", async () => {
      expect(wallet.address).satisfy(addr => addr.startsWith('0x'), "wrong address prefix");
      expect(wallet.address).to.have.lengthOf(42, "wrong address length");
    });

    it("should generate correct publicKey", async () => {
      expect(wallet.publicKey).satisfy(addr => addr.startsWith('0x'), "wrong publicKey prefix");
      expect(wallet.publicKey).to.have.lengthOf(68, "wrong publicKey length");
    });

    it("should generate correct mnemonic", async () => {
      expect(wallet.mnemonic, "wallet.mnemonic is null").not.to.be.null;
      expect((wallet.mnemonic!.phrase as string).split(' ').length).to.equal(12, "wrong length");
    });
  });

  describe("encryptWallet", () => {
    it("should fail if encryption passphrase is empty", async () => {
      await expect(encryptWallet(wallet, "")).to.be.rejectedWith(invalidPassphraseDuringWalletGeneration);
    });

    it("should fail if encryption passphrase is < 15 chars", async () => {
      await expect(encryptWallet(wallet, "HelloWorld1@")).to.be.rejectedWith(invalidPassphraseDuringWalletGeneration);
    });
    
    it("should fail if encryption passphrase doesn't contain at least 1 uppercase letter", async () => {
      await expect(encryptWallet(wallet, "hello_world_from_me_1@")).to.be.rejectedWith(invalidPassphraseDuringWalletGeneration);
    });
    
    it("should fail if encryption passphrase doesn't contain at least 1 lowercase letters", async () => {
      await expect(encryptWallet(wallet, "HELLOWORLDF1ROMME1")).to.be.rejectedWith(invalidPassphraseDuringWalletGeneration);
    });
    
    it("should fail if encryption passphrase doesn't contain at least 1 lspecial character", async () => {
      await expect(encryptWallet(wallet, "HELLOWORLDF1ROMMe1")).to.be.rejectedWith(invalidPassphraseDuringWalletGeneration);
    });
    
    it("should succeed by returning a string", async () => {
      const res = await encryptWallet(wallet, encryptionPassphrase);
      expect(res).to.be.a('string');
      expect(res).to.not.be.empty;
      walletEncrypted = res;
    });
  });

  describe("dencryptWallet", () => {
    it("should fail if encrypted wallet string is empty", async () => {
      await expect(dencryptWallet("", encryptionPassphrase)).to.be.rejectedWith(errorEmpty.encryptedWallet);
    });

    it("should fail if passphrase used for encryption is empty", async () => {
      await expect(dencryptWallet(walletEncrypted, "")).to.be.rejectedWith(errorEmpty.passphrase);
    });

    it("should fail if encrypted wallet is invalid, if wrong letters", async () => {
      const corruptedWalletEncrypted = walletEncrypted.replace("a", "_").replace("v", "!").replace("e", "@").replace("i", "#").replace("s", "$");

      await expect(dencryptWallet(corruptedWalletEncrypted, encryptionPassphrase)).to.be.rejectedWith(failedToDecrypt);
    });

    it("should fail if encrypted wallet is invalid, if corrupted \"mnemonic...\" field", async () => {
      const corruptedWalletEncrypted = walletEncrypted.replace("mnemonic", "");

      await expect(dencryptWallet(corruptedWalletEncrypted, encryptionPassphrase)).to.be.rejectedWith(failedToDecrypt);
    });

    it("should fail if passphrase used for encryption is invalid", async () => {
      const wrongPassphrase = encryptionPassphrase + "Wrong";

      await expect(dencryptWallet(walletEncrypted, wrongPassphrase)).to.be.rejectedWith(failedToDecrypt);
    });

    it("should return correct wallet", async () => {
      const walletDecrypted = await dencryptWallet(walletEncrypted, encryptionPassphrase);

      expect(walletDecrypted).to.deep.equal(wallet);
    });
  });
});