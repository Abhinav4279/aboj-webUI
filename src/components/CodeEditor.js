import React from "react";
import Editor from "@monaco-editor/react";
import { Card } from "@mui/material";

export default function CodeEditor(props) {
  function handleEditorChange(value, event) {
    props.submitCode(value);
  }

  let defaultValue = "// output will be shown here";

  return (
    <div style={{ display: "flex", marginTop: "20px" }}>
      <Card
        variant="outlined"
        style={{
          width: "80%",
        }}
        readOnly={true}
      >
        <Editor
          height="90vh"
          theme="vs-dark"
          defaultLanguage="yaml"
          defaultValue="// write your code here"
          onChange={handleEditorChange}
        />
      </Card>

      <Card variant="outlined" style={{ width: "20%" }}>
        <Editor
          defaultLanguage="yaml"
          theme="vs-dark"
          defaultValue={defaultValue}
          value={props.result}
        />
      </Card>
    </div>
  );
}
