import Navbar from "./component/navbar";
import Home from "./pages/home";
import Footer from "./component/footer";
function App() {
  return (
    <>
      {/* Navbar on top */}
      <div className="relative z-[1000]">
        <Navbar />
      </div>

      {/* Page content */}
      <Home />
      <Footer/>
    </>
  );
}

export default App;
