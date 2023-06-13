let emailInput = document.getElementById('email');
let emailInputHelperText = document.getElementById('emailHelp');

let linkInput = document.getElementById('link');
let linkInputHelperText = document.getElementById('linkHelp');

let loginForm = document.getElementById('form');

let formButton = document.getElementById('formButton');
formButton.disabled = true;

let spinner = document.getElementById('spin');

let emailHasError = true;
let linkHasError = true;
let formHasError = true;

const emailRegEx = /^.+@.+\.[a-z]{2,}$/i;
const linkRegEx = /^https:\/\/([a-z]|-|[0-9]){2,20}\.([a-z]|-|[0-9]){2,15}\.([a-z]|-|[0-9]){2,28}$/i;

function setInputHasError(inpId, helpTextId, text) {
  inpId.classList.add('border-danger');
  inpId.classList.add('text-danger');

  helpTextId.classList.add('text-danger');
  helpTextId.classList.remove('toggleHide');

  helpTextId.innerText = text;
}

function setInputCorrect(inpId, helpTextId, text) {
  inpId.classList.remove('border-danger');
  inpId.classList.remove('text-danger');

  helpTextId.classList.remove('text-danger');
  helpTextId.classList.add('toggleHide');

  helpTextId.innerText = text;
}

function checkForm() {
  if (!emailHasError && !linkHasError) {
    formHasError = false;
  } else {
    formHasError = true;
  }
  if (!formHasError) {
    formButton.disabled = false;
  } else {
    formButton.disabled = true;
  }
}

function testEmail(value) {
  if (!emailRegEx.test(value)) {
    setInputHasError(
      emailInput,
      emailInputHelperText,
      'Looks like it’s not an email. Check it.'
    );
    emailHasError = true;
  } else {
    emailHasError = false;
    setInputCorrect(emailInput, emailInputHelperText, 'hidden text');
  }
}

function testLink(value) {
  if (!linkRegEx.test(value)) {
    setInputHasError(
      linkInput,
      linkInputHelperText,
      'What about security bro?'
    );
    linkHasError = true;
  } else {
    linkHasError = false;
    setInputCorrect(linkInput, linkInputHelperText, 'hidden text');
  }
}

emailInput.addEventListener('input', (e) => {
  testEmail(e.target.value);
});

emailInput.addEventListener('blur', () => {
  checkForm();
});

linkInput.addEventListener('input', (e) => {
  testLink(e.target.value);
});

linkInput.addEventListener('blur', () => {
  checkForm();
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  let arrayOfInputs = document.getElementsByTagName('input');
  let [emailInp, linkInp] = arrayOfInputs;

  const formData = {
    email: emailInp.value,
    link: linkInp.value,
  };

  try {
    formButton.classList.add('hide');
    spinner.classList.remove('hide');

    const responce = await fetch(`${linkInp.value}`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const dataFromServerResponce = await responce.json();
    console.log(dataFromServerResponce);

    spinner.classList.add('hide');
    formButton.classList.remove('hide');

    window.location.href = 'https://payproglobal.com/';
  } catch (e) {
    console.log(`The error is ${e}. Lets handle it`);
    window.location.href = 'https://payproglobal.com/';
    spinner.classList.add('hide');
    formButton.classList.remove('hide');
  }
});
