
import React from 'react'

class TweetButton extends React.Component {

  render () {
    let { text, url, via, className } = this.props
    let script = {
      __html: '!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document, "script", "twitter-wjs");'
    }

    let style = {
      height: 28
    }

    return (
      <div
        className={['inline-block', className].join(' ')}
        style={style}>
        <a href='https://twitter.com/share'
          className='twitter-share-button'
          data-text={text}
          data-url={url}
          data-via={via}
          data-size='large'>
          Tweet
        </a>
        <script dangerouslySetInnerHTML={script} />
      </div>
    )
  }

}

TweetButton.propTypes = {
  text: React.PropTypes.string,
  url: React.PropTypes.string,
  via: React.PropTypes.string,
}

export default TweetButton

