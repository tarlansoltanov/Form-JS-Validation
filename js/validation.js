class Registered{
    constructor(firstName, lastName, birthday, gender, email, phone, password) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.gender = gender;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

    get info() {
        return "First Name: " + this.firstName + "\nLast Name: " + this.lastName + "\nBirthday: " + this.birthday + "\nGender: " + this.gender + "\nEmail: " + this.email + "\nPhone: " + this.phone + "\nSubject: " + this.subject;
    }

    save(){
        localStorage.setItem('firstName', this.firstName);
        localStorage.setItem('lastName', this.lastName);
        localStorage.setItem('birthday', this.birthday);
        localStorage.setItem('gender', this.gender);
        localStorage.setItem('email', this.email);
        localStorage.setItem('phone', this.phone);
        localStorage.setItem('password', this.password);
    }
};

var form = document.getElementsByTagName('#registerForm');

var firstName = document.querySelector('#firstName');
var lastName = document.querySelector('#lastName');
var birthday = document.querySelector('#birthday');
var gender = document.querySelectorAll('#gender');
var email = document.querySelector('#email');
var phone = document.querySelector('#phone');
var password = document.querySelector('#password');
var password_confirmation = document.querySelector('#passwordConf');
var submit = document.querySelector('#submit');

var inputs = document.querySelectorAll('input');

submit.addEventListener('click', function (e) {
    var x = validate_on_submit();
    if (x == false) {
        alert('Please full the form proparly!');
        e.preventDefault();
        return false;
    }
    var gender_name = "Male";
    if (gender[1].checked) {
        gender_name = "Female";
    }
    var user = new Registered(firstName.value, lastName.value, birthday.value, gender_name, email.value, phone.value, subject.value);
    alert("User Registered Succesfully!\n" + user.info);
    user.save();
});

function validate_on_submit() {
    var check = true;
    for (var i = 0; i < inputs.length; i++) {
        var feedback = inputs[i].parentNode.lastElementChild;
        if (inputs[i].value == "") {
            feedback.innerHTML = "This field can't be empty!";
            check = false;
        } else {
            if (inputs[i].type != "radio") {
                feedback.innerHTML = "";
            }
        }
    }
    var email_valid = email_check();
    if (check == true) {
        check = email_valid;
    }
    var password_valid = password_check();
    if (check == true) {
        check = password_valid;
    }
    return check;
}

function email_check() {
    var email_reg = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$');
    if (!email_reg.test(email.value)) {
        var feedback = email.parentNode.lastElementChild;
        if (feedback.innerHTML.length == 0) {
            feedback.innerHTML = "Email is not valid";
        }
        return false;
    }
    return true;
}

function password_check(){
    if (password.value.length<8) {
        var feedback = password.parentNode.lastElementChild;
        if (feedback.innerHTML.length == 0) {
            feedback.innerHTML = "Password must contain at least 8 character!";
        }
        password_reset()
        return false;
    }
    var lower = new RegExp("^(?=.*[a-z])");
    if (!lower.test(password.value)) {
        var feedback = password.parentNode.lastElementChild;
        if (feedback.innerHTML.length == 0) {
            feedback.innerHTML = "Password must contain at least 1 lowercase alphabetical character";
        }
        password_reset()
        return false;
    }
    var upper = new RegExp("^(?=.*[A-Z])");
    if (!upper.test(password.value)) {
        var feedback = password.parentNode.lastElementChild;
        if (feedback.innerHTML.length == 0) {
            feedback.innerHTML = "Password must contain at least 1 uppercase alphabetical character";
        }
        password_reset()
        return false;
    }
    var num = new RegExp("^(?=.*[0-9])");
    if (!num.test(password.value)) {
        var feedback = password.parentNode.lastElementChild;
        if (feedback.innerHTML.length == 0) {
            feedback.innerHTML = "Password must contain at least 1 numeric character";
        }
        password_reset()
        return false;
    }
    var spec = new RegExp("^(?=.*[!@#$%^&*])");
    if (!spec.test(password.value)) {
        var feedback = password.parentNode.lastElementChild;
        if (feedback.innerHTML.length == 0) {
            feedback.innerHTML = "Password must contain at least one special character! (!@#$%^&*)";
        }
        password_reset()
        return false;
    }
    if(password.value!=password_confirmation.value){
        var feedback = password_confirmation.parentNode.lastElementChild;
        if (feedback.innerHTML.length == 0) {
            feedback.innerHTML = "This field must be same with the password field!";
        }
        password_reset()
        return false;
    }
    return true;
}

function password_reset(){
    password.value = "";
    password_confirmation.value = "";
}