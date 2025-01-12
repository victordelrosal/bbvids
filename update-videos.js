const fs = require('fs').promises;
const path = require('path');

const videosDir = path.join(__dirname, 'videos');
const jsonPath = path.join(videosDir, 'videos.json');

async function updateVideosJson() {
    try {
        // Read the videos directory
        const files = await fs.readdir(videosDir);
        
        // Filter and sort video files
        const videoFiles = files
            .filter(file => /\.(mp4|webm|ogg)$/i.test(file))
            .sort((a, b) => {
                const numA = parseInt(a.match(/\d+/)) || 0;
                const numB = parseInt(b.match(/\d+/)) || 0;
                return numA - numB;
            });

        // Create the videos array with metadata
        const videos = videoFiles.map(filename => {
            const number = filename.match(/\d+/)?.[0] || '';
            return {
                filename,
                title: `Video ${number}`,
                added: new Date().toISOString()
            };
        });

        // Write the JSON file with proper formatting
        await fs.writeFile(
            jsonPath,
            JSON.stringify({ videos, lastUpdated: new Date().toISOString() }, null, 2)
        );

        console.log(`✅ Successfully updated ${jsonPath}`);
        console.log(`📊 Total videos: ${videos.length}`);
        return true;
    } catch (error) {
        console.error('❌ Error updating videos.json:', error);
        process.exit(1);
    }
}

// Run the update if this script is executed directly
if (require.main === module) {
    updateVideosJson();
}

module.exports = updateVideosJson;
