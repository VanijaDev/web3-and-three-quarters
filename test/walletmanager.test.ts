import { HDNodeWallet } from "ethers";
import { generateWallet } from "../src/wallet_manager/wallet";
import { expect } from "chai";

describe("Walletmanager", () => {

  describe("generateWallet", () => {
    let wallet: HDNodeWallet;

    before("generate new wallet", async () => {
      wallet = await generateWallet();
      console.log("In test wallet: ", wallet);
    });

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
});