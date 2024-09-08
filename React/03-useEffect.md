- cleanup function sẽ được gọi trước khi unmounted. và đc gọi trước callback.
- clean ảnh trước khi chọn ảnh mới.


```
window.dispatchEvent(
    new CustomEvent(`lesson-${id}`, {
        detail: 'Nội dung comment'
    })
);

window.addEventListener('lesson-1', handleDetail)

```

