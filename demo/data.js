
import pkg from '../package.json'
import basscss from 'basscss/css/basscss.css'
import tachyons from 'tachyons/css/tachyons.css'
// Inuit doesn’t work
// import inuit from 'inuit-starter-kit'
import suitcss from 'suitcss/index.css'
import purecss from 'purecss'
import foundation from 'foundation-sites/css/foundation.css'

import bootstrap from 'bootstrap/dist/css/bootstrap.css'

export default {
  title: pkg.name,
  description: pkg.description,
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
    // {
    //   name: 'Inuit',
    //   css: inuit
    // },
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

