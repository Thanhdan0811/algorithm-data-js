- style sẽ được encapsulated và chỉ áp dụng với component nhất định.
- style component sẽ chỉ áp dụng cho template của nó, ko áp dụng cho template của child component hay ng-content.

# The host selector 
- Để style vào thẻ tên component : course-card
- Ta phải dùng đến : :host {}

```
couse-card {display: block;} => sẽ không hoạt động.

<!-- file css course card component -->
:host {
    display: block;
}

:host.is-last {
    border-bottom: 2px solid grey;
}

```

# ::ng-deep
- Khi dùng ng-content thì style sẽ không app vào content truyền vào đc.
- Ta sẽ dùng => ::ng-deep

```
.course-card ::ng-deep .course-description {
    style....
}

```

- có thể hiểu là các attribute unit được áp dụng cho component và các thẻ trong nó thì sẽ không được áp dụng cho class đứng sau ::ng-deep


# Host context selector - Theming Use case
- đôi khi ta mún style component theo 1 điều kiện gì đó ở ngoài nó.
```

<!-- html component cha -->
<div class="salmon-theme">
    <course-card></course-card>
</div>

<!-- css componnet con course-card -->
::ng-deep .salmon-theme .course-card {
    background: lightsalmon;
}
<!-- => ::ng-deep sẽ làm cho 2 classs là .salmon-theme và .course-card trở thành global, ko còn riêng cho component con -->

:host-context(.salmon-theme) .course-card {...}
<!-- => :host-context() sẽ chỉ làm cho .salmon-thêm trở thành global, còn .course-card vần sẽ riêng biệt cho component con là course-card -->

```

# View Encapsulation

```
@Componnet({
    ...,
    encapsulation: ViewEncapsulation.Emulated (default) | .None | .Native | .ShadowDom
})

```
- Với .None thì các style như ::ng-deep hay :host-context() đều ko có nghĩa, các style đều global.
- .ShadowDom khá giống .Emulated khác ở chỗ sẽ dùng shadow dom của browser để tách biệt style ra. gióng như tạo 1 root document mới.
- .ShadowDom ko tạo atrribute rieegn biệt mà là tạo shadow dom mới.

