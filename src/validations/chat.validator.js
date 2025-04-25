const joi = require("joi");

exports.chatList = joi.object({
  groupId: joi.string().hex().length(24).required(),
  userType: joi.string().optional(),
  userId: joi.number().required(),
  perPage: joi.number().optional(),
  page: joi.number().optional(),
  keepdate: joi.boolean().optional(),
  message: joi.string().optional()
});

exports.userList = joi.object({
  isFilter: joi.boolean().optional(),
  groupName: joi.string().optional(),
  perPage: joi.number().optional(),
  page: joi.number().optional(),
  userName: joi.string().optional(),
  type: joi.array().optional(),
});



exports.clearChat = joi.object({
  _id: joi.string().hex().length(24).required(),
});

exports.allImages = joi.object({
  _id: joi.string().hex().length(24).required(),
});

exports.deleteMultipleImage = joi.object({
  imagesKeys: joi.array().required(),
});
exports.uploadImage = joi.object({
  groupId: joi.string().hex().length(24).required(),
  userId: joi.string().optional(),
  senderId: joi.string().optional(),
})


exports.removeMessage = joi.object({
  _id: joi.string().hex().length(24).required(),
  userId: joi.string().optional(),
});



