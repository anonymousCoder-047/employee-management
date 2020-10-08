
const express = require('express')
const bodyParser = require('body-parser')
const multer  = require('multer')
const mongoose = require('mongoose')
const path = require('path')
const app = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.basename(__dirname + '/public/uploads/'))
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ 
    dest: '/uploads', 
    storage: storage, 
    fileFilter: fileFilter 
});

mongoose.connect('mongodb://localhost/employee', 
{
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true 
}).then(() => { console.log('connected') })

const empSchema = require('../model/Empschema')
const Employee = mongoose.model('employee_details', empSchema)

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.basename(__dirname, '../public/uploads')));
app.get('/', (req, res) => {
    res.render('empform')
})

app.post('/', upload.single('emp_picture'), (req, res) => {
    let emp_method = '';

    if( req.body.emp_cash === 'on') {
        emp_method = 'CASH';
    } else if( req.body.emp_pf === 'on' ) {
        emp_method = 'PF';
    }
    const emp = new Employee({
        emp_acct: req.body.emp_acct,
        emp_name: req.body.emp_name,
        emp_id: req.body.emp_id,
        emp_gender: req.body.emp_gender,
        emp_join_date: req.body.emp_join_date,
        emp_phone: req.body.emp_phone,
        emp_address: req.body.emp_address,
        emp_counter: req.body.emp_counter,
        emp_job_role: req.body.emp_job_role,
        emp_salary: req.body.emp_salary,
        emp_pay_method: emp_method,
        emp_picture: {
            pic_name: req.file.originalname,
            pic_path: req.file.path
        }
    })

    emp.save().then( res.render('index') )
})

module.exports = app