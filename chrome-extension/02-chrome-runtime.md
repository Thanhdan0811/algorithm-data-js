- chrome.runtime.getURL(path)

# chrome.runtime API 
- lấy thông tin vể service worker.
- trả vể thông tin chi tiết cửa manifest và lắng nghe và respond với các events trong extension lifecycle.
- Ta có thể dùng API này để convert relative path của URL thành full URL hợp lệ.


```
if (tabs[0].url.search("aliexpress.com") != -1) {
    path = "resources/image/icon-enabled.png";
    var a = chrome.runtime.getURL(path);
    chrome.browserAction.setIcon({ path: a });
    chrome.browserAction.setPopup({ popup: "resources/html/enabledPopUp.html" });
}

```
- icon-enabled.png : là file trong thư mục extension.
- biến a : sẽ lưu full URL dẫn đến icon-enabled.
