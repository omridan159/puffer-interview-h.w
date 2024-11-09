# Backend App Server

## Getting Started

Follow the steps below to set up and run the server locally.

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (version 18 or higher)
- **Yarn**

### Installation

1. **Clone the repository**:

2. **Install dependencies**:

   ```bash
   yarn install
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the root of the project based on the provided `.env.example` file:
     ```bash
     cp .env.example .env
     ```
   - Open the `.env` file and add your own Infura API key.

   To get an Infura API key:

   - Go to [Infura](https://infura.io)
   - Sign up and create a new project
   - Copy the PROJECT ID and add it to the `.env` file as `INFURA_PROJECT_ID`

4. **Run the server**:
   ```bash
   yarn dev
   ```
   The server will start on `http://localhost:8081` by default.
