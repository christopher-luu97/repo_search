import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Main} from "./components/Main/Main";

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-800">
      <Header />
      <Main  />
      <Footer />
    </div>
  );
}

export default App;
