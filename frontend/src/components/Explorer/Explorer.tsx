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
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 gap-4">
        {searchResults.map((result, index) => (
          <div 
            key={index} 
            className="p-4 border rounded overflow-hidden cursor-pointer" 
            onClick={() => onSelect(result.filepath)}
          >
            <div className="font-bold">{result.node_type}</div>
            <div className="text-sm overflow-ellipsis overflow-hidden">{result.code}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
