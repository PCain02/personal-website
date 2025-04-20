const fs = require('fs');
const path = require('path');

const baseUrl = 'https://pallasathenacain.com'; // Replace with your actual website URL
const rootDir = path.join(__dirname, ''); // Adjust this to your repository root
const sitemapPath = path.join(__dirname, 'sitemap.xml');

function generateSitemap(dir, basePath = '') {
    let urls = [];
    const files = fs.readdirSync(dir);

    console.log('Scanning directory:', dir); // Debugging log

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const relativePath = path.join(basePath, file);

        if (fs.statSync(filePath).isDirectory()) {
            // Recursively scan subdirectories
            urls = urls.concat(generateSitemap(filePath, relativePath));
        } else if (file.endsWith('.html')) {
            // Add .html files to the sitemap
            console.log('Found HTML file:', relativePath); // Debugging log
            urls.push(`<url><loc>${baseUrl}/${relativePath.replace(/\\/g, '/')}</loc></url>`);
        }
    });

    return urls;
}

try {
    const urls = generateSitemap(rootDir);

    if (urls.length === 0) {
        console.error('No HTML files found. Sitemap will not be generated.');
        return;
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    console.log('Generated Sitemap Content:\n', sitemap); // Debugging log

    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log('Sitemap generated successfully at:', sitemapPath);
} catch (error) {
    console.error('Error generating sitemap:', error);
}