- Checking unexp thì bắt buộc phải khai báo try catch.
- UnChecking unexp thì ko bắt buộc.
- FileNotFoundException là extends từ IOException.

```
catch(Exception ex) {
    System.err.println(ex.getMessage());
    ex.printStackTrace();
}

```