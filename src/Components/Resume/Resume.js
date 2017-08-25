import React from 'react';
import resume2017 from '../../Assets/Resume2017.pdf'

const pdfStyle = {
  height: '1127px',
  minHeight: '100%',
};

const Resume = () => (
  <resume className="transition-block">
      <div style={pdfStyle}>
        <object data={resume2017} type="application/pdf" width="100%" height="100%">
          <p>No compatible PDF plugin detected.&nbsp;
          <a href="../../Assets/Resume2017.pdf">Click here 
          to download the PDF file.</a></p>  
        </object>
      </div>
  </resume>
)

export default Resume;