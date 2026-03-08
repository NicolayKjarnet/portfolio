# Video fix TODO

The 4 self-hosted video files are corrupted (missing moov atom) after a failed compression.
Both the git versions and local files are broken.

## What needs to happen

1. Re-export/re-download the original videos:
   - `videos/hammok-one-minute.mp4`
   - `videos/trueandtrue-pin-my-gaze.mp4`
   - `videos/ushikawa-everlasting-green.mp4`
   - `videos/ushikawa-invite-the-grief.mp4`

2. Compress them safely (write to temp file, then replace):
   ```bash
   for f in videos/*.mp4; do
     ffmpeg -i "$f" -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k -movflags +faststart "${f%.mp4}-compressed.mp4" && mv "${f%.mp4}-compressed.mp4" "$f"
   done
   ```

3. Verify they work: `ffprobe videos/hammok-one-minute.mp4`
   - Should show H.264 video + AAC audio, no errors

4. Commit and push the working videos

## Context

- The video cinema modal code, CSS, thumbnails, and all other changes are already committed and working
- Only the video files themselves need replacing
- Target size: under 50MB each for GitHub Pages
