const assert = require('assert');
const Tool = require('./core');

(async function () {
  const sample = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
  const result = Tool.inspect(sample);
  assert.strictEqual(result.summary.startsWith('1 × 1'), true);
  assert.strictEqual(JSON.parse(result.output).mime, 'image/png');
  assert.throws(() => Tool.inspect('data:text/plain;base64,SGk='), /PNG/);
  console.log('ok, tool assertions passed');
})().catch(function (error) {
  console.error(error);
  process.exitCode = 1;
});
