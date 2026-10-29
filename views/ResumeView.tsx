import React, { useState, useEffect } from 'react';

export const ResumeView: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const resumePath = language === 'en' ? '/assets/resume-en.pdf' : '/assets/resume-fr.pdf';

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [language]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = `Manasseh_Resume_${language.toUpperCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pdfViewerUrl = `${resumePath}#toolbar=0&navpanes=0&scrollbar=1`;

  return (
    <div className="view">
      <div className="container">
        <div className="doc__bar">
          <div className="doc__title">
            <h1>Resume</h1>
            <p className="doc__note">{language === 'en' ? 'English' : 'Français'}, one page, PDF.</p>
          </div>

          <div className="doc__tools">
            <div className="doc__langs" role="group" aria-label="Resume language">
              <button
                type="button"
                className="doc__lang"
                aria-pressed={language === 'en'}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <button
                type="button"
                className="doc__lang"
                aria-pressed={language === 'fr'}
                onClick={() => setLanguage('fr')}
              >
                FR
              </button>
            </div>

            <button type="button" className="btn btn--ghost" onClick={handleDownload}>
              Download PDF
            </button>
          </div>
        </div>

        <div className="doc__frame">
          {isLoading && (
            <p className="doc__state" role="status">
              Loading the document…
            </p>
          )}

          {hasError && (
            <div className="doc__state" role="alert">
              <p>Could not load the PDF. Download it instead.</p>
              <button type="button" className="btn btn--primary" onClick={handleDownload}>
                Download PDF
              </button>
            </div>
          )}

          <iframe
            src={pdfViewerUrl}
            className="doc__frame-view"
            onLoad={handleLoad}
            onError={handleError}
            title="Resume PDF"
          />
        </div>
      </div>
    </div>
  );
};
