import React from 'react';
import Photo from './Photo.js';

class PhotoGallery extends React.Component {
  // constructor(props) {
  //   super(props); //maybe should handle resize in here instead? check perf
  // }
  
  scalePhotos(margin) {
    const cssMargin = 20;
    const { photos, cols, width } = this.props;
    const galleryWidth = width - cssMargin * 2;
    console.log("gallery width: ", galleryWidth);
    
    let rows = photos.reduce((row,elem,index) => {
      const rowIndex = Math.trunc(index/cols);
      row[rowIndex] = row[rowIndex] ? [...row[rowIndex], elem] : [elem];
      return row;
    },[]);
    
    rows = rows.map((row) => {
      const rowAspectRatio = row.reduce((total,elem,index) => {
        return total + (elem.width / elem.height);
      }, 0);
      const rowWidth = (row.length < cols) ? Math.trunc((galleryWidth / cols) 
        * row.length - (row.length * (margin * 2))) : 
				Math.trunc(galleryWidth - (row.length * (margin * 2)));
			const rowHeight = rowWidth / rowAspectRatio;
			return row.map((photo) => ({
			  ...photo,
			  width: rowHeight * (photo.width / photo.height),
			  height: rowHeight,
			}));
    });
    
    return rows.reduce((arr,row) => [...arr, ...row], []);
  }
  
  render() {
    const margin = 3;
    const photos = this.scalePhotos(margin);
    return (
      <gallery>
        {photos.map((photo, index) => {
          return(
            <Photo photo={photo} index={index} margin={margin} key={index} 
            onClickPhoto={this.props.onClickPhoto}/>
          );
        })}
      </gallery>
    );
  }
}

            // <div key={index} style={{display: 'block', float: 'left', margin: margin}}>
            // 	<img src={photo.src} height={photo.height} width={photo.width} 
            //   alt={photo.alt} onClick= {(e) => this.props.onClickPhoto(index, e)} 
            //   style={photoStyle}/>
            // </div>

PhotoGallery.defaultProps = {
	cols: 3, 
	onClickPhoto: (k,e) => {
		e.preventDefault();
	},
};

//I am not keeping yet another CSS stylesheet
// const photoStyle = {
// 	display: 'block',
// 	border: 0,
// 	cursor: 'pointer',
// };


export default PhotoGallery;