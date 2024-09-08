- ng g directive directives/highlighted

- có dạng sau :

```
import { Directive } from '@angular/core';

@Directive({
  selector: '[highlighted]',
  standalone: true
})
export class HighlightedDirective {

  constructor() { }

  @HostBinding("class.highlighted")
  get cssClasses() {
    return true;
  }

}


```

- [highlighted] : dạng attribute.
- chú ý phần standalone : true.

# Access Host Element.

- @HostBinding decorator.
- "class.highlighted" : là properties của host element.

```

@HostBinding("style.border")
  get cssClasses() {
    return "1px solid red";
  }

```

# Input in Attribute Directive.

```
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[highlighted]'
})
export class HighlightedDirective {

  @Input("highlighted")
  isHighlighted = false;

  @HostBinding("class.highlighted")
  get cssClasses() {
    return this.isHighlighted;
  }

  constructor() {
    console.log("directive created....!!!!");

  }

}


<!-- app use directive -->
<course-card
[highlighted]="true"
(courseSelected)="onCourseSelected($event)"
        [course]="course"></course-card>

```


# Set attribute cho host

```
@HostBinding("attr.disabled")
  get disabled() {
    return "true";
}

```


# Host Listener.

```
<!-- HighlightedDirective -->

@Output()
    toggleHighlight = new EventEmitter();   

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
  exportAs: 'hl'
})
export class HighlightedDirective {

  @Input("highlighted")
  isHighlighted = false;

  @Output()
  toggleHighlight = new EventEmitter();

  constructor() { 
    console.log("directive created....!!!!");
    
  }

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

  constructor(private templateRef: TemplateRef<any>, 
    private viewContainer: ViewContainerRef
  ) { }

  @Input()
  set ngUnless(condition: boolean) {
    // this.visible để tránh gọi lại nhiều lần.
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
