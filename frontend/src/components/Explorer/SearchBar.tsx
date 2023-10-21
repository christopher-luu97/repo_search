import React, { useState, FormEvent } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
  }
  
  export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>('');
  
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      onSearch(query);
    };

  return (
    <form onSubmit={handleSubmit} className="mb-4 pt-4">
        <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search your repositories..." 
            className="p-2 border rounded text-white w-full"
            style={{ backgroundColor: '#020408' }}
        />
    </form>
  );
};
