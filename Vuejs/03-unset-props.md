- Set giá trị default cho props.

```
<!-- PageViewer.vue -->
<template>
    <div class="container">
        <h1>{{ page?.pageTitle }}</h1>
        <p>{{ page?.content }}</p>
    </div>
</template>

<script>
export default {
    // props: ['page'],
    props: {
        page: {
            type: Object,
            default(rawProps) {
                return {
                    pageTitle: '',
                    content: ''
                }
            }
        }
    },

}
</script>
```