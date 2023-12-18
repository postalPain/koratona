export function getYouTubeVideoId(url:string) {
  try {
    const urlParts = url.split('/');
    if (urlParts[2] !== 'youtu.be') {
      throw new Error('Invalid YouTube URL');
    }
    const videoId = urlParts[3];
    if (!videoId) {
      throw new Error('No video ID found in URL');
    }
    return videoId;
  } catch (error) {
    console.error(error);
    return '';
  }
}