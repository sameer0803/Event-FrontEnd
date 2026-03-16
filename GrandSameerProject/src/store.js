import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from '../src/components/Gallery/gallerySlice.js';
import caseStudiesReducer from '../src/components/CaseStudy/caseStudiesSlice.js';
export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    caseStudies: caseStudiesReducer,
  },
});