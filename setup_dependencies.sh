#!/bin/bash

# Navigate to models_api, activate virtual environment, and install dependencies
cd models_api/
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
cd ..

# Navigate to avatar_frontend and install dependencies
cd avatar_frontend/
yarn
cd ..

# Navigate to avatar_backend and install dependencies
cd avatar_backend/
yarn
