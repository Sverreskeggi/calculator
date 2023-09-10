'use strict';

const dataObject = [
  {
    'register': '27 чел.',
    'come': '18 чел.',
    'order' : '12 чел.',
    'pay' : '6 чел.',
    'amount' : '20000 р.'
  },
  {
    'register': '12 чел.',
    'come': '32 чел.',
    'order' : '55 чел.',
    'pay' : '43 чел.',
    'amount' : '32000 р.'
  },
  {
    'register': '11 чел.',
    'come': '23 чел.',
    'order' : '11 чел.',
    'pay' : '3 чел.',
    'amount' : '11223 р.'
  },
  {
    'register': '23 чел.',
    'come': '27 чел.',
    'order' : '42 чел.',
    'pay' : '34 чел.',
    'amount' : '44221 р.'
  },
  {
    'register': '1 чел.',
    'come': '18 чел.',
    'order' : '12 чел.',
    'pay' : '6 чел.',
    'amount' : '12999 р.'
  },
  {
    'register': '3 чел.',
    'come': '18 чел.',
    'order' : '12 чел.',
    'pay' : '6 чел.',
    'amount' : '29932 р.'
  },
  {
    'register': '14 чел.',
    'come': '18 чел.',
    'order' : '12 чел.',
    'pay' : '6 чел.',
    'amount' : '59999 р.'
  },
  {
    'register': '123 чел.',
    'come': '18 чел.',
    'order' : '12 чел.',
    'pay' : '6 чел.',
    'amount' : '202210 р.'
  },
  {
    'register': '22 чел.',
    'come': '18 чел.',
    'order' : '12 чел.',
    'pay' : '6 чел.',
    'amount' : '11222 р.'
  },
];

const selectData = document.querySelectorAll('.calculator__select-item');
const registerUser = selectData[0];
const comeUser = selectData[1];
const orderUser = selectData[2];
const payUser = selectData[3];

const form = document.querySelector('.calculator__form-body');
const formPeople = form.querySelectorAll('.calculator__form-text')[0];
const formAmount = form.querySelectorAll('.calculator__form-text')[1];

const sortedData = dataObject.sort((a, b) => (+a.register.split(' ')[0]) - (+b.register.split(' ')[0]));

const stepValue = [];

sortedData.forEach(item => {
  stepValue.push(item.register.split(' ')[0]);
})

const labelMinText = Math.min(...stepValue);
const labelMaxText = Math.max(...stepValue);

function init() {
  const sliders = document.getElementsByClassName("tick-slider-input");

  let step = dataObject.length;

  for (let slider of sliders) {

    slider.value = slider.min;
    slider.min = 0;
    slider.max = dataObject.length - 1;
    slider.step = 1;

    slider.addEventListener('input', onSliderInput);

    updateValue(slider);
    updateValuePosition(slider);
    updateLabels(slider);
    updateProgress(slider);
  }
}

function onSliderInput(event) {
  updateValue(event.target);
  updateValuePosition(event.target);
  updateLabels(event.target);
  updateProgress(event.target);

  registerUser.querySelector('.calculator__select-value').textContent = sortedData[event.target.value].register;
  comeUser.querySelector('.calculator__select-value').textContent = sortedData[event.target.value].come;;
  orderUser.querySelector('.calculator__select-value').textContent = sortedData[event.target.value].order;;
  payUser.querySelector('.calculator__select-value').textContent = sortedData[event.target.value].pay;

  formPeople.textContent = sortedData[event.target.value].register;
  formAmount.textContent = sortedData[event.target.value].amount;

}

function updateValue(slider) {
  let value = document.getElementById(slider.dataset.valueId);
  value.innerHTML = "<div>" + stepValue[slider.value] + "</div>";
}

function updateValuePosition(slider) {
  let value = document.getElementById(slider.dataset.valueId);

  const percent = getSliderPercent(slider);

  const sliderWidth = slider.getBoundingClientRect().width;
  const valueWidth = value.getBoundingClientRect().width;
  const handleSize = slider.dataset.handleSize;

  let left = percent * (sliderWidth - handleSize) + handleSize / 2 - valueWidth / 2;

  left = Math.min(left, sliderWidth - valueWidth);
  left = slider.value === slider.min ? 0 : left;

  value.style.left = left + "px";
}

function updateLabels(slider) {
  const value = document.getElementById(slider.dataset.valueId);
  const minLabel = document.getElementById(slider.dataset.minLabelId);
  const maxLabel = document.getElementById(slider.dataset.maxLabelId);

  // assign value to slider labels
  minLabel.textContent = labelMinText;
  maxLabel.textContent = labelMaxText;

  const valueRect = value.getBoundingClientRect();
  const minLabelRect = minLabel.getBoundingClientRect();
  const maxLabelRect = maxLabel.getBoundingClientRect();

  const minLabelDelta = valueRect.left - (minLabelRect.left);
  const maxLabelDelta = maxLabelRect.left - valueRect.left;

  const deltaThreshold = 32;

  if (minLabelDelta < deltaThreshold) minLabel.classList.add("hidden");
  else minLabel.classList.remove("hidden");

  if (maxLabelDelta < deltaThreshold) maxLabel.classList.add("hidden");
  else maxLabel.classList.remove("hidden");
}

function updateProgress(slider) {
  let progress = document.getElementById(slider.dataset.progressId);
  const percent = getSliderPercent(slider);

  progress.style.width = percent * 100 + "%";
}

function getSliderPercent(slider) {
  const range = slider.max - slider.min;
  const absValue = slider.value - slider.min;

  return absValue / range;
}

function onResize() {
  const sliders = document.getElementsByClassName("tick-slider-input");

  for (let slider of sliders) {
      updateValuePosition(slider);
  }
}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener("resize", onResize);