- DI có 2 vai trò quan trọng là : dependency consumer và dependency provider.
- việc tương tác giữa 2 vai trò sẽ thông qua Injector.


- functions, objects, primitive types hay type khác đều có thể là dependencies.

- Có 4 cách để 1 dependenciy đc cũng cấp : 

## ở cấp application root level : providedIn
- Ở cấp root level, Angular tạo 1 single, shared instance của HeroService và injects nó vào bất cứ class nào yêu cầu.


```
@Injectable({
  providedIn: 'root'
})
class HeroService {}

```

## Component level 
- Cung cấp provide services at @Component dùng providers field của @Component.
- HeroService available với tất cả instances của component và components khác và directives được dùng trong component này.
- Mỗi instance component sẽ tạo ra 1 new instance service.
- Các này thì HeroService sẽ luôn included trong application, kể cả khi không dùng.

```
@Component({
  standalone: true,
  selector: 'hero-list',
  template: '...',
  providers: [HeroService]
})
class HeroListComponent {}

```

## Root level dùng ApplicationConfig.
- dùng ở `providers` field của `ApplicationConfig` được passed vào `bootstrapApplication` function 


```
export const appConfig: ApplicationConfig = {
    providers: [
      { provide: HeroService },
    ]
};
// main.ts
bootstrapApplication(AppComponent, appConfig)

```

## level NgModule based application.
- Được inject vào @NgModule
- service được provided trong 1 module sẽ available với tất cả declarations của module. hoặc bất cứ module nào shared cùng 1 ModuleInjector.
- Declaring a service using providers causes 

# Injecting/consuming a dependency (thêm vào)
- Cách 1 dùng trong constructor : 

```
@Component({ … })
class HeroListComponent {
  constructor(private service: HeroService) {}
}
```

- Cách 2 : Inject method.

```
@Component({ … })
class HeroListComponent {
  private service = inject(HeroService);
}

```

# Config 

```
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    {
      provide: LoggerService, useClass: ExperimentalLoggerService
    }
  ]
})

...
 constructor(private logger: LoggerService, private exLogger: ExperimentalLoggerService) {}

 // 2 inject sẽ tạo ra 2 instance khác nhau.

```

# lifecycle hooks
- là các methods angular invokes trong directives và components khi mà nó đc creates, changes, destroys.
- ngOnInit khi component khởi tạo lần đầu.
- ngOnChanges khi input properties change.
- ngOnDestroy khi component destroyed.

- Change detection là cơ chế mà angular giữ cho template đồng bộ với component.
- Khi constructor đc gọi thì ko có properties nào đc updated và có để dùng.

- Khi angular instantiates class , sẽ kích change detection đầu tiền của component đó là `ngOnChanges`.
- `ngOnChanges` sẽ được gọi ngay khi new component đc tạo, và mỗi khi bound input (@Input()) property changes.
- hook này sẽ ko chạy nếu change detection ko detect đc bất cứ changes nào.

- Sau đó, hook tiếp theo được gọi là `ngOnInit`, sau khi tạo component và update input properties.
- Chỉ chạy 1 lần duy nhất, Ở hook này có thể access property input.
- Lưu ý : thời điểm `ngOnInit` được gọi, child component và projected content sẽ không tồn tại ở thời điểm này.
- DO đó, properties mà ta decorate với @ViewChild, @ViewChilren, @ContentChild, @ContentChildren sẽ ko dùng đc.

- Tiếp theo, hook `ngDoCheck` sẽ được gọi, 
- Sẽ được angular gọi mỗi khi change detection cycle. 
- Được gọi kể cả khi không có change nào từ properties.
- Ví dụ, `ngDoCheck` sẽ chạy nếu click vào button mà không thay đổi gì, nhưng nó vẫn là event.
- gọi sau khi `ngOnChanges`, `ngOnInit`.
- Có thể dùng hook này để thực thi 1 custom change detection, khi angular fails trong việc detect change properites.


- Hook tiếp theo đc gọi là : `ngAfterContentInit`, chỉ có ở component, ko có ở directive
- được gọi sau khi Component's projected content đã fully initialized.
- Angular cũng sẽ update properties decorated với @ContentChild và @ContentChildren trước khi gọi hook này.
- Dù ko có content project thì nó vẫn gọi.
- Chỉ đc gọi 1 lần trong lần đầu change detection, nếu mà content projection có thay đổi sau đó thì nó sẽ ko đc gọi.

- Tiếp theo, `ngAfterContentChecked` sẽ được gọi. chỉ có ở component, ko có ở directive
- được gọi mỗi khi change detection sau khi Angular finished componet's projected content.
- Angular cũng sẽ update properties decorated với @ContentChild và @ContentChildren trước khi gọi hook này.
- Dù ko có content project thì nó vẫn gọi.
- Khác với `ngAfterContentInit` thì `ngAfterContentChecked` sẽ được gọi mỗi lần có change detection, trong khi `ngAfterContentInit` chỉ gọi 1 lần, lần đầu change detection cycle.


- `ngAfterViewInit`: được gọi tiếp theo.
- Sau khi Compnent Views và tất cả child view đc full khởi tạo.
- Angular cũng update properties của @ViewChild và @ViewChildren trước khi gọi hook này.
- Hook đc gọi ở lần đẩu change detection, khi angular initializes view lần đầu tiên.
- Tại thời điểm này, tất cả life cycle hook và change detection của tất cả child component và directives đểu đc processed và Component sẵn sàng.
- Hook này chỉ dành cho component.


- `ngAfterViewChecked` : Được gọi sau khi check và update component's views và child's views.
- hook này được gọi sau `ngAfterViewInit` và sau mỗi lần change detection cycle.
- Hook này chỉ dành cho component.

- Cuối cùng, `ngOnDestroy` : 
- Được gọi khi component đc remove khỏi DOM. trước khi remove sẽ gọi.
