import * as LitJsSdk from "lit-js-sdk";

const client = new LitJsSdk.LitNodeClient({debug: false})
const chain = 'polygon'


class Lit {
  litNodeClient

  async connect() {
    await client.connect()
    this.litNodeClient = client
  }

  async encryptMessage(str, accessControlConditions) {
    var errString = "";
    var encryptedString, symmetricKey, encryptedSymmetricKey;
    if (!this.litNodeClient) {
      await this.connect()
    }

    try {
      const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })

      var { encryptedString, symmetricKey } = await LitJsSdk.encryptString(str);

      encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
        accessControlConditions,
        symmetricKey,
        authSig,
        chain,
      })    
    } catch (e) {
      errString = "errLitNetwork";
    }

    return {
      error: errString,  
      encryptedString: LitJsSdk.uint8arrayToString( new Uint8Array(await encryptedString.arrayBuffer()), "base64"),
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base64")
    }
  }

  async decryptMessage(encryptedStringBase64, encryptedSymmetricKeyBase64, accessControlConditions) {
    var errString = "";
    var symmetricKey, decryptedString;
    if (!this.litNodeClient) {
      await this.connect()
    }

    const encryptedSymmetricKeyArray = LitJsSdk.uint8arrayFromString(
      encryptedSymmetricKeyBase64,
      "base64"
    );
    try {
      const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
      symmetricKey = await this.litNodeClient.getEncryptionKey({
        accessControlConditions,
        toDecrypt: LitJsSdk.uint8arrayToString(encryptedSymmetricKeyArray, "base16"), 
        chain,
        authSig
      })
    } catch (e) {
      errString = "errNotAuthorised";
      return {error: errString};
    }

    // Decode EncryptedString XXX
    const encryptedStringArray = LitJsSdk.uint8arrayFromString(
      encryptedStringBase64,
      "base64"
      ).buffer;
    const blob = new Blob([encryptedStringArray]);  // hmmmm....    
    try {
      decryptedString = await LitJsSdk.decryptString(
        blob,
        symmetricKey
      );
    } catch (e) {
      errString = "errLitNetwork";
      return {error: errString};
    }

    return {
      error: errString,  
      decryptedString: decryptedString
    }
  }

}

export default new Lit()
