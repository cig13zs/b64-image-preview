# Base64 image preview

Inspect image data URLs, read their dimensions, preview them, and download the original bytes locally.

[Open the web app](https://cig13zs.github.io/b64-image-preview/)

The tool runs in the browser without analytics or uploads. It also includes a Manifest V3 extension with no requested permissions.

## Use it

Paste or enter a value, run the tool, then copy the result. The sample button provides a valid starting input.

## Local checks

```sh
node core.test.js
node site.test.js
```

## Extension

Open `chrome://extensions`, enable Developer mode, choose **Load unpacked**, and select the `extension` folder. A ready-to-load zip is included in the repository.

## License

[MIT](LICENSE). Support the project at [ko-fi.com/jju1s](https://ko-fi.com/jju1s).
