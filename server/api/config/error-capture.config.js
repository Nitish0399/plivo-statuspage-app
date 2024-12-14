const Sentry = require("@sentry/node");

function captureError(error) {
  console.error("Error tracked and sent to Sentry", error);
  Sentry.captureException(error);
}

module.exports = captureError;
