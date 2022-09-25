import axios from "axios";
import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };

    if (!code) {
      notifyCodeEmpty();
    } else {
      try {
        setOutput("");
        const { data } = await axios.post(
          "http://localhost:5000/run",
          payload,
          {
            timeout: 5000,
          }
        );
        setOutput(data.output);
      } catch ({ response }) {
        if (response) {
          const errMsg = response.data.err.stderr;
          setOutput(errMsg);
        } else {
          setOutput(
            "Some error occurred. Please check the speed and time complexity of your code."
          );
        }
      }
    }
  };

  const setLanguageHelper = (e) => {
    setLanguage(e.target.value);
    notifyLanguageChange(e.target.value);
  };

  let codingLanguage = {
    cpp: "C++",
    py: "Python",
    asm: "Assembly",
  };

  const notifyLanguageChange = (lang) =>
    toast(`Language changed to ${codingLanguage[lang]}`);
  const notifyCodeEmpty = () =>
    toast(`Write some code in ${codingLanguage[language]} first`);

  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <ToastContainer />
      <Typography variant="h3">Welcome to ABOJ</Typography>
      <div>
        <FormControl style={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label="Language"
            onChange={setLanguageHelper}
          >
            <MenuItem value={"cpp"}>C++</MenuItem>
            <MenuItem value={"py"}>Python</MenuItem>
            <MenuItem value={"asm"}>Assembly</MenuItem>
          </Select>
        </FormControl>

        <Button
          style={{ marginLeft: "10px", width: "200px", height: "56px" }}
          variant="outlined"
          onClick={handleSubmit}
        >
          <PlayCircleFilledWhiteIcon />
          RUN
        </Button>
      </div>
      <TextareaAutosize
        maxRows={4}
        aria-label="maximum height"
        placeholder="Write code here"
        defaultValue={code}
        style={{ width: 1500, height: 400, marginTop: "20px" }}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      />
      <br />
      {/* <button onClick={handleSubmit}>Submit</button> */}
      <p>{output}</p>
    </div>
  );
}

export default App;
