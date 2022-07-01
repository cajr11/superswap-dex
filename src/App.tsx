import React from "react";
import "./App.css";
import Swap from "./pages/Swap";
import NavBar from "./components/NavBar/NavBar";

function App():JSX.Element {
  return (
    <div className={styles.containerLight}>
      <NavBar />
      <Swap />
    </div>
  );
}

export default App;


const styles = {
  containerLight: "w-screen h-screen bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 overflow-hidden",
  containerDark: "w-screen h-screen bg-gradient-to-r from-indigo-800 via-blue-900 to-zinc-800"
}