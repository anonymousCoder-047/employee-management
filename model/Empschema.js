
const mongoose = require('mongoose')
module.exports = new mongoose.Schema({
    emp_acct: Number,
    emp_name: String,
    emp_id: String,
    emp_gender: String,
    emp_join_date: Date,
    emp_phone: Number,
    emp_address: String,
    emp_counter: String,
    emp_job_role: String,
    emp_salary: Number,
    emp_pay_method: String,
    emp_picture: {
        pic_name: String,
        pic_path: String
    },
    emp_incentive: Number,
    emp_gr_amt: Number,
    emp_tax_amt: Number,
    emp_absent: Number,
    emp_gr_value: Number,
    emp_advance: Number,
    emp_gr_total: Number
});