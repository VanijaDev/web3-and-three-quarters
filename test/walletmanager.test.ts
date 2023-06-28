import { HDNodeWallet, ethers } from "ethers";
import { generateWallet, encryptWallet, dencryptWallet, signMessage, getMessageSigner, isMessageSigner } from "../src/wallet_manager/wallet";
import { errorMsg } from "../src/utils/constants";

describe("Walletmanager", () => {
  const chai = require('chai');
  const expect = chai.expect;
  chai.use(require('chai-as-promised'));
  
  const encryptionPassphrase = "HelloWorldFrom_me_1987@";

  let wallet: HDNodeWallet;

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
      await expect(encryptWallet(wallet, "")).to.be.rejectedWith(errorMsg.invalidPassphraseDuringWalletGeneration);
    });

    it("should fail if encryption passphrase is < 15 chars", async () => {
      await expect(encryptWallet(wallet, "HelloWorld1@")).to.be.rejectedWith(errorMsg.invalidPassphraseDuringWalletGeneration);
    });
    
    it("should fail if encryption passphrase doesn't contain at least 1 uppercase letter", async () => {
      await expect(encryptWallet(wallet, "hello_world_from_me_1@")).to.be.rejectedWith(errorMsg.invalidPassphraseDuringWalletGeneration);
    });
    
    it("should fail if encryption passphrase doesn't contain at least 1 lowercase letters", async () => {
      await expect(encryptWallet(wallet, "HELLOWORLDF1ROMME1")).to.be.rejectedWith(errorMsg.invalidPassphraseDuringWalletGeneration);
    });
    
    it("should fail if encryption passphrase doesn't contain at least 1 lspecial character", async () => {
      await expect(encryptWallet(wallet, "HELLOWORLDF1ROMMe1")).to.be.rejectedWith(errorMsg.invalidPassphraseDuringWalletGeneration);
    });
    
    it("should succeed by returning a string", async () => {
      const res = await encryptWallet(wallet, encryptionPassphrase);
      expect(res).to.be.a('string');
      expect(res).to.not.be.empty;
    });
  });

  describe("dencryptWallet", () => {
    let walletEncrypted: string;

    before("generate new wallet", async () => {
      walletEncrypted = await encryptWallet(wallet, encryptionPassphrase);
    });

    it("should fail if encrypted wallet string is empty", async () => {
      await expect(dencryptWallet("", encryptionPassphrase)).to.be.rejectedWith(errorMsg.emptyEncryptedWallet);
    });

    it("should fail if passphrase used for encryption is empty", async () => {
      await expect(dencryptWallet(walletEncrypted, "")).to.be.rejectedWith(errorMsg.emptyPassphrase);
    });

    it("should fail if encrypted wallet is invalid, if wrong letters", async () => {
      const corruptedWalletEncrypted = walletEncrypted.replace("a", "_").replace("v", "!").replace("e", "@").replace("i", "#").replace("s", "$");

      await expect(dencryptWallet(corruptedWalletEncrypted, encryptionPassphrase)).to.be.rejectedWith(errorMsg.failedToDecryptPrefix);
    });

    it("should fail if encrypted wallet is invalid, if corrupted \"mnemonic...\" field", async () => {
      const corruptedWalletEncrypted = walletEncrypted.replace("mnemonic", "");

      await expect(dencryptWallet(corruptedWalletEncrypted, encryptionPassphrase)).to.be.rejectedWith(errorMsg.failedToDecryptPrefix);
    });

    it("should fail if passphrase used for encryption is invalid", async () => {
      const wrongPassphrase = encryptionPassphrase + "Wrong";

      await expect(dencryptWallet(walletEncrypted, wrongPassphrase)).to.be.rejectedWith(errorMsg.failedToDecryptPrefix);
    });

    it("should return correct wallet", async () => {
      const walletDecrypted = await dencryptWallet(walletEncrypted, encryptionPassphrase);

      expect(walletDecrypted).to.deep.equal(wallet);
    });
  });

  describe("signMessage", () => {
    it("should fail if _message.length == 0", async () => {
      await expect(signMessage(wallet, "")).to.be.rejectedWith(errorMsg.emptyMessageToSign);
    });

    it("should fail if wallet is wrong", async () => {
      const corruptedWallet = {
        provider: null,
        address: '0x96802b8Bfb20D009122631A0DF57F7A61043fA76',
        publicKey: '0x024e0fa0366a9b6028664a90f938e3f181fdb5eb619882a788988cf062b827c6fa'
      };
      await expect(signMessage(corruptedWallet as HDNodeWallet, "Hello World")).to.be.rejectedWith(errorMsg.failedToSignMessagePrefix);
    });

    it("should return a signature", async () => {
      const sig = await signMessage(wallet, "Hello World");

      await expect(sig).to.be.a("string");
      await expect(sig).to.have.lengthOf.above(0);
    });

    it("should verify correct signer", async () => {
      const message = "Hello World";
      const signature = await signMessage(wallet, message);
      const signer = await wallet.getAddress();

      const recoveredSigner = await ethers.verifyMessage(message, signature);

      expect(recoveredSigner).to.be.equal(signer);
    });
  });

  describe("getMessageSigner", async () => {
    const message = "Hello World";
    let signature: string;
    let signer: string;

    before("generate new wallet", async () => {
      signature = await signMessage(wallet, message);
      signer = await wallet.getAddress();
    });

    
    it("should fail if _message.length == 0", async () => {
      await expect(getMessageSigner("", signature)).to.be.rejectedWith(errorMsg.emptyMessageInGetMessageSigner);
    });

    it("should fail if _message.length == 0", async () => {
      await expect(getMessageSigner(message, "")).to.be.rejectedWith(errorMsg.emptySignatureInGetMessageSigner);
    });

    it("should return correct signer", async () => {
      const recoveredSigner = await getMessageSigner(message, signature);

      expect(recoveredSigner).to.be.equal(signer);
    });
  });

  describe("isMessageSigner", async () => {
    const message = "Hello World";
    let signature: string;
    let signer: string;

    before("generate new wallet", async () => {
      signature = await signMessage(wallet, message);
      signer = await wallet.getAddress();
    });

    
    it("should fail if _message.length == 0", async () => {
      await expect(isMessageSigner("", signature, signer)).to.be.rejectedWith(errorMsg.emptyMessageInGetMessageSigner);
    });

    it("should fail if _message.length == 0", async () => {
      await expect(isMessageSigner(message, "", signer)).to.be.rejectedWith(errorMsg.emptySignatureInGetMessageSigner);
    });

    it("should fail if _signer.length == 0", async () => {
      await expect(isMessageSigner(message, signature, "")).to.be.rejectedWith(errorMsg.emptySignerInIsMessageSigner);
    });

    it("should return false for the provided incorrect signer", async () => {
      const res = await isMessageSigner(message, signature, signer + "1");

      expect(res).to.be.false;
    });

    it("should return true for correct signer", async () => {
      const res = await isMessageSigner(message, signature, signer);

      expect(res).to.be.true;
    });
  });
});