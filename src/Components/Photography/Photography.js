import React from 'react';
import PhotoGallery from '../Gallery/PhotoGallery.js';
import Lightbox from 'react-images';
import fetch from 'isomorphic-fetch';
import '../../index.css';

const radix = 10;

class Photography extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      photos: null,
      lightboxOn: false,
      width: 0,
      currentPhoto: 1,
    };
    
    this.updateWidth = this.updateWidth.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.loadPhotos = this.loadPhotos.bind(this);
    this.nextPhoto = this.nextPhoto.bind(this);
    this.prevPhoto = this.prevPhoto.bind(this);
  }
  
  componentDidMount() {
    this.updateWidth();
    window.addEventListener('resize', this.updateWidth);
    this.loadPhotos();
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWidth);
  }
  
  updateWidth() {
    this.setState({width: window.innerWidth});
  }
  
  openLightbox(photoIndex, event) {
    event.preventDefault();
    this.setState({
      lightboxOn: true,
      currentPhoto: photoIndex,
    });
  }
  
  closeLightbox() {
    this.setState({
      lightboxOn: false,
    });
  }
  
  nextPhoto() {
    this.setState({ currentPhoto: this.state.currentPhoto + 1, });
  }
  
  prevPhoto() {
    this.setState({ currentPhoto: this.state.currentPhoto - 1, });
  }
  
  loadPhotos() {
    //var PhotosSrc = '../../Assets/Photos';
    const authParams = {
      api_key: '50cf2dc9f4b0ea6a8ff9ca5c634d3f40',
      user_id: '101506582@N08',
      photoset_id: '72157687963258825',
      format: 'json&nojsoncallback=1',
      per_page: 20,
      extras: 'url_m,url_c,url_l,url_h,url_o',
    };
    
    let api_url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos';
    api_url = Object.keys(authParams).reduce((urlBuilder,item) => {
			return urlBuilder+'&'+item+'='+authParams[item];			
		},api_url);
    fetch(api_url, {name: 'jsonFlickrApi'})
    .then((response) => response.json())
    .then((response) => {
      let flickrPhotos = response.photoset.photo.map((photo) => {
    //customize this as needed later
				let aspectRatio = parseFloat(photo.width_o / photo.height_o);
				return {
					src: (aspectRatio >= 3) ? photo.url_c : photo.url_m,
					width: parseInt(photo.width_o, radix),
					height: parseInt(photo.height_o, radix),
					caption: photo.title,
					alt: photo.title,
					srcset:[
						`${photo.url_m} ${photo.width_m}w`,
						`${photo.url_c} ${photo.width_c}w`,
						`${photo.url_l} ${photo.width_l}w`,
						`${photo.url_h} ${photo.width_h}w`,
					],
					sizes:[
						'(min-width: 480px) 50vw',
						'(min-width: 1024px) 33.3vw',
						'100vw'
					]
				};
			});
  		this.setState({
  			photos: flickrPhotos,
  		});
    }).catch((err) => {
      console.log(err, 'oops, fetch failed');
      return;
    });
  }
  
  //make the gallery modestly responsive
  scaleGallery() {
    let cols = 1;
    if(this.state.width > 480) { cols = 2; }
    if(this.state.width > 1024) { cols = 3; }
    if(this.state.width > 1920) { cols = 4; }
    console.log("just scaled cols to: ", cols);
    return <PhotoGallery photos={this.state.photos} cols={cols} width={this.state.width} onClickPhoto={this.openLightbox} />;
  }
  
  render() {
    if(this.state.photos) {
      return (
        <div className="transition-block">
          {this.scaleGallery()}
          <Lightbox 
            images={this.state.photos}
            currentImage={this.state.currentPhoto}
            isOpen={this.state.lightboxOn} 
            onClose={this.closeLightbox} 
            backdropClosesModal={true} 
            enableKeyboardInput={true}
            onClickPrev={this.prevPhoto}
						onClickNext={this.nextPhoto}/>
        </div>
      );
    } else {
      return (
        <p>Fetching photos!</p>
      );
    }
  }
}

export default Photography;