import axios from 'axios';
const KEY = 'AIzaSyDwmGwX7dMXVnyTAsVrqL2mrlAMV4ueCFE';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: KEY,
  },
});
