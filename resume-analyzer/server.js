require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API });

const upload = multer({ storage: multer.memoryStorage() });
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'https://resume-analyzer-gamma-ashen.vercel.app'
}));

const PORT = process.env.PORT || 3001;

app.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    // Extract text from PDF
    const PDFParser = require('pdf2json');

    // Inside your route:
    const pdfParser = new PDFParser();

    const resumeText = await new Promise((resolve, reject) => {
      pdfParser.on('pdfParser_dataReady', (pdfData) => {
        const text = pdfData.Pages
          .map(page => page.Texts
            .map(t => decodeURIComponent(t.R[0].T))
            .join(' '))
          .join('\n');
        resolve(text);
      });
      pdfParser.on('pdfParser_dataError', reject);
      pdfParser.parseBuffer(req.file.buffer);
    });

    // Get job description from request body
    const { jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: 'Resume and job description are required' });
    }

    // TODO: Send to Groq AI next
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{
        role: 'user',
        content: `You are an expert ATS resume analyzer and career coach.

    Analyze this resume against the job description and provide:

    1. 🎯 MATCH SCORE: Give a percentage (0-100%) of how well the resume matches the job
    2. ✅ STRENGTHS: List 3 things the resume does well for this role
    3. ❌ MISSING KEYWORDS: List important keywords/skills from the job description missing in the resume
    4. 📝 IMPROVEMENTS: Give 3 specific suggestions to improve the resume for this role
    5. 💡 VERDICT: One sentence summary — should they apply?

    Job Description:
    ${jobDescription}

    Resume:
    ${resumeText}

    Be specific, brutally honest, and actionable.`
      }]
    });

    const analysis = completion.choices[0].message.content;
    res.json({ analysis });

  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
