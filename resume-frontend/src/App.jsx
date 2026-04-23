import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function analyze() {
    if (!jobDescription || !resumeFile) {
      setError('Please provide both a resume and job description');
      return;
    }
    setError('');
    setLoading(true);
    setAnalysis('');

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);

    try {
      const res = await axios.post('http://localhost:3001/analyze', formData);
      setAnalysis(res.data.analysis);
    } catch (err) {
      setError('Analysis failed. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f13', color: '#e8e6f0', fontFamily: "'DM Sans', sans-serif", padding: '40px 24px' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
            🎯 Resume Analyzer
          </h1>
          <p style={{ color: '#555', fontSize: '15px' }}>
            Paste a job description and upload your resume — AI will score your match instantly
          </p>
        </div>

        {/* Input Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          
          {/* Job Description */}
          <div style={{ background: '#16161f', border: '1px solid #1e1e2e', borderRadius: '16px', padding: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              Job Description
            </div>
            <textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              style={{ width: '100%', height: '200px', background: '#0f0f13', border: '1px solid #1e1e2e', borderRadius: '10px', padding: '12px', color: '#e8e6f0', fontSize: '13px', outline: 'none', resize: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
            />
          </div>

          {/* Resume Upload */}
          <div style={{ background: '#16161f', border: '1px solid #1e1e2e', borderRadius: '16px', padding: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
              Your Resume (PDF)
            </div>
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', border: '2px dashed #1e1e2e', borderRadius: '10px', cursor: 'pointer', background: '#0f0f13', transition: 'border-color 0.2s' }}>
              <input type="file" accept=".pdf" onChange={e => setResumeFile(e.target.files[0])} style={{ display: 'none' }} />
              {resumeFile ? (
                <>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📄</div>
                  <div style={{ fontSize: '13px', color: '#6c63ff', fontWeight: '600' }}>{resumeFile.name}</div>
                  <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>Click to change</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>📁</div>
                  <div style={{ fontSize: '13px', color: '#555' }}>Click to upload PDF</div>
                  <div style={{ fontSize: '11px', color: '#333', marginTop: '4px' }}>PDF files only</div>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Analyze Button */}
        {error && <p style={{ color: '#ff6384', fontSize: '13px', marginBottom: '12px', textAlign: 'center' }}>{error}</p>}
        <button
          onClick={analyze}
          disabled={loading}
          style={{ width: '100%', background: loading ? '#333' : '#6c63ff', border: 'none', borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: '32px' }}
        >
          {loading ? '🔍 Analyzing your resume...' : '✨ Analyze My Resume'}
        </button>

        {/* Results */}
        {analysis && (
          <div style={{ background: '#16161f', border: '1px solid #1e1e2e', borderRadius: '16px', padding: '32px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
              Analysis Results
            </div>
            <div style={{ fontSize: '14px', color: '#b0aec0', lineHeight: '2', whiteSpace: 'pre-wrap' }}>
              {analysis}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}