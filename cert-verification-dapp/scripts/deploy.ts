import hre from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const { ethers } = hre;
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying contract with account:", deployer.address);

  // Deploy Certificate contract
  const Certificate = await ethers.getContractFactory("Certificate");
  const certificate = await Certificate.deploy();
  await certificate.waitForDeployment();

  const contractAddress = await certificate.getAddress();
  console.log("✅ Certificate deployed to:", contractAddress);

  // Deployer is already authorized as college (constructor)
  console.log(`🏫 Deployer authorized as college: ${deployer.address}`);

  // Add a sample certificate (3 string args as per Solidity)
  const studentName = "Alice";
  const courseName = "Blockchain Basics";
  const certId = "CERT12345";

  const tx = await certificate.addCertificate(studentName, courseName, certId);
  await tx.wait();
  console.log(`🎓 Certificate added successfully: ${certId} for ${studentName}`);

  // Save deployed address for frontend integration
  const deploymentsPath = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsPath)) fs.mkdirSync(deploymentsPath);

  fs.writeFileSync(
    path.join(deploymentsPath, "certificateAddress.json"),
    JSON.stringify({ address: contractAddress }, null, 2)
  );
  console.log("📄 Address saved to deployments/certificateAddress.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
