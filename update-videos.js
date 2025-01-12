const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, 'videos');
const jsonPath = path.join(videosDir, 'videos.json');

function updateVideosJson() {
    // Read the videos directory
    const files = fs.readdirSync(videosDir)
        .filter(file => /\.(mp4|webm|ogg)$/i.test(file))
        .sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)) || 0;
            const numB = parseInt(b.match(/\d+/)) || 0;
            return numA - numB;
        });

    // Create the videos array
    const videos = files.map(filename => ({
        filename,
        title: `Video ${filename.match(/\d+/)[0]}`
    }));

    // Write the JSON file
    fs.writeFileSync(jsonPath, JSON.stringify({ videos }, null, 2));
    console.log(`Updated ${jsonPath} with ${videos.length} videos`);
}

// Run the update
updateVideosJson();
