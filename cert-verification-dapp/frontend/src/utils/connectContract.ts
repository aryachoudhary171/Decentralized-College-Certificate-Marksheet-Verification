import { ethers } from "ethers";
import CertificateArtifact from "../../../artifacts/contracts/Certificate.sol/Certificate.json";
import deployed from "../../../deployments/certificateAddress.json";

export interface ContractConnection {
  contractWithSigner: ethers.Contract;
}

export async function connectContract(): Promise<ContractConnection> {
  if (!window.ethereum) throw new Error("MetaMask not found");

  // Connect MetaMask
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();

  // Load contract
  const contractWithSigner = new ethers.Contract(
    deployed.address,
    CertificateArtifact.abi,
    signer
  );

  return { contractWithSigner };
}
