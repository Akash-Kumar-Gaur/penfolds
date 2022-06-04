import HomeScene from "./scenes/HomeScene";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import ExploreWines from "./scenes/ExploreWines";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyCiOLB5Df8mvf43x-A159cCGAyqu8m5oPk",
  authDomain: "penfoldsdj.firebaseapp.com",
  projectId: "penfoldsdj",
  storageBucket: "penfoldsdj.appspot.com",
  messagingSenderId: "316898757129",
  appId: "1:316898757129:web:94ad38af980c315ce406d8",
};

function App() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScene />} />
          <Route path="/explore" element={<ExploreWines db={db} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
