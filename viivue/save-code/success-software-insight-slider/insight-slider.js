/**
 * Insight Slider
 */

function preventClickAfterDrag(el, threshold = 6) {
  let startX = 0;
  let startY = 0;
  let dragged = false;

  el.addEventListener("pointerdown", (e) => {
    dragged = false;
    startX = e.clientX;
    startY = e.clientY;
  });

  el.addEventListener("pointermove", (e) => {
    if (
      Math.abs(e.clientX - startX) > threshold ||
      Math.abs(e.clientY - startY) > threshold
    ) {
      dragged = true;
    }
  });

  el.addEventListener(
    "click",
    (e) => {
      if (dragged) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    },
    true,
  ); // capture phase
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".ifs-insight-slider").forEach((wrapper) => {
    const sliderEl = wrapper.querySelector(".ifs-insight-slider__items");
    const FlickitySlider = Flickity.data(sliderEl);
    const elements = FlickitySlider.cells?.map((cell) => cell.element);
    if (!elements || elements.length === 0) return;
    EV.keepSameHeight({
      target: elements,
      onUpdate: () => {
        setTimeout(() => {
          FlickitySlider.reloadCells();
          FlickitySlider.resize();
        }, 300);
      },
    });
    setTimeout(() => {
      FlickitySlider.reloadCells();
      FlickitySlider.resize();
    }, 300);
    for (let element of elements) {
      if (
        !element
          .querySelector(".ifs-insight-item__inner")
          ?.classList.contains("eal-trigger-assigned")
      )
        continue;
      preventClickAfterDrag(element);
    }
  });
});
