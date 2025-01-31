#!/bin/bash

# Navigate to models_api, activate virtual environment, and install dependencies
cd models_api/
source venv/Scripts/activate
python app.py &
cd ..

# Navigate to avatar_frontend and install dependencies
cd avatar_frontend/
npm run dev &
cd ..

# Navigate to avatar_backend and install dependencies
cd avatar_backend/
npm run dev &
