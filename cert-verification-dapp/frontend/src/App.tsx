import "./App.css"; // 👈 CSS import yaha hona chahiye
import Navbar from "./components/Navbar";
import AddCertificate from "./components/AddCertificate";
import VerifyCertificate from "./components/VerifyCertificate";

const App = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="page-container">
        <div className="card">
          <AddCertificate />
        </div>
        <div className="card">
          <VerifyCertificate />
        </div>
      </div>
    </div>
  );
};

export default App;
