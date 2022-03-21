import './App.css';
import LABPicker from './LABPicker.tsx';
import React, { useState,useEffect } from 'react'
import * as d3 from 'd3';

function App() {
  const [lColor, setLColor] = useState(50);
  const [aColor, setAColor] = useState(0);
  const [bColor, setBColor] = useState(0);

  const [lAxis, setLAxis] = useState("150");
  const [aAxis, setAAxis] = useState("150");
  const [bAxis, setBAxis] = useState("150");


  const width = 300;

  const channels = {
    l: { scale: d3.scale.linear().domain([0, 100]).range([0, width]), x: lAxis }, //L Range
    a: { scale: d3.scale.linear().domain([-128, 127]).range([0, width]), x: aAxis },// A range
    b: { scale: d3.scale.linear().domain([-128, 127]).range([0, width]), x: bAxis }// B range
  }
  
  

  // useEffect(() => {

  //   setLColor(62.66666666666667)
  //   setAColor(55.599999999999994)
  //   setBColor(-57.45);

  //   setLAxis("188")
  //   setAAxis("216")
  //   setBAxis("83")

  // }, [])
  



  return (
    <div className="App">
      <LABPicker
        lColor={lColor}
        aColor={aColor}
        bColor={bColor}

        lAxis={lAxis}
        aAxis={aAxis}
        bAxis={bAxis}

        width={width}
        channels={channels}
      />

      <button onClick={() => {

        const l = parseFloat(document.getElementById("currentL").innerHTML);
        const a = parseFloat(document.getElementById("currentA").innerHTML);
        const b = parseFloat(document.getElementById("currentB").innerHTML);

        const laxis = document.getElementById("lAxis").value;
        const aaxis = document.getElementById("aAxis").value;
        const baxis = document.getElementById("bAxis").value;

        setLColor(l)
        setAColor(a)
        setBColor(b)

        setLAxis(laxis)
        setAAxis(aaxis)
        setBAxis(baxis)


      }}>Save</button>
    </div>
  );
}

export default App;
