/****************************
* VC Accordion v1.0.0
  ****************************/
  .vii-accordion {
  --vii-accor-x-spacing:16px;
  --vii-accor-y-spacing:19px;
  --vii-accor-width-icon:40px;
  --controls-bg:var(--vii-color-yellow);
  --controls-bg-hover:var(--vii-color-white);
  --controls-color:var(--vii-color-white);
  --controls-color-hover:var(--vii-color-dark-gold);
  --controls-fs:20px;
  --vii-nav-pr:calc(var(--vii-accor-width-icon) + var(--vii-accor-x-spacing) + 10px);
  }

/* item */
.vii-accordion-item {
border-top:1px solid rgba(0, 0, 0, .15);
margin-bottom:-1px;
}
.vii-accordion-item:has(.vii-accordion__nav.active),
.vii-accordion-item:has(.vii-accordion__nav:hover) {border-color:var(--vii-color-dark-gold);}

/* heading > nav */
.vii-accordion__nav {
min-height:64px;
padding:var(--vii-accor-y-spacing) var(--vii-nav-pr) var(--vii-accor-y-spacing) var(--vii-accor-x-spacing);
background:transparent;
}
.vii-accordion__nav:is(:hover, .active) {background-color:var(--vii-color-dark-gold);}

/* heading > nav > text */
.vii-accordion__nav.active .vii-accordion__nav-text,
.vii-accordion__nav:hover .vii-accordion__nav-text {color:var(--vii-color-white)}

/* heading > nav > icon */
.vii-accordion__controls-icon {
width:var(--vii-accor-width-icon);
right:var(--vii-accor-x-spacing);
pointer-events:none;
background-color:var(--controls-bg);
font-size:var(--controls-fs);
color:var(--controls-color);
}
.vii-accordion__nav:not(.active) .vii-accordion__controls-icon .icon-minus,
.vii-accordion__nav.active .vii-accordion__controls-icon .icon-plus {
opacity:0;
transform:translate(-50%, -50%) rotate(90deg);
}

/* heading > nav > icon - hover */
.vii-accordion__nav:is(:hover, .active) .vii-accordion__controls-icon {
background-color:var(--controls-bg-hover);
color:var(--controls-color-hover);
}

/* body */
.vii-accordion__item-body {
padding:32px var(--vii-accor-x-spacing);
border:1px solid var(--vii-color-light-gold);
background-color:var(--vii-color-light-gray);
}
.vii-accordion__item-body-inner {max-width:992px;}
.vii-accordion__item-body-inner > div:last-child {margin-bottom:0;}

/* within .txt_color_white */
.txt_color_white .vii-accordion__nav-text {color:var(--vii-color-white);}
.txt_color_white .vii-accordion-item {
border-top-color:rgba(255, 255, 255, .15);
}
.txt_color_white .vii-accordion__item-body {color:var(--vii-color-text);}


/****************************
* Accordion Custom Responsive
  ****************************/
  @media only screen and (min-width:1700px) {
  .vii-accordion {
  --vii-accor-x-spacing:20px;
  --vii-accor-y-spacing:24px;
  --vii-accor-width-icon:44px;
  --controls-fs:22px;
  }
  }
  @media only screen and (max-width:1180px) {
  .vii-accordion {
  --vii-accor-x-spacing:var(--vii-gap-container);
  --vii-accor-y-spacing:16px;
  --vii-accor-width-icon:32px;
  --controls-fs:18px;
  }
  .vii-accordion__nav {min-height:unset;}
  }
  @media only screen and (max-width:1024px) {
  .vii-accordion__item-body {padding-top:24px;padding-bottom:24px;}
  }
  @media only screen and (max-width:768px) {
  .vii-accordion {--vii-accor-width-icon:28px;--controls-fs:16px;}
  }
