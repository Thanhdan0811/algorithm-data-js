- Dùng vòng lặp v-for directive : v-for='link of links'
- dùng cặp {{}} để truyền value.
- để bind data attribute : __v-bind:href="link.url" hoặc :href="link.url"__
- VÍ dụ thêm => :title='`This link goes to ${link.text} page`'
- Cấp key cho v-for : v-for="link, index of links" :key="index"



# Event Setting Up
- __v-on:click="" hoặc @click=""__
- @click.prevent="activePage =  index"
- @click.prevent="changeTheme"
- set event.
- khi thay đổi data sẽ load lại update content, UI.


# Binding CSS
```

<a
    class="nav-link"
    :class="{active: activePage === index}"
    :class="{'navbar-light bd-light': !userDarkNavBar, ... }
    :class="[useDarkNavbar ? 'bg-dark' : 'bg-light', 'navbar']"
    :class="[`nav-${theme}`, `navbar-${theme}`]"
>

</a>

```

# Computed Properties.

```
Vue.createApp({
    computed: {
        navbarClasses() {
            return {
                'navbar-light': !this.useDarkNavbar,
                '....
            }
        }
    },
    data() {
        return {
            useDarkNavbar: false,
            ....
        }
    },
    methods: {
        changeTheme() {

        }
    }
})


```

- Ta không dùng navbarClasses ở data return, vì khi chạy nó sẽ là giá trị khởi tạo. class sẽ ko đc cập nhật giá trị true false khi this.useDarkNavbar thay đổi.
- Ta dùng computed để theo dõi sự thay đổi this.useDarkNavbar.
