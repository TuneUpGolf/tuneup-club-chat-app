const express = require("express");
const router = express.Router();
const middleware = require('@middleware/validation');
const auth = require('@middleware/auth');
const { chatValidator } = require('@validations/index');
const {
  chatListController,
  clearChatController,
  allImageController,
  newChatGroupListController,
  removeMessage,
  uploadImageController
} = require('@controller/chat.controller');
const { upload } = require('@utils/image-upload.util');
const { handleFileUpload } = require('@middleware/upload.middleware');

module.exports = () => {

  router.post('/list', auth(true), middleware(chatValidator.chatList), chatListController);
  router.post('/all-group-list', auth(true), middleware(chatValidator.userList), newChatGroupListController);
  router.delete("/delete-message", auth(true), middleware(chatValidator.removeMessage), removeMessage)
  router.post('/erase', auth(true), middleware(chatValidator.clearChat), clearChatController);
  router.post('/all-images', auth(true), middleware(chatValidator.allImages), allImageController);
  router.post('/image', handleFileUpload(upload), auth(true), middleware(chatValidator.uploadImage), uploadImageController);   // media, recodings

  
  return router;
};
