- Provider là thứ create dependency thay cho angular dependency injection system.
- Provider sẽ cấp cho angular dependency injection system 1 function đc gọi là factory funciton.
- providedIn : 'root' => create cái được gọi là tree-shakeble provider.

# Providers and Injection Tokens.
- Provider đơn giản là 1 function mà ta cần pass cho angular dependency injection system 
- function sẽ được gọi bởi dependency injection system , và nó sẽ provide the dependency.

```
// App component .ts
// function provider, trả về CoursesService
function coursesServiceProvider(http: HttpClient): CoursesService {
    return new CoursesService(http);
}

// Vì là hệ thống DI, nó sẽ có HttpClient, Ta chỉ cần plug Provider vào hệ thống DI của angular.
// Tạo name token cho DI của provider, và phải là duy nhất.
export const COURSES_SERVICE = new InjectionToken<CoursesService>('COURSES_SERVICE');


// cách để gắn vào DI
@Component({
    ...,
    providers: [
        {
            provider: COURSES_SERVICE, 
            useFactory: coursesServiceProvider, 
            deps: [HttpClient]
        }
    ]
})
export class AppComponent implements OnInit {


    // hệ thống DI ở bên ngoài Angular sẽ ko biết là CoursesService sẽ link với COURSES_SERVICE, nên cần dùng @Inject() function
    constructor(@Inject(COURSES_SERVICE) private coursesService: CoursesService) {

    }
}
```

# Simplified Provider Configuration.

- Angular hỗ trợ Inject class.
```
// App component .ts

// cách để gắn vào DI
@Component({
    ...,
    providers: [
        {
            provider: CoursesService, // dùng class thay vì token
            useClass: CoursesService
        }
    ]
})
// hoặc 
@Component({
    ...,
    providers: [
       CoursesService
    ]
})
export class AppComponent implements OnInit {

    constructor(private coursesService: CoursesService) {

    }
}
```

# Hierarchical DI.
- Khai báo như ví dụ trên sẽ là ở level Component, Mỗi Component đc tạo ra sẽ khởi tạo 1 Service mới.
- Nếu Component cha có định nghia Provider CoursesService, khi ở component cũng có dùng mà không
- định nghĩa Provider CoursesService thì Angular sẽ tự động tìm đến provider ở component cha , nếu có thì sẽ sử dụng cho component con lun.
- Local provider được dùng khi service có các state private so với phần còn lại của app.
- Nếu dùng local thì service cũng sẽ được link với lifecycle của component đó và sẽ destroyed khi component destroyed.

```
// file course-card .ts
@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css']
    // ở Component con này không cấp provider CoursesService.
})
 constructor(private coursesService: CoursesService) {

}


// app.ts , có template dùng course-card
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'].
  providers: [
    CoursesService, // ở component cha có Provider này.
  ]
})
export class AppComponent implements OnInit {

     constructor() {

        }
}

```

# Tree-shakeable provider
- Hiểu là , cấp provider ở service thay vì riêng component , để khi component nào dùng DI mới thêm vào.


```
// fie courses.service.ts

@Injectable({
    providedIn: 'root',  // được khởi tạo ở root, vị dụ trên là ở Component.
    useFactory: (http) => new CoursesService(http),  // báo cho DI system biết ta dùng hàm Factory để tạo DI.
    deps: [HttpClient]
})

```

# Injection token detail.

- dùng plain object để làm inject token.
```
// file config.ts
export interface AppConfig {{
    apiUrl: string;
    courseCacheSize: number;
}}

export const APP_CONFIG: Appconfig = {{
    apiUrl: 'http://localhost:9000',
    courseCacheSize: 10
}}

export const CONFIG_TOKEN = new InjectionToken<AppConfig>('CONFIG_TOKEN')


/// file app.component.ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'].
  providers: [
    {
        provide: CONFIG_TOKEN,
        useFactory: () => APP_CONFIG,
    }
  ]
})
export class AppComponent implements OnInit {

     constructor(@Inject(CONFIG_TOKEN) private config: AppConfig) {
            consoe.log(config); // object {apiUrl....}
    }
}

======================================================
// hoặc dùng như sau 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'].
  // Chỗ này không dùng tree-shakeable nên code của APP_CONFIG vẫn được thêm vào dù ta không inject trong component.
  providers: [
    {
        provide: CONFIG_TOKEN,
        useValue: APP_CONFIG,
    }
  ]
})
export class AppComponent implements OnInit {


// Không inject nhưng vãn sẽ thêm vào code.
     constructor() {
    }
}

=========================================================================
// Để làm cho nó tree-shakeable
// file config.ts
export interface AppConfig {{
    apiUrl: string;
    courseCacheSize: number;
}}

export const APP_CONFIG: Appconfig = {{
    apiUrl: 'http://localhost:9000',
    courseCacheSize: 10
}}

export const CONFIG_TOKEN = new InjectionToken<AppConfig>('CONFIG_TOKEN', 
    {
        providedIn: 'root', // tree-shaking.
        factory: () => APP_CONFIG
    }
)

```

# Angular DI : Optional, self, skipSelf
- Optional : Nếu không tìm thấy DI từ DI system thì sẽ báo lỗi, thêm : @Optional() để bỏ qua lỗi
```
constructor(@Optional() private coursesService: CoursesService) {

}
```
- Chú ý lúc này sẽ là null.

- Để lấy DI từ component ko phải lấy từ component cha : @Self()
```
// DI này sẽ chỉ tìm ở component này mà không tìm tiếp lên component cha.
// Cần khai báo provider trong providers: [ CoursesService ]
constructor(@Self() private coursesService: CoursesService) {

}


- Ngược lại, Để lấy DI từ component cha mà không phải component hiện tại : @SkipSelf()
```
// DI này sẽ không tìm ở component này mà tìm tiếp lên component cha.
constructor(@SkipSelf() private coursesService: CoursesService) {

}

# Angular Host Decorator

```
export class HighightedDirective {

    @Input('highlighted')
    isHighighted = false;

    // @Host() ở đây sẽ lấy DI ở component dùng directive này. Nó sẽ không chạy lên tree để tìm DI 
    // Nếu không dùng @Host() nó sẽ chạy lên tìm.
    constructor(@Host() private coursesService: CoursesService) {

    }

}

```