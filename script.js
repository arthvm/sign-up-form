const inputs = document.querySelectorAll("input");
const formBtn = document.querySelector(".submit-btn");

const nameRGX = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,}$/;
const emailRGX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const passRGX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

let formIsValid = false;

inputs.forEach((input) => {
  input.addEventListener("invalid", (e) => {
    e.preventDefault(); // Prevents default bubble error message
  });
});

inputs.forEach((input) => {
  input.addEventListener("focusout", (e) => {
    CheckInput(e.target);
    UpdateBtn();
  });
});

formBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (formIsValid) {
    alert("Congrats! You just signed up to the best sign up page!");
    window.location.reload();
  } else {
    ShowErrors();
  }
});

function UpdateBtn() {
  formIsValid = CheckForm();
  if (formIsValid == true) {
    formBtn.classList.add("active");
  } else {
    formBtn.classList.remove("active");
  }
}

function CheckForm() {
  return Array.from(inputs).every((input) => input.dataset.valid == "true");
}

function ShowErrors() {
  if (inputs != null) {
    const inputArr = [];
    inputs.forEach((input) => {
      if (input.dataset.valid == "false") {
        inputArr.push(input);
      }
    });
    document.getElementById(`${inputArr[0].id}`).focus();
  }
}

function CheckPassword() {
  if (
    document.getElementById("password_confirm").value ==
    document.getElementById("user_password").value
  ) {
    return true;
  } else {
    return false;
  }
}

function CheckInput(input) {
  if (input.id == "password_confirm") {
    let matches = CheckPassword();

    if (matches == true) {
      input.classList.remove("invalid");
      input.dataset.valid = true;
    } else if (matches == false) {
      input.classList.add("invalid");
      input.dataset.valid = false;
    }
  }

  switch (input.type) {
    case "text":
      if (!nameRGX.test(input.value)) {
        input.classList.add("invalid");
        input.dataset.valid = false;
      } else {
        input.classList.remove("invalid");
        input.dataset.valid = true;
      }
      break;

    case "email":
      if (!emailRGX.test(input.value)) {
        input.classList.add("invalid");
        input.dataset.valid = false;
      } else {
        input.classList.remove("invalid");
        input.dataset.valid = true;
      }
      break;

    case "password":
      if (input.id != "password_confirm") {
        if (!passRGX.test(input.value)) {
          input.classList.add("invalid");
          input.dataset.valid = false;
        } else {
          input.classList.remove("invalid");
          input.dataset.valid = true;
        }
      }
  }
}
