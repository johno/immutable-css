# immutable.css

[![Build Status](https://secure.travis-ci.org/johnotander/immutable.css.png?branch=master)](https://travis-ci.org/johnotander/immutable.css)

A linter for immutable CSS. Inspired by [csswizardry's immutable CSS article](http://csswizardry.com/2015/03/immutable-css/).
## Installation

```bash
npm install --save immutable.css
```

## Usage

```javascript
var immutableCss = require('immutable.css');

immutableCss('vendor.css', 'app.css');
// Error: app.css:45 An immutable selector has been reopened [.some-selector]
```

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
