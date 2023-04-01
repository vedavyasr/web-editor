import "./App.css";

import { useEffect, useRef, useState } from "react";

import Directory from "./components/Directory";
import Editor from "@monaco-editor/react";
import FileTree from "./filetree";
import files from "./files.json";
import readFile from "read-file-utf8";

function App() {
  const [targetFiles, setTargetFiles] = useState([]);
  const [content, setContent] = useState(null);
  const [folderTree, setFolderTree] = useState({});
  let fileReader = new FileReader();

  const handleFileRead = (e) => {
    const data = fileReader.result;
    console.log(data);
    setContent(data);
  };

  console.log(content);

  const onFileChange = (e) => {
    if (e.target.files?.length) {
      const files = Array.from(e.target.files);

      const size = files.reduce((a, v) => {
        a += v.size;
        return a;
      }, 0);

      if (size / 1024 / 1024 < 20) {
        setTargetFiles(e.target.files);

        const fileNames = files.map((v) => v.webkitRelativePath);

        let fileTree = [];
        let level = { fileTree };

        fileNames.forEach((fileName, ind) => {
          const paths = fileName.split("/");
          paths.reduce((r, name, i, a) => {
            if (paths.length - 1 === i) {
              r.fileTree.push({ name, parentId: ind });
            } else if (!r[name]) {
              r[name] = { fileTree: [] };

              r.fileTree.push({
                name,
                children: r[name].fileTree,
                parentId: ind,
              });
            }

            return r[name];
          }, level);
        });

        setFolderTree(fileTree[0]);
      }
    }
  };

  console.log(folderTree);

  const onNameClick = ({ nodeData }) => {
    // const {
    //   // internal data
    //   path, name, checked, isOpen,
    //   // custom data
    //   url, ...whateverRest
    // } = nodeData;
    const fileBlob = targetFiles[nodeData.parentId];
    console.log(fileBlob);
    if (nodeData.name == fileBlob.name) {
      fileReader.onloadend = handleFileRead;
      fileReader.readAsText(fileBlob);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {Object.keys(folderTree).length === 0 ? (
        <input
          onChange={(e) => onFileChange(e)}
          type="file"
          webkitdirectory="true"
        />
      ) : null}

      <div>
        <FileTree data={folderTree} onNameClick={onNameClick} />
      </div>
      <div style={{ flexGrow: 1 }}>
        <Editor height="90vh" defaultLanguage="javascript" value={content} />
      </div>
    </div>
  );
}

export default App;
