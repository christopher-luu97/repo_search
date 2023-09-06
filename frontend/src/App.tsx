import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Explorer } from "./components/Explorer/Explorer";

function App() {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col">
      <Header />
      <Explorer />
      <Footer />
    </div>
  );
}

export default App;
