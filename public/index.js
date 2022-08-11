// Project overlay

const projectImage = document.getElementById('project-images');

document.body.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('darken')){
    e.target.classList.remove('dim');
    e.target.nextElementSibling.style.display= 'none';
}
});

document.body.addEventListener('mouseover', function(e) {
  if(e.target.classList.contains('darken')){
    e.target.classList.add('dim');
    e.target.nextElementSibling.style.display= 'block';

    
  } 
  
  if (e.target.classList.contains('website-link')) {
    e.target.previousElementSibling.classList.add('dim');
    e.target.style.display= 'block';
  }
});

// form validation

const name = document.getElementById('name');

const email = document.getElementById('email');

const phone = document.getElementById('phone');

const message = document.getElementById('message');

const submitBtn = document.getElementById('submit-button');

const form = document.getElementById('form');


// Event listeners

name.addEventListener('blur', function() {
  checkName();
});

email.addEventListener('blur', function(e) {
  checkEmail();
});

phone.addEventListener('blur', function(e) {
  checkPhone();
});

message.addEventListener('blur', function(e) {
  checkMessage();
});

submitBtn.addEventListener('click', (e) => {
  submitBtn.classList.add('success');
  submitBtn.classList.remove('failure');
  checkName();
  checkEmail();
  checkPhone();
  checkMessage();
  // check if any form fields are invalid
  const feedback = document.querySelectorAll('.form-control');
  feedback.forEach(function (message, index) {
    if(message.classList.contains('is-valid')){
      
    } else {
      submitBtn.classList.add('failure');
      submitBtn.classList.remove('success');
    }
  })
  // Submit form if all fields valid
  if (submitBtn.classList.contains('success')){
    form.submit();
  } 
});

// Form validation

function checkName(){
  const feedback = name.nextElementSibling;
  name.classList.remove('is-invalid')
  feedback.innerHTML = '';

 
  if (name.value === '') {
    name.classList.add('is-invalid')
    feedback.classList.add('invalid-feedback');
    feedback.innerText = 'Please enter your name';
    name.parentElement.appendChild(feedback);
  } else {
    name.classList.remove('is-invalid');
    name.classList.add('is-valid');
  }
}

function checkEmail(){
  const feedback = email.nextElementSibling;
  email.classList.remove('is-invalid')
  feedback.innerHTML = '';

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    email.classList.remove('is-invalid');
    email.classList.add('is-valid');
  } else {
    email.classList.add('is-invalid')
    feedback.classList.add('invalid-feedback');
    feedback.innerText = 'Please enter a valid email';
    email.parentElement.appendChild(feedback);
  }
  };

function checkPhone(){
  const feedback = phone.nextElementSibling;
  phone.classList.remove('is-invalid')
  feedback.innerHTML = '';

  if (/^(?=.*\d)[\d ]+$/.test(phone.value) && phone.value.length >= 11) {
    phone.classList.remove('is-invalid');
    phone.classList.add('is-valid');
  } else {
    phone.classList.add('is-invalid')
    feedback.classList.add('invalid-feedback');
    feedback.innerText = 'Please enter a valid phone number';
    phone.parentElement.appendChild(feedback);
  }
};

function checkMessage(){
  const feedback = message.nextElementSibling;
  message.classList.remove('is-invalid')
  feedback.innerHTML = '';

  if (message.value === '') {
    message.classList.add('is-invalid')
    feedback.classList.add('invalid-feedback');
    feedback.innerText = 'Please enter your message';
    message.parentElement.appendChild(feedback);
  } else {
    message.classList.remove('is-invalid');
    message.classList.add('is-valid');
  }
};


