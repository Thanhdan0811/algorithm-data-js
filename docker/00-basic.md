- lệnh build lại : 
    + docker compose down
    + xóa các images liên quan : docker-compose down --rmi all
    + docker compose up --build -d  => -d là chạy ngầm.

    docker compose build --no-cache
    docker compose up -d

- images : như file cài, ảnh xạ qua code.
- containers : là chương trình đã cài trên máy.
- Docker hub là nơi chứa các chương trình cài có sẵn.

- Docker file.

+ FROM : phần mểm tải từ hub docker, ví dụ node project thì sẽ là => FROM node:20
+ WORKDIR : đường dẫn chứa dữ liệu, => WORKDIR /home/app
+ COPY : sao chép tập tin đến nền tảng => COPY package*.json ./  => copy qua.
+ RUN : chạy lệnh tương ứng. => RUN yarn config set network-timeout 300000
+ EXPOSE : port chạy trong container. => 8080
+ CMD : lệnh chạy nền. => CMD [ "yarn", "start" ]
 
- step 1 : cài môi trường bE ví dụ node:20
- step 2 : tạo folder chứa source code.
- step 3 : copy tất cả code từ laptop mang qua docker.
- step 4 : npm install
- step 5 : run server.

- câu lệnh lấy ip trên local : docker inspect -f '{{range .NetworkSettings.Networks}}.{{.IPAddress}}{{end}}' mysql(name_container)

- build : docker build . -t name_images
- Triển khai : docker run -d -p 8080:80 --name cons-react img-react => tạo container
- docker run -d -p 8080:80 --name node44 node44

```


```