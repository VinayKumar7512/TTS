# Text-to-Speech (TTS) Web Application

A full-stack web application that converts text to speech using Google's TTS API. Built with React frontend and Node.js/Express backend.

## Features

- 🎤 Convert text to natural-sounding speech
- 🌍 Multi-language support
- ⚡ Real-time audio generation
- 🎵 Auto-play functionality
- 📱 Responsive design
- 🔧 Configurable speech speed

## Tech Stack

### Frontend
- React 19.1.1
- Modern CSS with responsive design
- Audio controls and playback

### Backend
- Node.js with Express
- Google TTS API integration
- CORS enabled for cross-origin requests
- Error handling and validation

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm start
```
Backend runs on: http://localhost:5000

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

## Usage

1. Start both backend and frontend servers
2. Open http://localhost:3000 in your browser
3. Enter text in the textarea (up to 500 characters)
4. Click "Generate Audio" or press Enter
5. The audio will be generated and played automatically

## API Endpoints

### POST /api/tts
Convert text to speech

**Request Body:**
```json
{
  "text": "Your text here",
  "lang": "en",
  "slow": false
}
```

**Response:**
```json
{
  "success": true,
  "audio": "data:audio/mpeg;base64,...",
  "provider": "google-tts",
  "lang": "en",
  "slow": false
}
```

### GET /health
Health check endpoint

## Environment Variables

Create a `.env` file in the backend directory:
```
PORT=5000
```

## Project Structure

```
TTS/
├── backend/
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── .gitignore         # Backend gitignore
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styles
│   │   └── index.js       # React entry point
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   └── .gitignore         # Frontend gitignore
├── .gitignore             # Root gitignore
└── README.md              # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
