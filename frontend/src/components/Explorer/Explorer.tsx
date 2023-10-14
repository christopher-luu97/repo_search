import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { SearchBar } from './SearchBar';

interface Repository {
  id: number;
  name: string;
}

export const Explorer: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    // // Replace with the actual API endpoint
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get<Repository[]>('https://api.example.com/repositories');
    //     setRepositories(response.data);
    //   } catch (error) {
    //     console.error('There was an error fetching the data!', error);
    //   }
    // };

    // fetchData();
        // Example data
    const exampleData: Repository[] = [
      { id: 1, name: 'Repo 1' },
      { id: 2, name: 'Repo 2' },
      { id: 3, name: 'Repo 3' },
      // ... Add more if needed
    ];

    setRepositories(exampleData);
  }, []);

  const handleSearchResults = (results: any) => {
    // Process and display the search results as needed
    console.log('Search results:', results);
  };

  return (
    <div className="bg-gray-800 text-white w-full h-full p-4">
      <h2 className="text-xl mb-4">Repositories</h2>
      <SearchBar onSearch={handleSearchResults} />
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id} className="mb-2">
            {repo.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
