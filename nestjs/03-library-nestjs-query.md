Ba thư viện này thuộc bộ `nestjs-query` (từng được biết đến là `graphql-query-builder` hay `nestjs-query`), giúp bạn nhanh chóng xây dựng các API CRUD với khả năng lọc, phân trang, sắp xếp và kết hợp linh hoạt giữa GraphQL và NestJS. Cụ thể:

1. **@ptc-org/nestjs-query-core**:  
   - Đây là thư viện lõi, cung cấp các khái niệm nền tảng để xây dựng các truy vấn và xử lý dữ liệu.  
   - Nó định nghĩa các interface, lớp cơ sở và logic cốt lõi cho việc truy vấn, lọc (filter), sắp xếp (sorting), phân trang (paging) và chuyển đổi dữ liệu.  
   - Bạn có thể xem nó như "bộ não" chung để quản lý cách xử lý query.

2. **@ptc-org/nestjs-query-graphql**:  
   - Thư viện này tích hợp bộ core ở trên với GraphQL.  
   - Nó cung cấp các decorator và cơ chế tự động sinh ra các GraphQL resolver, schema, query/mutation dựa trên mô tả entity và các lớp DTO.  
   - Cho phép bạn dễ dàng tạo ra các endpoint GraphQL (Query & Mutation) với tính năng filter, pagination, sorting mà không cần viết quá nhiều code lặp lại.

3. **@ptc-org/nestjs-query-typeorm**:  
   - Đây là phần tích hợp với TypeORM – một ORM phổ biến trong NestJS.  
   - Nó giúp bạn nối logic của nestjs-query với tầng dữ liệu TypeORM, tự động chuyển đổi các filter, sort, paging thành truy vấn database (SQL) tương ứng.  
   - Nhờ vậy, bạn có thể định nghĩa entity TypeORM như bình thường, sau đó nhờ nestjs-query-typeorm để tự động sinh ra các API GraphQL CRUD đầy đủ chức năng.

**Tóm gọn**:  
- `nestjs-query-core`: Cung cấp logic cốt lõi để xây dựng query.  
- `nestjs-query-graphql`: Tận dụng logic đó để sinh ra GraphQL resolver/endpoint một cách dễ dàng.  
- `nestjs-query-typeorm`: Kết nối logic truy vấn với TypeORM, giúp thực thi truy vấn trên cơ sở dữ liệu một cách tự động.

Nhờ sự kết hợp của 3 thư viện này, bạn có thể tạo ra một tầng API GraphQL đầy đủ CRUD, filter/sort/paging chỉ với rất ít mã lệnh.


# các field 
- FilterableField : khi dùng thì field đó có thể được filter khi query hoặc mutation. 

```import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
// khai báo 
import { ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @FilterableField(() => ID)
  id: number;

  @FilterableField()
  name: string;

  @FilterableField()
  email: string;

  // Trường này không được đánh dấu là FilterableField
  password: string;
}

// truy vấn
query {
  users(filter: { name: { contains: "John" }, email: { equals: "john.doe@example.com" } }) {
    id
    name
    email
  }
}
```

- Với DTO ta có thể định nghĩa validation sẽ được dùng bởi mutations.


# NestjsQueryGraphQLModule 
- khi khởi tạo : `NestjsQueryGraphQLModule` , sẽ tự tạo 1 Resolver có các queries và mutations : 
    + queries : 
        + find multiple => todoItems
        + find one => todoItem
    + Mutations : 
        + tạo nhiều todoItem => createManyTodoItems
        + tạo 1 todoItem => createOneTodoItems
        + update nhiều todoItem => updateManyTodoItems
        + update 1 todoItem =>  updateOneTodoItems
        + xóa nhiều todoItem => deleteManyTodoItems 
        + xóa 1 todoItem => deleteOneTodoItems 


```
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { TodoItemCreateDTO } from './todo-item.create.dto';
import { TodoItemDTO } from './todo-item.dto';
import { TodoItemEntity } from './todo-item.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryTypeOrmModule to register the entity with typeorm
      // and provide a QueryService
      imports: [NestjsQueryTypeOrmModule.forFeature([TodoItemEntity])],
      // describe the resolvers you want to expose
      resolvers: [
        {
          EntityClass: TodoItemEntity,
          DTOClass: TodoItemDTO,
          CreateDTOClass: TodoItemCreateDTO,
        },
      ],
    }),
  ],
})
export class TodoItemModule {}

```