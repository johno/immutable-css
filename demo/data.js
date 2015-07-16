
import pkg from '../package.json'
import basscss from 'basscss/css/basscss.css'
import tachyons from 'tachyons/css/tachyons.css'
import suitcss from 'suitcss/index.css'
import purecss from 'purecss'
import foundation from 'foundation-sites/css/foundation.css'
import bootstrap from 'bootstrap/dist/css/bootstrap.css'

// Inuit doesn’t work
// import inuit from 'inuit-starter-kit'

export default {
  title: pkg.name,
  description: pkg.description,
  initialCustom:
`
/* These are examples of mutations */
.red {
  color: orangered;
}
.btn {
  width: 100%;
}

/* These are examples of extensions */
.orangered {
  color: orangered;
}
.btn-purple {
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
  ],
  ga:
`
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-65237119-1', 'auto');
ga('send', 'pageview');
`
}

