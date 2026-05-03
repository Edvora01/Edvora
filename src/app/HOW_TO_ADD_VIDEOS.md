# How to Add YouTube Videos to Edvora

This guide explains how to add YouTube video links to your chapters. Videos will be displayed with beautiful thumbnails that users can click to watch.

## Step 1: Get Your YouTube Video Link

You can use any of these YouTube URL formats:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- Or just the video ID: `VIDEO_ID`

## Step 2: Add Videos to Your Chapters

Open `/data/chapters.ts` and add videos to the chapter you want. Here's an example:

```typescript
{
  id: 'math-10-1',
  title: 'Real Numbers',
  pdfUrl: 'https://drive.google.com/file/d/1example/preview',
  videos: [
    {
      id: 'vid-math-10-1-1',
      title: 'Introduction to Real Numbers',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      description: 'Learn the basics of real numbers including rational and irrational numbers'
    },
    {
      id: 'vid-math-10-1-2',
      title: 'Properties of Real Numbers',
      url: 'https://youtu.be/dQw4w9WgXcQ',
      description: 'Understand the fundamental properties like closure, commutative, and associative'
    }
  ],
  hasNotes: true,
}
```

## Field Descriptions

- **id**: Unique identifier for the video (e.g., `vid-math-10-1-1`)
- **title**: Video title that will be displayed to users
- **url**: YouTube video URL (any format works!)
- **description** (optional): Brief description of what the video covers

## What Happens Automatically

When you add videos to a chapter:
1. ✅ YouTube thumbnails are **automatically extracted** from the video URL
2. ✅ Videos are displayed in a beautiful grid layout
3. ✅ Users can click to watch videos in a modal player
4. ✅ Users can also open videos directly on YouTube
5. ✅ The "Videos" button appears automatically in the chapter resources

## Examples

### Adding a Single Video
If you only want one video, just add one item to the videos array:

```typescript
videos: [
  {
    id: 'vid-science-1',
    title: 'Chemical Reactions Explained',
    url: 'https://www.youtube.com/watch?v=ABC123',
    description: 'A complete guide to chemical reactions'
  }
]
```

### Adding Multiple Videos
Add multiple videos for comprehensive coverage:

```typescript
videos: [
  {
    id: 'vid-1',
    title: 'Introduction',
    url: 'https://www.youtube.com/watch?v=ABC123'
  },
  {
    id: 'vid-2',
    title: 'Advanced Concepts',
    url: 'https://youtu.be/DEF456'
  },
  {
    id: 'vid-3',
    title: 'Practice Problems',
    url: 'XYZ789'  // Just the video ID works too!
  }
]
```

### Using Real YouTube Videos

Replace `dQw4w9WgXcQ` with your actual YouTube video IDs. For example, if your YouTube video URL is:
```
https://www.youtube.com/watch?v=1234567890a
```

Then use:
```typescript
url: 'https://www.youtube.com/watch?v=1234567890a'
```

## Testing

After adding videos:
1. Navigate to the chapter in your Edvora app
2. Click the "Videos" button
3. You should see your videos with thumbnails
4. Click "Watch Now" to play the video
5. Click the external link icon to open on YouTube

## Tips

- Use clear, descriptive titles for your videos
- Add descriptions to help students understand what they'll learn
- Organize videos from beginner to advanced topics
- Test each video link to ensure it works correctly

## Need Help?

If you encounter any issues:
- Make sure your YouTube URL is public (not private)
- Check that the video ID is correct
- Ensure the JSON syntax is valid (commas, brackets, etc.)

Happy teaching! 🎓📚
