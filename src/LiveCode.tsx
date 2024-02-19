import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import styles from "./styles.module.css";

const LiveCode = ({ initialValue = ``, renderNow = false }) => {
  const [code, setCode] = useState(initialValue);
  const [output, setOutput] = useState("");
  const [logs, setLogs] = useState([]); // Store captured log messages

  const editorOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
    lineNumbers: "on",
    scrollBeyondLastLine: false,
    theme: {
      base: "vs",
      inherit: true,
      rules: [],
      colors: {
        "editor.foreground": "#000000",
        "editor.background": "#EDF9FA",
        "editorCursor.foreground": "#8B0000",
        "editor.lineHighlightBackground": "#0000FF20",
        "editorLineNumber.foreground": "#008800",
        "editor.selectionBackground": "#88000030",
        "editor.inactiveSelectionBackground": "#88000015",
      },
    },
  };

  useEffect(() => {
    if (renderNow) {
      // Run the initial code if renderNow is true
      executeCode(initialValue);
    }
  }, []);

  const captureLogs = (fn) => {
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      setLogs((prevLogs) => [
        ...prevLogs,
        ...args.map((arg) =>
          typeof arg === "object"
            ? JSON.stringify(arg, null, 2)
            : arg.toString()
        ),
      ]);
      originalConsoleLog.apply(console, args);
    };

    fn();

    console.log = originalConsoleLog; // Restore original console.log after execution
  };

  const executeCode = (currentCode) => {
    setLogs([]); // Clear logs before execution
    captureLogs(() => {
      try {
        const result = eval(currentCode);
        if (typeof result === "object" && result !== null) {
          setOutput(JSON.stringify(result, null, 2));
        } else {
          setOutput(result.toString());
        }
      } catch (error) {
        setOutput("Error: " + error.message);
      }
    });
  };
  const onChange = (newValue) => {
    setCode(newValue);
    if (renderNow) {
      executeCode(newValue);
    }
  };

  return (
    <div className={styles.editorContainer}>
      <h2 className={styles.title}>Live Code Editor</h2>
      <MonacoEditor
        height="200"
        language="javascript"
        theme={"vs-light"}
        value={code}
        options={editorOptions}
        onChange={onChange}
        className={styles.editor}
      />
      {!renderNow && (
        <button
          onClick={() => executeCode(code)}
          className={styles.renderButton} // Add corresponding styling in your CSS module
        >
          Run ▶️
        </button>
      )}
      <h2 className={styles.outputTitle}>Result</h2>
      <div className={styles.output}>{output}</div>
      <h2 className={styles.logTitle}>Console</h2>
      <div className={styles.consoleLog}>
        {logs.map((log, index) => (
          <pre key={index}>{log}</pre>
        ))}
      </div>
    </div>
  );
};

export default LiveCode;
