import React, { useState, useEffect } from 'react';

export const ResumeView: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const resumePath = language === 'en' 
    ? '/assets/resume-en.pdf' 
    : '/assets/resume-fr.pdf';

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
    <div className="h-full flex flex-col items-center">
      {/* Header with Language Switcher */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Resume
          </h1>
          <span className="text-gray-400 dark:text-slate-500">/</span>
          <span className="text-sm text-gray-500 dark:text-slate-400">
            {language === 'en' ? 'English' : 'Français'}
          </span>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center bg-surface-container-high dark:bg-slate-800 rounded-full p-1 shadow-sm border border-outline-variant/30 dark:border-slate-700">
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              language === 'en'
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('fr')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              language === 'fr'
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            FR
          </button>
        </div>
      </div>

      {/* PDF Viewer Container - Centered */}
      <div className="w-full max-w-3xl relative bg-surface-container dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-outline-variant/30 dark:border-slate-700 shadow-lg" style={{ height: 'calc(100vh - 180px)' }}>
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface dark:bg-slate-900 z-10">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 dark:text-slate-400 text-sm">Loading resume...</p>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface dark:bg-slate-900 z-10 p-8">
            <span className="material-icons-round text-4xl text-error mb-4">error_outline</span>
            <p className="text-gray-600 dark:text-slate-400 text-center mb-4">
              Could not load the PDF. Please try downloading it instead.
            </p>
            <button
              onClick={handleDownload}
              className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-full font-medium transition-colors flex items-center gap-2"
            >
              <span className="material-icons-round text-sm">download</span>
              Download PDF
            </button>
          </div>
        )}

        {/* PDF Viewer */}
        <iframe
          src={pdfViewerUrl}
          className="w-full h-full"
          onLoad={handleLoad}
          onError={handleError}
          title="Resume PDF"
          style={{
            border: 'none',
            backgroundColor: 'white',
          }}
        />

        {/* Download FAB */}
        <button
          onClick={handleDownload}
          className="absolute bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105 z-20"
          title="Download Resume"
        >
          <span className="material-icons-round text-2xl">download</span>
        </button>
      </div>
    </div>
  );
};
