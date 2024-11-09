# Puffer Interview Assignment - pufETH Conversion Rate Tracker

This repository contains a full-stack application that tracks and visualizes the pufETH conversion rate over time. The project is structured with separate frontend and backend folders.

## Project Overview

This application tracks the pufETH conversion rate by monitoring the `totalAssets()` and `totalSupply()` functions from the PufferVaultV2 smart contract. The conversion rate is calculated as:

```
conversionRate = totalAssets() / totalSupply()
```

Contract Address: `0xD9A442856C234a39a81a089C06451EBAa4306a72`

## Repository Structure

```
puffer-interview-h.w/
├── frontend/     # React frontend application
└── backend/      # Node.js backend service
```

## Getting Started

To run the complete application, you'll need to set up and run both the backend and frontend services. Please follow the README instructions in each directory:

1. First, set up and run the backend service:

   - Navigate to the [backend README](./backend/README.md) for detailed setup instructions
   - The backend service must be running before starting the frontend

2. Then, set up and run the frontend application:
   - Navigate to the [frontend README](./frontend/README.md) for detailed setup instructions
   - The frontend will connect to the running backend service
