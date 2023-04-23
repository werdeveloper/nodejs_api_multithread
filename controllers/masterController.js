const { Op, Sequelize } = require("sequelize");
const religionMaster = require("../models/religionMasterModel");
const userMaster = require("../models/userModel");

// get api for religion master
exports.getReligionMaster = async (req, res) => {
  try {
    let isReligionExists = await religionMaster.findAll({
      order: [["id", "ASC"]],
      attributes: ["id", "name"],
    });
    return res.json({
      status: true,
      msg: "Success",
      data: isReligionExists,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
      error: true,
    });
  }
};
