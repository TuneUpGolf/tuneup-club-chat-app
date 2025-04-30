const express = require("express");
const router = express.Router();
const middleware = require('@middleware/validation');
const auth = require('@middleware/auth');
const { groupValidator } = require('@validations/index');
const {
  createGroupController,
  deleteGroupController,
  getGroupController,
} = require('@controller/group.controller');


module.exports = () => {

  router.post('/create', auth(true), middleware(groupValidator.createGroup), createGroupController);
  router.post('/get', auth(true), middleware(groupValidator.getGroup), getGroupController);
  router.post('/delete', auth(true), middleware(groupValidator.deleteGroup), deleteGroupController); // delete entire chat

  return router;
};
