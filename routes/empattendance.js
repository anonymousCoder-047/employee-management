
const mongoose = require('mongoose')
const express = require('express')
const empSchema = require('../model/Empschema')
const app = express.Router()

mongoose.connect('mongodb://localhost/employee', 
{
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true 
}).then(() => { console.log('connected') })

const Employee = mongoose.model('employee_details', empSchema)

app.get('/', (req, res) => {
    Employee.find().then( data => {
        res.render('empattendance', {'emp' : data})
    })
})

app.post('/', (req, res) => {

    Employee.updateOne({ emp_name:req.body.name }, {
        $set: {
            emp_salary: req.body.salary,
            emp_incentive: req.body.incentive,
            emp_gr_amt: req.body.gr_amt,
            emp_tax_amt: req.body.tax_amt,
            emp_absent: req.body.leaves,
            emp_gr_value: req.body.gr_value,
            emp_advance: req.body.advance,
            emp_gr_total: req.body.gr_total
        }
    }).then(Employee.find().then( data => {
        res.render('empattendance', {'emp' : data})
    }))
})

module.exports = app