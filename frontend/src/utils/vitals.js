import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Function to send to analytics
const sendToAnalytics = ({ name, delta, id }) => {
  // Here you would typically send to your analytics service like Google Analytics
  // Example: ga('send', 'event', { eventCategory: 'Web Vitals', eventAction: name, eventValue: delta, eventLabel: id, nonInteraction: true });
  
  // For now, we'll just log to console in development
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Web Vitals: ${name}`, { delta, id });
  }
};

export const reportWebVitals = (onPerfEntry = sendToAnalytics) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Cumulative Layout Shift
    getCLS(onPerfEntry);
    // First Input Delay
    getFID(onPerfEntry);
    // First Contentful Paint
    getFCP(onPerfEntry);
    // Largest Contentful Paint
    getLCP(onPerfEntry);
    // Time to First Byte
    getTTFB(onPerfEntry);
  }
}; 