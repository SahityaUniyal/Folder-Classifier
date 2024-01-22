const fs = require('fs');
const path = require('path');

// Function to get the files in a directory
function getFiles(directoryPath) {
    return fs.readdirSync(directoryPath);
}

// Function to create a directory if it doesn't exist
function makeDir(directoryPath) {
    try {
        // Use mkdirSync with { recursive: true } to create nested directories if needed
        fs.mkdirSync(directoryPath, { recursive: true });
    } catch (err) {
        console.error(`Error creating directory: ${directoryPath}`, err);
    }
}

// Function to move a file from the old path to the new path
function moveFile(oldPath, newPath) {
    try {
        // Use renameSync to move the file
        fs.renameSync(oldPath, newPath);
    } catch (err) {
        // Handle errors during file moving
        console.error(`Error moving file from ${oldPath} to ${newPath}`, err);
    }
}

// Getting target path where the classification needs to be performed
let targetPath;
if (process.argv[2]) {
    targetPath = path.join(__dirname, process.argv[2]);
} else {
    targetPath = __dirname;
}
// Get the list of files in the current directory
const files = getFiles(targetPath);
// Iterate over each file
for (const fileName of files) {
    // Get the file extension in lowercase
    const extension = path.extname(fileName).slice(1).toLowerCase();
    // Exclude files with 'js' extension
    if (extension && fileName !== 'index.js') {
        // Create a directory path based on the file extension
        const folderPath = path.join(targetPath, extension);

        // Create the directory if it doesn't exist
        if (!fs.existsSync(folderPath)) {
            makeDir(folderPath);
        }

        // Set the old and new file paths
        const oldFilePath = path.join(targetPath, fileName);
        const newFilePath = path.join(folderPath, fileName);
        // Move the file to the appropriate directory
        moveFile(oldFilePath, newFilePath);
    }
}
