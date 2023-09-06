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

  // For debugging, import useEffect as well
  // useEffect(() => {
  //   // This effect will run whenever fileTree or mappedFileItems change
  //   console.log("File Tree updated: ", fileTree);
  //   console.log("Mapped File Items updated: ", mappedFileItems);
  // }, [fileTree, mappedFileItems]);

  return (
    <div className="flex flex-grow my-10 border border-red-400">
      <div className="flex flex-col w-1/4 px-4 h-full border border-red-400">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center h-full border border-red-400 ">
          <h1 className="text-3xl font-bold mb-4">Folder Upload</h1>

          <FolderInput onChange={handleInputChange} />
          {fileTree && (
            <div className="overflow-y-auto max-h-[400px]">
              <TreeFileComponent
                data={fileTree}
                root={root}
                onSelectItems={(items, treeId) => {
                  let fullPath = null;
                  // Set the full path of the item to be rendered if it exists
                  Object.keys(mappedFileItems).forEach((key) => {
                    if (key.endsWith(items.join("/"))) {
                      fullPath = key;
                    }
                  });
                  if (fullPath) {
                    const file = mappedFileItems[fullPath]; //mappedFileItems[items[0]];
                    setCurrentSelectFile(URL.createObjectURL(file));
                  } else {
                    setCurrentSelectFile(null);
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 w-full h-full">
        {currentSelectFile && (
          <embed
            className="w-full h-full border-none"
            src={currentSelectFile}
          />
        )}
      </div>
    </div>
  );
}
