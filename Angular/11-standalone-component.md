- Standalone componnet không thuộc về module nào.


```
@Component({
    selector: 'course-image',
    standalone: true,
    imports: [
        NgIf, // import vào các thứ cần thiết.
        NgForOf,
        CourseCardComponent,
    ]
})
// Tương tự cho directive, pipe.


```

# bootstrap change.

```
// chuyển từ 
platformBrowserDynamic().bootstrapModule(AppModule)
// thành 
bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
}).

// Sau đó ta có thể xóa module App.


```