import React, { useState, FormEvent } from 'react';
import axios from 'axios';

interface SearchBarProps {
  onSearch: (results: any) => void; // Replace 'any' with the actual type of your search results
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/search',
        { query },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Search results:', response.data);
    if (response.data && Array.isArray(response.data.results)) {
      onSearch(response.data.results);  // Pass results to the parent component
    } else {
      console.error('Results is not an array or undefined');
    }
  } catch (error) {
    console.error('There was an error with the search!', error);
  }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 pt-4">
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
