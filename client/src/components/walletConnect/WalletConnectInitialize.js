import WalletConnect from "@walletconnect/browser";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";


const WalletConnectInitialize = () => {

  // Create a walletConnector
  const walletConnector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org" // Required
  });

  // Check if connection is already established
  if (!walletConnector.connected) {
    // create new session
    walletConnector.createSession().then(() => {
      // get uri for QR Code modal
      const uri = walletConnector.uri;
      // display QR Code modal
      WalletConnectQRCodeModal.open(uri, () => {
        console.log("QR Code Modal closed");
      });
    });
  }

  // Subscribe to connection events
  walletConnector.on("connect", (error, payload) => {
    if (error) {
      throw error;
    }

    // Close QR Code Modal
    WalletConnectQRCodeModal.close();

    // Get provided accounts and chainId
    const { accounts, chainId } = payload.params[0];
  });

  walletConnector.on("session_update", (error, payload) => {
    if (error) {
      throw error;
    }

    // Get updated accounts and chainId
    const { accounts, chainId } = payload.params[0];
  });

  walletConnector.on("disconnect", (error, payload) => {
    if (error) {
      throw error;
    }

    // Delete walletConnector
  });

}

export default WalletConnectInitialize;
