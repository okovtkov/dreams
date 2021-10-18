const videos = {
  create(blob) {
    return fetch('https://api.vimeo.com/me/videos', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 684c721c03a278a76005502294f33db5',
        'Content-Type': 'application/json',
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
      },
      body: JSON.stringify({
        upload: {
          approach: 'tus',
          size: blob.size,
        },
      }),
    }).then((response) => response.json());
  },

  upload(link, blob) {
    return fetch(link, {
      method: 'PATCH',
      headers: {
        'Tus-Resumable': '1.0.0',
        'Upload-Offset': 0,
        'Content-Type': 'application/offset+octet-stream',
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
      },
      body: blob,
    });
  },
};

export default videos;
