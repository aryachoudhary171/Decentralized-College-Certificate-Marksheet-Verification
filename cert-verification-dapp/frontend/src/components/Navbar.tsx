const Navbar = () => {
  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      alert("✅ Wallet Connected!");
    } else {
      alert("❌ MetaMask not found!");
    }
  };

  return (
    <nav className="p-4 bg-gradient-to-r from-orange-400 to-orange-600 flex justify-between items-center shadow-md">
      <h1 className="font-extrabold text-2xl text-white tracking-wide">
        🎓 Certificate DApp
      </h1>
      <button
        onClick={connectWallet}
        className="bg-white text-orange-600 font-semibold px-4 py-2 rounded-lg shadow hover:bg-orange-100 transition"
      >
        Connect Wallet
      </button>
    </nav>
  );
};

export default Navbar;
