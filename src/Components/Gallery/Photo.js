import React from 'react';
import {Motion, spring} from 'react-motion';

class Photo extends React.Component {
  constructor() {
    super();
    this.state = {
      isHover: false,
    };
    this.onHover = this.onHover.bind(this);
    this.offHover = this.offHover.bind(this);
  }
  
  onHover() { this.setState({isHover: true}); }
  offHover() { this.setState({isHover: false}); }
  
  makeSpringStyle() {
    return {
      scale: spring(this.state.isHover ? 1.10 : 1),
      opacity: spring(this.state.isHover ? 0.2 : 0),
      left: spring(this.state.isHover ? 10 : 0),
      captionOpacity: spring(this.state.isHover ? 1 : 0)
    };
  }

  render() {
    const photo = this.props.photo;
    console.log("props photo: ", photo);
    return (
      <image>
        <Motion style={this.makeSpringStyle()} >
          {interpolatingStyles => {
          
            let picStyle = { 
              transform: 'scale(' + interpolatingStyles.scale + ')',
              display: 'block',
              float: 'left',
              margin: this.props.margin,
            };
            
            let overlayStyle = {
              opacity: interpolatingStyles.opacity,
              cursor: 'pointer',
            };
            
            let captionStyle = {
              position: 'absolute',
              bottom: '25%',
              left: interpolatingStyles.left + '%',
              opacity: interpolatingStyles.captionOpacity,
            };
            
            return (
              <photoWrapper 
              onMouseOver={this.onHover} onMouseOut={this.offHover}
              style = {picStyle}>
                <img src={photo.src} height={photo.height} width={photo.width} 
                  alt={photo.alt} style={photoStyle}/>
                <div className="overlay" style={overlayStyle}
                onClick= {(e) => this.props.onClickPhoto(this.props.index, e)}>
                </div>
                <div className="caption" style={captionStyle}>{photo.alt}</div>
              </photoWrapper>
            );
          }}
        </Motion>
      </image>
    );
  }
}

const photoStyle = {
	display: 'block',
	border: 0,
};



export default Photo;