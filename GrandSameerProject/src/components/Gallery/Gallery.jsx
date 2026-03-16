

// // // import React, { useEffect } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { Link } from 'react-router-dom';
// // // import {
// // //   fetchCategories,
// // //   fetchMedia,
// // //   setActiveCategory,
// // // } from './gallerySlice.js'; // adjust path if needed
// // // import './Gallery.css';

// // // const Gallery = () => {
// // //   const dispatch = useDispatch();

// // //   const {
// // //     categories,
// // //     media: allMedia,
// // //     activeCategory,
// // //     status,
// // //     error,
// // //   } = useSelector((state) => state.gallery);

// // //   const filteredMedia = activeCategory === 'All'
// // //     ? allMedia
// // //     : allMedia.filter(item => item.category === activeCategory);

// // //   // Load data once on mount
// // //   useEffect(() => {
// // //     if (categories.length <= 1) {
// // //       dispatch(fetchCategories());
// // //     }
// // //     if (allMedia.length === 0) {
// // //       dispatch(fetchMedia());
// // //     }
// // //   }, [dispatch, categories.length, allMedia.length]);

// // //   // Fade-in animation observer
// // //   useEffect(() => {
// // //     const elements = document.querySelectorAll('.fade-in');
// // //     const observer = new IntersectionObserver(
// // //       (entries) => {
// // //         entries.forEach((entry) => {
// // //           if (entry.isIntersecting) {
// // //             entry.target.classList.add('visible');
// // //           }
// // //         });
// // //       },
// // //       { threshold: 0.2 }
// // //     );

// // //     elements.forEach((el) => observer.observe(el));
// // //     return () => observer.disconnect();
// // //   }, [filteredMedia]);

// // //   const [selectedMedia, setSelectedMedia] = React.useState(null);

// // //   if (status === 'loading') {
// // //     return <div className="gallery-loading">Loading gallery...</div>;
// // //   }

// // //   if (status === 'failed') {
// // //     return (
// // //       <div className="gallery-error">
// // //         Error: {error || 'Failed to load content. Please try again later.'}
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <section className="gallery-section" id="gallery">
// // //       <div className="gallery-bg"></div>
// // //       <div className="gallery-overlay"></div>

// // //       <div className="gallery-container">
// // //         <div className="gallery-part animate-banner">
// // //           <h2 className="gallery-title">Gallery / Media</h2>
// // //           <p className="gallery-subtitle">
// // //             Explore category-wise event galleries, drone shots of mega hangars & high-profile events,
// // //             and videos of large-scale installations.
// // //           </p>
// // //         </div>

// // //         <div className="gallery-tabs">
// // //           {categories.map((cat) => (
// // //             <button
// // //               key={cat}
// // //               onClick={() => dispatch(setActiveCategory(cat))}
// // //               className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
// // //             >
// // //               {cat}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         <div className="media-grid">
// // //           {filteredMedia.length === 0 ? (
// // //             <p className="no-media-message">No media found in this category.</p>
// // //           ) : (
// // //             filteredMedia.map((item, index) => (
// // //               <div
// // //                 key={item.id}
// // //                 className="media-card fade-in"
// // //                 style={{ animationDelay: `${index * 0.08}s` }}
// // //                 onClick={() => setSelectedMedia(item)}
// // //               >
// // //                 {item.src ? (
// // //                   <img
// // //                     src={item.src}
// // //                     alt={item.title}
// // //                     className="media-img"
// // //                     loading="lazy"
// // //                     onError={(e) => {
// // //                       e.target.src = '/images/placeholder.jpg'; // fallback image
// // //                       e.target.alt = 'Image could not be loaded';
// // //                     }}
// // //                   />
// // //                 ) : (
// // //                   <div className="media-placeholder">No image available</div>
// // //                 )}

// // //                 <div className="media-overlay">
// // //                   <p>{item.title}</p>
// // //                 </div>
// // //               </div>
// // //             ))
// // //           )}
// // //         </div>

// // //         <div className="view-all-container fade-in">
// // //           <Link to="/full-gallery" className="view-all-btn">
// // //             View All
// // //           </Link>
// // //         </div>
// // //       </div>

// // //       {selectedMedia && (
// // //         <div className="media-modal" onClick={() => setSelectedMedia(null)}>
// // //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// // //             <button
// // //               className="close-btn"
// // //               onClick={() => setSelectedMedia(null)}
// // //               aria-label="Close"
// // //             >
// // //               ×
// // //             </button>

// // //             {selectedMedia.src ? (
// // //               <img
// // //                 src={selectedMedia.src}
// // //                 alt={selectedMedia.title}
// // //                 className="modal-img"
// // //                 onError={(e) => (e.target.src = '/images/placeholder.jpg')}
// // //               />
// // //             ) : (
// // //               <div className="modal-placeholder">No image available</div>
// // //             )}

// // //             <p className="modal-caption">{selectedMedia.title}</p>
// // //             {selectedMedia.description && (
// // //               <p className="modal-description">{selectedMedia.description}</p>
// // //             )}
// // //           </div>
// // //         </div>
// // //       )}
// // //     </section>
// // //   );
// // // };

// // // export default Gallery;

// // import React, { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Link } from 'react-router-dom';
// // import {
// //   fetchCategories,
// //   fetchMedia,
// //   setActiveCategory,
// // } from './gallerySlice.js'; // ← adjust path if needed
// // import './Gallery.css';

// // const ITEMS_PER_PAGE = 9; // ← you can change this (6, 9, 12, 15...)

// // const Gallery = () => {
// //   const dispatch = useDispatch();

// //   const {
// //     categories,
// //     media: allMedia,
// //     activeCategory,
// //     status,
// //     error,
// //   } = useSelector((state) => state.gallery);

// //   const [currentPage, setCurrentPage] = useState(1);

// //   // Reset page to 1 when category changes
// //   useEffect(() => {
// //     setCurrentPage(1);
// //   }, [activeCategory]);

// //   // Filter media by active category
// //   const filteredMedia = activeCategory === 'All'
// //     ? allMedia
// //     : allMedia.filter((item) => item.category === activeCategory);

// //   // Pagination logic
// //   const totalItems = filteredMedia.length;
// //   const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

// //   const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
// //   const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
// //   const currentItems = filteredMedia.slice(indexOfFirstItem, indexOfLastItem);

// //   const paginate = (pageNumber) => setCurrentPage(pageNumber);
// //   const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
// //   const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

// //   // Load data once
// //   useEffect(() => {
// //     if (categories.length <= 1) {
// //       dispatch(fetchCategories());
// //     }
// //     if (allMedia.length === 0) {
// //       dispatch(fetchMedia());
// //     }
// //   }, [dispatch, categories.length, allMedia.length]);

// //   // Fade-in observer
// //   useEffect(() => {
// //     const elements = document.querySelectorAll('.fade-in');
// //     const observer = new IntersectionObserver(
// //       (entries) => {
// //         entries.forEach((entry) => {
// //           if (entry.isIntersecting) {
// //             entry.target.classList.add('visible');
// //           }
// //         });
// //       },
// //       { threshold: 0.2 }
// //     );

// //     elements.forEach((el) => observer.observe(el));
// //     return () => observer.disconnect();
// //   }, [currentItems]); // ← changed dependency to currentItems

// //   const [selectedMedia, setSelectedMedia] = useState(null);

// //   if (status === 'loading') {
// //     return <div className="gallery-loading">Loading gallery...</div>;
// //   }

// //   if (status === 'failed') {
// //     return (
// //       <div className="gallery-error">
// //         Error: {error || 'Failed to load content. Please try again later.'}
// //       </div>
// //     );
// //   }

// //   return (
// //     <section className="gallery-section" id="gallery">
// //       <div className="gallery-bg"></div>
// //       <div className="gallery-overlay"></div>

// //       <div className="gallery-container">
// //         <div className="gallery-part animate-banner">
// //           <h2 className="gallery-title">Gallery / Media</h2>
// //           <p className="gallery-subtitle">
// //             Explore category-wise event galleries, drone shots of mega hangars & high-profile events,
// //             and videos of large-scale installations.
// //           </p>
// //         </div>

// //         <div className="gallery-tabs">
// //           {categories.map((cat) => (
// //             <button
// //               key={cat}
// //               onClick={() => dispatch(setActiveCategory(cat))}
// //               className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
// //             >
// //               {cat}
// //             </button>
// //           ))}
// //         </div>

// //         <div className="media-grid">
// //           {currentItems.length === 0 ? (
// //             <p className="no-media-message">
// //               {filteredMedia.length === 0
// //                 ? 'No media found in this category.'
// //                 : 'No more items to show.'}
// //             </p>
// //           ) : (
// //             currentItems.map((item, index) => (
// //               <div
// //                 key={item.id}
// //                 className="media-card fade-in"
// //                 style={{ animationDelay: `${index * 0.08}s` }}
// //                 onClick={() => setSelectedMedia(item)}
// //               >
// //                 {item.src ? (
// //                   <img
// //                     src={item.src}
// //                     alt={item.title}
// //                     className="media-img"
// //                     loading="lazy"
// //                     onError={(e) => {
// //                       e.target.src = '/images/placeholder.jpg';
// //                       e.target.alt = 'Image could not be loaded';
// //                     }}
// //                   />
// //                 ) : (
// //                   <div className="media-placeholder">No image available</div>
// //                 )}

// //                 <div className="media-overlay">
// //                   <p>{item.title}</p>
// //                 </div>
// //               </div>
// //             ))
// //           )}
// //         </div>

// //         {/* ──────────────── Pagination Controls ──────────────── */}
// //         {totalPages > 1 && (
// //           <div className="pagination-container fade-in">
// //             <button
// //               className="pagination-btn"
// //               onClick={goToPrev}
// //               disabled={currentPage === 1}
// //             >
// //               ← Previous
// //             </button>

// //             {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
// //               <button
// //                 key={pageNum}
// //                 className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
// //                 onClick={() => paginate(pageNum)}
// //               >
// //                 {pageNum}
// //               </button>
// //             ))}

// //             <button
// //               className="pagination-btn"
// //               onClick={goToNext}
// //               disabled={currentPage === totalPages}
// //             >
// //               Next →
// //             </button>
// //           </div>
// //         )}

// //         <div className="view-all-container fade-in">
// //           <Link to="/full-gallery" className="view-all-btn">
// //             View All
// //           </Link>
// //         </div>
// //       </div>

// //       {selectedMedia && (
// //         <div className="media-modal" onClick={() => setSelectedMedia(null)}>
// //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <button
// //               className="close-btn"
// //               onClick={() => setSelectedMedia(null)}
// //               aria-label="Close"
// //             >
// //               ×
// //             </button>

// //             {selectedMedia.src ? (
// //               <img
// //                 src={selectedMedia.src}
// //                 alt={selectedMedia.title}
// //                 className="modal-img"
// //                 onError={(e) => (e.target.src = '/images/placeholder.jpg')}
// //               />
// //             ) : (
// //               <div className="modal-placeholder">No image available</div>
// //             )}

// //             <p className="modal-caption">{selectedMedia.title}</p>
// //             {selectedMedia.description && (
// //               <p className="modal-description">{selectedMedia.description}</p>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </section>
// //   );
// // };

// // export default Gallery;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchCategories,
//   fetchMedia,
//   setActiveCategory,
// } from './gallerySlice.js'; // adjust path if needed
// import './Gallery.css';

// const ITEMS_PER_PAGE = 5; // you can change this value (6, 9, 12, 15...)

// const Gallery = () => {
//   const dispatch = useDispatch();

//   const {
//     categories,
//     media: allMedia,
//     activeCategory,
//     status,
//     error,
//   } = useSelector((state) => state.gallery);

//   const [currentPage, setCurrentPage] = useState(1);

//   // Reset to page 1 when category changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [activeCategory]);

//   // Filter media
//   const filteredMedia = activeCategory === 'All'
//     ? allMedia
//     : allMedia.filter((item) => item.category === activeCategory);

//   // Pagination math
//   const totalItems = filteredMedia.length;
//   const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

//   const indexOfLastItem  = currentPage * ITEMS_PER_PAGE;
//   const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
//   const currentItems     = filteredMedia.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

//   // Load data
//   useEffect(() => {
//     if (categories.length <= 1) {
//       dispatch(fetchCategories());
//     }
//     if (allMedia.length === 0) {
//       dispatch(fetchMedia());
//     }
//   }, [dispatch, categories.length, allMedia.length]);

//   // Fade-in observer — now depends on current page items
//   useEffect(() => {
//     const elements = document.querySelectorAll('.fade-in');
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('visible');
//           }
//         });
//       },
//       { threshold: 0.2 }
//     );

//     elements.forEach((el) => observer.observe(el));
//     return () => observer.disconnect();
//   }, [currentItems]);

//   const [selectedMedia, setSelectedMedia] = useState(null);

//   if (status === 'loading') {
//     return <div className="gallery-loading">Loading gallery...</div>;
//   }

//   if (status === 'failed') {
//     return (
//       <div className="gallery-error">
//         Error: {error || 'Failed to load content. Please try again later.'}
//       </div>
//     );
//   }

//   return (
//     <section className="gallery-section" id="gallery">
//       <div className="gallery-bg"></div>
//       <div className="gallery-overlay"></div>

//       <div className="gallery-container">
//         <div className="gallery-part animate-banner">
//           <h2 className="gallery-title">Gallery / Media</h2>
//           <p className="gallery-subtitle">
//             Explore category-wise event galleries, drone shots of mega hangars & high-profile events,
//             and videos of large-scale installations.
//           </p>
//         </div>

//         <div className="gallery-tabs">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => dispatch(setActiveCategory(cat))}
//               className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         <div className="media-grid">
//           {currentItems.length === 0 ? (
//             <p className="no-media-message">
//               {filteredMedia.length === 0
//                 ? 'No media found in this category.'
//                 : 'No more items to show on this page.'}
//             </p>
//           ) : (
//             currentItems.map((item, index) => (
//               <div
//                 key={item.id}
//                 className="media-card fade-in"
//                 style={{ animationDelay: `${index * 0.08}s` }}
//                 onClick={() => setSelectedMedia(item)}
//               >
//                 {item.src ? (
//                   <img
//                     src={item.src}
//                     alt={item.title}
//                     className="media-img"
//                     loading="lazy"
//                     onError={(e) => {
//                       e.target.src = '/images/placeholder.jpg';
//                       e.target.alt = 'Image could not be loaded';
//                     }}
//                   />
//                 ) : (
//                   <div className="media-placeholder">No image available</div>
//                 )}

//                 <div className="media-overlay">
//                   <p>{item.title}</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Pagination – only show if more than 1 page */}
//         {totalPages > 1 && (
//           <div className="pagination-container fade-in">
//             <button
//               className="pagination-btn"
//               onClick={goToPrev}
//               disabled={currentPage === 1}
//             >
//               ← Previous
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
//               <button
//                 key={pageNum}
//                 className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
//                 onClick={() => paginate(pageNum)}
//               >
//                 {pageNum}
//               </button>
//             ))}

//             <button
//               className="pagination-btn"
//               onClick={goToNext}
//               disabled={currentPage === totalPages}
//             >
//               Next →
//             </button>
//           </div>
//         )}
//       </div>

//       {selectedMedia && (
//         <div className="media-modal" onClick={() => setSelectedMedia(null)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <button
//               className="close-btn"
//               onClick={() => setSelectedMedia(null)}
//               aria-label="Close"
//             >
//               ×
//             </button>

//             {selectedMedia.src ? (
//               <img
//                 src={selectedMedia.src}
//                 alt={selectedMedia.title}
//                 className="modal-img"
//                 onError={(e) => (e.target.src = '/images/placeholder.jpg')}
//               />
//             ) : (
//               <div className="modal-placeholder">No image available</div>
//             )}

//             <p className="modal-caption">{selectedMedia.title}</p>
//             {selectedMedia.description && (
//               <p className="modal-description">{selectedMedia.description}</p>
//             )}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Gallery;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  fetchMedia,
  setActiveCategory,
} from './gallerySlice';
import './Gallery.css';

const ITEMS_PER_PAGE = 6;

const Gallery = () => {
  const dispatch = useDispatch();

  const {
    categories,
    media: allMedia,
    activeCategory,
    status,
    error,
  } = useSelector((state) => state.gallery);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const filteredMedia = activeCategory === 'All'
    ? allMedia
    : allMedia.filter((item) => item.category === activeCategory);

  const totalItems = filteredMedia.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const indexOfLastItem  = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems     = filteredMedia.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (categories.length <= 1) dispatch(fetchCategories());
    if (allMedia.length === 0)     dispatch(fetchMedia());
  }, [dispatch, categories.length, allMedia.length]);

  // Fade-in observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [currentItems]);

  const paginate = (page) => setCurrentPage(page);
  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  if (status === 'loading') {
    return <div className="gallery-loading">Loading gallery...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="gallery-error">
        Error: {error || 'Failed to load content. Try again later.'}
      </div>
    );
  }

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-bg"></div>
      <div className="gallery-overlay"></div>

      <div className="gallery-container">
        <div className="gallery-part animate-banner">
          <h2 className="gallery-title">Gallery / Media</h2>
          <p className="gallery-subtitle">
            Explore category-wise galleries, drone shots, event highlights, and installation videos.
          </p>
        </div>

        <div className="gallery-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setActiveCategory(cat))}
              className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="media-grid">
          {currentItems.length === 0 ? (
            <p className="no-media-message">
              {filteredMedia.length === 0
                ? 'No media found in this category.'
                : 'No more items to show.'}
            </p>
          ) : (
            currentItems.map((item, idx) => (
              <div
                key={item.id}
                className="media-card fade-in"
                style={{ animationDelay: `${idx * 0.07}s` }}
                onClick={() => setSelectedMedia(item)}
              >
                {item.type === 'video' ? (
                  <div className="video-preview-wrapper">
                    <video
                      src={item.previewSrc}
                      className="media-video"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={(e) => e.target.play()}
                      onMouseLeave={(e) => e.target.pause()}
                    />
                    <div className="video-indicator">VIDEO</div>
                  </div>
                ) : item.type === 'image' && item.previewSrc ? (
                  <img
                    src={item.previewSrc}
                    alt={item.title}
                    className="media-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                      e.target.alt = 'Image failed to load';
                    }}
                  />
                ) : (
                  <div className="media-placeholder">No media available</div>
                )}

                <div className="media-overlay">
                  <p>{item.title}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination-container fade-in">
            <button className="pagination-btn" onClick={goToPrev} disabled={currentPage === 1}>
              ← Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => paginate(page)}
              >
                {page}
              </button>
            ))}

            <button className="pagination-btn" onClick={goToNext} disabled={currentPage === totalPages}>
              Next →
            </button>
          </div>
        )}
      </div>

      {/* ── MODAL ──────────────────────────────────────── */}
      {selectedMedia && (
        <div className="media-modal" onClick={() => setSelectedMedia(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelectedMedia(null)}
              aria-label="Close"
            >
              ×
            </button>

            {selectedMedia.type === 'video' && selectedMedia.videoUrl ? (
              <video
                src={selectedMedia.videoUrl}
                controls
                autoPlay
                className="modal-video"
              />
            ) : selectedMedia.type === 'image' && selectedMedia.previewSrc ? (
              <img
                src={selectedMedia.previewSrc}
                alt={selectedMedia.title}
                className="modal-img"
                onError={(e) => (e.target.src = '/images/placeholder.jpg')}
              />
            ) : (
              <div className="modal-placeholder">No media available</div>
            )}

            <p className="modal-caption">{selectedMedia.title}</p>
            {selectedMedia.description && (
              <p className="modal-description">{selectedMedia.description}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;