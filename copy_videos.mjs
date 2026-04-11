import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public', 'portfolio-assets');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const copyMap = {
    "Portfolio Details/Android Automation bot/Instagram Search Bot LDPlayer/Run_login.mp4": "ig-search-login.mp4",
    "Portfolio Details/Android Automation bot/Instagram Search Bot LDPlayer/search.mp4": "ig-search-action.mp4",
    "Portfolio Details/Selenium Based Scrapper/Amazon Product Scrapper/Copy of Screen Recording 2025-06-16 211213.mp4": "amazon-scraper-1.mp4",
    "Portfolio Details/Selenium Based Scrapper/Amazon Product Scrapper/Screen Recording 2025-06-16 211213.mp4": "amazon-scraper-2.mp4",
    "Portfolio Details/Social Media Automation/Instagram Unfollow Bot/Screen Recording 2025-06-16 221124.mp4": "ig-unfollow-video.mp4"
};

for (const [src, dest] of Object.entries(copyMap)) {
    const srcPath = path.join(process.cwd(), src);
    const destPath = path.join(outDir, dest);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${dest}`);
    } else {
        console.log(`Missing: ${srcPath}`);
    }
}
