import React, { useState } from "react";

interface CommandLineInterfaceProps {
  onSubmit: (command: string) => void;
}

export function CommandLineInterface({ onSubmit }: CommandLineInterfaceProps) {
  const [commandLineInput, setCommandLineInput] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommandLineInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Send a POST request to your API
      const response = await fetch("http://localhost:8881/api/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the appropriate content type
        },
        body: JSON.stringify({ command: commandLineInput }), // Send the input data as JSON
      });

      if (response.ok) {
        // If the response is successful (HTTP status code 200), parse and handle the response data
        const responseData = await response.json();
        // Set the API response in state
        setApiResponse(JSON.stringify(responseData));
      } else {
        // Handle error responses here (e.g., set an error message)
        setApiResponse("Error: " + response.statusText);
      }
    } catch (error) {
      // Handle network or fetch-related errors here (e.g., set an error message)
      if (error instanceof Error) {
        setApiResponse("Fetch error: " + error.message);
      } else {
        setApiResponse("Unknown error occurred.");
      }
    }

    // Call the onSubmit function with the entered command
    onSubmit(commandLineInput);

    // Clear the input field
    setCommandLineInput("");
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Prevent the default Enter key behavior (e.g., submitting forms)
      e.preventDefault();

      // Call the submit function when Enter key is pressed
      handleSubmit();
    }
  };

  return (
    <div className="mt-2">
      <p>Command Line Interface:</p>
      <div className="flex">
        <input
          type="text"
          className="flex-grow bg-transparent border-b border-white text-white focus:outline-none"
          placeholder="Enter a command..."
          value={commandLineInput}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyPress}
        />
        {apiResponse !== null && (
          <div className="text-white mt-2">{apiResponse}</div>
        )}
      </div>
    </div>
  );
}
