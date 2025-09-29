import React, { useEffect, useState } from "react";
import { connectContract } from "../utils/connectContract";
import { debugLocal } from "../utils/debugslocal";

const VerifyCertificate = () => {
  const [contract, setContract] = useState<any>(null);
  const [certId, setCertId] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const init = async () => {
      await debugLocal();
      const { contractWithSigner } = await connectContract();
      setContract(contractWithSigner);
    };
    init();
  }, []);

  const handleVerify = async () => {
    if (!contract || !certId) {
      setStatus("⚠️ Please enter Certificate ID");
      return;
    }
    try {
      const result = await contract.verifyCertificate(certId);
      if (result) {
        setStatus(`✅ Certificate ${certId} is valid!`);
      } else {
        setStatus(`❌ Certificate ${certId} not found!`);
      }
    } catch (err: any) {
      console.error(err);
      setStatus("❌ Error verifying certificate: " + (err?.reason || err?.message));
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Verify Certificate</h2>
      <input
        type="text"
        placeholder="Enter Certificate ID"
        value={certId}
        onChange={(e) => setCertId(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleVerify} style={{ padding: "10px 20px" }}>
        Verify
      </button>
      <p>{status}</p>
    </div>
  );
};

export default VerifyCertificate;
