const crypto = require("crypto");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

// Replace 'url' with the direct link to the zip file.
const yourEmail = "muhammadaziz.zayniddin@gmail.com";

async function calculateHash() {
  try {
    // Step 2: Calculate SHA3-256 for each file
    const fileNames = await fs.promises.readdir("./task2");
    const hashes = [];
    for (const fileName of fileNames) {
      if (fs.statSync(__dirname + "/task2/" + fileName).isFile()) {
        const fileData = await readFileAsync(__dirname + "/task2/" + fileName);
        const hash = crypto
          .createHash("sha3-256")
          .update(fileData)
          .digest("hex");
        hashes.push(hash);
      }
    }

    // Step 3: Sort and join the hashes
    const sortedHashes = hashes.sort();
    const joinedHashes = sortedHashes.join("");

    // Step 4: Concatenate with your email and calculate the final hash
    const concatenatedString = joinedHashes + yourEmail.toLowerCase();
    const finalHash = crypto
      .createHash("sha3-256")
      .update(concatenatedString)
      .digest("hex");

    console.log("SHA3-256 of the result:", finalHash);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
calculateHash();