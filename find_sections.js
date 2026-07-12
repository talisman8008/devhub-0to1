const fs = require('fs');
const html = fs.readFileSync('vercel_latest.html', 'utf8');
const sections = html.match(/<section[^>]*>[\s\S]*?<\/section>/g);
if (sections) {
  sections.forEach(s => {
    const heading = s.match(/<h2[^>]*>(.*?)<\/h2>/);
    if (heading) {
      console.log('Section Heading:', heading[1].replace(/<[^>]*>/g, ''));
    }
  });
}
