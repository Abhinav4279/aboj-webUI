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
  Typography,
} from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CodeEditor from "./components/CodeEditor";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [status, setStatus] = useState('');
  const [jobId, setJobId] = useState('');

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
        const { data } = await axios.post(`${BASE_URL}/run`, payload);
        setJobId(data.jobId);
        let intervalId;

        console.log(data.jobId)
        intervalId = setInterval(async () => {
          const { data: dataRes } = await axios.get(`${BASE_URL}/status`,
            { params: { id: data.jobId } });

            const {success, job, error} = dataRes;
            console.log(dataRes);

            if(success) {
              const {status: jobStatus, output: jobOutput} = job;
              setStatus(jobStatus)
              if(jobStatus === 'pending') return;
              console.log(jobOutput)
              setOutput(jobOutput);

              clearInterval(intervalId);
            }
            else {
              setStatus('Error occurred!');
              console.log(error);
              clearInterval(intervalId);
              setOutput(error);
            }
          // console.log(dataRes);
        }, 1000);
      } catch ({ response }) {
        if (response) {
          const errMsg = response.data.err.stderr;
          setOutput(errMsg);
        } else {
          setOutput(
            `Some error occurred.\nHint: Check speed and time of your code.`
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
    <ThemeProvider theme={darkTheme}>
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
              <MenuItem value={"cpp"}>C/C++</MenuItem>
              <MenuItem value={"asm"}>Assembly</MenuItem>
            </Select>
          </FormControl>

          <Button
            style={{ marginLeft: "10px", width: "200px", height: "56px" }}
            variant="outlined"
            onClick={handleSubmit}
          >
            <PlayCircleFilledWhiteIcon />
            Execute
          </Button>
        </div>
        <p>{status}</p>
        <p>{jobId && `JobID: ${jobId}`}</p>
        <CodeEditor submitCode={setCode} result={output} />
      </div>
    </ThemeProvider>
  );
}

export default App;
