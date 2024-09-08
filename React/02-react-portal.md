- Khi muốn render bên ngoài #root
- `import {createPortal} from 'react-dom'`
- Cho phép bubble event tới component cha dù bị render ở ngoài component cha.

```
return createPortal(
    <>
        div....

    </>,
    document.getElementById('portal')
)

```