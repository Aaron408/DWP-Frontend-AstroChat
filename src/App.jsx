import { BrowserRouter } from "react-router-dom";
import Navigation from "./routes/Navigation";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
