import React from 'react';
import PhotoGallery from '../Gallery/PhotoGallery.js';
import _500px from '../../Scripts/500px.js';


class Photography extends React.Component {
  constructor(props) {
    super(props);
        
    this.state = {
      photos: null,
      lightboxOn: false,
      width: 0,
      //url?
    }
    
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
    })
  }
  
  closeLightbox() {
    this.setState({
      lightboxOn: false,
    })
  }
  
  loadPhotos() {
    //var PhotosSrc = '../../Assets/Photos';
    //fetch photos from 500px's api
    _500px.init({
      sdk_key: 'cf5933b771db58244be8922b9780653d8d8e6bcc',
    });
    
    _500px.api('/users', (response) => {
      let user = response.data.user;
      
      _500px.api('users/:user_id/galleries/:id/items', (response) => {
        if(response.success) {
          let Photos = response.photos.map((photo) => {
            return {
              src: photo.image_url, //url, deprecated? check api (images??)
              width: photo.width, //exif
              height: photo.height,
              alt: photo.name, //exif, title/name?
              
            };
          });
          this.setState({
            photos: Photos,
          });
        }
      });
      
    });
    
    const authParams = {
      consumerKey: 'uyaQYtwvIEZfgA9h5WrlMaDGXZG6A5zC3KEW39FS',
      userID: "placeholder",
      collectionID: 'placeholder',
      
    }
    
    var PhotoSrc = ""
    $.ajax({
      url: PhotoSrc,
      success: (data) => {
        let Photos = data.map((elem) => {
          return {
            src: elem.url, //url, ../../Assets/Photos/whateverthisoneis
            width: elem.width, //exif
            height: elem.height,
            alt: elem.name, //exif, title/name?
            
          };
        });        
      }
    });

    this.setState({
      photos: Photos,
    });
  }

  
  //make the gallery modestly responsive
  scaleGallery() {
    let cols = 1;
    if(this.width > 480) { cols = 2; }
    if(this.width > 1024) { cols = 3; }
    if(this.width > 1920) { cols = 4; }
    return <PhotoGallery photos={this.photos} cols={cols} onClickPhoto={this.openLightbox} />
  }
  
  render() {
    this.loadPhotos();
    return (
      <Photography>
        {this.scaleGallery}
      </Photography>
    );
  }
}

export default Photography;