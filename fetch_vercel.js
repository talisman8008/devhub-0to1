const fs = require('fs');
fetch('https://zero2one-startup-ac.vercel.app/')
  .then(res => res.text())
  .then(text => fs.writeFileSync('vercel_latest.html', text))
  .catch(console.error);
