import React, { ChangeEvent, useEffect, useRef } from 'react';

interface FolderInputProps {
  onChange: (files: FileList | null) => void;
}

export function FolderInput(props: FolderInputProps) {
  const { onChange } = props;
  const ref = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    onChange(files);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('directory', '');
      ref.current.setAttribute('webkitdirectory', '');
      ref.current.setAttribute('mozdirectory', '');
    }
  }, []);

  return (
    <input
      type="file"
      ref={ref}
      onChange={handleInputChange}
      multiple  // Allow multiple file selection
    />
  );
}
