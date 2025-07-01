import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./PDFViewer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="7" stroke="#222" strokeWidth="2" />
      <line x1="14.4142" y1="14" x2="18" y2="17.5858" stroke="#222" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchCloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 5L5 15" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 5L15 15" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15L7 10L12 5" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5L13 10L8 15" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="9" width="14" height="2" rx="1" fill="#222" />
      <rect x="9" y="3" width="2" height="14" rx="1" fill="#222" />
    </svg>
  );
}
function MinusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="9" width="14" height="2" rx="1" fill="#222" />
    </svg>
  );
}
function ExpandIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="4" height="2" rx="1" fill="#222" />
      <rect x="3" y="3" width="2" height="4" rx="1" fill="#222" />
      <rect x="13" y="3" width="4" height="2" rx="1" fill="#222" />
      <rect x="15" y="3" width="2" height="4" rx="1" fill="#222" />
      <rect x="3" y="15" width="4" height="2" rx="1" fill="#222" />
      <rect x="3" y="13" width="2" height="4" rx="1" fill="#222" />
      <rect x="13" y="15" width="4" height="2" rx="1" fill="#222" />
      <rect x="15" y="13" width="2" height="4" rx="1" fill="#222" />
    </svg>
  );
}

function MinimizeIcon() {
  return (
    <svg width="20" height="20" viewBox="2 2 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 14H6v4h4v-2H8v-2zm0-4V8h2V6H6v4h2zm8 4v2h-2v2h4v-4h-2zm0-4h2V6h-4v2h2v2z" fill="#222"/>
    </svg>
  );
}

export default function PDFViewer({ file, isExpanded, onToggleExpand, onSearchInputChange, onSearchEnterPress, highlightPage, pdfRef }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState('1');
  const [isEditingPage, setIsEditingPage] = useState(false);
  const [scale, setScale] = useState(1.0);
  const scrollRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [currentFile, setCurrentFile] = useState(file);
  const pageRefs = useRef([]);
  const pageInputRef = useRef(null);

  // PDF Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [searchTextContent, setSearchTextContent] = useState({});

  // Track focus state for search input
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Animate fade-out/fade-in on file change
  useEffect(() => {
    if (file !== currentFile) {
      setVisible(false);
      const timeout = setTimeout(() => {
        setCurrentFile(file);
        setVisible(true);
        setCurrentPage(1);
        setInputPage('1');
        // Clear search when changing files
        setSearchQuery('');
        setSearchResults([]);
        setCurrentSearchIndex(0);
        setIsSearchActive(false);
        setSearchTextContent({});
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [file, currentFile]);

  // Update input when current page changes
  useEffect(() => {
    if (!isEditingPage) {
      setInputPage(currentPage.toString());
    }
  }, [currentPage, isEditingPage]);

  // Scroll-based page detection
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current || !numPages) return;

      const scrollTop = scrollRef.current.scrollTop;
      const containerHeight = scrollRef.current.clientHeight;
      const scrollCenter = scrollTop + containerHeight / 2;

      // Calculate which page should be visible based on scroll position
      // Handle different PDF aspect ratios more accurately
      let pageHeight;
      
      // Use actual rendered page height if available
      if (pageRefs.current.length > 0 && pageRefs.current[0]) {
        const firstPage = pageRefs.current[0];
        const firstPageHeight = firstPage.offsetHeight * scale;
        pageHeight = firstPageHeight;
      } else {
        // Fallback to estimation based on file name or typical ratios
        const isDoorwayOverview = currentFile && currentFile.includes('Doorway - Overview');
        
        if (isDoorwayOverview) {
          // Doorway Overview is 16:9 ratio
          pageHeight = 800 * scale * (9/16); // 16:9 ratio = 450px height at 800px width
        } else {
          // All other PDFs are A4 portrait
          pageHeight = 800 * scale * (800 / 595); // A4 ratio ≈ 1131px height at 800px width
        }
      }
      
      const currentPageNum = Math.floor(scrollCenter / pageHeight) + 1;
      
      // Clamp to valid page range
      const clampedPage = Math.max(1, Math.min(currentPageNum, numPages));
      
      if (clampedPage !== currentPage) {
        setCurrentPage(clampedPage);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
      
      // Initial calculation
      handleScroll();
      
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [numPages, scale, currentPage, currentFile]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setCurrentPage(1);
    setInputPage('1');
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    
    // Initialize text layer classes after a short delay to ensure DOM is ready
    setTimeout(() => {
      const textLayers = document.querySelectorAll('.react-pdf__Page__textContent');
      textLayers.forEach(layer => {
        layer.style.opacity = '1';
        if (isSearchActive) {
          layer.classList.add('search-active');
          layer.style.pointerEvents = 'auto';
        } else {
          layer.classList.remove('search-active');
          layer.style.pointerEvents = 'none';
        }
      });
    }, 200);
  }

  // Callback when a page loads
  const onPageLoadSuccess = (pageNumber) => {
    // Ensure text layer is properly initialized for this page
    setTimeout(() => {
      const pageElement = pageRefs.current[pageNumber - 1];
      if (pageElement) {
        const textLayer = pageElement.querySelector('.react-pdf__Page__textContent');
        if (textLayer) {
          textLayer.style.opacity = '1';
          if (isSearchActive) {
            textLayer.classList.add('search-active');
            textLayer.style.pointerEvents = 'auto';
          } else {
            textLayer.classList.remove('search-active');
            textLayer.style.pointerEvents = 'none';
          }
        }
      }
    }, 100);
  };

  // Extract text content from PDF pages
  const extractTextContent = async (pageNumber) => {
    if (searchTextContent[pageNumber]) {
      return searchTextContent[pageNumber];
    }

    try {
      const loadingTask = pdfjs.getDocument(currentFile);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(pageNumber);
      const textContent = await page.getTextContent();
      const text = textContent.items.map(item => item.str).join(' ');
      
      setSearchTextContent(prev => ({
        ...prev,
        [pageNumber]: text
      }));
      
      return text;
    } catch (error) {
      console.error('Error extracting text content:', error);
      return '';
    }
  };

  // Search through PDF content
  const performSearch = async () => {
    if (!searchQuery.trim() || !numPages) {
      setSearchResults([]);
      setCurrentSearchIndex(0);
      return;
    }

    setIsSearching(true);
    const results = [];
    const flags = caseSensitive ? 'g' : 'gi';
    const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedQuery, flags);

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const text = await extractTextContent(pageNum);
      const matches = [...text.matchAll(regex)];
      
      if (matches.length > 0) {
        results.push({
          page: pageNum,
          matches: matches.length,
          positions: matches.map(match => ({
            start: match.index,
            end: match.index + match[0].length,
            text: match[0]
          }))
        });
      }
    }

    setSearchResults(results);
    setCurrentSearchIndex(results.length > 0 ? 0 : -1);
    setIsSearching(false);
  };

  // Navigate to search result
  const navigateToSearchResult = (resultIndex) => {
    if (resultIndex >= 0 && resultIndex < searchResults.length) {
      const result = searchResults[resultIndex];
      setCurrentPage(result.page);
      
      // Scroll to the page with better height calculation
      let pageHeight;
      if (pageRefs.current.length > 0 && pageRefs.current[0]) {
        const firstPage = pageRefs.current[0];
        pageHeight = firstPage.offsetHeight * scale;
      } else {
        const isDoorwayOverview = currentFile && currentFile.includes('Doorway - Overview');
        if (isDoorwayOverview) {
          pageHeight = 800 * scale * (9/16);
        } else {
          pageHeight = 800 * scale * (800 / 595);
        }
      }
      
      const targetScrollTop = (result.page - 1) * pageHeight;
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
      }
    }
  };

  // Get total number of matches across all pages
  const getTotalMatches = () => {
    return searchResults.reduce((total, result) => total + result.matches, 0);
  };

  // Navigate to next search result
  const handleNextResult = () => {
    const totalMatches = getTotalMatches();
    if (currentSearchIndex < totalMatches - 1) {
      const newIndex = currentSearchIndex + 1;
      setCurrentSearchIndex(newIndex);
      
      // Find which page this result is on
      let matchCount = 0;
      for (const result of searchResults) {
        if (matchCount + result.matches > newIndex) {
          // This result is on this page
          setCurrentPage(result.page);
          
          // Scroll to the page
          let pageHeight;
          if (pageRefs.current.length > 0 && pageRefs.current[0]) {
            const firstPage = pageRefs.current[0];
            pageHeight = firstPage.offsetHeight * scale;
          } else {
            const isDoorwayOverview = currentFile && currentFile.includes('Doorway - Overview');
            if (isDoorwayOverview) {
              pageHeight = 800 * scale * (9/16);
            } else {
              pageHeight = 800 * scale * (800 / 595);
            }
          }
          
          const targetScrollTop = (result.page - 1) * pageHeight;
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              top: targetScrollTop,
              behavior: 'smooth'
            });
          }
          break;
        }
        matchCount += result.matches;
      }
    }
  };

  // Navigate to previous search result
  const handlePrevResult = () => {
    if (currentSearchIndex > 0) {
      const newIndex = currentSearchIndex - 1;
      setCurrentSearchIndex(newIndex);
      
      // Find which page this result is on
      let matchCount = 0;
      for (const result of searchResults) {
        if (matchCount + result.matches > newIndex) {
          // This result is on this page
          setCurrentPage(result.page);
          
          // Scroll to the page
          let pageHeight;
          if (pageRefs.current.length > 0 && pageRefs.current[0]) {
            const firstPage = pageRefs.current[0];
            pageHeight = firstPage.offsetHeight * scale;
          } else {
            const isDoorwayOverview = currentFile && currentFile.includes('Doorway - Overview');
            if (isDoorwayOverview) {
              pageHeight = 800 * scale * (9/16);
            } else {
              pageHeight = 800 * scale * (800 / 595);
            }
          }
          
          const targetScrollTop = (result.page - 1) * pageHeight;
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              top: targetScrollTop,
              behavior: 'smooth'
            });
          }
          break;
        }
        matchCount += result.matches;
      }
    }
  };

  // Custom text renderer for highlighting
  const textRenderer = (textItem) => {
    console.log('Text renderer called with:', textItem.str, 'Search active:', isSearchActive, 'Query:', searchQuery);
    
    if (!isSearchActive || !searchQuery.trim()) {
      return textItem.str;
    }

    const flags = caseSensitive ? 'g' : 'gi';
    const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedQuery, flags);
    
    if (!regex.test(textItem.str)) {
      return textItem.str;
    }

    console.log('Highlighting text:', textItem.str);
    
    // Replace matches with highlighted spans
    const result = textItem.str.replace(regex, (match) => {
      return `<span class="pdf-search-highlight">${match}</span>`;
    });
    
    console.log('Result:', result);
    return result;
  };

  const handlePageInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handlePageInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const pageNum = parseInt(inputPage);
      if (pageNum >= 1 && pageNum <= numPages) {
        setCurrentPage(pageNum);
        setIsEditingPage(false);
        // Scroll to the specified page using improved height calculation
        let pageHeight;
        
        if (pageRefs.current.length > 0 && pageRefs.current[0]) {
          // Use actual rendered page height
          const firstPage = pageRefs.current[0];
          pageHeight = firstPage.offsetHeight * scale;
        } else {
          // Fallback to estimation based on file name
          const isDoorwayOverview = currentFile && currentFile.includes('Doorway - Overview');
          
          if (isDoorwayOverview) {
            // Doorway Overview is 16:9 ratio
            pageHeight = 800 * scale * (9/16);
          } else {
            // All other PDFs are A4 portrait
            pageHeight = 800 * scale * (800 / 595);
          }
        }
        
        const targetScrollTop = (pageNum - 1) * pageHeight;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth'
          });
        }
      }
    } else if (e.key === 'Escape') {
      setInputPage(currentPage.toString());
      setIsEditingPage(false);
    }
  };

  const handlePageInputBlur = () => {
    const pageNum = parseInt(inputPage);
    if (pageNum >= 1 && pageNum <= numPages) {
      setCurrentPage(pageNum);
    } else {
      setInputPage(currentPage.toString());
    }
    setIsEditingPage(false);
  };

  const handlePageClick = () => {
    setIsEditingPage(true);
    setTimeout(() => {
      if (pageInputRef.current) {
        pageInputRef.current.focus();
        pageInputRef.current.select();
      }
    }, 0);
  };

  const handlePlus = () => setScale(s => Math.min(s + 0.25, 4.0));
  const handleMinus = () => setScale(s => Math.max(s - 0.25, 0.25));
  const handleExpand = () => onToggleExpand();

  // Keyboard shortcuts for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isSearchActive) return;
      
      if (e.key === 'Escape') {
        handleSearchClose();
      } else if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        if (searchQuery.trim()) {
          performSearch();
        }
      } else if (e.key === 'F3' || (e.key === 'g' && e.ctrlKey)) {
        e.preventDefault();
        handleNextResult();
      } else if (e.key === 'F3' && e.shiftKey || (e.key === 'g' && e.ctrlKey && e.shiftKey)) {
        e.preventDefault();
        handlePrevResult();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchActive, searchQuery, currentSearchIndex, searchResults]);

  // Auto-search when query changes (with debounce)
  useEffect(() => {
    if (!isSearchActive || !searchQuery.trim()) {
      setSearchResults([]);
      setCurrentSearchIndex(0);
      return;
    }

    const timeoutId = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, caseSensitive, numPages]);

  // Search handlers
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearchInputChange) onSearchInputChange(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchActive(true);
      performSearch();
    }
  };

  const handleSearchClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    setCurrentSearchIndex(0);
    setIsSearchActive(false);
  };

  const handleCaseSensitiveToggle = () => {
    setCaseSensitive(!caseSensitive);
  };

  // Debug function to check text layer status
  const debugTextLayer = () => {
    console.log('Search active:', isSearchActive);
    console.log('Search query:', searchQuery);
    const textLayers = document.querySelectorAll('.react-pdf__Page__textContent');
    console.log('Text layers found:', textLayers.length);
    textLayers.forEach((layer, index) => {
      console.log(`Text layer ${index}:`, {
        opacity: layer.style.opacity,
        pointerEvents: layer.style.pointerEvents,
        hasSearchActive: layer.classList.contains('search-active'),
        innerHTML: layer.innerHTML.substring(0, 200) + '...'
      });
    });
  };

  // Add debug call when search is performed
  useEffect(() => {
    if (isSearchActive && searchQuery.trim()) {
      setTimeout(debugTextLayer, 1000);
    }
  }, [searchResults, isSearchActive, searchQuery]);

  // Add class to text layer when search is active
  useEffect(() => {
    const updateTextLayers = () => {
      const textLayers = document.querySelectorAll('.react-pdf__Page__textContent');
      textLayers.forEach(layer => {
        if (isSearchActive) {
          layer.classList.add('search-active');
          layer.style.opacity = '1';
          layer.style.pointerEvents = 'auto';
        } else {
          layer.classList.remove('search-active');
          layer.style.opacity = '1';
          layer.style.pointerEvents = 'none';
        }
      });
    };

    // Update immediately
    updateTextLayers();
    
    // Also update after a short delay to ensure all pages are loaded
    const timeoutId = setTimeout(updateTextLayers, 500);
    
    return () => clearTimeout(timeoutId);
  }, [isSearchActive]);

  // Automatically scroll to the first result after search
  useEffect(() => {
    if (isSearchActive && searchResults.length > 0 && currentSearchIndex === 0) {
      navigateToSearchResult(0);
    }
    // Only run when searchResults change
    // eslint-disable-next-line
  }, [searchResults]);

  return (
    <div className={`pdf-viewer-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="pdf-viewer-header">
        <div className="pdf-search-container">
          <img src="/flare.svg" alt="Flare" className="pdf-search-icon" width={16} height={16} />
          <input
            className="pdf-search"
            placeholder={isSearchFocused || searchQuery ? '' : 'What are you looking for?'}
            value={searchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => {
              setIsSearchFocused(false);
              // Clear the search input visually but keep the AI response active
              setSearchQuery('');
            }}
            onChange={e => {
              setSearchQuery(e.target.value);
              if (onSearchInputChange) onSearchInputChange(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                // Check for the new trigger phrase
                if (searchQuery.trim() === 'show me the security procedure') {
                  e.preventDefault();
                  // Scroll to page 12 with the same smooth behavior as search results
                  if (pageRefs.current[11] && scrollRef.current) { // page 12 is at index 11
                    const targetElement = pageRefs.current[11];
                    const targetScrollTop = targetElement.offsetTop;
                    scrollRef.current.scrollTo({
                      top: targetScrollTop,
                      behavior: 'smooth'
                    });
                  }
                }
                // Call the Enter press handler for AI response
                if (onSearchEnterPress) {
                  onSearchEnterPress(searchQuery);
                }
              }
            }}
          />
        </div>
        <div className="pdf-controls">
          <button className="pdf-btn" title="Search" onClick={() => setIsSearchActive(!isSearchActive)}>
            <SearchIcon />
          </button>
          <div className="pdf-divider" />
          <div className="pdf-zoom-group">
            <button className="pdf-btn" title="Zoom out" onClick={handleMinus} disabled={scale <= 0.25}>
              <MinusIcon />
            </button>
            <span className="pdf-zoom-label">{Math.round(scale * 100)}%</span>
            <button className="pdf-btn" title="Zoom in" onClick={handlePlus} disabled={scale >= 4.0}>
              <PlusIcon />
            </button>
          </div>
          <div className="pdf-divider" />
          <div className="pdf-page-indicator">
            {isEditingPage ? (
              <div className="pdf-page-input-container">
                <input
                  ref={pageInputRef}
                  type="number"
                  value={inputPage}
                  onChange={handlePageInputChange}
                  onKeyDown={handlePageInputKeyDown}
                  onBlur={handlePageInputBlur}
                  min="1"
                  max={numPages || 1}
                  className="pdf-page-input"
                  autoFocus
                />
                <span className="pdf-page-of">of {numPages || '—'}</span>
              </div>
            ) : (
              <span 
                className="pdf-page-info clickable" 
                onClick={handlePageClick}
                title="Click to edit page number"
              >
                {currentPage} of {numPages || '—'}
              </span>
            )}
          </div>
          <div className="pdf-divider" />
          <button className="pdf-btn" title={isExpanded ? "Minimize" : "Expand"} onClick={handleExpand}>
            {isExpanded ? <MinimizeIcon /> : <ExpandIcon />}
          </button>
        </div>
      </div>

      {/* PDF Search Panel */}
      {isSearchActive && (
        <div className="pdf-search-panel">
          <form onSubmit={handleSearchSubmit} className="pdf-search-form">
            <div className="pdf-search-input-group">
              <input
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  if (onSearchInputChange) onSearchInputChange(e.target.value);
                }}
                placeholder="Search in PDF..."
                className="pdf-search-input"
                autoFocus
                minLength="1"
              />
              <button type="submit" className={`pdf-search-submit ${isSearching ? 'searching' : ''}`} disabled={isSearching || !searchQuery.trim()}>
                <SearchIcon />
              </button>
            </div>
            
            <div className="pdf-search-options">
              <label className="pdf-search-option">
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={handleCaseSensitiveToggle}
                  className="pdf-search-checkbox"
                />
                <span>Case sensitive</span>
              </label>
            </div>
          </form>

          {searchResults.length > 0 && (
            <div className="pdf-search-results">
              <div className="pdf-search-navigation">
                <button
                  onClick={handlePrevResult}
                  disabled={currentSearchIndex <= 0}
                  className="pdf-search-nav-btn"
                  title="Previous result"
                >
                  <ChevronLeftIcon />
                </button>
                <span className="pdf-search-counter">
                  {currentSearchIndex + 1} of {getTotalMatches()} matches
                </span>
                <button
                  onClick={handleNextResult}
                  disabled={currentSearchIndex >= getTotalMatches() - 1}
                  className="pdf-search-nav-btn"
                  title="Next result"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          )}

          {searchQuery && searchResults.length === 0 && !isSearching && (
            <div className="pdf-search-no-results">
              No matches found
            </div>
          )}

          {isSearching && (
            <div className="pdf-search-no-results">
              Searching...
            </div>
          )}

          <button onClick={handleSearchClose} className="pdf-search-close" title="Close search">
            <SearchCloseIcon />
          </button>
        </div>
      )}

      <div ref={pdfRef} style={{width: '100%', height: '100%'}}>
        <div
          className="pdf-document-area pdf-scroll-vertical"
          ref={scrollRef}
        >
          <div
            className="pdf-scale-wrapper pdf-fade"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center top',
              transition: 'transform 0.2s, opacity 0.6s cubic-bezier(0.4,0,0.2,1)',
              opacity: visible ? 1 : 0,
              pointerEvents: visible ? 'auto' : 'none',
            }}
          >
            <Document
              file={currentFile}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div>Loading PDF…</div>}
              className="pdf-document"
            >
              {numPages &&
                Array.from({ length: numPages }, (_, idx) => (
                  <div
                    key={`${idx + 1}-${isSearchActive ? 'search' : 'normal'}`}
                    className="pdf-page-wrapper"
                    ref={el => pageRefs.current[idx] = el}
                    style={{ position: 'relative' }}
                  >
                    <Page
                      pageNumber={idx + 1}
                      width={800}
                      renderTextLayer={true}
                      renderAnnotationLayer={false}
                      className="pdf-page"
                      customTextRenderer={textRenderer}
                      onLoadSuccess={() => onPageLoadSuccess(idx + 1)}
                    />
                    {highlightPage === idx + 1 && (
                      <div className="pdf-page-overlay-highlight" />
                    )}
                  </div>
                ))}
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
} 