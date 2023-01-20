import React, { useState } from "react";
import Header from "./components/Header";
// import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div className="container my-5 px-5 py-5">
        <table className="table-auto border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300">Name</th>
              <th className="border border-slate-300">🌟 Stars</th>
              <th className="border border-slate-300">Forks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 p-2">
                The Sliding Mr. Bones (Next Stop, Pottersville)
              </td>
              <td className="border border-slate-300 p-2">Malcolm Lockyer</td>
              <td className="border border-slate-300 p-2">1961</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
