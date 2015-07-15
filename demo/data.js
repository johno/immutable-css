
import basscss from 'basscss/css/basscss.css'
import tachyons from 'tachyons/css/tachyons.css'
import suitcss from 'suitcss/index.css'
import purecss from 'purecss'
import foundation from 'foundation-sites/css/foundation.css'

import bootstrap from 'bootstrap/dist/css/bootstrap.css'

export default {
  title: 'Immutable CSS',
  initialCustom:
`
/* Paste your own CSS here. */

/* These are a examples of mutations */
.red {
  color: orangered;
}
.btn {
  width: 100%;
}

/* These are a examples of extensions */
.orangered {
  color: orangered;
}
.btn-custom {
  background-color: purple;
}`,
  libraries: [
    {
      name: 'Basscss',
      css: basscss
    },
    {
      name: 'Tachyons',
      css: tachyons
    },
    {
      name: 'Suit CSS',
      css: suitcss
    },
    {
      name: 'Pure CSS',
      css: purecss
    },
    {
      name: 'Bootstrap',
      css: bootstrap
    },
    {
      name: 'Foundation',
      css: foundation
    },
  ]
}

