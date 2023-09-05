import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { FolderInput, TreeFileComponent, TreeFileComponentProps } from './components/Explorer';
import { useState } from 'react';
import { convertListFileToObjectParentTree, readTemplate } from './utils';

type MappedFiles = {
  [key: string]: File;
};

function App() {
  const [root, setRoot] = useState("");
  const [fileTree, setFileTree] = useState<TreeFileComponentProps["data"] | null>(null);
  const [mappedFileItems, setMappedFileItems] = useState<MappedFiles>({});
  const [currentSelectFile, setCurrentSelectFile] = useState<
    string | null | undefined
  >(null);

  const handleInputChange = (files: FileList | null) => {
    if (files) {
      const tempedMappedFiles: MappedFiles = {};

      // Convert the FileList to an array
      const mappedFiles = Array.from(files);

      mappedFiles.forEach((item: File) => {
        tempedMappedFiles[item.webkitRelativePath] = item;
      });

      const template = convertListFileToObjectParentTree(mappedFiles);
      setRoot(Object.keys(template)[0]);
      const value = readTemplate(template, {});

      setFileTree(value);
      setMappedFileItems(tempedMappedFiles);
    }
  };

  return (
      <main>
      <Header />
      <div className="flex">
        <div className="w-full h-screen">
          <div className="w-1/4 overflow-auto">
          <FolderInput onChange={handleInputChange} />
          {fileTree && (
            <TreeFileComponent
              data={fileTree}
              root={root}
              onSelectItems={(items, treeId) => {
                const file = mappedFileItems[items[0]];
                if (file) {
                  setCurrentSelectFile(URL.createObjectURL(file));
                } else {
                  setCurrentSelectFile(null);
                }
              }}
            />
          )}
        </div>
        <div style={{ flex: 1 }}>
          {currentSelectFile && (
            <embed
              style={{ width: "100%", height: "100%" }}
              src={currentSelectFile}
            />
          )}
        </div>
      </div>
      </div>
      <Footer />
    </main>

  );
}

export default App;
