import fs from 'fs';
import path from 'path';
import p from 'pdf-parse';
import mammoth from 'mammoth';

const searchDir = process.argv[2];

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
                    console.log(`\n--- EXTRACTED: ${fullPath} ---\n`);
                    console.log(result.value.trim().substring(0, 1000));
                } catch (e) {
                    console.error(`Error on ${fullPath}:`, e.message);
                }
            } else if (fullPath.endsWith('.pdf')) {
                try {
                    const dataBuffer = fs.readFileSync(fullPath);
                    const data = await p(dataBuffer);
                    console.log(`\n--- EXTRACTED: ${fullPath} ---\n`);
                    console.log(data.text.trim().substring(0, 1000));
                } catch (e) {
                    console.error(`Error on ${fullPath}:`, e.message);
                }
            }
        }
    }
}

console.log("Starting extraction...");
extractFiles(searchDir).then(() => console.log("Done."));
