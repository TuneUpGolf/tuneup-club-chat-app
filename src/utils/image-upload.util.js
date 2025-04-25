const multer = require("multer");
const { socket_constant } = require("@constants/index");
const logger = require("@utils/logger.utils");
const { updateGroupProfile } = require("@services/group.services");
const { getAllOnlineAdmins } = require("./common.utils");

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const fileFilterProfile = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Please add only image"), false);
  }
};

const FILE_SIZE = 2 * 1024 * 1024
const storage = () =>
  multer.memoryStorage({
    limits: FILE_SIZE,
  });
const upload = multer({
  limits: { fileSize: FILE_SIZE }, //2mb
  storage: storage(),
  fileFilter,
}).array("image");
const uploadProfile = multer({
  limits: { fileSize: FILE_SIZE }, //2mb
  storage: storage(),
  fileFilter: fileFilterProfile,
}).single("image");

const handleGroupImageUpload = async (socket, data) => {
  const updatedFileName = `${Date.now()}_${data.groupId}_${data.fileName}`;

  const params = {
    Bucket: "basestructure",
    Key: updatedFileName,
    Body: data.fileData,
  };

  try {
    const s3Result = await s3.upload(params).promise();
    const imageUrl = s3Result.Location;
    const responseData = {
      imageUrl,
      groupId: data.groupId,
    };
    const onlineAdmins = await getAllOnlineAdmins();
    await updateGroupImage(socket, data, imageUrl);
    global.globalSocket.to([...data.groupMembers, ...onlineAdmins]).emit(socket_constant.GROUP_PROFILE_STATUS, {
      success: true,
      message: "Group image upload successful",
      responseData,
    });
    logger.info(`Group Image Uploaded to s3 => ${imageUrl}`);
  } catch (error) {
    logger.error(
      `[handleGroupImageUpload] [Error] while uploading group image to s3 => ${error}`
    );
    socket.emit(socket_constant.GROUP_PROFILE_STATUS, {
      success: false,
      message: "Group image upload failed",
    });
  }
};

const updateGroupImage = async (socket, data, imageUrl) => {
  try {
    // Find the group based on its name and update the profile_img field
    const { groupId } = data;
    await updateGroupProfile(groupId, imageUrl)
  } catch (error) {
    logger.error(
      `[updateGroupImage] [Error] while updating group image URL in the database => ${error}`
    );
  }
};

module.exports = { upload, uploadProfile, handleGroupImageUpload };