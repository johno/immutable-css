# immutable-css [![Build Status](https://secure.travis-ci.org/johnotander/immutable-css.png?branch=master)](https://travis-ci.org/johnotander/immutable-css)

A linter for immutable CSS. Inspired by [csswizardry's immutable CSS article](http://csswizardry.com/2015/03/immutable-css/).

## Installation

```bash
npm install --save immutable-css
```

#### For the CLI

```
npm i -g immutable-css
```

## Usage

```js
var immutableCss = require('immutable-css');

immutableCss('vendor.css', 'app.css', function(mutations) {
  console.log(mutations);
});
// [{ selector: '.awesome', line: 5, column: 1, rule: {/* Rule Object */} }];
```

```js
immutableCss('vendor.css', 'app.css', { verbose: true });
// app.css[line 5,col 1]: .awesome was mutated
```

### Arguments

1. `immutableCss` (file or glob): Immutable, vendor CSS -- `css/vendor.css` or `vendor/**/*.css`
* `customCss` (file or glob): Custom application CSS -- `css/app.css` or `app/css/**/*.css`
* `options` (object): Optional object to specify options -- `{ verbose: true }`
* `callback` (function): Optional callback to receive mutations -- `function(mutations) { console.log(mutations }`

#### Options

* `verbose` (Boolean): Print output to standard out.
* `ignoredSelectors` (Array): List of selectors to ignore for mutation violations.
* `immutableSelectors` (Array): List of selectors to check against.

#### Using the CLI

```
immutablecss vendor.css app.css app2.css

test/fixtures/app.css
test/fixtures/app.css[line 5,col 1]: .awesome was mutated
test/fixtures/app.css[line 9,col 1]: .awesome was mutated
test/fixtures/app.css[line 13,col 1]: .foo was mutated
test/fixtures/app.css[line 17,col 1]: .awesome was mutated
test/fixtures/app.css[line 21,col 1]: .awesome was mutated
test/fixtures/app2.css
test/fixtures/app2.css[line 1,col 1]: .foo was mutated
```

## Acknowledgements

* <https://github.com/postcss/postcss>
* <https://github.com/tj/commander.js>
* <https://www.npmjs.com/package/specificity>

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [@jxnblk](https://twitter.com/jxnblk) & [@4lpine](https://twitter.com/4lpine).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
