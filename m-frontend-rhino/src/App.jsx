import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Navbar from "./component/navbar";
import Home from "./pages/home";
import Footer from "./component/footer";
import RhinoplastyPage from "./pages/RhinoplastyPage";
import PreOperationPage from "./pages/preoperation";
import ThreeD_VertexColorViewer from "./pages/ThreeD_Viewer";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";

function App() {
  return (
    <Router>

      <div className="relative z-[1000]">
        <Navbar />
      </div>

      <Routes>

        {/* HOME – visible to all */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Protected routes */}
        <Route
          path="/rhinoplasty"
          element={
            <>
              <SignedIn>
                <RhinoplastyPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/preoperation"
          element={
            <>
              <SignedIn>
                <PreOperationPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/success"
          element={
            <>
              <SignedIn>
                <ThreeD_VertexColorViewer />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* Safety fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

      <Footer />

    </Router>
  );
}

export default App;
