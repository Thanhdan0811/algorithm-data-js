- Custom element api.
- ng add @angular/elements --project-name=angular-course
- ng g c course-title

```
// course-title.html
<div class="course-title">
    {{ title }}
</div>>

// course-title.ts
@Input()
title: string;

// Appcomponet.ts

constructor(
    private injector: Injector,
)

ngOnInit() {
    // Khởi tạo Anglular Element component, được quản lý bởi browser.
    const htmlElement = createCustomeElement(CourseTitleComponent, {
        injector: this.injector,
    });

    customElements.define('course-title', htmlElement);
}

// course.module.ts
// Phải khai báo này mới dùng được ANgular Element ở template. 
@NgMModule({
    schemas: [CUSTOM_ELEMENTS_SHCEMA]
})

// app.module.ts
bootstrap: [Appcomponent],
entryComponents: [
    CourseTitleComponent,
]

```