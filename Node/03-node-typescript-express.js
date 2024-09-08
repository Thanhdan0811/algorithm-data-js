/* 
    1. Cấu trúc dự án.
    - thư mực dist : khi build ra dự án cuối.
    - folder src : chứ code dự án
    - folder src/constants : chứa các hằng số.
    - folder src/controllers : 
    - folder src/middlewares : xử lý các khâu trung gian.
    - folder src/models : Kiểu về database, lỗi.
    - folder src/routes : qui định, link api
    - folder src/services : Dùng để gọi , xử lý api liên quan.
    - folder src/utils : Các hàm tiện ích.
    - file index : file tổng.
    - file type : dùng để khai báo dữ liêu.


    - Khởi tạo dự án : 
    - npm init --y
    - Thêm typescript như 1 dependency : npm i typescript --save-dev or npm i typescript -D
    - Cài kiểu dữ liệu cho typescript cho node : npm i @types/node --save-dev
    - Cài các deps khác : npm i eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser ts-node tsc-alias tsconfig-paths rimraf nodemon --save-dev

    - eslint : Linter bộ kiểm tra lỗi.
    - prettier : Code format chính.
    - eslint-config-prettier : Cầu hình Eslint không bị xung đột với prettier.
    - eslint-plugin-prettier : Dùng thêm 1 số rule prettier cho eslint.
    - @typescript-eslint/eslint-plugin : Eslint cung cấp các rule cho typescript.
    - @typescript-eslint/parser : Parser cho phép Eslint kiểm tra lỗi Typescript.
    - ts-node : Dùng để chạy typescript code trực tiếp mà ko cần build.
    - tsc-alias : xử lý alias khi build.
    - tsconfig-paths : khi setting alias import trong dự án dùng 'ts-node' thì chúng ta cần dùng `tsconfig-paths` để nó hiểu được `paths` và `baseUrl` trong file `tsconfig.json`.
    - rimraf : dùng để xóa folder `dist` trước khi build.

    - TẠO CÁC FILES :
    - .editorconfig : config editor 
        ```
            [*]
            indent_size = 2
            indent_style = space
        ```
    
    - .eslintignore, .gitignore, .prettierignore : ignore các file ko check
        ```
            node_module/
            dist/
        ```

    - .eslintrc : 
    ```
        {
            "root": true,
            "parser": "@typescript-eslint/parser",
            "plugins": ["@typescript-eslint", "prettier"],
            "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended", "eslint-config-prettier", "prettier"],
            "rules": {
                "@typescript-eslint/no-explicit-any": "warn",
                "@typescript-eslint/no-unused-vars": "off",
                "prettier/prettier": [
                "warn",
                {
                    "arrowParens": "always",
                    "semi": false,
                    "trailingComma": "none",
                    "tabWidth": 2,
                    "endOfLine": "auto",
                    "useTabs": false,
                    "singleQuote": true,
                    "printWidth": 120,
                    "jsxSingleQuote": true
                }
                ]
            }
        }
    ```

    - .prettierrc
    ```
        {
            "arrowParens": "always",
            "semi": false,
            "trailingComma": "none",
            "tabWidth": 2,
            "endOfLine": "auto",
            "useTabs": false,
            "singleQuote": true,
            "printWidth": 120,
            "jsxSingleQuote": true
        }
    ```

    - nodemon.json
    ```
        {
            "watch": ["src"],
            "ext": ".ts,.js",
            "ignore": [],
            "exec": "npx ts-node ./src/index.ts"
        }
    ```

    - package.json : chỉnh scripts
    ```
        "scripts": {
            "dev": "npx nodemon",
            "build": "rimraf ./dist && tsc && tsc-alias",
            "start": "node dist/index.js",
            "lint": "eslint .",
            "lint:fix": "eslint . --fix",
            "prettier": "prettier --check .",
            "prettier:fix": "prettier --write ."
        }
    ```

    - tsconfig.json: 
*/

// - tsconfig.json: 
// {
//     "compilerOptions": {
//       "module": "CommonJS", // Quy định output module được sử dụng
//       "moduleResolution": "node", //
//       "target": "ES2020", // Target ouput cho code
//       "outDir": "dist", // Đường dẫn output cho thư mục build
//       "esModuleInterop": true, // Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility.
//       "strict": true, // Enable all strict type-checking options.,
//       "skipLibCheck": true, // Skip type checking all .d.ts files.,
//       "baseUrl": ".", // Đường dẫn base cho các import
//       "paths": {
//         "~/*": ["src/*"] // Đường dẫn tương đối cho các import (alias)
//       }
//     },
//     "ts-node": {
//       "require": ["tsconfig-paths/register"]
//     },
//     "files": ["src/type.d.ts"], // Các file dùng để defined global type cho dự án
//     "include": ["src/**/*"] // Đường dẫn include cho các file cần build
//   }
  


// Tạo file type.d.ts, index.ts trong src 