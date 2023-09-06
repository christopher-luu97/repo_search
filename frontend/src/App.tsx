import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Explorer } from "./components/Explorer/Explorer";

function App() {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col">
      <Header />
      <div className="flex-grow overflow-y-auto h-[calc(100vh - 100px)]">
        <Explorer />
      </div>
      <Footer />
    </div>
  );
}

export default App;
