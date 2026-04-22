const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function captureChart(code) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        await page.setViewport({ width: 1280, height: 800 });

        // Toss Securities URL
        const url = `https://www.tossinvest.com/stocks/${code}/order`;
        console.log(`Navigating to ${url}...`);

        // Timeout handling: 30 seconds max
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

        // Wait for key elements to ensure page is loaded.
        // If specific selector is unknown, waiting for a generic body presence or title update is safer than hard waiting.
        // However, 3s wait is a simple heuristics if selectors are dynamic. 
        // Let's try to wait for something that looks like a price or chart.
        // Since we don't know the exact class names, we'll keep the delay but handle its error.
        try {
            await new Promise(r => setTimeout(r, 3000));
        } catch (e) {
            console.warn("Wait interrupted (unlikely in setTimeout based promise)");
        }

        const dateStr = new Date().toISOString().split('T')[0];
        const reportDir = path.join('report', dateStr, 'images');

        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }

        // Sanitize filename
        const safeCode = code.replace(/[^a-zA-Z0-9]/g, '');
        const imagePath = path.join(reportDir, `${safeCode}_chart.png`);

        await page.screenshot({ path: imagePath, fullPage: false });

        if (fs.existsSync(imagePath)) {
            console.log(JSON.stringify({
                status: "success",
                image_path: imagePath,
                code: code
            }));
        } else {
            throw new Error("Screenshot file not found after capture");
        }

    } catch (error) {
        console.error(JSON.stringify({
            status: "error",
            message: error.message
        }));
        // Exit with error code to signal failure
        process.exit(1);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error(JSON.stringify({ status: "error", message: "Usage: node capture.js <code_with_A_prefix>" }));
    process.exit(1);
}

// Ensure code has 'A' prefix for Toss URL if it's just numbers
let code = args[0];
if (/^\d+$/.test(code)) {
    code = 'A' + code;
}

captureChart(code);
