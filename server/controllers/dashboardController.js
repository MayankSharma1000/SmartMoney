const {
  buildDashboard: buildDashboardService
} = require("../services/dashboardService");

const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");

const buildDashboard = asyncHandler(async (req, res) => {
    const summary = await buildDashboardService(req.user._id);

    return ApiResponse.success(
      res,
      summary,
      "Dashboard loaded successfully"
    );
});

module.exports = {
  buildDashboard
};
