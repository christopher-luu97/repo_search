import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { Explorer } from '../Explorer/Explorer';
import config from './config';
import { CommandLineInterface } from '../CommandLine/CommandLineInterface';

export const Main: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [fileContent, setFileContent] = useState<string | null>(null);

    const handleSelect = async (filepath: string) => {
        console.log("Filepath", filepath);

        const basePath = config.basePath;
        const relativePath = filepath.replace(basePath, '');
        const fileUrl = `http://127.0.0.1:8000/repos${relativePath}`;

        const response = await fetch(fileUrl);
        const content = await response.text();
        setFileContent(content);

        setSelectedFile(fileUrl);
        console.log("fileURL: ", fileUrl);
    };

    return (
        <div className="grid gap-4 h-screen flex-1 overflow-auto px-4" style={{ backgroundColor: "#0D1116", gridTemplateColumns: "1fr 4fr" }}>
            <div className="border overflow-auto">
                <Explorer onSelect={handleSelect} />
            </div>
            <div className="flex flex-col h-full overflow-hidden">
                <div className="bg-gray-300 overflow-auto mb-4 flex-grow border rounded-md" style={{ maxHeight: "500px" }}>
                    {fileContent && (
                            <CodeMirror
                            value={fileContent}
                            extensions={[python()]} // Add your language extension here
                            theme="dark"
                            {...{ lineNumbers: true }} // passing lineNumbers through the other prop
                            readOnly={true}
                        />
                    )}
                </div>
                <div className="bg-gray-400 flex-none border rounded-md overflow-hidden h-1/3">
                    <CommandLineInterface />
                </div>
            </div>
        </div>
    );
};
