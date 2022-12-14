import React from "react";
import Editor from "@monaco-editor/react";
import { Card } from "@mui/material";

export default function CodeEditor(props) {
  function handleEditorChange(value) {
    props.setCode(value);
  }

  let defaultValue = "// output will be shown here";
  let wrapObj = {wordWrap: 'on'};

  return (
    <div style={{ display: "flex", marginTop: "20px" }}>
      <Card
        variant="outlined"
        style={{
          width: "70%",
        }}
        readOnly={true}
      >
        <Editor
          height="90vh"
          theme="vs-dark"
          defaultLanguage="yaml"
          value={props.code}
          onChange={handleEditorChange}
        />
      </Card>

      <Card variant="outlined" style={{ width: "30%" }}>
        <Editor
          defaultLanguage="yaml"
          theme="vs-dark"
          options={wrapObj}
          defaultValue={defaultValue}
          value={props.result}
        />
      </Card>
    </div>
  );
}
