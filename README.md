# Doorway PDF Viewer Prototype

A React-based PDF viewer application prototype that displays business and marketing documents with an intuitive card-based interface.

## 📋 Prerequisites

Before you begin, ensure you have **either**:

### Option 1: Local Development
- **Node.js** (version 14.0 or higher)
- **npm** (usually comes with Node.js)

To check if you have these installed:
```bash
node --version
npm --version
```

### Option 2: Docker Development
- **Docker** (version 20.0 or higher)
- **Docker Compose** (usually comes with Docker Desktop)

To check if you have these installed:
```bash
docker --version
docker-compose --version
```

## 🚀 Quick Start

### 1. Install Dependencies
Navigate to the project directory and install the required dependencies:

```bash
cd Prototype-1
npm install
```

### 2. Start the Development Server
Run the development server:

```bash
npm start
```

The application will automatically open in your default browser at `http://localhost:3000`

## 🐳 Docker Setup (Alternative)

If you prefer to run the prototype using Docker:

### Development Mode
```bash
# Build and run with docker-compose
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### Production Mode
```bash
# Build and run production version
docker-compose -f docker-compose.yml up doorway-prototype-prod --build

# Or build and run with Docker directly
docker build -f Dockerfile.prod -t doorway-prototype-prod .
docker run -p 80:80 doorway-prototype-prod
```

### Docker Commands
```bash
# Stop the container
docker-compose down

# View logs
docker-compose logs -f

# Rebuild without cache
docker-compose build --no-cache
```

**Note:** When using Docker, the app will be available at:
- Development: `http://localhost:3000`
- Production: `http://localhost:80`

## 📁 Project Structure

```
Prototype-1/
├── public/                 # Static assets
│   ├── Assets/            # Document thumbnails and images
│   ├── pdfs/              # PDF files for viewing
│   ├── Fonts/             # Custom fonts
│   └── index.html         # HTML template
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── App.js         # Main application component
│   │   ├── PDFViewer.js   # PDF viewing functionality
│   │   ├── AssetCard.js   # Document card component
│   │   ├── UserDetails.js # User profile component
│   │   ├── AIResponse.js  # AI interaction component
│   │   ├── LandingPage.js # Landing page component
│   │   ├── FeedCard.js    # Feed item component
│   │   └── Carousel.js    # Carousel component
│   └── *.css              # Component-specific styles
├── Dockerfile             # Docker configuration for development
├── Dockerfile.prod        # Docker configuration for production
├── docker-compose.yml     # Docker Compose configuration
├── .dockerignore          # Docker ignore file
├── package.json           # Project configuration
└── README.md             # This file
```

## 🎯 Features

- **PDF Viewing**: Interactive PDF viewer with navigation controls
- **Asset Cards**: Visual cards displaying document previews and metadata
- **User Profiles**: User authentication and profile management
- **AI Integration**: AI-powered responses and interactions
- **Responsive Design**: Mobile-friendly interface
- **Document Library**: Curated collection of business and marketing documents

## 📚 Available Documents

The prototype includes sample PDFs covering various business topics:
- Marketing strategies and performance analysis
- Real estate deal processes
- Technology comparisons (Salesforce vs HubSpot, etc.)
- Business relationship management
- Service team optimization

## 🛠 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run eject`
**Note: This is a one-way operation. Once you eject, you can't go back!**

## 🔧 Dependencies

- **React 18.2.0** - Frontend framework
- **react-pdf 7.7.3** - PDF viewing functionality
- **pdfjs-dist 3.11.174** - PDF.js library for rendering PDFs
- **react-scripts 5.0.1** - Build tools and configuration

## 🚨 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   # Kill the process using port 3000
   npx kill-port 3000
   # Or run on a different port
   PORT=3001 npm start
   ```

2. **PDF files not loading**
   - Ensure PDF files are in the `public/pdfs/` directory
   - Check that file paths in the code match actual file names

3. **Dependencies not installing**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Browser Compatibility

This application works best with modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Development

To contribute to this prototype:

1. Make sure all dependencies are installed
2. Follow React best practices
3. Test PDF viewing functionality across different browsers
4. Ensure responsive design works on mobile devices

## 📄 License

This is a prototype project for Doorway. Please refer to your organization's licensing terms.

---

**Need help?** Check the troubleshooting section above or contact the development team. 