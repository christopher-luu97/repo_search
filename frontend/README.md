# FRONTEND

## Overview
This document provides instructions on building and configuring the frontend of the application using Docker. Follow the steps below to set up the frontend on your machine.

## Building the Frontend

### Build the Docker Image

Execute the following command to build the Docker image for the frontend. The `-t` option tags the image as "frontend," and `-f` specifies the Dockerfile to use for the build.

```sh
docker build -t frontend -f frontend.dockerfile .
```

### Running the application
```sh
docker run -d -p 3000:3000 frontend
```

### Requirements
Before building the frontend, you need to navigate to `src/common/config.ts` and replace the placeholder paths with actual paths based on your local machine's configuration.

#### Configuring `src/common/config.ts`
The `modelAPI` used in this project is powered by `koboldCPP`, which initiates a server to leverage the API when hosted on a machine. You need to ensure that the paths correctly point to your machine's configuration, including the location of the backend server and the `modelAPI`.

**Documentation:**  
Detailed information on `koboldCPP` can be found [here](https://petstore.swagger.io/?url=https://lite.koboldai.net/kobold_api.json).

##### Example Configuration
Replace `<machine ip address>` and `<machine ip address:5001>` with actual IP addresses corresponding to your setup.

```typescript
const config = {
    basePath: "/Users/Documents/repos",
    backendServer: "<machine ip address>",
    modelAPI: "<machine ip address:5001>/api/v1/generate"
}
```
  
<i><b>Note:</b> Additional edits may need to be made to ensure this project runs on your end</i>