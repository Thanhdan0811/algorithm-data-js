- Là cơ chế bên trong Angular , cho phép rebuid view khi model thay đổi.
- Anguar scan toàn bộ component , check state hoặc event , custom event được emit để kiểm tra thay đổi và update.

# OnPush change detection.
- Với component thông thường khi khi có sự thay đổi attribute deep object thì sẽ có sự change và render lại UI.
- Nhưng khi dùng `changeDetection: ChangeDetectionStrategy.OnPush` : thì attribute nhận phải phải là immutable, tức là phải clone lại 1 object mới.
- Với value primitive thì vẫn sẽ render lại.
- Tức là Angular sẽ không check thay đổi ở properties mà check thay đổi ở @Input()

```
// course-card.ts file
@Component({
    selector: ...,
    templateUrl: ...,
    styleUrls: ...,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent implements OnInit {
    @Input()
    course: Course;  // course khi truyền vào phải là immutable, object clone. Nếu là object cũ chỉ thay đổi property bên trong thì sẽ không có sự render lại.
}

// app.ts file
onEditCourse() {
    this.courses[0].description = 'new value'; // mutable sẽ không làm render lại.
    this.courses[0] = {...this.courses[0], description: 'new value'}; // cách này sẽ làm render lại.
}
```


# OnPush Change Detection and Observables Data Streams.
- Cos 3 cách để biết cần re-render : Input change, event ở level App, hoặc với observable cần có async ở template.
```
//======================= app .ts file
@Component({
    selector: ...,
    templateUrl: ...,
    styleUrls: ...,
    changeDetection: ChangeDetectionStrategy.OnPush
})
courses$: Observable<Course[]>;

ngOnInit() {
    this.courses$ = this.courseService.loadCourses();
    //  this..courseService.loadCourses().subscribe(courses => this.courses = courses); // cách này sẽ không cho thấy sự thay đổi.
}

//====================== app.html file
// Cần có async để nhận biết change detection.
<div class="courses" *ngIf="(courses$ | async) as courses" >
    <course-card *ngFor...></course-card>
</div>

```


# Angualar Attribute Decorator.


```
//====================== app.html file
// Cần có async để nhận biết change detection.
<div class="courses" *ngIf="(courses$ | async) as courses" >
    <course-card type="beginner" *ngFor...></course-card>  // ========== Ở đây type là attribute có value mặc định không thay đổi.
</div>

// course-card.ts file
@Component({
    selector: ...,
    templateUrl: ...,
    styleUrls: ...,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent implements OnInit {
   constructor(private coursesService: CoursesService, 
   @Attribute('type') private type: string) {

   }
}
```

- Ở đây ta dùng `@Attribute('name_input')` thay vì dùng `@Input` để nhận vào Input và cho Angular biết là không cần check sự thay đổi của value này để re-render lại.


# Angular Custom change Detection ChangeDetectorRef.



```
//======================= app .ts file
@Component({
    selector: ...,
    templateUrl: ...,
    styleUrls: ...,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent implements OnInit, DoCheck {
courses$: Observable<Course[]>;
constructor(private coursesService: CoursesService, 
   @Attribute('type') private type: string,
    private cd: ChangeDetectorRef // cho angular biết cần check value thay đổi để re-render 1 cách manual.
   ) {

   }
    ngOnInit() {
        this.courses$ = this.courseService.loadCourses();
        //  this..courseService.loadCourses().subscribe(courses => {
            this.courses = courses
            this.loaded = true;
            // Cách 1.
            this.cd.markForCheck(); // yêu cầu Anguar chạy đến đây thì yêu cầu check change.
        }); // cách này sẽ không cho thấy sự thay đổi.
    }

    // Cách 2: 
    // ============================= : được gọi mỗi khi Angular chạy detection 
    ngDoCheck() {
        // ngDoCheck chạy rất nhiều lần , nên có thể dùng flag để nhận biết khi nào gọi.
        if (this.loaded) {
            this.cd.markForCheck();
            console.log("called");
            this.loaded = undefined;
        }
    }

}

```