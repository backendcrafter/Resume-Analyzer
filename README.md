# 🎯 AI Resume Analyzer

An AI-powered tool that instantly analyzes how well your resume matches a job description — giving you a match score, missing keywords, and actionable improvements.

**Live Demo → [resume-analyzer-gamma-ashen.vercel.app](https://resume-analyzer-gamma-ashen.vercel.app)**

---

## ✨ What It Does

Paste any job description. Upload your resume PDF. Click analyze.

In seconds you get:

- **Match Score** — Percentage match between your resume and the role
- **Strengths** — What your resume does well for this specific job
- **Missing Keywords** — Skills and terms the recruiter is looking for that you're missing
- **Improvement Suggestions** — Specific changes to make your resume stronger
- **Verdict** — Should you apply or improve first?

---

## 🚀 Why I Built This

I was applying for jobs and spending hours manually comparing my resume to job descriptions. I built this tool to automate that process — and I use it myself for every application.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, Axios |
| Backend | Node.js, Express |
| AI | Groq API (Llama 3.3 70B) |
| PDF Parsing | pdf2json |
| File Upload | Multer (memory storage) |
| Deployment | Vercel (frontend) + Render (backend) |

---

## 🧠 How It Works

```
User uploads PDF resume
        ↓
Backend extracts text using pdf2json
        ↓
Resume text + Job Description sent to Groq LLM
        ↓
Llama 3.3 70B analyzes match as an ATS expert
        ↓
Returns structured analysis with score + suggestions
        ↓
Frontend displays results in clean UI
```

---

## ⚙️ Running Locally

### Backend

```bash
cd resume-analyzer
npm install
```

Create `.env`:
```
GROQ_API=your_groq_api_key
PORT=3001
```

```bash
node server.js
```

Backend runs on `http://localhost:3001`

### Frontend

```bash
cd resume-frontend
npm install
```

Create `.env`:
```
VITE_API_URL=http://localhost:3001
```

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 📁 Project Structure

```
Resume-Analyzer/
├── resume-analyzer/          # Express backend
│   ├── server.js             # API route + AI integration
│   └── .env                  # Environment variables (not committed)
│
└── resume-frontend/          # React frontend
    └── src/
        └── App.jsx           # Single page application
```

---

## 🔮 Future Improvements

- Save analysis history
- Side-by-side resume editor
- Auto-suggest resume rewrites using AI
- Support for DOCX files
- Chrome extension for one-click analysis

---

## ⚠️ Note

Backend is hosted on Render free tier — first request may take 30-50 seconds due to cold start. Subsequent requests are fast.

---

## 👨‍💻 Author

**Harsh Pratap Singh**  
[GitHub](https://github.com/backendcrafter)
