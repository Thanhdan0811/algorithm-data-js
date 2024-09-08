

```
// app.vue
<template>
  <p>simple text</p>
  <navbar
    :pages="pages"
    :active-page="activePage"
    :nav-link-click="(index) => activePage = index"
  >
  </navbar>
  <!-- <page-viewer
    v-if="pages.length > 0"
    :page="pages[activePage]"
  ></page-viewer> -->

  <!-- <create-page :page-created='pageCreated'> -->
  <create-page @page-created='pageCreated'>

  </create-page>

</template>


// CreatePage.vue
<script>
    export default {
        // emits: ['pageCreated'],
        // emits: {
        //     pageCreated({pageTitle, content, link}) {
        //         if(!pageTitle || !content || !link || !published) {
        //             return false;
        //         }
        //     }
        // },
        computed: {
            isFormInvalid() {
                return !this.pageTitle || !this.content || !this.linkText || !this.linkUrl;
            }
        },
        data() {
            return {
                pageTitle: '',
                content: '',
                linkText: '',
                linkUrl: '',
                published: true
            }
        },
        methods: {
            submitForm() {
                if(!this.pageTitle || !this.content || !this.linkText || !this.linkUrl){
                    alert('Please fill the form');
                    return;
                }

                this.$emit('pageCreated', {
                    pageTitle: this.pageTitle,
                    content: this.content,
                    link: {
                        text: this.linkText,
                        url: this.linkUrl
                    },
                    published: this.published
                })

                this.pageTitle = '',
                this.content = '',
                this.linkText = '',
                this.linkUrl = '',
                this.published = true
            }
        },
        watch: {
            pageTitle(newTitle, oldTitle) {
                if(this.linkText === oldTitle) {
                    this.linkText = newTitle
                }
            }
        }
    }
</script>

```

# global event custom
- event custom không thể bubble lên , mún truyền lên cần truyền từ con lên cha , r từ cha lên ông.....
- Để thuận tiện ta sẽ tự tạo custom.

- Tạo file Event.js
```
// utils/Event.js
const events = new Map();

export default {
    $on(eventName, fn) {
        if(!events.has(eventName)) {
            events.set(eventName, [])
        }

        events.get(eventName).push(fn)
    },

    $off(eventName, fn) {
        throw {message : 'Not implement'}
    },

    $emit(eventName, data) {
        if(events.has(eventName)) {
            events.get(eventName).forEach(fn => fn(data))
        }
    }
}
```

- add Event vào config của app : `app.config.globalProperties.$bus = $bus;`

```
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import $bus from "./utils/Events";

const app = createApp(App);


app.config.globalProperties.$bus = $bus;

app.mount('#app');

```

- Sử dụng ở children : `"$bus.$emit('navbarLinkActived', index)"`
- Ở component cần lắng nghe event : 
```
// NavbarLink.vue
<template>
  <li>
    <!-- <a
      href=""
      class="nav-link"
      :class="activeClasses"
      aria-current="page"
      :href="page.link.url"
      :title="`This link goes to the ${page.link.text} page`"
      @click.prevent="$emit('actived')"
      >{{ page.link.text }} -->
    <a
      href=""
      class="nav-link"
      :class="activeClasses"
      aria-current="page"
      :href="page.link.url"
      :title="`This link goes to the ${page.link.text} page`"
      @click.prevent="$bus.$emit('navbarLinkActived', index)"
      >{{ page.link.text }}
    </a>
  </li>
</template>


// app.vue
created() {
    this.getPages();

    this.$bus.$on('navbarLinkActived', (index) => {
      this.activePage = index;
    })

  }
```