class Registered{
    constructor(firstName, lastName, birthday, gender, email, phone, subject) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.gender = gender;
        this.email = email;
        this.phone = phone;
        this.subject = subject;
    }

    get info() {
        return "First Name: " + this.firstName + "\nLast Name: " + this.lastName + "\nBirthday: " + this.birthday + "\nGender: " + this.gender + "\nEmail: " + this.email + "\nPhone: " + this.phone + "\nSubject: " + this.subject;
    }
};

var form = document.getElementsByTagName('#registerForm');

var firstName = document.querySelector('#firstName');
var lastName = document.querySelector('#lastName');
var birthday = document.querySelector('#birthday');
var gender = document.querySelectorAll('#gender');
var email = document.querySelector('#email');
var phone = document.querySelector('#phone');
var subject = document.querySelector('#subject');
var submit = document.querySelector('#submit');

var inputs = document.querySelectorAll('input');

submit.addEventListener('click', function (e) {
    var x = validate_on_submit();
    var gender_name = "Male";
    if (gender[1].checked) {
        gender_name = "Female";
    }
    var user = new Registered(firstName.value, lastName.value, birthday.value, gender_name, email.value, phone.value, subject.value);
    if (x == false) {
        alert('Please full the form proparly!');
        e.preventDefault();
        return false;
    }
    alert("User Registered Succesfully!\n" + user.info);
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
        feedback = subject.parentNode.lastElementChild;
        if (subject.value == "-1") {
            feedback.innerHTML = "This field can't be empty!";
            check = false;
        } else {
            feedback.innerHTML = "";
        }
    }
    var email_valid = email_check();
    if (check == true) {
        check = email_valid;
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