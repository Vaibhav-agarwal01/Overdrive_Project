import "./App.css";
import GitHubUser from "./components/GitHubUser";
import CodeforcesUser from "./components/CodeforcesUser";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/github" element={<GitHubUser />} />
        <Route path="/codeforces" element={<CodeforcesUser />} />
      </Routes>
    </>
  );
}
