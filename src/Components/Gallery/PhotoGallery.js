import React from 'react';

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
    style.margin = margin; //is there another way to do this that keeps these in sync?
    const photos = this.scalePhotos(margin);
    return (
      <gallery>
        {photos.map((photo, index) => {
          return(
            <div key={index} style={style}>
            	<img src={photo.src} height={photo.height} width={photo.width} 
              alt={photo.alt} onClick= {(e) => this.props.onClickPhoto(index, e)} 
              style={{display:'block', border:0, cursor: 'pointer'}}/>
            </div>
          );
        })}
      </gallery>
    );
  }
}

PhotoGallery.defaultProps = {
	cols: 3, 
	onClickPhoto: (k,e) => {
		e.preventDefault();
	},
};

//I am not keeping yet another CSS stylesheet
const style = {
	display: 'block',
	float: 'left'
};


export default PhotoGallery;