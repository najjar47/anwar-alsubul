const API_KEY = 'AIzaSyARN-9qC6J33TEELhBL2HP2lvMGtUWL_eY';
const CHANNEL_ID = 'UCWek-Erapb0SGfwbny15hhg';

async function fetchLatestVideos() {
  const maxResults = 3;
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items) {
      console.error('لم يتم العثور على فيديوهات');
      return [];
    }

    // ترجع قائمة الفيديوهات
    return data.items
      .filter(item => item.id.kind === 'youtube#video')
      .map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url
      }));
  } catch (error) {
    console.error('خطأ في جلب الفيديوهات:', error);
    return [];
  }
}

async function displayVideos() {
  const videoGrid = document.querySelector('.video-grid');
  const videos = await fetchLatestVideos();

  videoGrid.innerHTML = ''; // مسح المحتوى القديم

  videos.forEach(video => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.videoId}`;
    iframe.allowFullscreen = true;
    videoGrid.appendChild(iframe);
  });
}

// عند تحميل الصفحة اعرض الفيديوهات
window.addEventListener('DOMContentLoaded', displayVideos);
