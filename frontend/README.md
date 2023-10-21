# FRONTEND

To build just the frontend using the dockerfile:

### Execution:
docker build -t frontend -f frontend.dockerfile .

### Requirements:
Navigate to src/common/config.ts and edit the paths there as they are just placeholders
These paths will have to represent configurations on your own computer if you wish to run it

###### Example for src/common/config.ts
The modelAPI used for this project is using koboldCPP which creates a server to use the API when hosted on a machine.
Docs at: https://petstore.swagger.io/?url=https://lite.koboldai.net/kobold_api.json

The backend server will be wherever the backend is hosted either on docker or on dev.

Example:
const config = {
    basePath: "/Users/Documents/repos",
    backendServer:"<machine ip address>",
    modelAPI:"<machine ip address:5001>/api/v1/generate"
  }
  
export default config;

<i>Additional edits may need to be made to ensure this project runs on your end</i>