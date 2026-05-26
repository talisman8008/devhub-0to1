const fs = require('fs');
const html = fs.readFileSync('vercel.html', 'utf8');
const matches = html.match(/<svg[^>]+>/g);
if (matches) {
  matches.forEach(m => {
    const icon = m.match(/lucide-([a-z-]+)/);
    const style = m.match(/style="([^"]+)"/);
    if (icon && style) {
      console.log(icon[1] + ' -> ' + style[1]);
    }
  });
}
