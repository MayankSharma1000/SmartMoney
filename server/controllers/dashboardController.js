const {
  buildDashboard: buildDashboardService
} = require("../services/dashboardService");

const ApiResponse = require("../utils/apiResponse");

const buildDashboard = async (req, res) => {

  try {

    const summary = await buildDashboardService(req.user._id);

    return ApiResponse.success(

      res,

      summary,

      "Dashboard loaded successfully"

    );

  } catch (error) {

    console.error("Dashboard Summary Error:", error);

    return res.status(500).json({

      success: false,

      message: "Dashboard could not be loaded"

    });

  }

};

module.exports = {

  buildDashboard

};
