const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');



// Show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText= message;
}

function showSuccess(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    
}

//check email is valid
function checkEmail(input){
    const rEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(rEx.test(input.value.trim())){
        showSuccess(input);
    }
    else{
        showError(input, 'Email is not valid')
    }
}

//check required fields.
function checkRequired(inputArray)
{
    inputArray.forEach(function(input){
        if(input.value.trim() ==  ''){
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input);
        }
    });
}

//check length
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min}`)
    }
    else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max}`)
    }
    else{
        showSuccess(input);
    }
}

// Get fieldname
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//check passwords match
function checkPaswordsMatch(input1, input2){
    if(input1.value != input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

// Event Listeners
form.addEventListener('submit', function(e){
    e.preventDefault();//prevent it from submitting a form

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email)
    checkPaswordsMatch(password, password2);

});