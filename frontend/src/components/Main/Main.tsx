import React from 'react';
import { Explorer } from '../Explorer/Explorer';
import { CommandLineInterface } from '../CommandLine/CommandLineInterface';


export const Main: React.FC = () => {
    function mockApi(query: string): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
            resolve(`You said: ${query}`);
            }, 5);
        });
        }
        return (
            <div className="grid gap-4 h-screen" style={{ gridTemplateColumns: '1fr 3fr' }}>
                <div className="bg-gray-100 overflow-auto">
                    <Explorer />
                </div>
                <div className="grid grid-rows-2 h-full">
                    <div className="bg-gray-300 overflow-auto">
                        {/* Content from Explorer will be rendered here */}
                    </div>
                    <div className="bg-gray-400 overflow-auto">
                        <CommandLineInterface onSubmit={mockApi} />
                    </div>
                </div>
            </div>
        );
    };
