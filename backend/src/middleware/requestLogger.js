/**
 * Lightweight HTTP Request Logger Middleware
 */
function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const method = req.method;
    const url = req.originalUrl;

    const color =
      status >= 500
        ? "\x1b[31m" // red
        : status >= 400
        ? "\x1b[33m" // yellow
        : status >= 300
        ? "\x1b[36m" // cyan
        : "\x1b[32m"; // green

    console.log(
      `[${new Date().toLocaleTimeString()}] ${method} ${url} ${color}${status}\x1b[0m (${duration}ms)`
    );
  });

  next();
}

module.exports = requestLogger;
