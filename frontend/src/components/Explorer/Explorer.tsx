import React, { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import axios from 'axios';
import config from '../../common/config';

interface ExplorerProps {
  onSelect: (filepath: string, code: string) => void;
}

export const Explorer: React.FC<ExplorerProps> = ({ onSelect }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(''); 
  const [prevQuery, setPrevQuery] = useState(''); // New state to keep track of the previous query to handle search data reset
  const [hasMore, setHasMore] = useState(true); // New state to track if more results are available for pagination

  const handleSearch = async (query: string, page: number) => {
    if (!query) return;

    try {
      const skip = (page - 1) * 20;  // Calculate the skip value based on the current page
      const server = config.backendServer
      const response = await axios.post(
          `http://${server}:8000/search`,
          { query, skip, limit: 20 },  // Offset search results using skip and limit to 20 results per search
          { headers: { 'Content-Type': 'application/json' } }
      );

        const newResults = response.data.results;
        setSearchResults(page === 1 ? newResults : [...searchResults, ...newResults]);
        setHasMore(newResults.length > 0); // Updates the 'hasMore' state to inform if more results are available for pagination
    } catch (error) {
        console.error('There was an error with the search!', error);
    }
  };

  // This function handles the 'See More' button click to load more search results
  const handleSeeMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    handleSearch(query, newPage); 
    console.log(`new page value: ${newPage}`)
  };

  // useEffect hook to trigger the search operation whenever the query string changes
  useEffect(() => {
    handleSearch(query, 1);
  }, [query]);

  return (
    <div className="max-h-[calc(100vh - headerHeight - footerHeight)]">
      <div className="grid grid-cols-1 gap-4">
        <div style={{ backgroundColor: '#0D1116' }} className="sticky top-0 z-10 bg-white mx-4">
          <SearchBar onSearch={setQuery} /> 
        </div>
        {searchResults.map((result, index) => {
          const filePathParts = result.filepath.split('/');
          const fileName = filePathParts[filePathParts.length - 1];

          return (
            <div 
              key={index} 
              className="mx-4 p-4 border rounded cursor-pointer transition-all duration-300 ease-in-out hover:border-cyan-500 text-white overflow-hidden"
              onClick={() => onSelect(result.filepath, result.code)}
                >
              <div className="font-bold overflow-auto scrollbar-hide">{fileName}</div>
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
        {hasMore && searchResults.length > 0 && (
            <button onClick={handleSeeMore} 
            className="mx-4 p-2 rounded cursor-pointer text-white bg-gray-700 hover:bg-gray-500">
            See More Results
            </button>
        )}
      </div>
    </div>
  );
};