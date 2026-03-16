

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import {
  fetchCaseStudyCategories,
  fetchCaseStudies,
  setActiveFilter,
} from './caseStudiesSlice.js';
import './CaseStudies.css';

const ITEMS_PER_PAGE = 6;

const CaseStudies = () => {
  const dispatch = useDispatch();

  const {
    categories,
    projects: allProjects,
    activeFilter,
    status,
    error,
  } = useSelector((state) => state.caseStudies);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const filteredProjects =
    activeFilter === 'All'
      ? allProjects
      : allProjects.filter((project) => project.category === activeFilter);

  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentItems = filteredProjects.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  useEffect(() => {
    if (categories.length <= 1) {
      dispatch(fetchCaseStudyCategories());
    }
    if (allProjects.length === 0) {
      dispatch(fetchCaseStudies());
    }
  }, [dispatch, categories.length, allProjects.length]);

  if (status === 'loading') {
    return <div className="case-loading">Loading case studies...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="case-error">
        Error: {error || 'Failed to load case studies'}
      </div>
    );
  }

  return (
    <section className="case-studies-section">
      <div className="case-bg"></div>
      <div className="case-overlay"></div>

      <div className="container">
        <div className="case-study-top">
          <h1>Case Studies / Track Record</h1>
          <p>Proven Performance Across Industries</p>
        </div>

        <div className="filters-wrapper">
          {categories.map((f) => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => dispatch(setActiveFilter(f))}
            >
              {f === 'TataMotors' ? 'Tata Motors' : f}
            </button>
          ))}
        </div>

       

        <div className="projects-grid">
          {currentItems.length === 0 ? (
            <p className="no-projects">No projects found in this category.</p>
          ) : (
            currentItems.map((project) => (
              <article key={project.id} className="project-card">
                <div className="image-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="project-image"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                  <div className="image-overlay"></div>
                  <div className="year-badge">{project.year}</div>
                </div>

                <div className="card-content">
                  <h3 className="project-title">{project.title}</h3>

                  {/* Safe HTML rendering with DOMPurify */}
                  <div
                    className="project-desc"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(project.description),
                    }}
                  />

                  <div className="meta">
                    <span>{project.client}</span>
                    <span className="separator">•</span>
                    <span>{project.location.split(',')[0]}</span>
                  </div>

                  <Link
                    to={`/case-studies/${project.slug}`}
                    className="view-details-btn"
                  >
                    View Details →
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination-container">
            <button
              className="pagination-btn"
              onClick={goToPrev}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                onClick={() => paginate(pageNum)}
              >
                {pageNum}
              </button>
            ))}

            <button
              className="pagination-btn"
              onClick={goToNext}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}

        <div className="growth-snapshot">
          <h3>Growth Snapshot</h3>
          <ul>
            <li>📈 50+ Projects Delivered Pan-India</li>
            <li>🔁 92% Repeat Business from Corporates & Govt</li>
            <li>🏗️ 100% On-Time & Zero Safety Incidents</li>
            <li>🌍 Trusted by Tata, Wonder Cement & State Governments</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;