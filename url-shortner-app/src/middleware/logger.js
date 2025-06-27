// src/middleware/logger.js

const logEvent = (message, metadata = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    message,
    ...metadata,
  };

  // Store in sessionStorage for now (can be shown on stats page later)
  const logs = JSON.parse(sessionStorage.getItem("logs") || "[]");
  logs.push(logEntry);
  sessionStorage.setItem("logs", JSON.stringify(logs));
};

export default logEvent;
