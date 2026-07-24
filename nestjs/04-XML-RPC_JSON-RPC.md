### **XML-RPC và JSON-RPC là gì?**
Cả **XML-RPC** và **JSON-RPC** đều là các giao thức **Remote Procedure Call (RPC)** cho phép ứng dụng gửi yêu cầu từ xa để thực thi các phương thức trên một server. Chúng được sử dụng để giao tiếp giữa các hệ thống, thường là giữa ứng dụng của bạn và một hệ thống bên thứ ba như **Odoo**.

---

## **1. XML-RPC**
- **XML-RPC** là một giao thức RPC sử dụng **XML** để mã hóa dữ liệu và giao tiếp qua **HTTP(S)**.
- Đây là giao thức khá cũ nhưng vẫn được Odoo hỗ trợ.
- Mỗi request được gửi dưới dạng XML và server sẽ trả về response cũng dưới dạng XML.

### **Ví dụ XML-RPC gửi request đến Odoo**
**Request (Client gửi đến Odoo)**
```xml
<?xml version="1.0"?>
<methodCall>
    <methodName>execute_kw</methodName>
    <params>
        <param><value>your_database</value></param>
        <param><value>your_uid</value></param>
        <param><value>your_password</value></param>
        <param><value>res.partner</value></param>
        <param><value>search_read</value></param>
        <param>
            <value><array><data><value><array>
                <data><value><array>
                    <data>
                        <value><string>is_driver</string></value>
                        <value><string>=</string></value>
                        <value><boolean>1</boolean></value>
                    </data>
                </array></value></data>
            </array></value></data></array></value>
        </param>
        <param>
            <value><struct>
                <member>
                    <name>fields</name>
                    <value><array>
                        <data>
                            <value><string>name</string></value>
                            <value><string>phone</string></value>
                        </data>
                    </array></value>
                </member>
            </struct></value>
        </param>
    </params>
</methodCall>
```

**Response (Odoo trả về)**:
```xml
<methodResponse>
    <params>
        <param>
            <value>
                <array>
                    <data>
                        <value>
                            <struct>
                                <member>
                                    <name>name</name>
                                    <value><string>John Doe</string></value>
                                </member>
                                <member>
                                    <name>phone</name>
                                    <value><string>+123456789</string></value>
                                </member>
                            </struct>
                        </value>
                    </data>
                </array>
            </value>
        </param>
    </params>
</methodResponse>
```

🔹 **Ưu điểm của XML-RPC**:
- Chuẩn cũ, nhưng vẫn hỗ trợ tốt trên Odoo.
- Bảo mật tốt hơn khi truyền dữ liệu vì có thể sử dụng SSL.

🔹 **Nhược điểm**:
- **Nặng nề hơn JSON-RPC** vì XML có nhiều ký tự dư thừa.
- **Khó đọc, khó parse hơn JSON-RPC**.

---

## **2. JSON-RPC**
- **JSON-RPC** là một giao thức tương tự **XML-RPC** nhưng sử dụng **JSON** thay vì XML.
- Giao tiếp cũng diễn ra qua **HTTP(S)** nhưng nhẹ hơn và dễ đọc hơn.
- Đây là cách phổ biến hơn khi tích hợp với Odoo hiện nay.

### **Ví dụ JSON-RPC gửi request đến Odoo**
**Request (Client gửi đến Odoo)**
```json
{
    "jsonrpc": "2.0",
    "method": "call",
    "params": {
        "service": "object",
        "method": "execute_kw",
        "args": [
            "your_database",
            2,
            "your_password",
            "res.partner",
            "search_read",
            [[["is_driver", "=", true]]],
            { "fields": ["name", "phone"] }
        ]
    }
}
```

**Response (Odoo trả về)**:
```json
{
    "jsonrpc": "2.0",
    "id": null,
    "result": [
        {
            "name": "John Doe",
            "phone": "+123456789"
        }
    ]
}
```

🔹 **Ưu điểm của JSON-RPC**:
- **Gọn hơn XML-RPC**, giảm băng thông.
- **Dễ đọc và dễ parse hơn** do sử dụng JSON.
- **Tích hợp dễ hơn với các framework hiện đại** như **NestJS**.

🔹 **Nhược điểm**:
- **Odoo có thể hỗ trợ kém hơn XML-RPC trong một số trường hợp** (tuy nhiên vẫn hoạt động ổn với NestJS).

---

## **3. So sánh XML-RPC vs JSON-RPC**
| Tiêu chí         | XML-RPC | JSON-RPC |
|-----------------|---------|----------|
| **Cấu trúc dữ liệu** | XML (rườm rà, nhiều thẻ) | JSON (gọn, dễ đọc) |
| **Hiệu suất** | Chậm hơn do XML nặng | Nhanh hơn do JSON nhẹ |
| **Tính phổ biến** | Cũ, ít dùng ngoài Odoo | Phổ biến hơn, hỗ trợ rộng rãi |
| **Hỗ trợ trên Odoo** | Hỗ trợ lâu đời, ổn định | Hỗ trợ tốt nhưng có thể gặp lỗi với Odoo cũ |
| **Dễ đọc** | Khó đọc | Dễ đọc |

🔹 **Khi nào nên dùng XML-RPC?**
- Nếu bạn cần tích hợp với một hệ thống Odoo cũ (trước Odoo 12).
- Nếu Odoo của bạn có API nào đó chỉ hỗ trợ XML-RPC.

🔹 **Khi nào nên dùng JSON-RPC?**
- Nếu bạn dùng Odoo hiện đại (Odoo 12 trở lên).
- Nếu bạn muốn hiệu suất tốt hơn và dễ tích hợp với **NestJS**.

---

## **4. Cách kết nối với Odoo trong NestJS**
Với **NestJS**, bạn có thể dùng **Axios** để gọi API JSON-RPC một cách dễ dàng.

### **Cài đặt Axios**
```bash
npm install axios
```

### **Gọi API Odoo với JSON-RPC trong NestJS**
```typescript
import axios from 'axios';

class OdooService {
  private baseUrl = 'https://your-odoo-instance.com/jsonrpc';
  private db = 'your_database';
  private username = 'your_username';
  private password = 'your_password';

  async authenticate() {
    const response = await axios.post(this.baseUrl, {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'common',
        method: 'authenticate',
        args: [this.db, this.username, this.password, {}],
      },
    });

    return response.data.result;
  }

  async getDrivers() {
    const uid = await this.authenticate();
    if (!uid) throw new Error('Authentication failed');

    const response = await axios.post(this.baseUrl, {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'object',
        method: 'execute_kw',
        args: [
          this.db,
          uid,
          this.password,
          'res.partner', // Model tài xế trong Odoo
          'search_read',
          [[['is_driver', '=', true]]], // Lọc tài xế
          { fields: ['name', 'phone'] }
        ],
      },
    });

    return response.data.result;
  }
}
```

---

## **Tóm lại: Nên chọn cái nào?**
- **Nếu Odoo của bạn mới (12+) → Dùng JSON-RPC** (gọn nhẹ, dễ dùng).
- **Nếu Odoo của bạn cũ (trước Odoo 12) → Dùng XML-RPC** (ổn định hơn).

Bạn đang dùng phiên bản Odoo nào? Nếu Odoo mới, mình khuyên bạn dùng **JSON-RPC** vì dễ tích hợp với NestJS hơn! 🚀