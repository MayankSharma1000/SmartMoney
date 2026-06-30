const { getAdminDashboard } = require("../services/adminService");

const ApiResponse = require("../utils/apiResponse");

const getDashboard = async (req, res) => {

  try {

    const dashboard = await getAdminDashboard();

    return ApiResponse.success(

      res,

      dashboard,

      "Admin dashboard loaded successfully"

    );

  } catch (error) {

    console.error(error);

    return ApiResponse.error(

      res,

      "Failed to load admin dashboard",

      500

    );

  }

};

module.exports = {

  getDashboard

};