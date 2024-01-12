import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CallDetails from "./pages/CallDetails";
import Header from "./components/header/Header";
import ArchivedCalls from "./pages/ArchivedCalls";
function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archived" element={<ArchivedCalls />} />
        <Route path="/call/:callId" element={<CallDetails />} />
      </Routes>
    </div>
  );
}

export default App;
