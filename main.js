//初始化数据
var hashA = init()
var keys = hashA['keys']
var hash = hashA['hash']
//2.生成键盘
generateKeyboard(keys, hash)
//3.监听用户动作
listenToUser(hash)
listenToInput()
// search()
searchQuestion()
function getFromLocalStorage(name){
    return JSON.parse(localStorage.getItem('name'||'null'))
}

function tag(tagName,attributes){
    var element = document.createElement(tagName)
    for(var key in attributes){
    //key为className,textContent
        element[key] = attributes[key]
    }
    return element
}
//span
function createSpan(textContent){
    var span = tag('span')
    span.textContent = textContent
    span.className = "text"
    return span
}
function createButton(id){
    var button = tag('button')
    button.textContent = 'E'
    button.id = id
    button.onclick = function(e){
        // e.target 就是用户点击的元素
        var button2 = e.target
        var img2 = button2.previousSibling
        var key = button2['id'] // q w e r t
        var x = prompt('给我一个网址') // qq.com
        hash[key] = x  // hash 变更
        img2.src = 'http://'+x + '/favicon.ico'
        img2.onerror = function(e){
            e.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
        }
        localStorage.setItem('aaa', JSON.stringify(hash))
    }
    return button
}
function createImage(domain){
    var img = tag('img')
    if(domain)
        {
            img.src = 'http://'+domain+'/favicon.ico'
        }else{
            img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
        }
    img.onerror =function(e){
            e.target.src='//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    return img
}
//初始化
function init(){
    var keys ={
        '0': {0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',length:10},
        '1': {0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l',length:9},
        '2': {0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m',length:7},
        'length': 3
    }
    var hash = {'q': 'qq.com',i:'iconfont.cn', 'w': 'weibo.com',v:'v2ex.com',j:'www.json.org',
    s:'segmentfault.com',l:'leetcode.com','t':'twitter.com','b': 'baidu.com', 'g': 'google.com', 
    'z': 'zhihu.com',d:'dabblet.com',e:'bilibili.com',r:'developer.mozilla.org',y:'ele.me',u:'tool.lu'
    ,o:'jianshu.com',p:'jingdong.com',a:'juejin.im',m:'mp.weixin.qq.com'}
    //取出 localStorage 中的 aaa 对应的 hash
    var hashInLocalStorage = getFromLocalStorage('aaa')
    if (hashInLocalStorage){
        hash = hashInLocalStorage
    }
    return{
            "keys": keys,
            "hash": hash
    }
}
//生成键盘
function generateKeyboard(keys, hash){
     //遍历keys,生成kbd标签
    for(var i=0;i < keys['length'];i++){
        var div = tag('div',{className:'row'})
        wrapper.appendChild(div)
        var row = keys[i] //第一个数据，第二个数组，第三个数组
        for(var j =0;j < row['length'];j++)
        {
            var span = createSpan(row[j])
            //kdb里添加button
            var button = createButton(row[j])
            //kbd里添加img
            var img = createImage(hash[row[j]])
            var kbd = tag('kbd',{className:'key'})
            kbd.appendChild(span)
            kbd.appendChild(img)
            kbd.appendChild(button)
            div.appendChild(kbd)
        }
    }
}
function listenToUser(hash){
    document.onkeypress = function(e){
            var key = e.key //获取键值
            var website = hash[key]
            window.open('http://'+website,'_blank')
        }

    // }
}
//*****************搜索功能
    function listenToInput(){
        var input = document.getElementById('content')
        input.onkeypress = function(e){
            //监听回车按钮搜索
            if(e.charCode === 13){
                    var content = document.getElementById('content').value
                    var question = 'https://www.baidu.com/s?tn=99006304_1_oem_dg&isource=infinity&wd=' + content
                    window.open(question,'_blank')
                }else{
                    e.stopPropagation()
            }
        }
    }
    
    //用户点击搜索
    function searchQuestion(){	
        //使用百度搜索		
        function searchByBaidu(){
            var clickBaidu = document.getElementById('btnBaidu')
            clickBaidu.onclick = function(e){
                var content = document.getElementById('content').value
                open("http://www.baidu.com/s?wd=" + content, "_blank");
                 }
            }
            //使用谷歌搜索
        function searchByGoogle(){
                var clickGoogle = document.getElementById('btnGoogle')
                clickGoogle.onclick = function(e){
                    var content = document.getElementById('content').value
                    var question = 'https://www.google.com/search?q=' + content
                    window.open(question,'_blank')		
                }
            }
        searchByBaidu()
        searchByGoogle()
    }

