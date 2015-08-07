# immutable-css [![Build Status](https://secure.travis-ci.org/johnotander/immutable-css.png?branch=master)](https://travis-ci.org/johnotander/immutable-css)

Best practices suggest avoiding overriding styles from vendor libraries to prevent unwanted side effects. Base library styles should not be altered – or as Harry Roberts describes, base styles should be treated as [Immutable CSS](http://csswizardry.com/2015/03/immutable-css/).

## Installation

```bash
npm install --save immutable-css
```

## Usage

```js
var immutableCss = require('immutable-css')

immutableCss('vendor.css', 'app.css')
// [{ selector: '.awesome', line: 5, column: 1, rule: {/* Rule Object */} }];
```

```js
immutableCss('vendor.css', 'app.css', { verbose: true })
// app.css[line 5,col 1]: .awesome was mutated
```

### Options

* `ignoredClasses` (Array): List of classes to ignore for mutation violations. Ex: `['.some-mutable-class']`
* `immutableClasses` (Array): List of classes to check against. Ex: `['.button', '.foobar']`
* `immutablePrefixes` (Array): List of prefix regexes that are immutable. Ex: `[/\.u\-/, /\.util\-/]`

### Using the CLI

```
npm i -g immutable-css
```

```
immutable-css vendor.css app.css app2.css

test/fixtures/app.css
test/fixtures/app.css[line 5,col 1]: .awesome was mutated
test/fixtures/app.css[line 9,col 1]: .awesome was mutated
test/fixtures/app.css[line 13,col 1]: .foo was mutated
test/fixtures/app.css[line 17,col 1]: .awesome was mutated
test/fixtures/app.css[line 21,col 1]: .awesome was mutated
test/fixtures/app2.css
test/fixtures/app2.css[line 1,col 1]: .foo was mutated
```

The CLI exits with an error code if there are mutations, too. That way you can include the CLI as part of your CI:

```
some_ci_stuff && immutablecss vendor.css app.css && other_ci_stuff
```

## Dependencies

* <https://github.com/postcss/postcss>
* <https://github.com/tj/commander.js>
* <https://github.com/johnotander/get-css-classes>
* <https://github.com/css-modules/css-selector-tokenizer>

## Related Reading

* <http://csswizardry.com/2015/03/immutable-css/>
* <http://csswizardry.com/2012/06/the-open-closed-principle-applied-to-css/>
* <http://www.jon.gold/2015/07/functional-css/>
* <http://eng.wealthfront.com/2013/08/functional-css-fcss.html>
* <http://www.basscss.com/docs/reference/principles/#immutable-utilities>

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
