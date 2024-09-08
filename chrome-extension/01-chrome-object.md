- chrome.tabs.onActivated.addListener

## chrome api
- chrome là API dùng cho extension.

## chrome.tabs API
- chrome.tabs API để tương tác với các browser's tab system.
- tabs API có thể được dùng bởi service worker hoặc extension pages. nhưng ko dùng được trong content scripts.
- tabs API ngoài chức năng thao tác và quản lý tabs, còn có thể detect được language của tab, take screenshot và communicate với tab's content scripts.

## chrome.tabs.onActivated.addListener 
- chrome.tabs.onActivated.addListener(callback: function)
- callback => (activeInfo: object) =>  void
- activeInfo : {tabId: number, windowId: number}


- được kích khi mà active tab trong window thay đổi.
- URL của tab có thể chưa được set tại thời điểm event được kích.
- Nhưng ta có thể listen event onUpdated để được notified khi URL được set.


## chrome.tabs.query
- syntax : chrome.tabs.query(queryInfo: object, callback?: function,)
- queryInfo: {
    active: boolean => các tabs đang active trong các cửa sổ windows,
    currentWindow: boolean => Các tabs đang ở window hiện tại.
    ...
}
- callback: (result: Tab[])=>void
- RETURNS : Promise<Tab[]> : Promises được hỗ trợ ở Manifest V3 về sau. nhưng callback được cung cấp để hỗ trợ khả năng tương thích.(compatibility)

- Lấy tất cả các tabs có properties được nêu cụ thể, hoặc tất cả tabs nếu không đề cập properties.


```

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        if (tabs[0].url.search("aliexpress.com") != -1) {}


<!-- manifest.json file  -->
"permissions"       :   ["tabs", "activeTab"],


```

- Muốn dùng tabs[0].url cần phải khai báo tabs trong permission trong file manifest.json 