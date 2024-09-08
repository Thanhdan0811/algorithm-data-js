
- DAO : repossitory : Data Access Object.
- 


# Spring IOC - Inversion off Control.
- là nguyên tắc trong đắc việc điều khiển sẽ do các container hoặc framework.
- Spring framework cung cấp 1 IoC Container : BeanFactory và ApplicarionContext 


# Annotation
- @Component : đánh dấu trên các class, để spring biết đó là 1 bean, quản lý các instance trong IocContainer. Để khi dùng thì ko cần tọa instance mới.


- @Autowired : để tiêm DI, Service vào compoennt.


- @Controller : đánh dấu là 1 bean, 
- Bộ 3 : @Component - @Service - @Controller.
```
ApplicationContext context = SpringApplication.run(SpringiocApplication.class);

ServiceSMS serviceSMS = context.getBean(Service.class);
serviceSMS.pritn("Message");


```
- TƯơng tự bô ba trên ta còn có : `@Repository`
- 

# Scope
- Singleton : Bean sẽ đc khởi tọa luôn.
- Prototype thí chỉ nằm ở đó và chỉ đc khởi tạo khi gọi.

# cài 
spring web, spring data jpa, oracle driver, lombok

# ORM và ODM.
- ánh xạ db với object trong java. tìm cột có thuộc tính như trong java.

# JPA 
- Dùng annotation để định nghĩa các ánh xạ cho ORM, @Entity sẽ đại diện cho 1 bảng.

# Spring JPA
- Tạo ra các interface cơ bản để có thể extends và triển khai.

