import React, { useState } from 'react';
import { Explorer } from '../Explorer/Explorer';
import { CommandLineInterface } from '../CommandLine/CommandLineInterface';
import config from './config';

export const Main: React.FC = () => {
    function mockApi(query: string): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
            resolve(`You said: ${query}`);
            }, 5);
        });
        }
        const [selectedFile, setSelectedFile] = useState<string | null>(null);

        // const handleSelect = (filepath: string) => {
        //     console.log("Filepath", filepath)
        //   setSelectedFile(filepath);
        // };

        const handleSelect = async (filepath: string) => {
            console.log("Filepath", filepath);            
            // Convert the absolute path to a relative path.
            // Fetch the basePath from the config.json file
            const basePath = config.basePath;
            const relativePath = filepath.replace(basePath, '');
            console.log(relativePath)
            // Construct the URL to access the file via your FastAPI server.
            const fileUrl = `http://127.0.0.1:8000/repos${relativePath}`;
          
            setSelectedFile(fileUrl);
            console.log("fileURL: ", fileUrl)
          };
          

        return (
            <div className="grid gap-4 h-screen" style={{ gridTemplateColumns: '1fr 4fr' }}>
                <div className="bg-gray-100 overflow-auto">
                    <Explorer onSelect={handleSelect} />
                </div>
                <div className="grid grid-rows-2 h-full">
                    <div className="bg-gray-300 overflow-auto">
                        {selectedFile && <embed src={selectedFile} className="w-full h-full" />}
                    </div>
                    <div className="bg-gray-400 overflow-auto">
                        <CommandLineInterface onSubmit={mockApi} />
                    </div>
                </div>
            </div>
        );
    };