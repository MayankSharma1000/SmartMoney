const { getAdminDashboard } = require("../services/adminService");

const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const getDashboard = asyncHandler(async (req, res) => {
    const dashboard = await getAdminDashboard();

    return ApiResponse.success(
      res,
      dashboard,
      "Admin dashboard loaded successfully"
    );

  });

module.exports = {
  getDashboard
};
