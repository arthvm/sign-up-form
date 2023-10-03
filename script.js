const inputs = document.querySelectorAll("input");
const nameRGX = /^(\w\w+)\s(\w+)$/;
const emailRGX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const passRGX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
inputs.forEach((input) => {
  input.addEventListener("invalid", (e) => {
    e.preventDefault(); // Prevents default bubble error message
  });
});

inputs.forEach((input) => {
  input.addEventListener("focusout", (e) => {
    CheckValidation(e.target);
  });
});

function CheckValidation(input) {
  if (input.id == "password_confirm") {
    if (input.value != document.getElementById("user_password").value) {
      input.classList.add("invalid");
      console.log(input.value);
    } else {
      input.classList.add("invalid");
    }
  }

  switch (input.type) {
    case "text":
      if (!nameRGX.test(input.value)) {
        input.classList.add("invalid");
      } else {
        input.classList.remove("invalid");
      }
      break;

    case "email":
      if (!emailRGX.test(input.value)) {
        input.classList.add("invalid");
      } else {
        input.classList.remove("invalid");
      }
      break;

    case "password":
      if (!passRGX.test(input.value)) {
        input.classList.add("invalid");
      } else {
        input.classList.remove("invalid");
      }
  }
}
