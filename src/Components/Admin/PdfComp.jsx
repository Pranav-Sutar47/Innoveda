import { pdfjs } from 'react-pdf';
import { Fragment, useState } from 'react';
import { Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();


export default function PdfComp({pdf}) {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
    let path = String(import.meta.env.VITE_PATH);
    path += `/${pdf}`;
    //const path = `http://localhost:5000/files/${pdf}`;

    return (
      <div>
        <Document file={path} onLoadSuccess={onDocumentLoadSuccess}>
          {
            Array.apply(null,Array(numPages))
            .map((x,i)=>i+1)
            .map((page)=>{
              return(
                <Fragment>
                  <p>
                    Page {page} of {numPages}
                  </p>
                <Page pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false}/>
                </Fragment>
              )
            })
          }
        </Document>
      </div>
    );
}
