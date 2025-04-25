const moment = require("moment");
const { success, failure } = require("@utils/response");
const { serverResponseMessage } = require("@constants/index");
const {
  groupCreate,
  groupFind,

  groupDelete,
  groupDetailsBasedOnId,

} = require("@services/group.services");
const { socket_constant, user_constants } = require("@constants/index");
const {
  clearChatMessages,
  findAllImagesInChat,
} = require("@services/chat.services");
const logger = require("@utils/logger.utils");
const slugify = require("slugify");
const { getAllOnlineAdmins } = require("../utils/common.utils");
const sharp = require('sharp')

/**
 * This function handles the creation of a new group chat. It checks if a group with the same members already exists
 * for one-to-one chats, validates the number of group members, creates the group, and emits a socket event with the new group data.
 * 
 * @param {Object} req - The request object containing the group name, members, and type.
 * @param {Object} res - The response object used to send back the appropriate response.
 */
exports.createGroupController = async (req, res) => {
  try {

    if (req.body.groupMembers.length > 2 && req.body.type === user_constants.ONETOONE) {
      return failure(res, 400, serverResponseMessage.ATMOST_TWO_MEMBERS_ALLOWED);
    }
    // Check if a group with the same name already exists
    if (req.body.groupMembers.length === 2 && req.body.type === user_constants.ONETOONE) {
      const groupResponse = await groupFind({
        groupMembers: { $all: req.body.groupMembers },
        type: req.body.type,
        isDeleted: false
      })
      if (groupResponse) {
        return failure(res, 400, serverResponseMessage.GROUP_ALREADY_CREATED);
      }
    }
    // If the number of groupMembers is less than 2, return failure
    if (req.body.groupMembers.length < 2) {
      return failure(
        res,
        400,
        serverResponseMessage.ATLEAST_TWO_MEMBERS_REQUIRED,
        {}
      );
    }
    // Create the new group
    const grpCreateRes = await groupCreate({ ...req.body });
    // Get user data for the added members
    const addedUsersData = await groupDetailsBasedOnId(grpCreateRes._id);
    // Update addedUsers with current timestamp
    for (const member of req.body.groupMembers) {
      grpCreateRes.addedUsers.set(member.toString(), [moment.utc(new Date())]);
    }
    await grpCreateRes.save();
    // Emit the NEW_GROUP_CREATE socket event
    addedUsersData[0].groupMembers.forEach(userId => {
      globalSocket.to(userId).emit(socket_constant.NEW_GROUP_CREATE, addedUsersData);
    });

    return success(
      res,
      200,
      serverResponseMessage.GROUP_CREATED,
      addedUsersData
    );
  } catch (error) {
    console.log(/er/, error);

    logger.error(
      `[createGroupController] [Error] while creating group => ${error}`
    );
    return failure(
      res,
      500,
      serverResponseMessage.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};

/**
 * Controller to fetch group details based on given criteria.
 * @param {Object} req - The request object containing group search criteria, userPerPage, and page.
 * @param {Object} res - The response object to send the results or errors.
 * @returns {Promise<void>} - Sends a response with group details or an error message.
 */
exports.getGroupController = async (req, res) => {
  try {
    const { userPerPage, page } = req.body;
    const whereArr = req.body._id
      ? { _id: req.body._id }
      : { groupName: req.body.groupName };
    const groupResponse = await groupFind(whereArr);

    if (groupResponse) {
      const grpGetRes = await groupDetailsBasedOnId(groupResponse._id, userPerPage, page);

      if (grpGetRes) {
        const responseObj = {
          groupDetail: grpGetRes[0],
          totalMembers: groupResponse.groupMembers.length,
          page,
          userPerPage,
        };
        return success(
          res,
          200,
          serverResponseMessage.GROUP_FETCH,
          responseObj
        );
      } else {
        return failure(
          res,
          204,
          serverResponseMessage.FAILURE_DATA_GET,
          "Error fetching group details"
        );
      }
    } else {
      return success(
        res,
        204,
        serverResponseMessage.GROUP_DOES_NOT_EXIST,
        groupResponse
      );
    }
  } catch (error) {
    console.log(/er/, error);

    logger.error(
      `[getGroupController] [Error] while fetching group => ${error}`
    );
    return failure(
      res,
      500,
      serverResponseMessage.INTERNAL_SERVER_ERROR,
      error.message
    );
  }
};


/**
 * This function handles the deletion of a group chat. It checks if the group exists,
 * deletes the group, deletes any associated images, clears chat messages, and emits a socket event with the deleted group information.
 * 
 * @param {Object} req - The request object containing the group ID.
 * @param {Object} res - The response object used to send back the appropriate response.
 */
exports.deleteGroupController = async (req, res) => {
  try {
    const groupResponse = await groupFind({ _id: req.body._id });
    if (groupResponse) {
      // Delete the group
      const grpDeleteRes = await groupDelete(groupResponse);
      // Find all images in the chat
      const findImagesChat = await findAllImagesInChat(grpDeleteRes.groupName);
      if (findImagesChat.length) {
        // Delete multiple images
        // await aws.deleteMultipleImages(findImagesChat[0].imagesKeys);
      }
      // Clear chat messages
      await clearChatMessages(grpDeleteRes.groupName);
      global.globalSocket.to(groupResponse?.groupMembers).emit(socket_constant.DELETE_GROUP, grpDeleteRes);
      if (grpDeleteRes) {
        return success(
          res,
          200,
          serverResponseMessage.GROUP_DELETE,
          grpDeleteRes
        );
      } else {
        return failure(
          res,
          204,
          serverResponseMessage.FAILURE_DATA_CREATE,
          err
        );
      }
    } else {
      return failure(res, 400, serverResponseMessage.GROUP_DOES_NOT_EXIST);
    }
  } catch (error) {
    logger.error(
      `[deleteGroupController] [Error] while deleting group=> ${error}`
    );
    return failure(res, 204, serverResponseMessage.ERROR, error.message);
  }
};



