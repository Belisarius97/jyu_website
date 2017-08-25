//I want this to map over a folder of photos and automatically generate
//the requisite "photo" elements for each one, and display all of them
//ideally also a connected animation to transition to this page

//built out basic design: gaussian-blurred and darkened image backdrop,
//centered large-font name, square tile sections which animate nicely to take
//to the different pages. We can use a different branch for that; this one's
//going to be fairly basic

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
//      console.log("gallery reduce", row, elem, index);
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
			console.log("row width: ",  rowWidth);
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
    console.log("gallery internal render just called", this.props.cols);
    return (
      <gallery>
        <div>
          <p>placeholder, pardon the dust</p>
        </div>
        {photos.map((photo, index) => {
          console.log("gallery putting in a photo now");
          return(
            <div key={index} style={style}>
              <img src={photo.url} height={photo.height} width={photo.width} 
              alt={photo.alt} style={{display:'block', border:0}}/>
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

//I am not keeping yet another CSS stylesheet (experiment w/ removing blocK?)
const style = {
	display: 'block',
	float: 'left'
};


export default PhotoGallery;