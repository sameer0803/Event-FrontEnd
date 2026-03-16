

// const techModel = require("../../module/technologymodule/technologymodule.js");
// const categoryModel = require("../../module/technologymodule/categorymodule.js");
// const imagekit = require("../../utils/imagekit.js");
// const cloudinary = require("../../utils/cloudinary.js")


const techModel = require("../../module/technologymodule/technologymodule.js");
const categoryModel = require("../../module/technologymodule/categorymodule.js");
const imagekit = require("../../utils/imagekit.js");
const cloudinary = require("../../utils/cloudinary.js");

const createTech = async (req, res) => {
  try {
    const { title, description, category, mediaType } = req.body;

    // ── Validation ───────────────────────────────────────
    if (!title?.trim() || !description?.trim() || !category || !mediaType) {
      return res.status(400).json({
        success: false,
        message: "title, description, category and mediaType are required",
      });
    }

    if (!["images", "video"].includes(mediaType)) {
      return res.status(400).json({
        success: false,
        message: "mediaType must be 'images' or 'video'",
      });
    }

    const categoryExists = await categoryModel.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    let images = [];
    let videoUrl = null;
    let videoPublicId = null;

    // ── Handle IMAGES ────────────────────────────────────
    if (mediaType === "images") {
      if (!req.files?.images || req.files.images.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one image is required when mediaType = images",
        });
      }

      const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

      for (const file of files) {
        if (!file.mimetype.startsWith("image/")) {
          return res.status(400).json({
            success: false,
            message: "Only image files are allowed",
          });
        }

        const upload = await imagekit.upload({
          file: file.data,
          fileName: `tech-${Date.now()}-${file.name}`,
          folder: "/techImages",
          useUniqueFileName: true,
        });

        images.push(upload.url);
      }
    }

    // ── Handle VIDEO ─────────────────────────────────────
    else if (mediaType === "video") {
      if (!req.files?.video) {
        return res.status(400).json({
          success: false,
          message: "Video file is required when mediaType = video",
        });
      }

      const videoFile = Array.isArray(req.files.video) ? req.files.video[0] : req.files.video;

      if (!videoFile.mimetype.startsWith("video/")) {
        return res.status(400).json({
          success: false,
          message: "Only video files are allowed",
        });
      }

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "video",
              folder: "techVideos",
              chunk_size: 6000000,
            },
            (error, result) => (error ? reject(error) : resolve(result))
          )
          .end(videoFile.data);
      });

      videoUrl = result.secure_url;
      videoPublicId = result.public_id;
    }

    // Final safety check (should never reach here if frontend works correctly)
    if (images.length > 0 && videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Cannot upload both images and video together",
      });
    }

    const newItem = await techModel.create({
      title: title.trim(),
      description: description.trim(),
      category,
      images,
      videoUrl,
      videoPublicId,
      // author: author || "Admin",   ← you can keep if needed
    });

    res.status(201).json({
      success: true,
      message: "Technology content created successfully",
      data: newItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};





// const createTech = async (req, res) => {
//   try {
//     const { name, description, category, author, mediaType } = req.body;

//     if (!name || !description || !category || !mediaType) {
//       return res.status(400).json({ success: false, message: "name, description, category aur mediaType required hai" });
//     }

//     if (!['images', 'video'].includes(mediaType)) {
//       return res.status(400).json({ success: false, message: "mediaType sirf 'images' ya 'video' ho sakta hai" });
//     }

//     // Category check
//     const categoryExists = await categoryModel.findById(category);
//     if (!categoryExists) {
//       return res.status(404).json({ success: false, message: "Category nahi mili" });
//     }

//     let images = [];
//     let videoUrl = null;
//     let videoPublicId = null;

//     // ── IMAGES CASE ───────────────────────────────────────
//     if (mediaType === 'images') {
//       if (!req.files?.images || req.files.images.length === 0) {
//         return res.status(400).json({ success: false, message: "Images upload karo (kam se kam 1)" });
//       }

//       const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

//       for (const file of files) {
//         if (!file.mimetype.startsWith('image/')) {
//           return res.status(400).json({ success: false, message: "Sirf images allowed hai is field mein" });
//         }

//         const upload = await imagekit.upload({
//           file: file.data,
//           fileName: `tech-${Date.now()}-${file.name}`,
//           folder: "/techImages",
//           useUniqueFileName: true,
//         });

//         images.push(upload.url);
//       }

//       if (images.length === 0) {
//         return res.status(400).json({ success: false, message: "Koi valid image upload nahi hui" });
//       }
//     }

//     // ── VIDEO CASE ────────────────────────────────────────
//     else if (mediaType === 'video') {
//       if (!req.files?.video) {
//         return res.status(400).json({ success: false, message: "Video file upload karo" });
//       }

//       const videoFile = Array.isArray(req.files.video) ? req.files.video[0] : req.files.video;

//       if (!videoFile.mimetype.startsWith('video/')) {
//         return res.status(400).json({ success: false, message: "Sirf video file allowed hai" });
//       }

//       const result = await new Promise((resolve, reject) => {
//         cloudinary.uploader.upload_stream(
//           {
//             resource_type: "video",
//             folder: "techVideos",
//             chunk_size: 6000000,
//           },
//           (error, result) => error ? reject(error) : resolve(result)
//         ).end(videoFile.data);
//       });

//       videoUrl = result.secure_url;
//       videoPublicId = result.public_id;
//     }

//     // Final safety (though frontend should prevent this)
//     if (images.length > 0 && videoUrl) {
//       return res.status(400).json({ success: false, message: "Dono (image + video) ek saath nahi daal sakte" });
//     }

//     const newItem = new techModel({
//       name,
//       description,
//       category,
//       author: author || "Admin",
//       images,
//       videoUrl,
//       videoPublicId,
//     });

//     await newItem.save();

//     res.status(201).json({
//       success: true,
//       message: "Content successfully ban gaya",
//       data: newItem,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: err.message,
//     });
//   }
// };



// ================= UPDATE TECH =================
const updateTech = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, images } = req.body;

    const updateFields = {};

    if (title?.trim()) updateFields.title = title.trim();
    if (description?.trim()) updateFields.description = description.trim();

    // ✅ Only ObjectId update
    if (category) {
      const categoryExists = await categoryModel.findById(category);
      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
      updateFields.category = categoryExists._id;
    }

    if (images && Array.isArray(images) && images.length > 0) {
      updateFields.images = images;
    }

    const updatedTech = await techModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedTech) {
      return res.status(404).json({
        success: false,
        message: "Tech content not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tech content updated successfully",
      data: updatedTech,
    });

  } catch (error) {
    console.error("Error updating tech content:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ================= GET TECH =================
const getTechData = async (req, res) => {
  try {

    const techData = await techModel
      .find()
      .populate("category", "name")
      .sort({ createdAt: -1 });
// console.log(techData,"techDatatechData")
    res.status(200).json({
      success: true,
      count: techData.length,
      message: "Tech data fetched successfully",
      data: techData,
    });

  } catch (error) {
    console.error("Error fetching tech data:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// ================= DELETE TECH =================
const deleteTech = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTech = await techModel.findByIdAndDelete(id);

    if (!deletedTech) {
      return res.status(404).json({
        success: false,
        message: "Tech content not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tech content deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting tech content:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = {
  createTech,
  getTechData,
  deleteTech,
  updateTech,
};
