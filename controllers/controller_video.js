const fs = require("fs");
const path = require("path");


exports.getVideoStream = async (req, res, next) => {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  // const videoPath = "http://localhost:8080/videos/sample-1.mp4";
  // const videoSize = fs.statSync("http://localhost:8080/videos/sample-1.mp4")
  //   .size;
  var pathFile = path.join(__dirname, `../public/videos/sample-1.mp4`);

  // const videoPath = "./sample-1.mp4";
  const videoSize = fs.statSync(path.join(__dirname, `../public/videos/sample-1.mp4`))
    .size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(pathFile, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
};
