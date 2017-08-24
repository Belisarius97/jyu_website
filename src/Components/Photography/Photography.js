import React from 'react';
import PhotoGallery from '../Gallery/PhotoGallery.js';
import fetch from 'isomorphic-fetch';

const radix = 10;

class Photography extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      photos: null,
      lightboxOn: false,
      width: 0,
      //url?
    };
    
    this.updateWidth = this.updateWidth.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.loadPhotos = this.loadPhotos.bind(this);
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
    this.setState({width: window.InnerWidth});
  }
  
  openLightbox() {
    this.setState({
      lightboxOn: true,
    });
  }
  
  closeLightbox() {
    this.setState({
      lightboxOn: false,
    });
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
					url: (aspectRatio >= 3) ? photo.url_c : photo.url_m,
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
			if(flickrPhotos) {console.log(flickrPhotos);}
			console.log("this is:", this);
  		this.setState({
  			photos: flickrPhotos,
  		}, () => {if(this.state.photos) console.log('this.state.photos exists')});
  		if(flickrPhotos) console.log(this.state.photos);
    }).catch((err) => {
      console.log(err, 'oops, fetch failed');
      return;
    });
		if(!this.state.photos) console.log(this.state.photos);
  }
  
  //make the gallery modestly responsive
  scaleGallery() {
    let cols = 1;
    if(this.width > 480) { cols = 2; }
    if(this.width > 1024) { cols = 3; }
    if(this.width > 1920) { cols = 4; }
    return <PhotoGallery photos={this.state.photos} cols={cols} onClickPhoto={this.openLightbox} />;
  }
  
  render() {
    if(this.state.photos) {
      return (
        <div>
          {this.scaleGallery()}
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