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
    console.log('Form submitted with query:', query);

    setLines((prev) => [...prev, `(User) %  ${query}`]);
    setQuery('');

    try {
      // Make a request to backend endpoint
      const response = await axios.post(
        'http://localhost/api/v1/generate',
        { prompt: query,
          max_length : 512 }, 
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Search results:', response.data);

      if (response.status !== 200) {  // <--- modified this line to correctly check the status code
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const text = response.data.results[0].text;  
      console.log('Response received:', text);
      setLines((prev) => [...prev, `(Response) % ${text}`]);  // Modified this line
    } catch (error) {
      console.log('Error:', error);
      setLines((prev) => [...prev, 'Error: Failed to fetch response']);
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
          <div className="absolute top-0 left-0 p-1 text-gray-400">(User) %</div>
          <form onSubmit={handleSubmit} className="pl-20"> 
            <textarea
              ref={textareaRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="bg-black text-white outline-none border-b border-gray-600 w-full"
              style={{ resize: 'none', overflow: 'hidden' }}
            />
          </form>
        </div>
      </div>
    );
};
