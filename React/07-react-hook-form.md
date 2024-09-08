- npm i react-hook-form

- npm i -D @hookform/devtools

- react-hook-form khi change value sẽ ko làm component bị rerender lại.

- set up form, binding, submit.
```
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValue = {
  username: string;
  email: string;
  channel: string;
};

const YoutubeForm = () => {
  const form = useForm<FormValue>();
  const { register, control, handleSubmit } = form;
  // khai báo như thế này hoặc rest parameter như dưới.
  // const { name, ref, onChange, onBlur } = register("username");

  const onSubmit = (data: FormValue) => {
    console.log("onsubmit", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          {...register("username")}
        />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          name="channel"
          {...register("channel")}
        />

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default YoutubeForm;


```


# form validation
- Hỗ trợ HTML validation : required, minLength, maxLength, min & max, pattern.
- Mặc định validation sẽ hoạt động khi submit.


# Custom Validation 

- thuộc tính validate : có thể là 1 function trả về true/false, hoặc là 1 object.


```
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValue = {
  username: string;
  email: string;
  channel: string;
};

const YoutubeForm = () => {
  const form = useForm<FormValue>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValue) => {
    console.log("onsubmit", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            {...register("email", {
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "email not match pattern",
              },
              // validate: (value) => {
              //   return (
              //     value !== "admin@example.com" ||
              //     "Enter a different email address."
              //   );
              // },
              validate: {
                notAdmin: (value) => {
                  return (
                    value !== "admin@example.com" ||
                    "Enter a different email address."
                  );
                },
                notBlackList: (value) => {
                  return !value.endsWith("bademail.com") || "Email is banned";
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default YoutubeForm;

```


# Enhancing React Hook Form.
## Form State : default value.

```defaultValue là 1 object

const YoutubeForm = () => {
  const form = useForm<FormValue>({
    defaultValues: {
      username: "Spider man",
      email: "",
      channel: "",
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValue) => {
    console.log("onsubmit", data);
  };
//...
}
```

``` defaultValue là 1 function async
const form = useForm<FormValue>({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      return {
        username: "Spiderman",
        email: data?.email,
        channel: "",
      };
    },
  });
  const { register, control, handleSubmit, formState } = form;

```

## Nested Object.


# Numeric and Date value.


# getValues, setValue 
- Để lấy value từ field.
- setValue để set value cho field lúc cần, hoặc lúc cần value mặc định.


```
console.log("Get values: ", getValues(["username", "age"]));
setValue("username", "Nguyễn Thanh Dân", {
      shouldValidate: true, // kích hoạt các validate và touch.
      shouldDirty: true,
      shouldTouch: true
    });

```

# TOuched and Dirty.
- touched là field đã được touch.
- dirty là field đã bị tahy đổi value, nếu trả về value cũ thì sẽ là false.

```
const { errors, touchedFields, dirtyFields, isDirty } = formState;


// touchedFields, dirtyFields trả về object các boolean ứng với từng field, false là chưa touched hoặc chưa change.
// isDirty là false khi ko có field nào thay đổi.
console.log("Form touched and dirty: ", touchedFields, dirtyFields, isDirty);

```

# Disable field.
- thêm property là `disabled` vào register options
- khi disable thì value sẽ thàn undefined, các validation cũng sẽ ko có tác dung.


```
<div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              // disabled: true
              disabled: watch("channel") === ""
            })}
          />
        </div>

```


# Handle Submit Error
- Từ form lấy ra hàm handle error : 

```
<form onSubmit={handleSubmit(onHandleSubmit, onErrorSubmit)} noValidate>
</form>

```

# isValid 
- true khi tất cả field true. 
```
const { errors, touchedFields, dirtyFields, isDirty, isValid } = formState;
```

# Form submission state.
- isSubmitting, isSubmitted, isSubmitSuccessful.

```
const { errors, touchedFields, dirtyFields, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful, submitCount } = formState;

```

# reset form 
- hàm reset không nên gọi trong hàm submit , mà nên dùng kết hợp isSubmibsucessful và useEffect.

```
const { control, register, handleSubmit, formState, watch, getValues, setValue, reset } = useForm<FormValue>({
    defaultValues: {
      username: "Spiderman",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date()
    },
  });
```

# async validation.

```
<input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "email not match pattern",
              },
              validate: {
                notAdmin: (value) => {
                  return (
                    value !== "admin@example.com" ||
                    "Enter a different email address."
                  );
                },
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`);
                  const data = await response.json();
                  return data.length || "Email already Existed"
                }
              },
            })}
```

# Mode Validation
- `onSubmit` (mặc định),`onBlur`, `onTouched`, `onChange`, `all`



```
const YoutubeForm = () => {
  const { control, register, handleSubmit, formState, watch, getValues, setValue, reset } = useForm<FormValue>({
    defaultValues: {
      username: "Spiderman",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date()
    },
    mode: "onBlur"
  });
```

# Manually Trigger Validation
- Có thể trigger validate toàn bộ hoặc từng field.
```
const { control, register, handleSubmit, formState, watch, getValues, setValue, reset, trigger } = useForm<FormValue>({
    defaultValues: {
      username: "Spiderman",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date()
    },
    mode: "onBlur"
  });

<button type="button" onClick={() => trigger()}>Trigger Validate</button>
<button type="button" onClick={() => trigger("username")}>Trigger Validate</button>
```