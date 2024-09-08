```
<!-- app component ts -->
export class AppComponent implements OnInit {
    courses = COURSES;

    constructor(private http: HttpClient) {

    ngOnInit() {

        const params = new HttpParams()
            .set("page", "1")
            .set("pageSize", 10);

        this.http.get('/api/courses', {params})
            .subscribe(
                courses => this.courses = courses;
            )
    }
}


}

```

# Async Pipe
```
<!-- app component ts -->
export class AppComponent implements OnInit {
    courses$ : Observable<Course[]>


    constructor(private http: HttpClient) {

    ngOnInit() {

        const params = new HttpParams()
            .set("page", "1")
            .set("pageSize", 10);

        this.courses$ = this.http.get<Course[]>('/api/courses', {params})
    }
}


}


<!-- app html -->
<div *ngIf="courses$ | async as courses">
    <course-card *ngFor="let course of (course | async)"></course-card>
</div>
```

- courses$ dấu $ có nghĩa là 1 Observable.
- __NOTE__ : class ko tạo ra injectable service mà nó đc inject vào thông qua constructor. Được gọi là Dependency Injection 



# Custom Services
- __ng g service services/courses__

```
<!-- courses.service.ts -->
@Injectable({
    providedIn: "root"
})
export class CoursesService{
    constructor() {}
}


<!-- app component ts -->
export class AppComponent implements OnInit {
    courses$ : Observable<Course[]>


    constructor(private http: HttpClient, private coursesService: CoursesService) {

    ngOnInit() {

        console.log(this.coursesService);

        const params = new HttpParams()
            .set("page", "1")
            .set("pageSize", 10);

        this.courses$ = this.http.get<Course[]>('/api/courses', {params})
    }
}
```

- root thì sẽ chỉ có 1 instance service, được khởi tạo bởi Angular không phải bởi App.
- Loại service này được gọi là _application Singleton_ => nghĩa là sẽ chỉ có 1 instance.


# Custom Service Fetching Data.

```
<!-- courses.service.ts -->
@Injectable({
    providedIn: "root"
})
export class CoursesService{
    constructor(private http: HttpClient, ) {}

    loadCourses(): Observable<Course[]> {
        const params = new HttpParams()
            .set("page", "1")
            .set("pageSize", 10);

        return this.http.get<Course[]>('/api/courses', {params})
    }
}


<!-- app component ts -->
export class AppComponent implements OnInit {
    courses$ : Observable<Course[]>


    constructor(private coursesService: CoursesService) {

    ngOnInit() {
        this.courses$ = this.coursesService.loadCourses();
    }
}
```

# Custom Service - Data Modification HTTP PUT

```
<!-- courses.service.ts -->
@Injectable({
    providedIn: "root"
})
export class CoursesService{
    constructor(private http: HttpClient, ) {}

    loadCourses(): Observable<Course[]> {
        const params = new HttpParams()
            .set("page", "1")
            .set("pageSize", 10);

        return this.http.get<Course[]>('/api/courses', {params})
    }



    saveCourse(course: Course) {

        const headers = new HttpHeaders()
                            .set("X-Auth", "userId")

        return this.http.put(`/api/courses/${course.id}`, course, {headers})
    }
}


<!-- app component ts -->
export class AppComponent implements OnInit {
    courses$ : Observable<Course[]>


    constructor(private coursesService: CoursesService) {

    ngOnInit() {
        this.courses$ = this.coursesService.loadCourses();
    }

    save(course: Course) {
        this.coursesService.saveCourse(course)
            .subscribe(() => console.log("Course saved!"))
    }
}
```