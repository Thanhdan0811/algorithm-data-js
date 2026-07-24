/**
 * Content Slider
 */
document.addEventListener("DOMContentLoaded", function(){
    if(window.innerWidth > 768){
        EV.keepSameHeight(document.querySelectorAll(".vii-content-slider .vii-content-slider__item"));
    }

    const carousels = document.querySelectorAll('.vii-content-slider') || [];

    carousels.forEach((el) => {
        function setStyleItem(){
            const items = el.querySelectorAll('.vii-content-slider__item');
            let prevItemH = 0;
            let itemTop = 20;
            items.forEach((it, index) => {
                it.style.setProperty('--item-i', index);
                it.style.setProperty('--item-top', String(itemTop));
                prevItemH = it.querySelector('.vii-content-slider-header-img ')?.clientHeight || 0;
                itemTop += (prevItemH + 25);
            });
        }

        // window resize
        setStyleItem();
        window.onresize = function(){
            setStyleItem();
        }

        ScrollSnooper.create({
            trigger: el,
            start: "top 50%",
            end: "bottom bottom",
            onScroll: e => {
                let progress = Math.max(0, Math.min(1, e.progress));
                console.log(e.progress, progress);
                el.style.setProperty('--vii-slide-progress', Number(progress).toFixed(2));
            }
        });
    });
});
