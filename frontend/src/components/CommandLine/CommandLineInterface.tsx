import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';

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

    setLines((prev) => [...prev, `> ${query}`]);
    setQuery('');

    try {
      const response = await onSubmit(query);
      console.log('Response received:', response);
      setLines((prev) => [...prev, response]);
    } catch (error) {
      console.log('Error:', error);
      setLines((prev) => [...prev, 'Error: Failed to fetch response']);
    }
  };

  return (
    <div className="bg-black text-white p-4 w-full h-full rounded">
      <div 
        ref={responseContainerRef}
        className="overflow-auto w-full max-h-60 mb-4 break-words"
      >
        {lines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-black text-white outline-none border-b border-gray-600 w-full"
          style={{ resize: 'none', overflow: 'hidden' }}
        />
      </form>
    </div>
  );
};
