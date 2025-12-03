import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import Navbar from "./component/navbar";
import Home from "./pages/home";
import Footer from "./component/footer";
import RhinoplastyPage from "./pages/RhinoplastyPage";
import PreOperationPage from "./pages/preoperation";
import ThreeD_VertexColorViewer from "./pages/ThreeD_Viewer";

function App() {
  return (
    <Router>

      <div className="relative z-[1000]">
        <Navbar />
      </div>

      <Routes>

        {/* HOME – visible to all */}
        <Route path="/" element={<Home />} />

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
        <Route
          path="*"
          element={
            <>
              <SignedIn>
                <Navigate to="/" />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

      </Routes>

      <Footer />

    </Router>
  );
}

export default App;
