import { Document, Page } from 'react-pdf';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import { FC } from 'react';

interface PdfRenderPageProps {
  pdfUrl : string;
  zoom: number;
}
const PdfRenderPage: FC<PdfRenderPageProps> = ({ pdfUrl, zoom }) => {
  return (
    <div className='pdf-container'>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
        <Document file={pdfUrl} className='flex justify-center'>
          <Page pageNumber={1} scale={zoom} />
        </Document>
      </Worker>
    </div>
  );
};

export default PdfRenderPage;
