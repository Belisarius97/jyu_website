import React from 'react';
import {Motion, spring} from 'react-motion';

class Photo extends React.Component {
  constructor() {
    super();
    this.state = {
      isHover: false,
    };
    this.onHover = this.animHover.bind(this);
  }
  
  onHover() {
    this.setState({isHover: true});
  }
  
  render() {
    const photo = this.props.photo;
    return (
      <img src={photo.src} height={photo.height} width={photo.width} 
        alt={photo.alt} onClick= {(e) => this.props.onClickPhoto(this.props.index, e)} 
        style={photoStyle}/>
    );
  }
}

const photoStyle = {
	display: 'block',
	border: 0,
	cursor: 'pointer',
};

export default Photo;