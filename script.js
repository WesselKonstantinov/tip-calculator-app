const getTotalPerPerson = (bill, people, tipRate) => {
  const totalPerPerson = (bill / people) * tipRate;
  return totalPerPerson.toFixed(2);
};

const getTipAmountPerPerson = (total, bill, people) => {
  const tipAmountPerPerson = total - bill / people;
  return tipAmountPerPerson.toFixed(2);
};

const getTipRate = (percentage) => percentage / 100 + 1;

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
    radioButtons.forEach((radioButton) => (radioButton.checked = false));
  } else if (e.target.name === "tip") {
    form.custom.value = "";
  }

  const bill = Number.parseFloat(form.bill.value);

  const tip =
    Number.parseFloat(form.custom.value) || Number.parseInt(form.tip.value);

  const tipRate = getTipRate(tip);
  console.log(tipRate);

  const people = Number.parseInt(form.people.value);
  const totalPerPerson = getTotalPerPerson(bill, people, tipRate);

  if (bill && tipRate && people) {
    total.textContent = totalPerPerson;
    tipAmount.textContent = getTipAmountPerPerson(totalPerPerson, bill, people);
  }
});

const resetCalculator = () => {
  Array.from(form.elements)
    .filter((element) => (element.tagName = "INPUT"))
    .forEach((input) => {
      if (input.type === "radio") {
        input.checked = false;
      } else if (input.type === "number") {
        input.value = "";
      }
    });

  total.textContent = "0.00";
  tipAmount.textContent = "0.00";
  resetButton.disabled = true;
};

resetButton.addEventListener("click", resetCalculator);
// Error message to show: <p class="calculator__form-error-message">Can't be zero</p>
