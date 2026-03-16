

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import {
  fetchCaseStudies,
  fetchCaseStudyCategories,
} from './caseStudiesSlice';

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { projects, status, error } = useSelector((state) => state.caseStudies);

  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchCaseStudies());
      dispatch(fetchCaseStudyCategories());
    }
  }, [dispatch, projects.length]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-medium text-gray-700">
        Loading case study...
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600">
        Error: {error || 'Failed to load case study'}
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Case Study Not Found</h2>
        <Link
          to="/case-studies"
          className="inline-block bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          ← Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <section className="case-detail-section bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => (e.target.src = '/images/placeholder.jpg')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="px-5 py-2 bg-white/25 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30">
                {project.year}
              </span>
              <span className="px-5 py-2 bg-white/25 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30">
                {project.client}
              </span>
              <span className="px-5 py-2 bg-white/25 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30">
                {project.location}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 -mt-16 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(project.description),
                }}
              />
            </div>

            {/* Gallery Section */}
            {project.images && project.images.length > 1 && (
              <div className="mt-16 pt-12 border-t border-gray-200">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Project Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {project.images.slice(1).map((img, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <img
                        src={img}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => (e.target.src = '/images/placeholder.jpg')}
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back Button - Bottom of page */}
        <div className="mt-16 text-center">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gray-800 text-white text-lg font-semibold rounded-xl hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-700"
          >
            <span>←</span>
            <span>Back to All Case Studies</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyDetail;