- Provider là thứ create dependency thay cho angular dependency injection system.
- Provider sẽ cấp cho angular dependency injection system 1 function đc gọi là factory funciton.
- providedIn : 'root' => create cái được gọi là trê-shakeble provider.

# Providers and Injection Tokens.
- Provider đơn giản là 1 function mà ta cần pass cho angular dependency injection system 
- function sẽ được gọi bởi dependency injection system , và nó sẽ provide the dependency.

```
function coursesServiceProvider(http: HttpClient): CoursesService {
    return new CoursesService(http);
}

const COURSES_SERVICE = new InjectionToken<CoursesService>('COURSES_SERVICE');


@Component({
    ...,
    providers: [
        {
            provider: COURSES_SERVICE, useFactory: coursesServiceProvider, deps: [HttpClient]
        }
    ]
})
```