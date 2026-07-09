const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");

const {
  generateFinancialAdvice
} = require("../services/aiService");

const generateAdvice = asyncHandler(async (req, res) => {

  const advice = await generateFinancialAdvice(
    req.user._id
  );

  return ApiResponse.success(
    res,
    advice,
    "Financial advice generated successfully"
  );

});

module.exports = {
  generateFinancialAdvice: generateAdvice
};
