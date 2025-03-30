const https = require("https");
const url = "https://techlabv2.onrender.com/wake";

let wakeInterval;

function wakeServer() {
  https
    .get(url, (res) => {
      console.log(
        `Request sent at ${new Date().toLocaleTimeString()}, Status Code: ${
          res.statusCode
        }`
      );
    })
    .on("error", (err) => {
      console.error("Error making request:", err.message);
    });
}

// Start the interval
wakeInterval = setInterval(wakeServer, 10000);

// Initial call
wakeServer();

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\nStopping wake requests...");
  clearInterval(wakeInterval);
  process.exit();
});

console.log("Started periodic wake requests. Press Ctrl+C to stop.");
