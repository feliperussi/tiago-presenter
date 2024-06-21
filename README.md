# Node.js Server with Socket.IO and HTTPS

This project sets up a Node.js server with Socket.IO and HTTPS support. The server broadcasts events and handles signaling for WebRTC connections.

## Prerequisites

- Docker installed on your machine

## Instructions

### 1. Clone the repository

Clone this repository to your local machine:

```sh
git clone <repository_url>
cd <repository_directory>
```

### 2. Build the Docker image

Use the following command to build the Docker image:

```sh
docker build -t node-server .
```

### 3. Run the Docker container

Run the Docker container with the following command:

```sh
docker run -p 3000:3000 -d node-server
```

This command maps port 3000 on your host to port 3000 in the container and starts the container in detached mode.

### 4. Access the server

Open your web browser and navigate to:

```
https://<ip>:3000/presenter.html
```

## Notes

- Ensure that `server.key` and `server.crt` are present in the project directory for HTTPS to work properly.