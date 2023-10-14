import React, { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (results: any) => void; // Replace 'any' with the actual type of your search results
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  // TODO: Replace search with API endpoint
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Mock API request with setTimeout
      setTimeout(() => {
        console.log('Search query submitted:', query);
        onSearch('SUCCESS');
      }, 1000);  // Adjust the delay as needed
    } catch (error) {
      console.error('There was an error with the search!', error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
        <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search repositories..." 
            className="p-2 border rounded text-black"
        />
    </form>
  );
};
