// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';

// // const initialState = {
// //   categories: ['All'],
// //   media: [],
// //   status: 'idle',        // 'idle' | 'loading' | 'succeeded' | 'failed'
// //   error: null,
// // };

// // // Async thunks
// // export const fetchCategories = createAsyncThunk(
// //   'gallery/fetchCategories',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.get('http://13.232.248.125:8001/api/technology/category');
// //       return response.data;
// //     } catch (err) {
// //       return rejectWithValue(err.response?.data || 'Failed to fetch categories');
// //     }
// //   }
// // );

// // export const fetchMedia = createAsyncThunk(
// //   'gallery/fetchMedia',
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const response = await axios.get('http://13.232.248.125:8001/api/technology/product');
// //       return response.data;
// //     } catch (err) {
// //       return rejectWithValue(err.response?.data || 'Failed to fetch media');
// //     }
// //   }
// // );

// // const gallerySlice = createSlice({
// //   name: 'gallery',
// //   initialState,
// //   reducers: {
// //     setActiveCategory: (state, action) => {
// //       state.activeCategory = action.payload;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     // Categories
// //     builder
// //       .addCase(fetchCategories.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchCategories.fulfilled, (state, action) => {
// //         state.status = 'succeeded';
// //         // ────────────────────────────────────────────────
// //         //  IMPORTANT: Adapt this part to your real API shape
// //         // ────────────────────────────────────────────────
// //         let cats = action.payload;

// //         if (Array.isArray(cats)) {
// //           // already array → good
// //         } else if (cats && Array.isArray(cats.categories)) {
// //           cats = cats.categories;
// //         } else if (cats && Array.isArray(cats.data)) {
// //           cats = cats.data;
// //         } else if (cats && typeof cats === 'object') {
// //           cats = Object.values(cats); // last resort
// //         } else {
// //           cats = [];
// //         }

// //         const names = cats
// //           .map(item => item.name || item.title || item.categoryName || String(item))
// //           .filter(Boolean);

// //         state.categories = ['All', ...names];
// //       })
// //       .addCase(fetchCategories.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.payload;
// //       });

// //     // Media / Products
// //     builder
// //       .addCase(fetchMedia.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchMedia.fulfilled, (state, action) => {
// //         state.status = 'succeeded';

// //         let items = action.payload;

// //         // Same defensive approach
// //         if (!Array.isArray(items)) {
// //           if (items?.products) items = items.products;
// //           else if (items?.data)   items = items.data;
// //           else if (items?.items)  items = items.items;
// //           else items = [];
// //         }

// //         state.media = items.map((item, index) => ({
// //           id: item.id || item._id || `media-${index}`,
// //           type: item.type || (item.url?.toLowerCase().endsWith('.mp4') ? 'video' : 'image'),
// //           category: item.category || item.categoryName || 'Uncategorized',
// //           src: item.url || item.image || item.videoUrl || item.src || '',
// //           title: item.title || item.name || item.description || 'Untitled',
// //         }));
// //       })
// //       .addCase(fetchMedia.rejected, (state, action) => {
// //         state.status = 'failed';
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // export const { setActiveCategory } = gallerySlice.actions;
// // export default gallerySlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   categories: ["All"],
//   media: [],
//   activeCategory: "All",
//   status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null,
// };

// export const fetchCategories = createAsyncThunk(
//   "gallery/fetchCategories",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         "http://13.232.248.125:8001/api/technology/category",
//       );
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to fetch categories",
//       );
//     }
//   },
// );

// export const fetchMedia = createAsyncThunk(
//   "gallery/fetchMedia",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         "http://13.232.248.125:8001/api/technology/product",
//       );
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to fetch media",
//       );
//     }
//   },
// );

// const gallerySlice = createSlice({
//   name: "gallery",
//   initialState,
//   reducers: {
//     setActiveCategory: (state, action) => {
//       state.activeCategory = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     // ───── Categories ─────
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.status = "succeeded";

//         let raw = action.payload;
//         let catArray = raw?.data || [];

//         if (!Array.isArray(catArray)) catArray = [];

//         const names = catArray
//           .map((cat) => cat?.name)
//           .filter((name) => name && typeof name === "string");

//         // Remove duplicates & sort (optional)
//         const uniqueNames = [...new Set(names)].sort();

//         state.categories = ["All", ...uniqueNames];
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });

//     // ───── Media / Products ─────
//     builder
//       .addCase(fetchMedia.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchMedia.fulfilled, (state, action) => {
//         state.status = "succeeded";

//         let raw = action.payload;
//         let items = raw?.data || [];

//         if (!Array.isArray(items)) items = [];

//         state.media = items.map((item, index) => ({
//           id: item._id || `item-${index}`,
//           type: "image", // all are images according to your current data
//           category: item.category?.name || "Uncategorized",
//           src:
//             Array.isArray(item.images) && item.images.length > 0
//               ? item.images[0]
//               : "",
//           title: item.title || "Untitled",
//           description: item.description || "",
//         }));
//       })
//       .addCase(fetchMedia.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { setActiveCategory } = gallerySlice.actions;
// export default gallerySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: ["All"],
  media: [],
  activeCategory: "All",
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "gallery/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://13.232.248.125:8001/api/technology/category",
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch categories",
      );
    }
  },
);

export const fetchMedia = createAsyncThunk(
  "gallery/fetchMedia",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://13.232.248.125:8001/api/technology/product",
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch media",
      );
    }
  },
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        const raw = action.payload?.data || [];
        const names = raw.map((cat) => cat?.name?.trim()).filter(Boolean);
        const unique = [...new Set(names)].sort();
        state.categories = ["All", ...unique];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Media
      .addCase(fetchMedia.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
        state.status = "succeeded";
        const items = action.payload?.data || [];

        state.media = items.map((item) => {
          const hasImages =
            Array.isArray(item.images) && item.images.length > 0;
          const hasVideo = !!item.videoUrl;

          return {
            id: item._id,
            title: item.title || "Untitled",
            description: item.description || "",
            category: item.category?.name || "Uncategorized",

            // Media type detection
            type: hasVideo ? "video" : hasImages ? "image" : "none",

            // For display / preview
            previewSrc: hasVideo
              ? item.videoUrl
              : hasImages
                ? item.images[0]
                : "",

            // Full content for modal
            images: hasImages ? item.images : [],
            videoUrl: item.videoUrl || "",
            videoPublicId: item.videoPublicId || "",
          };
        });
      })
      .addCase(fetchMedia.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setActiveCategory } = gallerySlice.actions;
export default gallerySlice.reducer;
