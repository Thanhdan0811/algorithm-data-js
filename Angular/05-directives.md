- ng g directive directives/highlighted

- có dạng sau :

```
import { Directive } from '@angular/core';

@Directive({
  selector: '[highlighted]',  // => <course-card highlighted ></course-card>
  standalone: true
})
export class HighlightedDirective {

  constructor() { }

  @HostBinding("className")
  get cssClasses() {
    return "highlighted;
  }
  // or, sẽ thêm class vào element khi được khởi tạo.
  // nó sẽ bind class với "highlighted" , nếu bind không tồn tại sẽ báo lỗi @HostBinding("khongTonTai") => báo lỗi.

  @HostBinding("class.highlighted")
  get cssClasses() {
    return true;
  }

}


```

- [highlighted] : dạng attribute.
- chú ý phần standalone : true.

# Access Host Element.

- Dùng @HostBinding decorator để tương tác với host element.
- "class.highlighted" : là properties của host element, thêm class highlighted.

```

@HostBinding("style.border")
  get cssClasses() {
    return "1px solid red";
  }

```

# Input in Attribute Directive.
- Nhận Input từ attribute highlighted
```
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[highlighted]'
})
export class HighlightedDirective {


  // input được nhận vào từ attribute highlighted 
  @Input("highlighted")
  isHighlighted = false;

  @HostBinding("class.highlighted")
  get cssClasses() {
    return this.isHighlighted; // dựa vào input true/fasle để add/remove highlighted class.
  }

  constructor() {
    console.log("directive created....!!!!");

  }

}


<!-- app use directive -->
<course-card
[highlighted]="true"  // truyền value true vào cho directives attribute.
(courseSelected)="onCourseSelected($event)"
        [course]="course"></course-card>

```


# Set attribute cho host
- set attribute khác cho element sử dụng attribute
```
@HostBinding("attr.disabled")
  get disabled() {
    return "true";  // khi true thì set attribute cho element với disabled là true.
}

```


# Host Listener.
- Lắng nghe sự kiện từ element.
```
<!-- HighlightedDirective -->

@Output()
    toggleHighlight = new EventEmitter();   


@HostBinding("class.highlighted")
  get cssClasses() {
    return this.isHighlighted; // dựa vào input true/fasle để add/remove highlighted class.
  }

// khi hover qua thì set là true. sẽ thêm class highlighted
@HostListener('mouseover', ['$event'])
mouseOver($event) {
    console.log($event);
    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
}
@HostListener('mouseleave')
mouseLeave() {
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
}


<!-- app.html -->
<course-card
        [highlighted]="false"
        // nhận event từ directive 
        (toggleHighlight)="onToggle($event)"
        (courseSelected)="onCourseSelected($event)"
                [course]="course">

    <course-image [src]="course.iconUrl"></course-image>

    <div class="course-description">
        {{ course.longDescription }}
    </div>

</course-card>

<!-- app.ts -->
onToggle(isHighlighted: Boolean) {
    console.log(isHighlighted);
}
```

# Directive Export As syntax.
- Dùng cho các trường hợp mà ta muốn access directive , tại html sử dụng directive, hoặc file component.ts.


```
<!-- Directive file -->
@Directive({
  selector: '[highlighted]',
  exportAs: 'hl'  // export ra như là hl
})
export class HighlightedDirective {

  @Input("highlighted")
  isHighlighted = false;

  @Output()
  toggleHighlight = new EventEmitter();

  constructor() { 
    console.log("directive created....!!!!");
    
  }

  // Function toggle này có thể dùng ở ngoài directive bởi component để có thể toggle nó 1 cách chủ động.
  // Dùng ViewChild
  toggle() {
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlight.emit(this.isHighlighted);
  }

}

<!-- app.html -->
<course-card
        [highlighted]="false"
        #highlighter="hl"  => khai báo access directive.
        (toggleHighlight)="onToggle($event)"
        (courseSelected)="onCourseSelected($event)"
              [course]="course">

    <course-image [src]="course.iconUrl"></course-image>

    //////
    <div class="course-description" (dblclick)="highlighter.toggle()"> => dùng hàm trong directive.
        {{ course.longDescription }}
    </div>

</course-card>

<!-- app.ts -->
export class AppComponent implements AfterViewInit {

    courses = COURSES;

    <!-- Cách 1 -->
    @ViewChild(HighlightedDirective)
    highlighted: HighlightedDirective;

    <!-- Cách 2 -->
    @ViewChild(CourseCardComponent, {read: HighlightedDirective})
    highlighted: HighlightedDirective;

    constructor() {

    }

    ngAfterViewInit() {
      console.log(this.highlighted);
      
    }

}

```


# Structure Directives.
- Khác với attributes directive, structure có thể instance template.
```
<div *ngIf="courses as courseList"></div>

<!-- tương đương với. -->
<!-- let-courses = courses. -->
<ng-template [ngIf]="courses" let-courses>
  <div></div>
</ng-template>

```

- private templateRef: TemplateRef<any> => tham chiếu đến template.
- private viewContainer: ViewContainerRef => cơ chế để tạo template. createEmbeddedView()


```
@Directive({
  selector: '[ngxUnless]',
  standalone: true
})
export class NgxUnlessDirective {

  visible = false;

  constructor(
    private templateRef: TemplateRef<any>, 
    private viewContainer: ViewContainerRef
  ) { }

  @Input()
  set ngUnless(condition: boolean) {
    // this.visible để tránh gọi lại nhiều lần do mình ko biêt Framework sẽ gọi lại bao nhiêu lần.
    if(!condition && !this.visible) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.visible = true;
    } else if(condition && this.visible) {
      // remove instance in template.
      this.viewContainer.clear();
      this.visible = false;
    }
  }

}


<!-- file sử dụng directive. -->
<course-image [src]="course.iconUrl" *ngxUnless="!course.iconUrl"></course-image>
```
