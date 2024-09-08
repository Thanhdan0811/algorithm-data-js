- Immutability : không thay đổi trực tiếp value ở object hay array cũ, mà tạo mới.

- Cài `npm i redux react-redux`;
- Cài extensions : `npm i redux-devtools-extension --save-dev`

- REDUCERS , chứa trong store. : là 1 function
    + Nhận vào 2 parameters là state và action.
    + state sẽ có 1 giá trị khởi tạo.
    + Check xem action là gì thì sẽ cập nhật lại state tương ứng.
    + state mới đc tính dựa trên state cũ, phải luôn trả về state mới copy.
    + không có bất đồng bộ như Math.random(), call api trong reducers.
    + Reducer phải là 1 pure function. inp vào thế nào thì out ra thế đó.

```
const initialValue = {value: 0};
const rootReducer = (state = initialValue, action) => {

    /*
        action = {
            type: "todoList/increment",
            payload: '' // optional 
        }
    **/ 

    switch(action.type) {
        return {
            ...state,
            value: state.value + 1
        }
    }
}


```


- ACTIONS : là 1 object

```
const INCREMENT = {
    type: "todoList/increment",
    payload: '' // optional 
}

// Action creators
const incrementCreator = (data) => {
    return  {
        type: "todoList/increment",
        payload: '' // optional 
    }
}

incrementCreator()
// chỉ cần gọi mà ko cần ghi object từng cái.

```

- DISPATCH : là 1 function
    + Bắn đi 1 action về cho phía UI , vào reducers trong store.

```
dispatch(INCREMENT)
```

# Cấu hình redux

```
import { createStore } from 'redux';

const store = createStore(rootReducer, initValue, enhancers);

export default store;

```
- enhancers : là các middleware như redux-thunk, 

# reselect cho phép lồng selector lại với nhau.
- `npm i reselect`

# redux toolkit
- `npm i @reduxjs/toolkit`
