
import basscss from 'basscss/css/basscss.css'
import tachyons from 'tachyons/css/tachyons.css'
// import suitcss from 'suitcss/index.css'

export default {
  title: 'Immutable CSS',
  initialCustom:
`.red { color: red }
.block { width: 100% }
`,
  libraries: [
    {
      name: 'Basscss',
      css: basscss
    },
    {
      name: 'Tachyons',
      css: tachyons
    }
  ]
}

