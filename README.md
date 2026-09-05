# Echo-of-words

## Product Solution: Silent Voice

### Project Desciption
Silent Voice is an AI-powered communication tool for people living with aphasia — a condition (often caused by stroke or brain injury) where a person can think and understand language normally, but struggles to speak or write.

Instead of requiring typing or speech, Silent Voice lets a user build a message by tapping simple icons (emotions, body sensations, needs). An AI model then converts that icon sequence into a natural, complete, warm sentence — which is displayed on screen and read aloud — so the person can be understood by family members, caregivers, or medical staff without needing to produce the words themselves.

### Problem Statement
Millions of people with aphasia, stroke recovery conditions, or similar speech-language impairments face a specific and under-served problem: they can think clearly and know what they want to say, but the pathway from thought to spoken/written language is broken.

Existing AI accessibility tools largely assume the user can type or speak — they focus on translation, transcription, or text-to-speech for content the user has already produced. Almost none address the more fundamental gap: giving someone a way to originate a full, natural sentence when typing and speaking are both difficult or impossible.

Silent Voice targets this specific, overlooked gap by turning a simple, low-effort input (icon selection) into complete, emotionally warm communication — restoring a voice to people who currently have very few tools built for them.

### AI/Network Technology Used
SIlent Voice runs all of its language generation reasoning through the GOnka Network, a decentralized AI inference network, accessed via the official GonkaRouter gateway (gonkarouter.io).

- Interface provider: Gonka Network (decentralized compute, OpenAI-compatible API via GonkaRouter)
- Model used: moonshotai/Kimi-K2.6
- What it does: Takes the ordered list of icons a user selects (e.g. Pain, Head) and generates one natural, concise, first-person sentence expressing that meaning (e.g. "My head hurts."), which is then read aloud via the browser's built-in text-to-speech.

### Tech Stack
- Frontend: React (Vite)
- Backend: Python (Flask), deployed with Gunicorn
- AI Inference: Gonka Network via GonkaRouter (OpenAI-compatible API)
- Text-to-Speech: Browser Web Speech API (client-side, no external service)
- Hosting: Frontend on Vercel, Backend on Render

### Setup and Installation
- Node.js and npm
- Python 3.10+
- A GonkaRouter API key (sign up at gonkarouter.io)

#### Backend Setup
1. Open terminal
2. Go to backend directory
3. python -m venv venv
4. source venv/bin/activate
5. pip install -r requirements.txt
6. Create .env file to keep the GONKA_API_KEY
7. run the backend locally 

#### Frontend Setup
1. Go to frontend directory
2. npm install
3. npm run dev
4. The app will be available at the localhost link

### Live Demo
Website URL: https://echo-of-words.vercel.app/

### Team Member
1. Ding Zhi Zhen - frontend + UI
2. Esther Lee Chi Leong - Slides Preparation
3. Ho Fun Yin - Presentation
4. Koh Yew Rei - backend + gonka integration