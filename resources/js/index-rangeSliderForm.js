function rangeSliderMain() {
    let rangeSlider = document.getElementById("rs-range-line");
    let rangeBullet = document.getElementById("rs-bullet");

    function showSliderValue() {
        rangeBullet.innerHTML = rangeSlider.value;
        var bulletPosition = (rangeSlider.value / rangeSlider.max);
        rangeBullet.style.left = +rangeSlider.offsetLeft + 11 + (bulletPosition * (rangeSlider.offsetWidth - 22)) + "px";
    }

    showSliderValue();
    rangeSlider.addEventListener("input", showSliderValue, false);
    window.addEventListener("DOMContentLoaded", showSliderValue, "once");
}

rangeSliderMain();
