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

form.addEventListener("change", (e) => {
  const bill = Number.parseFloat(form.bill.value);

  let tip;
  if (e.target.type === "radio") {
    form.custom.value = "";
    tip = Number.parseFloat(form.tip.value);
  } else if (e.target.type === "number") {
    radioButtons.forEach((radioButton) => (radioButton.checked = false));
    tip = Number.parseFloat(form.custom.value);
  }

  const tipRate = getTipRate(tip);
  console.log(tipRate);

  const people = Number.parseInt(form.people.value);
  const totalPerPerson = getTotalPerPerson(bill, people, tipRate);

  total.textContent = totalPerPerson;
  tipAmount.textContent = getTipAmountPerPerson(totalPerPerson, bill, people);
});
// Error message to show: <p class="calculator__form-error-message">Can't be zero</p>
