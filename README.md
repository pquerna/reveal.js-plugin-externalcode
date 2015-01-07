# reveal.js External Code Plugin

`externalcode` is a plugin for [reveal.js](https://github.com/hakimel/reveal.js/) which lets you include external code files in your slides.  This can make it easier to write tests when your code is in separate files from your slides.

# Usage

- Add externalcode.js to your Reveal.js plugins in `Reveal.initialize`:

```javascript
Reveal.initialize({
	dependencies: [
		{ src: './plugin/externalcode/externalcode.js', condition: function() { return !!document.querySelector( '[data-code]' ); } },
		{ src: './plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
		// Keep your other plugins here...
	]
});
```
Optionally include highlight.js to provide code highlighting.

- Add a code slide:

```html
<section>
	<h2>My C code!</h2>
	<pre><code data-code="./c/foo.c" data-trim></code></pre>
</section>
```

- Serve your `index.html` over HTTP so that XHR requests can work.

