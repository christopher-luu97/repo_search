import { FolderInput } from "./FolderInput";
import { TreeFileComponent } from "./TreeFileComponent";
import { TreeFileComponentProps } from "./TreeFileComponent";
import { useState } from "react";
import { convertListFileToObjectParentTree, readTemplate } from "../../utils";

type MappedFiles = {
  [key: string]: File;
};

export function Explorer() {
  const [root, setRoot] = useState("");
  const [fileTree, setFileTree] = useState<
    TreeFileComponentProps["data"] | null
  >(null);
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
    <div className="flex flex-grow my-10">
      <div className="flex flex-col w-1/4 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">Folder Upload</h1>

          <FolderInput onChange={handleInputChange} />
          {fileTree && (
            <div className="overflow-y-auto max-h-[400px]">
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
            </div>
          )}
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
    </div>
  );
}
