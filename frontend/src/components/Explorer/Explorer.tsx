import React, { useState } from 'react';
import { SearchBar } from './SearchBar';

interface ExplorerProps {
  onSelect: (filepath: string) => void;
}

export const Explorer: React.FC<ExplorerProps> = ({ onSelect }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = (results: any[]) => {
    setSearchResults(results);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <div className="sticky top-0 z-10 bg-white">
          <SearchBar onSearch={handleSearch} />
        </div>
        {searchResults.map((result, index) => {
          // Extracting filename from the filepath
          const filePathParts = result.filepath.split('/');
          const fileName = filePathParts[filePathParts.length - 1];

          return (
            <div 
              key={index} 
              className="p-4 border rounded overflow-hidden cursor-pointer" 
              onClick={() => onSelect(result.filepath)}
            >
              <div className="font-bold">{fileName}</div>  {/* Displaying the filename instead of node type */}
              <div className="text-sm overflow-ellipsis overflow-hidden">{result.code}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};