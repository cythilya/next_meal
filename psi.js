const psi = require('psi');

(async () => {
  // Get the PageSpeed Insights report
  const { data } = await psi('https://web.dev');
  console.log('Speed score:', data.lighthouseResult.categories.performance.score);

  // Output a formatted report to the terminal
  await psi.output('https://theverge.com');
  console.log('Done');
})();
