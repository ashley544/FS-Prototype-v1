const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Set up routes for each page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/pricing', (req, res) => {
    res.sendFile(path.join(__dirname, 'pricing.html'));
});

app.get('/feed', (req, res) => {
    res.sendFile(path.join(__dirname, 'feed.html'));
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📱 Home page: http://localhost:${PORT}/`);
    console.log(`💰 Pricing page: http://localhost:${PORT}/pricing`);
    console.log(`📰 Feed page: http://localhost:${PORT}/feed`);
    console.log(`\n✨ Press Ctrl+C to stop the server`);
}); 