function rangeSliderMain() {
    let rangeSlider = document.getElementById("rs-range-line");
    let rangeBullet = document.getElementById("rs-bullet");


    function calculateValue(x) {
        return Math.pow(4.773 * 100000, Math.sign(x - 0.5) * Math.pow(Math.abs(x - 0.5), 2.50558));
    }


    function showSliderValue() {
        var bulletPart = (+rangeSlider.value / +rangeSlider.max);
        rangeSlider.calculatedResult = +calculateValue(bulletPart).toFixed(3);
        rangeBullet.innerHTML = "x" + rangeSlider.calculatedResult;
        rangeBullet.style.left = +rangeSlider.offsetLeft + 11 + (bulletPart * (rangeSlider.offsetWidth - 22)) + "px";
    }

    showSliderValue();
    rangeSlider.addEventListener("input", showSliderValue, false);
    window.addEventListener("DOMContentLoaded", showSliderValue, "once");
}

rangeSliderMain();
