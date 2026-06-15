# Login Background Video

The login page plays **`vid1.mp4`** from this folder as a full-screen background
(with a slow cinematic zoom and a dark overlay for legibility). A poster image is
shown while it loads or if the file is missing, so the login always looks good.

To change the clip, replace `assets/videos/vid1.mp4` with your own.

## Tips
- Keep it **muted**, **looping-friendly**, **1080p**, **MP4 (H.264)**.
- Aim for **< 5 MB** so the login loads fast.
- To swap the file name, edit the `<source>` in `index.php`.

