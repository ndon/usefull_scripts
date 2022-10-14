var PROXY_ADDRESS="SOCKS5 127.0.0.1:10800"
var DEFAULT_PROXY_SERVER=""

var config={
    no_proxy:{
        prefixIpList:[
            "10.",
            "100."
        ],
        suffix:[
            "huawei.com"
        ]
    },
    proxy:{
        prefixIpList:[
            "138.128.27.218","198.255.82.91", "185.38.13.130",
            "23.225.233.3"
        ],
        suffix:[
            "google.com",
            "googleapis.com",
            "googleusercontent.com",
            "googleblog.com",
            "google.com.hk",
            "google.co.jp",
            "google.co.uk",
            "gstatic.com",
            "sstatic.com",
            "sstatic.net",
            "youtube.com",
            "youtu.be",
            "ggpht.com",
            "ytimg.com",
            "blogger.com",
            "fuchsia.dev",
            "typography.com",
            "chromestatus.com",
            "googlesource.com",
            "googlevideo.com",
            "dartpad.dev",
            "dart.dev",
            "flutter.dev",
            "android.com",
            "golang.org",
            "go.dev",
            "firebase.com",
            "firebaseio.com",
            // twitter
            "twitter.com",
            "twimg.com",
            "t.co",
            // 91
            "91porn.com",
            "91p52.com",
            "91p48.com",
            "91p20.space",
            // facebook
            "facebook.com",
            "fbcdn.net",
            "facebook.net",
            "instagram.com",
            "cdninstagram.com",
            // other
            "pornhub.com",
            "phncdn.com",
            "pornhubpremium.com",
            "phprcdn.com",
            "icfcdn.com",
            "naiadsystems.com",
            "youporn.com",
            "ypncdn.com",
            "medium.com",
	        "reddit.com",
            "redditstatic.com",
            "redditmedia.com",
            "redd.it",
            "inoreader.com",
            "quora.com",
            "quoracdn.net",
            "v2ray.com",
            "ycombinator.com",
            // github
            "githubassets.com",
            "github.io",
            "github.com",
            "githubusercontent.com",
            "amazonaws.com",
            "telegram.org",
            "imgur.com",
            // microsoft
            "aspnetcdn.com",
            "live.com",
            "torrentkitty.tv",
            "wikipedia.org",
            "go.dev",
            "microsoftedgeinsider.com",
            "microsoft.com",
            "msauth.net",
            "azureedge.net",
            "privoxy.org",
            "notepad-plus-plus.org",
            "vuejs.org",
            "vimeo.com",
            "mobx.js.org",
            "chrome.com",
            "w3schools.com",
            "fontawesome.com",
            "stripe.com",
            "dev.to",
            "typora.io",
            "v2ex.com"
        ]
    }
}

function constructSuffixBaseNameMap(){
    config.proxy.suffixBaseNameMap={}
    var proxySuffixLen = config.proxy.suffix.length;
    for(var i=0;i<proxySuffixLen;i++){
        var hostname = config.proxy.suffix[i]
        config.proxy.suffixBaseNameMap[hostname] = true
    }
    config.proxy.suffix = null;
    config.no_proxy.suffixBaseNameMap={}
    var noProxySuffixLen = config.no_proxy.suffix.length;
    for(var i=0;i<noProxySuffixLen;i++){
        var hostname = config.no_proxy.suffix[i]
        config.no_proxy.suffixBaseNameMap[hostname] = true
    }
    config.no_proxy.suffix = null;
}

function hostIsIp(host){
    return IP_REGEX.test(host)
}

function isInPrefixIpList(ip, prefixIpList){
    var prefixIpListLen = prefixIpList.length;
    for(var i=0;i<prefixIpListLen;i++){
        var ipPrefix=prefixIpList[i];
        if (ip.startsWith(ipPrefix)){
            return true
        }
    }
    return false;
}
function isMatchHostMap(host, suffixBaseNameMap){
    var baseName=getBaseName(host);
    return suffixBaseNameMap[baseName]===true
}


function getBaseName(host){
    var hostLen=host.length;
    var twoPartIndex = lastIndexOf(host,".", 2)
    var baseName = host.substring(twoPartIndex+1)
    if(baseName==="com.hk"||baseName=="js.org"||baseName=="co.jp"){
        threePartIndex = lastIndexOf(host,".",3);
        baseName=host.substring(threePartIndex+1)
    }
    return baseName;
}
function lastIndexOf(str, searchChar, position){
    var strLen=str.length;
    var findedPosition=0;
    for(var i=strLen-1; i>=0; i--){
        if(str[i]===searchChar){
            findedPosition++;
            if(findedPosition===position){
                return i;
            }
        }
    }
    return -1;
}
function __changeDefaultProxy(proxy){
    return DEFAULT_PROXY_SERVER=proxy;
}

var IP_REGEX=/[0-9]+(\.[0-9]+){3}/;
constructSuffixBaseNameMap();
try{
    module.exports={
        "FindProxyForURL":FindProxyForURL,
        "hostIsIp":hostIsIp,
        'PROXY_ADDRESS':PROXY_ADDRESS,
        "__changeDefaultProxy":__changeDefaultProxy
    }
}catch(e){}

function FindProxyForURL(url, host) {
    if(hostIsIp(host)){
        if(isInPrefixIpList(host, config.no_proxy.prefixIpList)){
            return "DIRECT";
        }else if(isInPrefixIpList(host, config.proxy.prefixIpList)){
            return PROXY_ADDRESS;
        }
    }else{
        if (isMatchHostMap(host, config.no_proxy.suffixBaseNameMap)){
            return "DIRECT";
        }else if(isMatchHostMap(host, config.proxy.suffixBaseNameMap)){
            return PROXY_ADDRESS;
        }
    }
    if(DEFAULT_PROXY_SERVER===""){
        return "DIRECT";
    }else{
        return DEFAULT_PROXY_SERVER;
    }
}