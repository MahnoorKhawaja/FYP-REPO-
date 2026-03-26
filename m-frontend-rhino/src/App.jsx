import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

import Navbar from "./component/navbar";
import Home from "./pages/home";
import Footer from "./component/footer";
import RhinoplastyPage from "./pages/RhinoplastyPage";
import PreOperationPage from "./pages/preoperation";
import ComparisonUploadPage from "./pages/postoperation";
import ThreeD_VertexColorViewer from "./pages/ThreeD_Viewer";
import ThreeD_PrePostComparison from "./pages/comparison";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import UseCases from "./pages/UseCases";
import PrivateLayout from "./layout/PrivateLayout";
import DashboardHome from "./pages/dashboard/dashboardhome";


function App() {
  return (
    <Router>

      <div className="relative z-[1000]">
        <Navbar />
      </div>

      <Routes>

        {/* HOME – visible to all */}
<Route
  path="/"
  element={
    <>
      <SignedIn>
        <Navigate to="/dashboard" />
      </SignedIn>
      <SignedOut>
        <Home />
      </SignedOut>
    </>
  }
/>        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/usecases" element={<UseCases />} />


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

        {/* DASHBOARD (protected) */}
<Route
  path="/dashboard"
  element={
    <>
      <SignedIn>
        <PrivateLayout />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  }
>
  <Route index element={<DashboardHome />} />
</Route>

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
          path="/postoperation"
          element={
            <>
              <SignedIn>
                <ComparisonUploadPage />
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
        

        <Route
        path="/comparison"
        element={
        <>
        <SignedIn>
        <ThreeD_PrePostComparison />
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
