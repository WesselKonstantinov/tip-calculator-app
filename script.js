const getTotalPerPerson = (bill, people, tipRate) => {
  const totalPerPerson = (bill / people) * tipRate;
  return totalPerPerson.toFixed(2);
};

const getTipAmountPerPerson = (total, bill, people) => {
  const tipAmountPerPerson = total - bill / people;
  return tipAmountPerPerson.toFixed(2);
};

const getTipRate = (percentage) => percentage / 100 + 1;

const setInputStatus = (field, errorMessage = "") => {
  const formError = field.parentElement.querySelector(".js-error");

  if (errorMessage) {
    formError.innerHTML = `<p class="calculator__form-error-message">${errorMessage}</p>`;
    field.classList.add("calculator__form-input--error");
    field.setAttribute("aria-invalid", "true");
  } else {
    formError.innerHTML = "";
    field.classList.remove("calculator__form-input--error");
    field.setAttribute("aria-invalid", "false");
  }
};

const validateInput = (field) => {
  const isZeroOrLess = field.value <= 0;
  if (isZeroOrLess) {
    setInputStatus(field, "Can't be zero");
  } else {
    setInputStatus(field);
  }
};

const form = document.querySelector(".js-form");
const radioButtons = document.querySelectorAll(".js-radio");
const tipAmount = document.querySelector(".js-tip-amount");
const total = document.querySelector(".js-total");
const resetButton = document.querySelector(".js-reset-button");

form.addEventListener("change", (e) => {
  if (resetButton.disabled) {
    resetButton.disabled = false;
  }

  if (e.target.name === "custom") {
    const sameValue = Array.from(radioButtons).find(
      (radioButton) => radioButton.value === e.target.value
    );
    if (sameValue) {
      form.custom.value = "";
      sameValue.checked = true;
      sameValue.focus();
    } else {
      radioButtons.forEach((radioButton) => {
        radioButton.checked = false;
      });
    }
  } else if (e.target.name === "tip") {
    form.custom.value = "";
  }

  if (e.target.name === "people") {
    validateInput(e.target);
  }

  const bill = Number.parseFloat(form.bill.value);

  const tip =
    Number.parseFloat(form.custom.value) || Number.parseInt(form.tip.value);
  const tipRate = getTipRate(tip);
  const people = Number.parseInt(form.people.value);
  const totalPerPerson = getTotalPerPerson(bill, people, tipRate);

  if (bill && tipRate && people) {
    total.textContent = totalPerPerson;
    tipAmount.textContent = getTipAmountPerPerson(totalPerPerson, bill, people);
  }
});

resetButton.addEventListener("click", () => {
  Array.from(form.elements)
    .filter((element) => element.tagName === "INPUT")
    .forEach((input) => {
      if (input.type === "radio") {
        input.checked = false;
      } else if (input.type === "number") {
        input.value = "";
        if (input.name === "people") {
          setInputStatus(input);
        }
      }
    });

  total.textContent = "0.00";
  tipAmount.textContent = "0.00";
  resetButton.disabled = true;
});
