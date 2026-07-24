keepSameHeight(elements, breakpoint) {
    let prevWidth;
    let currentMaxHeight = "";
    
    // Default options
    let options = {
        target: "",
        breakpoint: undefined,
        onUpdate: (e) => {},
        onResize: (e) => {},
    };

    // Helper: set height cho tất cả elements
    const setHeight = (els, height) => {
        els.forEach((el) => {
            el.style.height = height ? `${height}px` : "";
        });
    };

    // Parse arguments
    let targets;
    if (this.isjQueryElement(elements)) {
        // Truyền thẳng jQuery element
        targets = elements;
    } else if (typeof elements === "object") {
        // Truyền options object
        options = { ...options, ...elements };
        targets = options.target;
        breakpoint = options.breakpoint;
    }

    // Normalize targets về array
    targets = this.isjQueryElement(targets) ? Array.from(targets) : targets;

    // Chỉ chạy nếu có nhiều hơn 1 element
    if (!targets.length || targets.length === 1) return;

    // Loop bằng rAF — chạy mỗi frame
    requestAnimationFrame(function loop() {
        requestAnimationFrame(loop); // lặp vô tận

        const currentWidth = window.innerWidth;

        // Bỏ qua nếu width không đổi
        if (prevWidth === currentWidth) return;
        prevWidth = currentWidth;

        let maxHeight = 0;

        // Callback onResize mỗi khi width thay đổi
        if (typeof options.onResize === "function") {
            options.onResize({ maxHeight: currentMaxHeight, width: currentWidth });
        }

        if (breakpoint !== undefined && currentWidth <= breakpoint) {
            // Dưới breakpoint → xóa height (responsive, không equalize)
            maxHeight = "";
        } else {
            // Reset height trước để đo chính xác
            setHeight(targets, "");

            // Tìm height lớn nhất
            targets.forEach((el) => {
                maxHeight = Math.max(maxHeight, el.offsetHeight);
            });
        }

        // Chỉ update nếu maxHeight thực sự thay đổi
        if (maxHeight !== currentMaxHeight) {
            currentMaxHeight = maxHeight;

            if (typeof options.onUpdate === "function") {
                options.onUpdate({ maxHeight: currentMaxHeight, width: currentWidth });
            }
        }

        // Apply height đồng đều cho tất cả
        setHeight(targets, currentMaxHeight);
    });
}

/*
(elements, breakpoint) {
    let currentMaxHeight = "";

    let options = {
        target: "",
        breakpoint: undefined,
        onUpdate: (e) => {},
        onResize: (e) => {},
    };

    const setHeight = (els, height) => {
        els.forEach((el) => {
            el.style.height = height ? `${height}px` : "";
        });
    };

    let targets;
    if (this.isjQueryElement(elements)) {
        targets = elements;
    } else if (typeof elements === "object") {
        options = { ...options, ...elements };
        targets = options.target;
        breakpoint = options.breakpoint;
    }

    targets = this.isjQueryElement(targets) ? Array.from(targets) : targets;

    if (!targets.length || targets.length === 1) return;

    const update = () => {
        const currentWidth = window.innerWidth;
        let maxHeight = 0;

        if (typeof options.onResize === "function") {
            options.onResize({ maxHeight: currentMaxHeight, width: currentWidth });
        }

        if (breakpoint !== undefined && currentWidth <= breakpoint) {
            maxHeight = "";
        } else {
            setHeight(targets, "");
            targets.forEach((el) => {
                maxHeight = Math.max(maxHeight, el.offsetHeight);
            });
        }

        if (maxHeight !== currentMaxHeight) {
            currentMaxHeight = maxHeight;

            if (typeof options.onUpdate === "function") {
                options.onUpdate({ maxHeight: currentMaxHeight, width: currentWidth });
            }
        }

        setHeight(targets, currentMaxHeight);
    };

    update();

    const ro = new ResizeObserver(update);
    targets.forEach((el) => ro.observe(el));
}


*/ 


/**
 * Icon Card Slider
 *
 * Makes all slider cards the same height and keeps them in sync whenever
 * the content changes (e.g. fonts load, images appear, window resizes).
 *
 * Why not use EV.keepSameHeight()?
 *   There is a bug inside keepSameHeight: when you pass a plain object
 *   { target, onUpdate } or a plain array, the function overwrites the
 *   target variable with the original argument on the next line, so it
 *   ends up with no valid element list and the height loop never runs —
 *   nothing happens, no error thrown.
 *
 *   Example — passing an object (broken):
 *     EV.keepSameHeight({ target: [el1, el2], onUpdate: () => {} });
 *     // inside the function:
 *     //   r = i.target          → r = [el1, el2]  ✓
 *     //   r = isJQuery(r) ? [...r] : e  → r = { target: [...], onUpdate: ... }  ✗
 *     //   r.length              → undefined, loop never starts
 *
 *   Example — passing an array directly (also broken for a different reason):
 *     EV.keepSameHeight([el1, el2]);
 *     // heights are set, but there is no way to hook reloadCells/resize
 *     // after keepSameHeight changes them, so Flickity stays mis-measured.
 *
 *   We use ResizeObserver instead — it watches the real DOM and fires
 *   whenever a card's content actually changes size, so we can equalize
 *   heights and reload Flickity in one reliable place.
 */
document.querySelectorAll('.ifs-icon-cards-slider').forEach(wrapper => {
    const sliderEl = wrapper.querySelector('.ifs-icon-cards-slider__items');
    if(!sliderEl) return;

    const slider = Flickity.data(sliderEl);
    if(!slider) return;

    // Read slide elements from Flickity rather than querying the DOM directly,
    // because Flickity clones cells for infinite loop mode — querying by class
    // would pick up duplicates and produce wrong height measurements.
    const elements = slider.cells?.map(cell => cell.element).filter(Boolean) || [];
    if(elements.length < 2) return;

    // ResizeObserver fires one callback entry per observed element, so without
    // debouncing it would run the equalization N times (once per card) in the
    // same batch. clearTimeout + setTimeout collapses all of them into one run.
    let debounceTimer;
    const observer = new ResizeObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            // Clear forced heights so clientHeight returns the real content height.
            elements.forEach(el => el.style.height = '');

            // Find the tallest card, then pin all cards to that height.
            const maxHeight = Math.max(...elements.map(el => el.clientHeight));

            // Guard: if maxHeight is 0 the elements aren't laid out yet (hidden or
            // off-screen) — skip to avoid collapsing all cards to 0px height.
            if(!maxHeight) return;

            elements.forEach(el => el.style.height = `${maxHeight}px`);

            // Flickity caches sizes at init and won't detect our height change —
            // reloadCells + resize forces it to re-measure and fix drag/snap positions.
            slider.reloadCells();
            slider.resize();
        }, 10);
    });
    elements.forEach(el => observer.observe(el));
});
