const fs = require('fs');
const path = require('path');
const p = require('pdf-parse');
const mammoth = require('mammoth');

const searchDir = process.argv[2];
let out = '';

async function extractFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await extractFiles(fullPath);
        } else if (entry.isFile()) {
            if (fullPath.endsWith('.docx')) {
                try {
                    const result = await mammoth.extractRawText({ path: fullPath });
                    out += `\n--- EXTRACTED: ${fullPath} ---\n`;
                    out += result.value.trim().substring(0, 1500) + '\n';
                } catch (e) {
                    out += `\nError on ${fullPath}: ${e.message}\n`;
                }
            } else if (fullPath.endsWith('.pdf')) {
                try {
                    const dataBuffer = fs.readFileSync(fullPath);
                    const data = await p(dataBuffer);
                    out += `\n--- EXTRACTED: ${fullPath} ---\n`;
                    out += data.text.trim().substring(0, 1500) + '\n';
                } catch (e) {
                    out += `\nError on ${fullPath}: ${e.message}\n`;
                }
            }
        }
    }
}

extractFiles(searchDir).then(() => {
    fs.writeFileSync('extracted_portfolio_data.txt', out, 'utf8');
    console.log("Done.");
}).catch(console.error);
