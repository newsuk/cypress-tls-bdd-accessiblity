/* Modules */
import axios from 'axios';

/* API Parameters */
const endpoint ='https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed'; 
const key = 'AIzaSyASIqkUvA6QCDYzXyS1uEdUvl3ttK3xf80'; 
// Custom function to request PageSpeed API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const apiRequest = async (url, device, delayTime =500) => {
  try {
    const cacheBuster = new Date().getTime(); // Cache-busting parameter
    const requestUrl = `${endpoint}?url=${encodeURIComponent(url)}&strategy=${device}&category=performance&category=pwa&category=best-practices&category=accessibility&category=seo&key=${key}&cacheBuster=${cacheBuster}`;
    //console.log(`Requesting URL: ${requestUrl}`); // Log the full request URL

    await delay(delayTime); // Delay before making the request

    const { data } = await axios.get(requestUrl);
    return data;
  } catch (error) {
    console.error(`Error requesting URL: ${requestUrl}`, error);
    throw error;
  }
};