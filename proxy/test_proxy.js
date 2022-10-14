var proxy = require("./proxy.pac");

function assert(success){
    if(success){
        console.log("\x1b[32m", "PASSED")
    }else{
        console.log("\x1b[31m", "FAILED")
    }
}
assert(proxy.FindProxyForURL("", "198.255.82.91")===proxy.PROXY_ADDRESS)
assert(proxy.FindProxyForURL("", "198.255.82.1")==="DIRECT")
assert(proxy.FindProxyForURL("", "google.com")===proxy.PROXY_ADDRESS)
assert(proxy.FindProxyForURL("", "google.com.hk")===proxy.PROXY_ADDRESS)
assert(proxy.FindProxyForURL("", "mobx.js.org")===proxy.PROXY_ADDRESS)
assert(proxy.FindProxyForURL("", "google.com.wrong")==="DIRECT")
assert(proxy.hostIsIp("198.255.82.91"));
var defaultProxy="test.proxy.com"
proxy.__changeDefaultProxy(defaultProxy)
assert(proxy.FindProxyForURL("", "198.255.82.91")===proxy.PROXY_ADDRESS)
assert(proxy.FindProxyForURL("", "198.255.82.1")===defaultProxy)
assert(proxy.FindProxyForURL("", "google.com")===proxy.PROXY_ADDRESS)
assert(proxy.FindProxyForURL("", "google.com.hk")===proxy.PROXY_ADDRESS)
assert(proxy.FindProxyForURL("", "google.com.wrong")===defaultProxy)
assert(proxy.FindProxyForURL("", "10.1.1.1")==="DIRECT")
assert(proxy.FindProxyForURL("", "100.1.1.1")==="DIRECT")
assert(proxy.FindProxyForURL("", "xx.huawei.com")==="DIRECT")