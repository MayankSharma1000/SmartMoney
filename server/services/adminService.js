const User = require("../models/User");
const Expense = require("../models/Expense");
const Savings = require("../models/Savings");
const Investment = require("../models/Investment");

async function getAdminDashboard() {

    const [

        totalUsers,

        totalExpenses,

        totalSavings,

        totalInvestments

    ] = await Promise.all([

        User.countDocuments(),

        Expense.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ]),

        Savings.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$currentAmount"
                    }
                }
            }
        ]),

        Investment.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$currentValue"
                    }
                }
            }
        ])

    ]);

    return {

        totalUsers,

        totalExpenses:
            totalExpenses[0]?.total || 0,

        totalSavings:
            totalSavings[0]?.total || 0,

        totalInvestments:
            totalInvestments[0]?.total || 0

    };

}

module.exports = {

    getAdminDashboard

};