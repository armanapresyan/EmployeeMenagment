import "./App.css";
import Crud from "./components/Crud/Crud";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <div className="appwrapper">
        <Header />
        <Crud />
      </div>
    </div>
  );
}

export default App;
