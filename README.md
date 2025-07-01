# This project

My second time doing the LLM input project. This time took only 2 hours (compared to 6) and I added a scroll area for longer LLM responses.

## The order of operations

### Frontend Setup

- npm create vitest@latest project-name
- cd project-name
- npm install tailwindcss tailwindcss/vite
- follow setup guide at tailwind
- delete App.css
- follow setup guide for shadcn - end with npx shadcn@latest init
- npm install lucide-react
- npx shadcn@latest add [components]
- update tab text and favicon
- git init, make repo and connect/push

### Frontend Code

- add divs and components
- add functions and handlers
- add classnames

### Backend Setup

- move files from frontend into frontend/, make backend/
- cd backend/
- python -m venv project-env, select as interpreter in vs code
- pip install fastapi uvicorn dotenv openai
- pip freeze > requirements.txt
- touch .gitignore, add project-end/, .env, __pycache__/, .DS_store
- touch main.py
- make app, add middleware, basic @app.post endpoint, pydantic ChatResponse class

### Connect FE to BE

- update handleResponse with asycn fetch with url, method, headers, body
- res.json(), that .response fed into setResponse

## How to run

```bash
git clone https://github.com/mdahewlett/aiqa-second.git

cd aiqa-second

npm i

npm run dev
```
