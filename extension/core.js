;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RepoTool = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
function decodeBase64(value) {
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(value) || value.length % 4 === 1) throw new Error('Invalid Base64 payload');
  if (typeof Buffer !== 'undefined') return Uint8Array.from(Buffer.from(value, 'base64'));
  var raw = atob(value); var out = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}
function dimensions(bytes, mime) {
  if (mime === 'image/png' && bytes.length >= 24) return { width: read32(bytes, 16), height: read32(bytes, 20) };
  if (mime === 'image/gif' && bytes.length >= 10) return { width: bytes[6] | bytes[7] << 8, height: bytes[8] | bytes[9] << 8 };
  if (mime === 'image/jpeg') {
    for (var i = 2; i + 8 < bytes.length;) {
      if (bytes[i] !== 0xff) break;
      var marker = bytes[i + 1], size = bytes[i + 2] << 8 | bytes[i + 3];
      if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].indexOf(marker) >= 0) {
        return { width: bytes[i + 7] << 8 | bytes[i + 8], height: bytes[i + 5] << 8 | bytes[i + 6] };
      }
      if (size < 2) break; i += size + 2;
    }
  }
  return null;
}
function read32(bytes, offset) { return (bytes[offset] * 0x1000000) + (bytes[offset + 1] << 16) + (bytes[offset + 2] << 8) + bytes[offset + 3]; }
function inspect(input) {
  var value = String(input || '').trim();
  var match = /^data:(image\/(?:png|jpeg|gif|webp));base64,([A-Za-z0-9+/=\s]+)$/i.exec(value);
  if (!match) throw new Error('Paste a Base64 PNG, JPEG, GIF, or WebP data URL');
  var payload = match[2].replace(/\s/g, '');
  if (payload.length > 14000000) throw new Error('Image is over the 10 MB limit');
  var bytes = decodeBase64(payload), size = dimensions(bytes, match[1].toLowerCase());
  var info = { mime: match[1].toLowerCase(), bytes: bytes.length, dimensions: size, fileName: 'decoded.' + ({'image/png':'png','image/jpeg':'jpg','image/gif':'gif','image/webp':'webp'}[match[1].toLowerCase()]) };
  return { output: JSON.stringify(info, null, 2), summary: size ? size.width + ' × ' + size.height + ', ' + bytes.length + ' bytes' : bytes.length + ' bytes', preview: value };
}
async function process(input) { return inspect(input); }
  return { process: process, inspect: inspect, decodeBase64: decodeBase64 };
});
