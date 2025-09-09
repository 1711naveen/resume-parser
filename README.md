# Resume Parser & Editor

A web-based resume parser that extracts structured data from PDF, DOC, DOCX, and image files using the Affinda API. The application provides an intuitive form interface where users can view, edit, and export the parsed resume data.

## Features

- **Multi-format Support**: Upload PDF, DOC, DOCX, and image files
- **Automatic Data Extraction**: Parses personal information, skills, education, projects, achievements, and work experience
- **Editable Form Interface**: Pre-filled form fields that can be manually edited
- **Data Export**: Export parsed and edited data as JSON
- **Real-time Processing**: Shows loading states and error handling
- **Clean UI**: Professional, responsive design

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Affinda API Key** (for resume parsing functionality)

## Installation

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/1711naveen/resume-parser.git
   cd resume-parser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Running the Application

1. **Start the server**
   ```bash
   node server.js
   ```

2. **Open your browser**
   Navigate to: `http://localhost:3000`

3. **Upload a resume**
   - Click "Choose File" and select a resume (PDF, DOC, DOCX, or image)
   - Click "Parse Resume"
   - Wait for processing (usually takes 5-15 seconds)

4. **Edit the data**
   - Review the automatically filled form fields
   - Make any necessary corrections or additions
   - Use the "Save Changes" button to save locally
   - Use "Export as JSON" to download the data

## Project Structure

```
resume-parser/
├── server.js              # Express server with API endpoints
├── package.json           # Node.js dependencies and scripts
├── temp.json              # Sample API response (for reference)
├── public/
│   └── index.html         # Frontend interface
└── README.md              # This file
```

## API Endpoints

- `GET /` - Serves the main application
- `POST /api/parse` - Accepts file upload and returns parsed resume data

## Dependencies

- **express** - Web framework
- **multer** - File upload handling
- **form-data** - Multipart form data
- **node-fetch** - HTTP client for API calls
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Troubleshooting

### Common Issues

1. **"No file uploaded" error**
   - Make sure you select a file before clicking "Parse Resume"

2. **"Upload failed" or parsing errors**
   - Check your internet connection
   - Verify the API key and workspace ID are correct
   - Ensure the file format is supported (PDF, DOC, DOCX, images)

3. **Server won't start**
   - Make sure Node.js is installed: `node --version`
   - Check if port 3000 is already in use
   - Run `npm install` to ensure dependencies are installed

### Supported File Formats

- **PDF files** (.pdf)
- **Microsoft Word** (.doc, .docx)
- **Images** (.jpg, .jpeg, .png, .gif, .bmp, .tiff)

## Development

To modify the application:

1. **Frontend changes**: Edit `public/index.html`
2. **Backend changes**: Edit `server.js`
3. **Restart the server** after making changes to `server.js`

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Ensure all dependencies are properly installed
