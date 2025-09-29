import { expect } from "chai";
import { ethers } from "hardhat";
// no need to import network-helpers manually

describe("Certificate Contract", function () {
    it("Should add and verify certificate", async function () {
        const [college, company] = await ethers.getSigners();
        const Certificate = await ethers.getContractFactory("Certificate");
        const certificate = await Certificate.deploy();
        await certificate.deployed();

        // College adds certificate
        await certificate.connect(college).addCertificate("Vrunda Bohra", "Blockchain", "CERT123");

        // Verify certificate
        const cert = await certificate.verifyCertificate("CERT123");
        expect(cert[0]).to.equal("Vrunda Bohra");
        expect(cert[1]).to.equal("Blockchain");
    });
});
