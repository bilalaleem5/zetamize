const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
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
                    out += `\n===========================================\n`;
                    out += `FILE: ${fullPath}\n`;
                    out += `===========================================\n`;
                    out += result.value.trim() + '\n\n';
                } catch (e) {
                    out += `\nError on ${fullPath}: ${e.message}\n`;
                }
            } else if (fullPath.endsWith('.pdf')) {
                try {
                    const dataBuffer = fs.readFileSync(fullPath);
                    const data = await pdf(dataBuffer);
                    out += `\n===========================================\n`;
                    out += `FILE: ${fullPath}\n`;
                    out += `===========================================\n`;
                    out += data.text.trim() + '\n\n';
                } catch (e) {
                    out += `\nError on ${fullPath}: ${e.message}\n`;
                }
            }
        }
    }
}

extractFiles(searchDir).then(() => {
    fs.writeFileSync('extracted_new.txt', out, 'utf8');
    console.log("Done.");
}).catch(console.error);
