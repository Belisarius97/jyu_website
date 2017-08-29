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
      <Motion style={springStyle}>
        <photoWrapper>
          <img src={photo.src} height={photo.height} width={photo.width} 
            alt={photo.alt} onClick= {(e) => this.props.onClickPhoto(this.props.index, e)} 
            style={photoStyle}/>
          <div className="overlay">
            <caption className="caption">{photo.alt}</caption>
          </div>
        </photoWrapper>
      </Motion>
    );
  }
}

const photoStyle = {
	display: 'block',
	border: 0,
	cursor: 'pointer',
};

const springStyle = {
    scale: spring(this.state.isHover ? 1.15 : 1),
    
};

export default Photo;