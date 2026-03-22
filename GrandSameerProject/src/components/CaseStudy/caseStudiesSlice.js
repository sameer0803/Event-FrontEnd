// // ================================================
// // 1. src/features/caseStudies/caseStudiesSlice.js
// // ================================================
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   categories: ['All'],
//   projects: [],
//   activeFilter: 'All',
//   status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
// };

// export const fetchCaseStudyCategories = createAsyncThunk(
//   'caseStudies/fetchCategories',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('https://api.grandsameerevents.com/api/blogcategory');
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
//     }
//   }
// );

// export const fetchCaseStudies = createAsyncThunk(
//   'caseStudies/fetchProjects',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('https://api.grandsameerevents.com/api/product');
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to fetch projects');
//     }
//   }
// );

// const caseStudiesSlice = createSlice({
//   name: 'caseStudies',
//   initialState,
//   reducers: {
//     setActiveFilter: (state, action) => {
//       state.activeFilter = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     // Categories
//     builder
//       .addCase(fetchCaseStudyCategories.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCaseStudyCategories.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         let raw = action.payload;
//         let catArray = raw?.data || [];
//         if (!Array.isArray(catArray)) catArray = [];

//         const names = catArray
//           .map((cat) => cat?.name)
//           .filter((name) => name && typeof name === 'string');

//         const uniqueNames = [...new Set(names)].sort();
//         state.categories = ['All', ...uniqueNames];
//       })
//       .addCase(fetchCaseStudyCategories.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });

//     // Projects / Case Studies
//     builder
//       .addCase(fetchCaseStudies.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCaseStudies.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         let raw = action.payload;
//         let items = raw?.data || [];
//         if (!Array.isArray(items)) items = [];

//         state.projects = items.map((item, index) => {
//           const firstImage =
//             Array.isArray(item.images) && item.images.length > 0
//               ? item.images[0]
//               : '';

//           return {
//             id: item._id || `project-${index}`,
//             title: item.title || 'Untitled Project',
//             slug:
//               item.slug ||
//               item.title
//                 ?.toLowerCase()
//                 .replace(/[^a-z0-9]+/g, '-')
//                 .replace(/^-|-$/g, '') ||
//               `project-${index}`,
//             year: item.year || new Date(item.createdAt || Date.now()).getFullYear().toString(),
//             client: item.client || 'Client',
//             location: item.location || 'India',
//             description: item.description || '',
//             category: item.category?.name || 'Uncategorized',
//             image: firstImage,
//             images: Array.isArray(item.images) ? item.images : [],
//           };
//         });
//       })
//       .addCase(fetchCaseStudies.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { setActiveFilter } = caseStudiesSlice.actions;
// export default caseStudiesSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: ["All"],
  projects: [],
  activeFilter: "All",
  status: "idle",
  error: null,
};

export const fetchCaseStudyCategories = createAsyncThunk(
  "caseStudies/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://api.grandsameerevents.com/api/blogcategory",
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch categories",
      );
    }
  },
);

export const fetchCaseStudies = createAsyncThunk(
  "caseStudies/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://api.grandsameerevents.com/api/product");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch projects",
      );
    }
  },
);

const caseStudiesSlice = createSlice({
  name: "caseStudies",
  initialState,
  reducers: {
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Categories
      .addCase(fetchCaseStudyCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCaseStudyCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        let raw = action.payload;
        let catArray = raw?.data || [];
        if (!Array.isArray(catArray)) catArray = [];

        const names = catArray
          .map((cat) => cat?.name)
          .filter((name) => name && typeof name === "string");

        const uniqueNames = [...new Set(names)].sort();
        state.categories = ["All", ...uniqueNames];
      })
      .addCase(fetchCaseStudyCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Projects / Case Studies
      .addCase(fetchCaseStudies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCaseStudies.fulfilled, (state, action) => {
        state.status = "succeeded";
        let raw = action.payload;
        let items = raw?.data || [];
        if (!Array.isArray(items)) items = [];

        state.projects = items.map((item, index) => {
          const firstImage =
            Array.isArray(item.images) && item.images.length > 0
              ? item.images[0]
              : "";

          return {
            id: item._id || `project-${index}`,
            title: item.name || "Untitled Project", // ← changed from title → name
            slug:
              item.slug ||
              (item.name || "")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "") ||
              `project-${index}`,
            year:
              item.year ||
              new Date(item.createdAt || Date.now()).getFullYear().toString(),
            client: item.author || item.client || "Unknown Client", // using author field
            location: item.location || item.author || "Unknown Location",
            description: item.description || "",
            category: item.category?.name || "Uncategorized",
            image: firstImage,
            images: Array.isArray(item.images) ? item.images : [],
          };
        });
      })
      .addCase(fetchCaseStudies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setActiveFilter } = caseStudiesSlice.actions;
export default caseStudiesSlice.reducer;
