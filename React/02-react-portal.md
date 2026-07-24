- Khi muốn render bên ngoài #root
- `import {createPortal} from 'react-dom'`
- Cho phép bubble event tới component cha dù bị render ở ngoài component cha.

```jsx
// Modal.jsx
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

// App.jsx
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      >
        <h2>Modal Title</h2>
        <p>This content is rendered through a portal!</p>
      </Modal>
    </div>
  );
}

// index.html
<div id="root"></div>
<div id="modal-root"></div>
```

// CSS cho modal
```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 4px;
  max-width: 500px;
}
```

Trong ví dụ trên:
1. Modal component sử dụng createPortal để render nội dung vào div có id="modal-root"
2. Mặc dù Modal được render ở ngoài DOM tree của App, các event vẫn bubble up bình thường
3. Modal có thể được đóng bằng cách click nút Close hoặc click bên ngoài modal
4. CSS được sử dụng để tạo overlay và style cho modal

```
return createPortal(
    <>
        div....

    </>,
    document.getElementById('portal')
)

```