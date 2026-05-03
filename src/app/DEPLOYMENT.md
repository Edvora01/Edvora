# Edvora - Deployment Guide

## Overview
Edvora is a production-ready educational platform for students in Classes 6-12. The platform provides access to study materials, PDFs, video lectures, and notes organized by class, subject, and chapter.

## Features
- ✅ Responsive design (mobile-first)
- ✅ Full navigation flow: Home → Classes → Subjects → Chapters → Resources
- ✅ PDF viewer integration
- ✅ Video lecture embedding
- ✅ Chapter-wise notes
- ✅ Download functionality
- ✅ Clean, modern UI with premium design quality

## Technology Stack
- React 18
- TypeScript
- Tailwind CSS v4
- Lucide React (icons)
- No backend required (frontend-only)

## Project Structure
```
/
├── App.tsx                    # Main app with routing logic
├── components/
│   ├── Navigation.tsx         # Fixed navigation bar
│   ├── HomePage.tsx           # Landing page
│   ├── GuestEntry.tsx         # Guest entry page
│   ├── ClassesPage.tsx        # Class selection
│   ├── SubjectsPage.tsx       # Subject selection
│   ├── ChaptersPage.tsx       # Chapter view with resources
│   ├── NotesPage.tsx          # Notes library
│   ├── Footer.tsx             # Footer component
│   └── LoadingSpinner.tsx     # Loading state
├── data/
│   ├── subjects.ts            # Subject data and icons
│   └── chapters.ts            # Chapter data and PDFs
└── styles/
    └── globals.css            # Global styles
```

## Adding Content

### To Add New Subjects
Edit `/data/subjects.ts`:
```typescript
export const subjectsData: Record<number, string[]> = {
  10: ['Mathematics', 'Science', 'Your New Subject'],
};
```

### To Add New Chapters
Edit `/data/chapters.ts`:
```typescript
'Mathematics': {
  '10': [
    {
      id: 'math-10-1',
      title: 'Your Chapter Name',
      pdfUrl: 'https://drive.google.com/file/d/YOUR_FILE_ID/preview',
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      hasNotes: true,
    },
  ],
}
```

### PDF and Video URLs
- **PDFs**: Use Google Drive shareable links in preview mode
  - Upload PDF to Google Drive
  - Get shareable link
  - Replace `/view` with `/preview` in URL
  
- **Videos**: Use YouTube embed URLs
  - Get YouTube video ID
  - Format: `https://www.youtube.com/embed/VIDEO_ID`

## Customization

### Colors
The platform uses a blue and orange color scheme:
- Primary: Blue (#2563EB)
- Accent: Orange (#F97316)
- Background: Light gray gradients

### Branding
To customize branding, update:
1. Logo/Name in `Navigation.tsx`
2. Hero text in `HomePage.tsx`
3. Footer content in `Footer.tsx`

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy (automatic build detection)

### Netlify
1. Push code to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Static Hosting
1. Run `npm run build`
2. Upload `dist` folder to any static host

## Future Enhancements
- Add search functionality
- Implement user authentication
- Add progress tracking
- Include practice quizzes
- Enable bookmarking
- Add dark mode

## Support
For issues or questions, contact: support@edvora.com

---
Built with ❤️ for Students
