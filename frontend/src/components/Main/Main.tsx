import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { Explorer } from '../Explorer/Explorer';
import config from '../../common/config';
import { CommandLineInterface } from '../CommandLine/CommandLineInterface';
import { search, searchKeymap } from "@codemirror/search";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { openSearchPanel } from "@codemirror/search";


export const Main: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [fileContent, setFileContent] = useState<string | null>("// Selected search results files are presented here");
    const [searchKeyword, setSearchKeyword] = useState<string | null>(null);
    const codeMirrorRef = useRef<any>(null);



    const handleSelect = async (filepath: string, code: string) => {
        console.log("Filepath", filepath);

        const basePath = config.basePath;
        const server = config.backendServer
        const relativePath = filepath.replace(basePath, '');
        const fileUrl = `http://${server}:8000/repos${relativePath}`;

        const response = await fetch(fileUrl);
        const content = await response.text();
        setFileContent(content);

        setSelectedFile(fileUrl);

        setSearchKeyword(code); // Update the search keyword state with the selected code
    };

    useEffect(() => {
        if (selectedFile && fileContent && codeMirrorRef.current && codeMirrorRef.current.view && searchKeyword) {
            console.log('File selected:', selectedFile);
            const view = codeMirrorRef.current.view;
            openSearchPanel(view);
    
            const searchField = document.querySelector('.cm-panel input');
    
            if (searchField instanceof HTMLInputElement && searchField !== null) {
                // Get the first 20 characters of the searchKeyword
                const truncatedSearchKeyword = searchKeyword.slice(0, 20);
                console.log('Setting search keyword:', truncatedSearchKeyword);
                searchField.value = truncatedSearchKeyword;
    
                const inputEvent = new Event('input', { bubbles: true });
                searchField.dispatchEvent(inputEvent);
    
                const changeEvent = new Event('change', { bubbles: true });
                searchField.dispatchEvent(changeEvent);
    
                const enterEvent = new KeyboardEvent('keydown', { 
                    bubbles: true, 
                    cancelable: true, 
                    key: "Enter",
                    code: "Enter",
                    keyCode: 13,
                    which: 13
                });
                searchField.dispatchEvent(enterEvent);
            }
        }
    }, [selectedFile, fileContent, searchKeyword]); // Dependencies
    
    return (
        <div className="grid gap-4 h-screen flex-1 overflow-auto px-4" style={{ backgroundColor: "#0D1116", gridTemplateColumns: "1fr 4fr" }}>
        <div className="border overflow-auto">
            <Explorer onSelect={handleSelect} />
        </div>
        <div className="flex flex-col h-full overflow-hidden">
            <div className="overflow-auto mb-4 flex-grow border rounded-md" style={{ maxHeight: "500px", backgroundColor: "#2B313D"}}>
                {fileContent && (
                    <CodeMirror
                        value={fileContent}
                        extensions={[
                            python(),
                            search(),
                            keymap.of([...defaultKeymap, ...searchKeymap]),
                        ]}
                        theme="dark"
                        readOnly={true}
                        ref={codeMirrorRef}
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