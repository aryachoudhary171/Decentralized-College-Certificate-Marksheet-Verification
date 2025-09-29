import React, { useState } from "react";
import type { ContractConnection } from "../utils/connectContract";
import { connectContract } from "../utils/connectContract";

const AddCertificate = () => {
  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [certId, setCertId] = useState("");
  const [status, setStatus] = useState("");

  const handleAddCertificate = async () => {
    setStatus("⏳ Connecting...");
    try {
      const { contractWithSigner }: ContractConnection = await connectContract();

      const tx = await contractWithSigner.addCertificate(studentName, course, certId);
      setStatus("⏳ Waiting for transaction confirmation...");
      await tx.wait();

      setStatus("✅ Certificate added successfully!");
      setStudentName("");
      setCourse("");
      setCertId("");
    } catch (err: any) {
      console.error(err);
      setStatus("❌ Error: " + (err?.reason || err?.message || "Transaction failed"));
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md border border-orange-200">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">Add Certificate</h2>

      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="w-full p-2 mb-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
      />
      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="w-full p-2 mb-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
      />
      <input
        type="text"
        placeholder="Certificate ID"
        value={certId}
        onChange={(e) => setCertId(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
      />

      <button
        onClick={handleAddCertificate}
        className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-orange-600 transition"
      >
        Add Certificate
      </button>

      <p className="mt-3 text-sm text-gray-700">{status}</p>
    </div>
  );
};

export default AddCertificate;
