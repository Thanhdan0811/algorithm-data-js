- IOC : Inversion on Control Container.
- Cung cấp 1 streamlined way để configure và manage java object.
- Chịu trách nhiệm cho quản lí life cycle của defined Java object. 

- AOP : Aspect Oriented Programming.
- DAF : Data Access Framework.
- MVC : Spring MVC Framework.


# Spring bean 
- là 1 object được managed bởi Spring Framework. được dùng để đơn giản sự phức tạp của Java app.
- Spring bean có thể được configured bởi XML, Java annotations, hoặc java code.

- `Life cycle của spring bean.` Được managed bởi spring container. khi nào và bằng cách nào đc sinh ra, cách hoạt động lúc sống và khi nào và bằng cách nào nó die.
- spring container chạy và khởi tạo bean, bean bị loại bỏ khi spring container close.

- `@Configuration` định nghĩa 1 class như là 1 full configuration class.
- LÚc này note class phải là `non-final` và là` public`

- `@Bean` định nghĩa bean configuration bên trong configuration class.
- method phải là `non-private` và `non-final`.



```
@Configuration
public class AppConfig{
    @Bean
    public PaymentService paymentService(
        AccountRepository accountRepository
    ) {
        return new PaymentServiceImpl(accountRepository);
    }
}

```

# Spring Component sample
- Spring component : chứa class-level annotation đánh dấu class là 1 Spring component. `@Component`
- Contructor-dependency injection được tự động hoàn thành bằng cách dùng : `@Autowired`
- `@Autowired` là optional nếu chỉ có 1 constructor.
