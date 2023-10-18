import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import axios from 'axios';

interface CommandLineInterfaceProps {
  onSubmit: (query: string) => Promise<string>;
}

export const CommandLineInterface: React.FC<CommandLineInterfaceProps> = ({ onSubmit }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const responseContainerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);  // Add this line for the loading state

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }

    if (responseContainerRef.current) {
      responseContainerRef.current.scrollTop = responseContainerRef.current.scrollHeight;
    }
  }, [query, lines]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    console.log('Form submitted with query:', query);

    setLines((prev) => [...prev, `(User) %  ${query}`]);
    setQuery('');

    try {
      // Make a request to backend endpoint
      const response = await axios.post(
        'http://localhost:5001/api/v1/generate',
        { prompt: query,
          max_length : 512 }, 
        { headers: { 'Content-Type': 'application/json' } }
      );
      setLoading(false)
      if (response.status !== 200) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const text = response.data.results[0].text;  
      setLines((prev) => [...prev, `(Response) % ${text}`]);
    } catch (error) {
      console.log('Error:', error);
      setLines((prev) => [...prev, 'Error: Failed to fetch response']);
      setLoading(false); // Set loading to false in case of error
    }
};


    return (  
  <div className="bg-black text-white p-4 w-full h-full rounded overflow-auto max-h-screen"> 
      <div 
        ref={responseContainerRef}
        className="w-full mb-4 break-words"
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {lines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>

      <div className="relative">
        {!loading && (  // Conditionally render (User) % based on the loading state
          <div className="absolute top-0 left-0 p-1 text-gray-400" style={{ paddingTop: '0px' }}>(User) %</div>
        )}

        <form onSubmit={handleSubmit} className="pl-20 relative"> 
          {loading && (  // Conditionally render the loading bar within the form
            <div className="absolute top-0 left-0 w-full h-1 z-50">
              <div className="w-full h-3 bg-blue-500 animate-pulse rounded-lg"></div>
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="bg-black text-white outline-none w-full"
            style={{ resize: 'none', overflow: 'hidden' }}
            disabled={loading}  // Disable textarea when loading
          />
        </form>
      </div>
    </div>
);
        }