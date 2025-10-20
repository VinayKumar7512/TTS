import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);
  const [error, setError] = useState('');
  const audioRef = useRef(null);

  const generateSpeech = async () => {
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    setIsLoading(true);
    setError('');
    setAudioSrc(null);

    try {
      const response = await fetch('http://localhost:5000/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setAudioSrc(data.audio);
        // Auto-play the audio
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play();
          }
        }, 100);
      } else {
        setError(data.error || 'Failed to generate speech');
      }
    } catch (err) {
      console.error('Request failed:', err);
      setError('Network error. Make sure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateSpeech();
    }
  };

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1>🎤 Text-to-Speech App</h1>
          <p>Convert your text to natural-sounding speech using AI</p>
        </div>

        {/* Main Card */}
        <div className="card">
          {/* Text Input */}
          <div className="input-section">
            <label htmlFor="textInput">Enter text to convert to speech:</label>
            <textarea
              id="textInput"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... (Press Enter to generate)"
              maxLength="500"
            />
            <div className="char-count">
              {text.length}/500 characters
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateSpeech}
            disabled={isLoading || !text.trim()}
            className={`generate-btn ${isLoading ? 'loading' : ''}`}
          >
            {isLoading ? (
              <div className="loading-content">
                <div className="spinner"></div>
                Generating Speech...
              </div>
            ) : (
              '🎵 Generate Audio'
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {/* Audio Player */}
          {audioSrc && (
            <div className="audio-section">
              <h3>🎉 Speech Generated Successfully!</h3>
              <audio
                ref={audioRef}
                src={audioSrc}
                controls
                preload="auto"
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="footer">
          <p>Powered by Google TTS API</p>
        </div>
      </div>
    </div>
  );
}

export default App;
