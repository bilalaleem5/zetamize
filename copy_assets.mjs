import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'public', 'portfolio-assets');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const copyMap = {
    "Portfolio Details/N8n Automations/ai calling lead n8n/Screenshot 2025-07-18 182101.png": "ai-calling.png",
    "Portfolio Details/N8n Automations/appointment booking n8n/Screenshot 2025-07-18 182233.png": "appointment-booking.png",
    "Portfolio Details/N8n Automations/blog automation n8n/Screenshot 2025-07-18 182014.png": "blog-automation.png",
    "Portfolio Details/N8n Automations/email lead n8n/Screenshot 2025-07-18 182146.png": "email-leads.png",
    "Portfolio Details/N8n Automations/meme n8n/Screenshot 2025-07-18 181929.png": "meme-generator.png",
    "Portfolio Details/N8n Automations/reddit post lead generation/Screenshot 2025-07-18 182407.png": "reddit-notifier.png",
    "Portfolio Details/Request Webs Scrapper/Logoed_Scrapper Request/3.jpg": "logoed-scraper.jpg",
    "Portfolio Details/Request Webs Scrapper/Lovely package/4.jpg": "lovely-package.jpg",
    "Portfolio Details/Request Webs Scrapper/visuelle_scraper/5.jpg": "visuelle-scraper.jpg",
    "Portfolio Details/Selenium Based Scrapper/Arena Selenium/1.jpg": "arena-scraper.jpg",
    "Portfolio Details/Selenium Based Scrapper/extraweg_scrapper Selenium/2.jpg": "extraweg-scraper.jpg",
    "Portfolio Details/Social Media Automation/Instagram Unfollow Bot/logs.png": "ig-unfollow.png"
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
