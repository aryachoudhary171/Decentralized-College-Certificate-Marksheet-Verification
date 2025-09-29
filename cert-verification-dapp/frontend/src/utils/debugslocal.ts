import { BrowserProvider, JsonRpcProvider } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const debugLocal = async () => {
  if (!window.ethereum) return;

  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const account = await signer.getAddress();

  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  console.log("ChainId:", chainId);
  console.log("Account:", account);

  const balance = await provider.getBalance(account);
  console.log(`Balance: ${(Number(balance) / 1e18).toFixed(4)} ETH`);

  const rpcProvider = new JsonRpcProvider("http://127.0.0.1:8545");
  const blockNumber = await rpcProvider.getBlockNumber();
  console.log("Block number:", blockNumber);

  return { account, balance, chainId, blockNumber };
};
