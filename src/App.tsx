import "./App.css";
import { Sidebar } from "./assets/components/sidebar/Sidebar";

function App() {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <div className="flex-1 min-h-screen bg-blue-200 flex items-center justify-center">
        <h1>Smart Finance</h1>
      </div>
    </div>
  );
}

export default App;
