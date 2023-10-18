import React, { useState } from 'react';
import { SearchBar } from './SearchBar';

interface ExplorerProps {
  onSelect: (filepath: string) => void;
}

export const Explorer: React.FC<ExplorerProps> = ({ onSelect }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (results: any[]) => {
    setSearchResults(results);
    console.log(results);
  };

  return (
    <div className="max-h-[calc(100vh - headerHeight - footerHeight)]">
      <div className="grid grid-cols-1 gap-4">
        <div className="border sticky top-0 z-10" style={{ backgroundColor: '#0D1116' }}>
          <div className="mx-4">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
        {searchResults.map((result, index) => {
          const filePathParts = result.filepath.split('/');
          const fileName = filePathParts[filePathParts.length - 1];

          return (
            <div 
              key={index} 
              className="mx-4 p-4 border rounded cursor-pointer transition-all duration-300 ease-in-out hover:border-cyan-500 text-white overflow-hidden"
              onClick={() => onSelect(result.filepath)}
            >
              <div className="font-bold">{fileName}</div>
              <div 
                className="text-sm overflow-hidden"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {result.code}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
