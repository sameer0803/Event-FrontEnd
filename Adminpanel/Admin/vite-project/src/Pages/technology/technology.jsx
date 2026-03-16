

// // // src/components/Technology.jsx  (or pages/Technology.jsx)
// // import { useEffect, useMemo } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import DataTable from 'react-data-table-component';
// // import { ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';

// // import {
// //   fetchTechs,
// //   fetchCategories,
// //   createTech,
// //   updateTech,
// //   deleteTech,
// //   setFormField,
// //   setImages,
// //   startEdit,
// //   resetForm,
// // } from './techslice/techslice.js';

// // const Technology = () => {
// //   const dispatch = useDispatch();

// //   const {
// //     techs,
// //     categories,
// //     form,
// //     editId,
// //     loading,
// //     error,
// //   } = useSelector((state) => state.tech);

// //   // Fetch data on mount
// //   useEffect(() => {
// //     dispatch(fetchTechs());
// //     dispatch(fetchCategories());
// //   }, [dispatch]);

// //   const handleImageChange = (e) => {
// //     dispatch(setImages(e.target.files));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (loading.form) return;

// //     const formData = new FormData();
// //     formData.append('title', form.title);
// //     formData.append('description', form.description);
// //     formData.append('category', form.category);

// //     if (form.images?.length) {
// //       for (let i = 0; i < form.images.length; i++) {
// //         formData.append('images', form.images[i]);
// //       }
// //     }

// //     if (editId) {
// //       dispatch(updateTech({ id: editId, formData })).then((result) => {
// //         if (!result.error) {
// //           dispatch(fetchTechs()); // or rely on optimistic update
// //           dispatch(resetForm());
// //         }
// //       });
// //     } else {
// //       dispatch(createTech(formData)).then((result) => {
// //         if (!result.error) {
// //           dispatch(fetchTechs());
// //           dispatch(resetForm());
// //         }
// //       });
// //     }
// //   };

// //   const handleEdit = (row) => {
// //     dispatch(startEdit(row));
// //   };

// //   const handleDelete = (id) => {
// //     if (!window.confirm('Are you sure you want to delete this?')) return;
// //     dispatch(deleteTech(id));
// //   };

// //   // ────────────── Columns ──────────────
// //   const columns = useMemo(
// //     () => [
// //       {
// //         name: 'Title',
// //         selector: (row) => row.title,
// //         sortable: true,
// //       },
// //       {
// //         name: 'Category',
// //         selector: (row) => row.category?.name || 'No Category',
// //       },
// //       {
// //         name: 'Images',
// //         cell: (row) => (
// //           <div className="flex gap-2 flex-wrap">
// //             {row.images?.map((img, i) => (
// //               <img
// //                 key={i}
// //                 src={img}
// //                 alt="tech"
// //                 className="w-12 h-12 object-cover rounded shadow-sm"
// //               />
// //             ))}
// //           </div>
// //         ),
// //       },
// //       {
// //         name: 'Actions',
// //         cell: (row) => (
// //           <div className="flex gap-2">
// //             <button
// //               onClick={() => handleEdit(row)}
// //               disabled={loading.form || loading.delete[row._id]}
// //               className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition disabled:opacity-50"
// //             >
// //               Edit
// //             </button>
// //             <button
// //               onClick={() => handleDelete(row._id)}
// //               disabled={loading.form || loading.delete[row._id]}
// //               className={`px-3 py-1 rounded text-white transition flex items-center gap-2 min-w-[90px] justify-center ${
// //                 loading.delete[row._id]
// //                   ? 'bg-red-400 cursor-not-allowed'
// //                   : 'bg-red-600 hover:bg-red-700'
// //               }`}
// //             >
// //               {loading.delete[row._id] ? (
// //                 <>
// //                   <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
// //                   Deleting...
// //                 </>
// //               ) : (
// //                 'Delete'
// //               )}
// //             </button>
// //           </div>
// //         ),
// //       },
// //     ],
// //     [loading.form, loading.delete]
// //   );

// //   return (
// //     <div className="p-6 max-w-7xl mx-auto">
// //       <ToastContainer
// //         position="top-right"
// //         autoClose={4000}
// //         hideProgressBar={false}
// //         newestOnTop={false}
// //         closeOnClick
// //         rtl={false}
// //         pauseOnFocusLoss
// //         draggable
// //         pauseOnHover
// //         theme="colored"
// //       />

// //       {/* FORM */}
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white p-8 rounded-2xl shadow-lg mb-10 space-y-6 border border-gray-200"
// //       >
// //         <h2 className="text-2xl font-bold text-gray-800 mb-4">
// //           {editId ? 'Update Tech News' : 'Add New Tech News'}
// //         </h2>

// //         <input
// //           type="text"
// //           placeholder="Title"
// //           value={form.title}
// //           onChange={(e) =>
// //             dispatch(setFormField({ field: 'title', value: e.target.value }))
// //           }
// //           className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //           required
// //           disabled={loading.form}
// //         />

// //         <select
// //           value={form.category}
// //           onChange={(e) =>
// //             dispatch(setFormField({ field: 'category', value: e.target.value }))
// //           }
// //           className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //           required
// //           disabled={loading.form}
// //         >
// //           <option value="">Select Category</option>
// //           {categories.map((cat) => (
// //             <option key={cat._id} value={cat._id}>
// //               {cat.name}
// //             </option>
// //           ))}
// //         </select>

// //         <textarea
// //           placeholder="Description"
// //           value={form.description}
// //           onChange={(e) =>
// //             dispatch(setFormField({ field: 'description', value: e.target.value }))
// //           }
// //           className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
// //           required
// //           disabled={loading.form}
// //         />

// //         <div>
// //           <label className="block text-gray-700 mb-2 font-medium">
// //             Upload Images {editId && '(new images will replace old ones)'}
// //           </label>
// //           <input
// //             type="file"
// //             multiple
// //             onChange={handleImageChange}
// //             className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
// //             disabled={loading.form}
// //           />
// //         </div>

// //         <button
// //           type="submit"
// //           disabled={loading.form}
// //           className={`w-full md:w-auto px-6 py-3 rounded-lg font-medium text-white transition duration-200 flex items-center justify-center gap-2 ${
// //             loading.form
// //               ? 'bg-indigo-400 cursor-not-allowed'
// //               : 'bg-indigo-600 hover:bg-indigo-700'
// //           }`}
// //         >
// //           {loading.form ? (
// //             <>
// //               <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
// //               {editId ? 'Updating...' : 'Creating...'}
// //             </>
// //           ) : editId ? (
// //             'Update News'
// //           ) : (
// //             'Create News'
// //           )}
// //         </button>

// //         {editId && (
// //           <button
// //             type="button"
// //             onClick={() => dispatch(resetForm())}
// //             className="ml-4 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
// //           >
// //             Cancel Edit
// //           </button>
// //         )}
// //       </form>

// //       {/* DATA TABLE */}
// //       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
// //         {loading.table ? (
// //           <div className="p-10 flex justify-center items-center min-h-[300px]">
// //             <div className="flex flex-col items-center gap-3">
// //               <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
// //               <p className="text-gray-600">Loading tech news...</p>
// //             </div>
// //           </div>
// //         ) : (
// //           <DataTable
// //             columns={columns}
// //             data={techs}
// //             pagination
// //             highlightOnHover
// //             pointerOnHover
// //             responsive
// //             noDataComponent="No tech news found"
// //             progressPending={loading.table}
// //             progressComponent={
// //               <div className="p-10 flex justify-center">
// //                 <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
// //               </div>
// //             }
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Technology;


// // src/components/Technology.jsx
// import { useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import DataTable from 'react-data-table-component';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import {
//   fetchTechs,
//   fetchCategories,
//   createTech,
//   updateTech,
//   deleteTech,
//   setFormField,
//   setImages,          // we'll reuse or rename if needed
//   setVideo,           // ← new action you'll need to add
//   startEdit,
//   resetForm,
// } from './techslice/techslice.js';

// const Technology = () => {
//   const dispatch = useDispatch();

//   const {
//     techs,
//     categories,
//     form,
//     editId,
//     loading,
//     error,
//   } = useSelector((state) => state.tech);

//   // Fetch data on mount
//   useEffect(() => {
//     dispatch(fetchTechs());
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   const handleMediaTypeChange = (e) => {
//     dispatch(setFormField({ field: 'mediaType', value: e.target.value }));
//     // Optional: clear previous files when switching type
//     if (e.target.value === 'images') {
//       dispatch(setFormField({ field: 'video', value: null }));
//     } else {
//       dispatch(setFormField({ field: 'images', value: [] }));
//     }
//   };

//   const handleImagesChange = (e) => {
//     dispatch(setImages(e.target.files)); // assuming this sets form.images = Array.from(files)
//   };

//   const handleVideoChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       dispatch(setVideo(e.target.files[0])); // you'll need to add setVideo action
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (loading.form) return;

//     const formData = new FormData();
//     formData.append('title', form.title);
//     formData.append('description', form.description);
//     formData.append('category', form.category);
//     formData.append('mediaType', form.mediaType || 'images'); // send to backend

//     if (form.mediaType === 'images' && form.images?.length > 0) {
//       for (let i = 0; i < form.images.length; i++) {
//         formData.append('images', form.images[i]);
//       }
//     } else if (form.mediaType === 'video' && form.video) {
//       formData.append('video', form.video);
//     }

//     // Optional: warn if no media selected
//     if (form.mediaType === 'images' && !form.images?.length) {
//       alert('Please select at least one image');
//       return;
//     }
//     if (form.mediaType === 'video' && !form.video) {
//       alert('Please select a video');
//       return;
//     }

//     if (editId) {
//       dispatch(updateTech({ id: editId, formData })).then((result) => {
//         if (!result.error) {
//           dispatch(fetchTechs());
//           dispatch(resetForm());
//         }
//       });
//     } else {
//       dispatch(createTech(formData)).then((result) => {
//         if (!result.error) {
//           dispatch(fetchTechs());
//           dispatch(resetForm());
//         }
//       });
//     }
//   };

//   const handleEdit = (row) => {
//     dispatch(startEdit(row));
//   };

//   const handleDelete = (id) => {
//     if (!window.confirm('Are you sure you want to delete this?')) return;
//     dispatch(deleteTech(id));
//   };

//   // Columns for DataTable
//   const columns = useMemo(
//     () => [
//       {
//         name: 'Title',
//         selector: (row) => row.title,
//         sortable: true,
//       },
//       {
//         name: 'Category',
//         selector: (row) => row.category?.name || 'No Category',
//       },
//       {
//         name: 'Media',
//         cell: (row) => {
//           if (row.images?.length > 0) {
//             return (
//               <div className="flex gap-2 flex-wrap">
//                 {row.images.map((img, i) => (
//                   <img
//                     key={i}
//                     src={img}
//                     alt="tech"
//                     className="w-12 h-12 object-cover rounded shadow-sm"
//                   />
//                 ))}
//               </div>
//             );
//           }
//           if (row.videoUrl) {
//             return (
//               <video
//                 src={row.videoUrl}
//                 controls
//                 className="w-32 h-20 object-cover rounded shadow-sm"
//               />
//             );
//           }
//           return <span className="text-gray-500">No media</span>;
//         },
//       },
//       {
//         name: 'Actions',
//         cell: (row) => (
//           <div className="flex gap-2">
//             <button
//               onClick={() => handleEdit(row)}
//               disabled={loading.form || loading.delete?.[row._id]}
//               className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition disabled:opacity-50"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDelete(row._id)}
//               disabled={loading.form || loading.delete?.[row._id]}
//               className={`px-3 py-1 rounded text-white transition flex items-center gap-2 min-w-[90px] justify-center ${
//                 loading.delete?.[row._id]
//                   ? 'bg-red-400 cursor-not-allowed'
//                   : 'bg-red-600 hover:bg-red-700'
//               }`}
//             >
//               {loading.delete?.[row._id] ? (
//                 <>
//                   <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
//                   Deleting...
//                 </>
//               ) : (
//                 'Delete'
//               )}
//             </button>
//           </div>
//         ),
//       },
//     ],
//     [loading]
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <ToastContainer
//         position="top-right"
//         autoClose={4000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />

//       {/* FORM */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-lg mb-10 space-y-6 border border-gray-200"
//       >
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">
//           {editId ? 'Update Tech News' : 'Add New Tech News'}
//         </h2>

//         <input
//           type="text"
//           placeholder="Title"
//           value={form.title || ''}
//           onChange={(e) => dispatch(setFormField({ field: 'title', value: e.target.value }))}
//           className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           required
//           disabled={loading.form}
//         />

//         <select
//           value={form.category || ''}
//           onChange={(e) => dispatch(setFormField({ field: 'category', value: e.target.value }))}
//           className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           required
//           disabled={loading.form}
//         >
//           <option value="">Select Category</option>
//           {categories.map((cat) => (
//             <option key={cat._id} value={cat._id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>

//         <textarea
//           placeholder="Description"
//           value={form.description || ''}
//           onChange={(e) => dispatch(setFormField({ field: 'description', value: e.target.value }))}
//           className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
//           required
//           disabled={loading.form}
//         />

//         {/* ── Choose Media Type ── */}
//         <div className="space-y-2">
//           <label className="block text-gray-700 font-medium">Media Type</label>
//           <div className="flex gap-8">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 name="mediaType"
//                 value="images"
//                 checked={form.mediaType !== 'video'}
//                 onChange={handleMediaTypeChange}
//                 disabled={loading.form}
//                 className="h-5 w-5 text-indigo-600"
//               />
//               <span>Images (multiple)</span>
//             </label>

//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 name="mediaType"
//                 value="video"
//                 checked={form.mediaType === 'video'}
//                 onChange={handleMediaTypeChange}
//                 disabled={loading.form}
//                 className="h-5 w-5 text-indigo-600"
//               />
//               <span>Video (single)</span>
//             </label>
//           </div>
//         </div>

//         {/* Conditional File Input */}
//         {form.mediaType !== 'video' ? (
//           <div>
//             <label className="block text-gray-700 mb-2 font-medium">
//               Upload Images {editId && '(new images will replace old ones)'}
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleImagesChange}
//               className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//               disabled={loading.form}
//             />
//           </div>
//         ) : (
//           <div>
//             <label className="block text-gray-700 mb-2 font-medium">
//               Upload Video {editId && '(new video will replace old one)'}
//             </label>
//             <input
//               type="file"
//               accept="video/mp4,video/quicktime,video/webm,video/x-msvideo"
//               onChange={handleVideoChange}
//               className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//               disabled={loading.form}
//             />
//           </div>
//         )}

//         <div className="flex flex-col sm:flex-row gap-4">
//           <button
//             type="submit"
//             disabled={loading.form}
//             className={`px-6 py-3 rounded-lg font-medium text-white transition flex items-center justify-center gap-2 flex-1 ${
//               loading.form
//                 ? 'bg-indigo-400 cursor-not-allowed'
//                 : 'bg-indigo-600 hover:bg-indigo-700'
//             }`}
//           >
//             {loading.form ? (
//               <>
//                 <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
//                 {editId ? 'Updating...' : 'Creating...'}
//               </>
//             ) : editId ? (
//               'Update News'
//             ) : (
//               'Create News'
//             )}
//           </button>

//           {editId && (
//             <button
//               type="button"
//               onClick={() => dispatch(resetForm())}
//               className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg flex-1 sm:flex-none"
//             >
//               Cancel Edit
//             </button>
//           )}
//         </div>
//       </form>

//       {/* DATA TABLE */}
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//         {loading.table ? (
//           <div className="p-10 flex justify-center items-center min-h-[300px]">
//             <div className="flex flex-col items-center gap-3">
//               <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
//               <p className="text-gray-600">Loading tech news...</p>
//             </div>
//           </div>
//         ) : (
//           <DataTable
//             columns={columns}
//             data={techs}
//             pagination
//             highlightOnHover
//             pointerOnHover
//             responsive
//             noDataComponent="No tech news found"
//             progressPending={loading.table}
//             progressComponent={
//               <div className="p-10 flex justify-center">
//                 <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
//               </div>
//             }
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Technology;

// src/components/Technology.jsx  (or wherever it lives)


// import { useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import DataTable from 'react-data-table-component';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import {
//   fetchTechs,
//   fetchCategories,
//   createTech,
//   updateTech,
//   deleteTech,
//   setFormField,
//   setImages,
//   setVideo,
//   startEdit,
//   resetForm,
// } from './techslice/techslice.js';   // adjust path if needed

// const Technology = () => {
//   const dispatch = useDispatch();

//   const {
//     techs,
//     categories,
//     form,
//     editId,
//     loading,
//   } = useSelector((state) => state.tech);

//   useEffect(() => {
//     dispatch(fetchTechs());
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   const handleMediaTypeChange = (e) => {
//     const newType = e.target.value;
//     dispatch(setFormField({ field: 'mediaType', value: newType }));

//     // Clear the opposite media type immediately
//     if (newType === 'images') {
//       dispatch(setVideo(null));
//     } else {
//       dispatch(setImages([]));
//     }
//   };

//   const handleImagesChange = (e) => {
//     if (e.target.files?.length > 0) {
//       dispatch(setImages(e.target.files));
//     }
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       dispatch(setVideo(file));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (loading.form) return;

//     // Basic required field check
//     if (!form.title.trim() || !form.description.trim() || !form.category) {
//       toast.error("Title, description and category are required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', form.title.trim());
//     formData.append('description', form.description.trim());
//     formData.append('category', form.category);
//     formData.append('mediaType', form.mediaType);

//     let hasMedia = false;

//     if (form.mediaType === 'images') {
//       if (form.images.length === 0) {
//         toast.error("Please select at least one image");
//         return;
//       }
//       form.images.forEach((file) => {
//         formData.append('images', file);
//       });
//       hasMedia = true;
//     } else if (form.mediaType === 'video') {
//       if (!form.video) {
//         toast.error("Please select a video file");
//         return;
//       }
//       formData.append('video', form.video);
//       hasMedia = true;
//     }

//     if (!hasMedia) {
//       toast.error("You must upload either images or a video");
//       return;
//     }

//     const action = editId
//       ? updateTech({ id: editId, formData })
//       : createTech(formData);

//     dispatch(action).then((resultAction) => {
//       if (!resultAction.error) {
//         dispatch(fetchTechs());
//         dispatch(resetForm());
//         toast.success(editId ? "Updated successfully" : "Created successfully");
//       }
//     });
//   };

//   const handleEdit = (row) => {
//     dispatch(startEdit(row));
//   };

//   const handleDelete = (id) => {
//     if (!window.confirm("Delete this item permanently?")) return;
//     dispatch(deleteTech(id));
//   };

//   const columns = useMemo(
//     () => [
//       {
//         name: 'Title',
//         selector: (row) => row.title,
//         sortable: true,
//       },
//       {
//         name: 'Category',
//         selector: (row) => row.category?.name || row.category || '—',
//       },
//       {
//         name: 'Media',
//         cell: (row) => {
//           if (row.images?.length > 0) {
//             return (
//               <div className="flex gap-2 flex-wrap max-w-[180px]">
//                 {row.images.slice(0, 3).map((img, i) => (
//                   <img
//                     key={i}
//                     src={img}
//                     alt=""
//                     className="w-12 h-12 object-cover rounded"
//                   />
//                 ))}
//                 {row.images.length > 3 && (
//                   <span className="text-xs text-gray-500 self-center">
//                     +{row.images.length - 3}
//                   </span>
//                 )}
//               </div>
//             );
//           }
//           if (row.videoUrl) {
//             return (
//               <video
//                 src={row.videoUrl}
//                 controls
//                 className="w-32 h-20 object-cover rounded"
//               />
//             );
//           }
//           return <span className="text-gray-400 text-sm">No media</span>;
//         },
//       },
//       {
//         name: 'Actions',
//         cell: (row) => (
//           <div className="flex gap-2">
//             <button
//               onClick={() => handleEdit(row)}
//               disabled={loading.form}
//               className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDelete(row._id)}
//               disabled={loading.delete?.[row._id] || loading.form}
//               className={`min-w-[70px] px-3 py-1 rounded text-sm text-white flex items-center justify-center gap-1.5 ${
//                 loading.delete?.[row._id]
//                   ? 'bg-red-400 cursor-not-allowed'
//                   : 'bg-red-600 hover:bg-red-700'
//               }`}
//             >
//               {loading.delete?.[row._id] ? (
//                 <>
//                   <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full" />
//                   Deleting...
//                 </>
//               ) : (
//                 'Delete'
//               )}
//             </button>
//           </div>
//         ),
//         ignoreRowClick: true,
//         allowOverflow: true,
//         button: true,
//       },
//     ],
//     [loading]
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <ToastContainer position="top-right" autoClose={4000} theme="colored" />

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-10 space-y-5 border border-gray-200"
//       >
//         <h2 className="text-2xl font-bold text-gray-800">
//           {editId ? 'Edit Tech News' : 'Add New Tech News'}
//         </h2>

//         <input
//           type="text"
//           placeholder="Title *"
//           value={form.title || ''}
//           onChange={(e) => dispatch(setFormField({ field: 'title', value: e.target.value }))}
//           className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           required
//           disabled={loading.form}
//         />

//         <select
//           value={form.category || ''}
//           onChange={(e) => dispatch(setFormField({ field: 'category', value: e.target.value }))}
//           className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           required
//           disabled={loading.form}
//         >
//           <option value="">Select Category *</option>
//           {categories.map((cat) => (
//             <option key={cat._id} value={cat._id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>

//         <textarea
//           placeholder="Description *"
//           value={form.description || ''}
//           onChange={(e) => dispatch(setFormField({ field: 'description', value: e.target.value }))}
//           className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[110px]"
//           required
//           disabled={loading.form}
//         />

//         {/* Media Type Selection */}
//         <div className="space-y-1.5">
//           <label className="block text-gray-700 font-medium">Media Type *</label>
//           <div className="flex gap-10">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 name="mediaType"
//                 value="images"
//                 checked={form.mediaType === 'images'}
//                 onChange={handleMediaTypeChange}
//                 disabled={loading.form}
//                 className="h-5 w-5 text-indigo-600"
//               />
//               <span>Images (multiple)</span>
//             </label>

//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="radio"
//                 name="mediaType"
//                 value="video"
//                 checked={form.mediaType === 'video'}
//                 onChange={handleMediaTypeChange}
//                 disabled={loading.form}
//                 className="h-5 w-5 text-indigo-600"
//               />
//               <span>Video (one)</span>
//             </label>
//           </div>
//         </div>

//         {/* Conditional Upload Field */}
//         {form.mediaType === 'images' ? (
//           <div>
//             <label className="block text-gray-700 mb-1.5 font-medium">
//               Upload Images {editId && '(re-upload to replace)'}
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/jpeg,image/png,image/webp,image/gif"
//               onChange={handleImagesChange}
//               className="block w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//               disabled={loading.form}
//             />
//           </div>
//         ) : (
//           <div>
//             <label className="block text-gray-700 mb-1.5 font-medium">
//               Upload Video {editId && '(re-upload to replace)'}
//             </label>
//             <input
//               type="file"
//               accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
//               onChange={handleVideoChange}
//               className="block w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//               disabled={loading.form}
//             />
//           </div>
//         )}

//         <div className="flex flex-col sm:flex-row gap-4 pt-2">
//           <button
//             type="submit"
//             disabled={loading.form}
//             className={`flex-1 py-3 px-6 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition ${
//               loading.form
//                 ? 'bg-indigo-400 cursor-not-allowed'
//                 : 'bg-indigo-600 hover:bg-indigo-700'
//             }`}
//           >
//             {loading.form ? (
//               <>
//                 <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
//                 {editId ? 'Updating...' : 'Creating...'}
//               </>
//             ) : editId ? (
//               'Update'
//             ) : (
//               'Create'
//             )}
//           </button>

//           {editId && (
//             <button
//               type="button"
//               onClick={() => dispatch(resetForm())}
//               className="flex-1 sm:flex-none py-3 px-6 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow overflow-hidden">
//         <DataTable
//           columns={columns}
//           data={techs}
//           pagination
//           highlightOnHover
//           pointerOnHover
//           responsive
//           progressPending={loading.table}
//           progressComponent={
//             <div className="p-12 flex flex-col items-center gap-3">
//               <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full" />
//               <p className="text-gray-600">Loading...</p>
//             </div>
//           }
//           noDataComponent={<div className="p-10 text-gray-500">No tech news found</div>}
//         />
//       </div>
//     </div>
//   );
// };

// export default Technology;

// src/components/Technology.jsx



import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  fetchTechs,
  fetchCategories,
  createTech,
  updateTech,
  deleteTech,
  setFormField,
  setImages,
  setVideo,
  startEdit,
  resetForm,
} from './techslice/techslice.js'; // ← adjust path to your slice

const Technology = () => {
  const dispatch = useDispatch();

  const {
    techs = [],
    categories = [],
    form = {},
    editId = null,
    loading = { table: false, form: false, delete: {} },
  } = useSelector((state) => state.tech);

  useEffect(() => {
    dispatch(fetchTechs());
    dispatch(fetchCategories());
  }, [dispatch]);

  // ── Handlers ────────────────────────────────────────────────

  const handleMediaTypeChange = (e) => {
    const newType = e.target.value;
    dispatch(setFormField({ field: 'mediaType', value: newType }));

    // Clear opposite media type
    if (newType === 'images') {
      dispatch(setVideo(null));
    } else if (newType === 'video') {
      dispatch(setImages([]));
    }
  };

  const handleImagesChange = (e) => {
    if (e.target.files?.length) {
      dispatch(setImages(Array.from(e.target.files)));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(setVideo(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading.form) return;

    // Required field validation
    if (!form.title?.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!form.description?.trim()) {
      toast.error('Description is required');
      return;
    }
    if (!form.category) {
      toast.error('Category is required');
      return;
    }
    if (!form.mediaType) {
      toast.error('Please select media type (Images or Video)');
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title.trim());
    formData.append('description', form.description.trim());
    formData.append('category', form.category);
    formData.append('mediaType', form.mediaType);

    let hasMedia = false;

    if (form.mediaType === 'images') {
      if (!form.images?.length) {
        toast.error('At least one image is required');
        return;
      }
      form.images.forEach((file) => formData.append('images', file));
      hasMedia = true;
    } else if (form.mediaType === 'video') {
      if (!form.video) {
        toast.error('Video file is required');
        return;
      }
      formData.append('video', form.video);
      hasMedia = true;
    }

    if (!hasMedia) {
      toast.error('You must upload either images or a video');
      return;
    }

    try {
      const action = editId
        ? updateTech({ id: editId, formData })
        : createTech(formData);

      const result = await dispatch(action).unwrap();

      toast.success(editId ? 'Updated successfully' : 'Created successfully');
      dispatch(fetchTechs());
      dispatch(resetForm());
    } catch (err) {
      toast.error(err?.message || 'Something went wrong');
    }
  };

  const handleEdit = (row) => {
    dispatch(startEdit(row));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this item permanently?')) return;
    dispatch(deleteTech(id));
  };

  // ── Table Columns ───────────────────────────────────────────
  const columns = useMemo(
    () => [
      {
        name: 'Title',
        selector: (row) => row.title,
        sortable: true,
      },
      {
        name: 'Category',
        selector: (row) => row.category?.name || '—',
      },
      {
        name: 'Media',
        width: '180px',
        cell: (row) => {
          if (row.images?.length > 0) {
            return (
              <div className="flex gap-2 flex-wrap">
                {row.images.slice(0, 3).map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="preview"
                    className="w-12 h-12 object-cover rounded"
                  />
                ))}
                {row.images.length > 3 && (
                  <span className="text-xs text-gray-500 self-center">
                    +{row.images.length - 3}
                  </span>
                )}
              </div>
            );
          }
          if (row.videoUrl) {
            return (
              <video
                src={row.videoUrl}
                controls
                className="w-32 h-20 object-cover rounded"
              />
            );
          }
          return <span className="text-gray-400 text-sm">No media</span>;
        },
      },
      {
        name: 'Actions',
        width: '180px',
        cell: (row) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(row)}
              disabled={loading.form}
              className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row._id)}
              disabled={loading.delete?.[row._id] || loading.form}
              className={`px-3 py-1 rounded text-sm text-white min-w-[80px] flex items-center justify-center gap-2 ${
                loading.delete?.[row._id]
                  ? 'bg-red-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {loading.delete?.[row._id] ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
    ],
    [loading]
  );

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={4500} theme="colored" />

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-10 space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {editId ? 'Edit Technology Item' : 'Add New Technology Item'}
        </h2>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1.5">Title *</label>
          <input
            type="text"
            value={form.title || ''}
            onChange={(e) => dispatch(setFormField({ field: 'title', value: e.target.value }))}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter title"
            disabled={loading.form}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1.5">Category *</label>
          <select
            value={form.category || ''}
            onChange={(e) => dispatch(setFormField({ field: 'category', value: e.target.value }))}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading.form}
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1.5">Description *</label>
          <textarea
            value={form.description || ''}
            onChange={(e) => dispatch(setFormField({ field: 'description', value: e.target.value }))}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
            placeholder="Enter detailed description"
            disabled={loading.form}
            required
          />
        </div>

        {/* Media Type */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">Media Type *</label>
          <div className="flex gap-10">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mediaType"
                value="images"
                checked={form.mediaType === 'images'}
                onChange={handleMediaTypeChange}
                disabled={loading.form}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Multiple Images</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mediaType"
                value="video"
                checked={form.mediaType === 'video'}
                onChange={handleMediaTypeChange}
                disabled={loading.form}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Single Video</span>
            </label>
          </div>
        </div>

        {/* Conditional File Upload */}
        {form.mediaType === 'images' && (
          <div>
            <label className="block text-gray-700 font-medium mb-1.5">
              Upload Images {editId && '(re-upload to replace)'}
            </label>
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleImagesChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer"
              disabled={loading.form}
            />
          </div>
        )}

        {form.mediaType === 'video' && (
          <div>
            <label className="block text-gray-700 font-medium mb-1.5">
              Upload Video {editId && '(re-upload to replace)'}
            </label>
            <input
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
              onChange={handleVideoChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer"
              disabled={loading.form}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={loading.form}
            className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition flex items-center justify-center gap-2 ${
              loading.form
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading.form ? (
              <>
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                {editId ? 'Updating...' : 'Creating...'}
              </>
            ) : editId ? (
              'Update Item'
            ) : (
              'Create Item'
            )}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => dispatch(resetForm())}
              className="flex-1 sm:flex-none py-3 px-6 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <DataTable
          columns={columns}
          data={techs}
          pagination
          paginationPerPage={10}
          highlightOnHover
          pointerOnHover
          responsive
          progressPending={loading.table}
          progressComponent={
            <div className="p-12 flex flex-col items-center gap-4">
              <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full" />
              <p className="text-gray-600">Loading technologies...</p>
            </div>
          }
          noDataComponent={<div className="p-12 text-gray-500 text-center">No items found</div>}
        />
      </div>
    </div>
  );
};

export default Technology;