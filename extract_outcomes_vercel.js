const fs = require('fs');
const html = fs.readFileSync('vercel_latest.html', 'utf8');
const startIndex = html.indexOf('ACHIEVE');
if (startIndex !== -1) {
  const sectionStart = html.lastIndexOf('<section', startIndex);
  const sectionEnd = html.indexOf('</section>', startIndex) + 10;
  const outcomesHtml = html.slice(sectionStart, sectionEnd);
  // format HTML by adding newlines after >
  const formattedHtml = outcomesHtml.replace(/>/g, '>\n');
  fs.writeFileSync('C:/Users/Devesh/.gemini/antigravity-ide/brain/ae714315-e2e4-4cda-be3c-78e4066e74bd/outcomes_comparison.md', 
    '# Vercel Outcomes HTML\n```html\n' + formattedHtml + '\n```\n'
  );
  console.log('Done');
} else {
  console.log('Not found');
}
