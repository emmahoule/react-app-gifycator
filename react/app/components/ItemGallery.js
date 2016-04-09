import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { fetchGif, clearGif } from '../actions/GalleryActions.js';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';

import { config } from '../config.js'
const API_URL = config.API_URL;
const { FacebookShareButton, TwitterShareButton, PinterestShareButton } = ShareButtons;

/*  Component ItemGallery : 
 *
*/

class ItemGallery extends Component {
	constructor(){
		super();
		this.id = null;
	}

	componentWillMount() {
	  this.id = this.props.params.id[1];
    this.props.dispatch(fetchGif(this.id));
	}

	componentWillReceiveProps(nextProps){
    if (nextProps.params.id[1]!= this.id) {
      this.id = nextProps.params.id[1];
      this.props.dispatch(fetchGif(this.id));
    }
  }

  componentWillUnmount(){
    this.props.dispatch(clearGif());
  }

  render() {
    const { gif } = this.props;
    return (
      <div className="item-gallery">
      {gif &&
      	<div className="item-gallery-story">
          <div className="item-gallery-title-block">
  	     	 	<div className="item-gallery-title">{gif.title}</div>
  	     	 	<div className="item-gallery-author">{gif.author}</div>
       	 	</div>
  	      <video className="item-gallery-video" src={API_URL+gif.url} autoPlay loop/>
        </div>

      }
      {gif &&
        <div className="share item-gallery-share">Share on 
          <FacebookShareButton className="share-link" url="www.google.fr" title="coucou" media={API_URL+gif.url} >
            <svg className="icon icon-facebook">
              <use xlinkHref="#icon-facebook"></use>
            </svg>
          </FacebookShareButton>

          <TwitterShareButton className="share-link" url="www.google.fr" title="coucou" media={API_URL+gif.url}> 
            <svg className="icon icon-twitter">
              <use xlinkHref="#icon-twitter"></use>
            </svg>
          </TwitterShareButton>

          <PinterestShareButton className="share-link" url="www.google.fr" title="coucou" media={API_URL+gif.url} >
            <svg className="icon icon-facebook">
              <use xlinkHref="#icon-facebook"></use>
            </svg>
          </PinterestShareButton>
        </div>
      }
      </div>
    )
  }
}

// ItemGallery.propTypes = {
//   deleteBoxToStory: PropTypes.func.isRequired,
//   addItemFileToStory: PropTypes.func.isRequired,
//   id: PropTypes.number.isRequired
// }

function mapStateToProps(state) {

  const { fetchGif } = state;
  const { gif } = fetchGif;

  return {
    gif
  }
}

export default connect(mapStateToProps)(ItemGallery)
