import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar";
import Home from "./pages/home";
import Footer from "./component/footer";
import RhinoplastyPage from "./pages/RhinoplastyPage";
import PreOperationPage from "./pages/preoperation";
import ThreeD_VertexColorViewer from "./pages/ThreeD_Viewer";

function App() {
  return (
    <Router>
      {/* Navbar on top */}
      <div className="relative z-[1000]">
        <Navbar />
      </div>

      {/* Define all routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rhinoplasty" element={<RhinoplastyPage />} />
        <Route path="/preoperation" element={<PreOperationPage />} />
        <Route path="/success" element={<ThreeD_VertexColorViewer />} />
      </Routes>

      {/* Footer on all pages */}
      <Footer />
    </Router>
  );
}

export default App;
