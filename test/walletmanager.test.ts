import { HDNodeWallet, TransactionRequest, ethers } from "ethers";
import { Web2AndThreeQuarters } from "../src/index";
import { errorMsg } from "../src/utils/constants";

describe("Walletmanager", () => {
  const chai = require('chai');
  const expect = chai.expect;
  chai.use(require('chai-as-promised'));
  
  const encryptionPassphrase = "HelloWorldFrom_me_1987@";

  let wallet: HDNodeWallet;
  const web2AndThreeQuarters = new Web2AndThreeQuarters();

  before("generate new wallet", async () => {
    wallet = await new Web2AndThreeQuarters().generateWallet();
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
      await expect(web2AndThreeQuarters.encryptWallet(wallet, "")).to.be.rejectedWith(errorMsg.invalidPassphraseDuringWalletGeneration);
    });

    it("should fail if encryption passphrase is < 15 chars", async () => {
      await expect(web2AndThreeQuarters.encryptWallet(wallet, "HelloWorld1@")).to.be.rejectedWith(errorMsg.invalidPassphraseDuringWalletGeneration);
    });
    
    it("should fail if encryption passphrase doesn't contain at least 1 uppercase letter", async () => {
      await expect(web2AndThreeQuarters.encryptWallet(wallet, "hello_world_from_me_1@")).to.be.rejectedWith(errorMsg.invalidPassphraseDuringWalletGeneration);
    });
    
    it("should fail if encryption passphrase doesn't contain at least 1 lowercase letters", async () => {
      await expect(web2AndThreeQuarters.encryptWallet(wallet, "HELLOWORLDF1ROMME1")).to.be.rejectedWith(errorMsg.invalidPassphraseDuringWalletGeneration);
    });
    
    it("should fail if encryption passphrase doesn't contain at least 1 lspecial character", async () => {
      await expect(web2AndThreeQuarters.encryptWallet(wallet, "HELLOWORLDF1ROMMe1")).to.be.rejectedWith(errorMsg.invalidPassphraseDuringWalletGeneration);
    });
    
    it("should succeed by returning a string", async () => {
      const res = await web2AndThreeQuarters.encryptWallet(wallet, encryptionPassphrase);
      expect(res).to.be.a('string');
      expect(res).to.not.be.empty;
    });
  });

  describe("decryptWallet", () => {
    let walletEncrypted: string;

    before("generate new wallet", async () => {
      walletEncrypted = await web2AndThreeQuarters.encryptWallet(wallet, encryptionPassphrase);
    });

    it("should fail if encrypted wallet string is empty", async () => {
      await expect(web2AndThreeQuarters.decryptWallet("", encryptionPassphrase)).to.be.rejectedWith(errorMsg.emptyEncryptedWallet);
    });

    it("should fail if passphrase used for encryption is empty", async () => {
      await expect(web2AndThreeQuarters.decryptWallet(walletEncrypted, "")).to.be.rejectedWith(errorMsg.emptyPassphrase);
    });

    it("should fail if encrypted wallet is invalid, if wrong letters", async () => {
      const corruptedWalletEncrypted = walletEncrypted.replace("a", "_").replace("v", "!").replace("e", "@").replace("i", "#").replace("s", "$");

      await expect(web2AndThreeQuarters.decryptWallet(corruptedWalletEncrypted, encryptionPassphrase)).to.be.rejectedWith(errorMsg.failedToDecryptPrefix);
    });

    it("should fail if encrypted wallet is invalid, if corrupted \"mnemonic...\" field", async () => {
      const corruptedWalletEncrypted = walletEncrypted.replace("mnemonic", "");

      await expect(web2AndThreeQuarters.decryptWallet(corruptedWalletEncrypted, encryptionPassphrase)).to.be.rejectedWith(errorMsg.failedToDecryptPrefix);
    });

    it("should fail if passphrase used for encryption is invalid", async () => {
      const wrongPassphrase = encryptionPassphrase + "Wrong";

      await expect(web2AndThreeQuarters.decryptWallet(walletEncrypted, wrongPassphrase)).to.be.rejectedWith(errorMsg.failedToDecryptPrefix);
    });

    it("should return correct wallet", async () => {
      const walletDecrypted = await web2AndThreeQuarters.decryptWallet(walletEncrypted, encryptionPassphrase);

      expect(walletDecrypted).to.deep.equal(wallet);
    });
  });

  describe("signMessage", () => {
    it("should fail if _message.length == 0", async () => {
      await expect(web2AndThreeQuarters.signMessage(wallet, "")).to.be.rejectedWith(errorMsg.emptyMessageToSign);
    });

    it("should fail if wallet is wrong", async () => {
      const corruptedWallet = {
        provider: null,
        address: '0x96802b8Bfb20D009122631A0DF57F7A61043fA76',
        publicKey: '0x024e0fa0366a9b6028664a90f938e3f181fdb5eb619882a788988cf062b827c6fa'
      };
      await expect(web2AndThreeQuarters.signMessage(corruptedWallet as HDNodeWallet, "Hello World")).to.be.rejectedWith(errorMsg.failedToSignMessagePrefix);
    });

    it("should return a signature", async () => {
      const sig = await web2AndThreeQuarters.signMessage(wallet, "Hello World");

      await expect(sig).to.be.a("string");
      await expect(sig).to.have.lengthOf.above(0);
    });

    it("should verify correct signer", async () => {
      const message = "Hello World";
      const signature = await web2AndThreeQuarters.signMessage(wallet, message);
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
      signature = await web2AndThreeQuarters.signMessage(wallet, message);
      signer = await wallet.getAddress();
    });

    
    it("should fail if _message.length == 0", async () => {
      await expect(web2AndThreeQuarters.getMessageSigner("", signature)).to.be.rejectedWith(errorMsg.emptyMessageInGetMessageSigner);
    });

    it("should fail if _message.length == 0", async () => {
      await expect(web2AndThreeQuarters.getMessageSigner(message, "")).to.be.rejectedWith(errorMsg.emptySignatureInGetMessageSigner);
    });

    it("should return correct signer", async () => {
      const recoveredSigner = await web2AndThreeQuarters.getMessageSigner(message, signature);

      expect(recoveredSigner).to.be.equal(signer);
    });
  });

  describe("isMessageSigner", async () => {
    const message = "Hello World";
    let signature: string;
    let signer: string;

    before("generate new wallet", async () => {
      signature = await web2AndThreeQuarters.signMessage(wallet, message);
      signer = await wallet.getAddress();
    });

    
    it("should fail if _message.length == 0", async () => {
      await expect(web2AndThreeQuarters.isMessageSigner("", signature, signer)).to.be.rejectedWith(errorMsg.emptyMessageInGetMessageSigner);
    });

    it("should fail if _message.length == 0", async () => {
      await expect(web2AndThreeQuarters.isMessageSigner(message, "", signer)).to.be.rejectedWith(errorMsg.emptySignatureInGetMessageSigner);
    });

    it("should fail if _signer.length == 0", async () => {
      await expect(web2AndThreeQuarters.isMessageSigner(message, signature, "")).to.be.rejectedWith(errorMsg.emptySignerInIsMessageSigner);
    });

    it("should return false for the provided incorrect signer", async () => {
      const res = await web2AndThreeQuarters.isMessageSigner(message, signature, signer + "1");

      expect(res).to.be.false;
    });

    it("should return true for correct signer", async () => {
      const res = await web2AndThreeQuarters.isMessageSigner(message, signature, signer);

      expect(res).to.be.true;
    });
  });

  describe("signTransaction", async () => {
    let tx: TransactionRequest;

    before("generate new wallet and tx", async () => {
      tx = {
        to: "0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd",
        value: ethers.parseEther("0.001"),
        gasLimit: "21000",
        maxPriorityFeePerGas: ethers.parseUnits("5", "gwei"),
        maxFeePerGas: ethers.parseUnits("20", "gwei"),
        nonce: 0,
        type: 2,
        chainId: 5, // Corresponds to ETH_GOERLI
      };
    });

    it("should sign the transaction", async () => {
      const res = await web2AndThreeQuarters.signTransaction(wallet, tx);
      expect(res).satisfy(addr => addr.startsWith('0x'), "wrong signature prefix");
      expect(res).to.have.lengthOf.above(2, "wrong length");
    });
  });
});