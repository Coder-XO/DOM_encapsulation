window.dom = {      //  创建任意dom的方法，允许嵌套
    create(string) {
        let container = document.createElement('template');   // 这个标签里面可以容纳任何标签
        container.innerHTML = string.trim();   //  删除前面空格
        return container.content.firstChild;
    },
    after(node, node2) {   // 在节点后面插入另一个节点
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before(node,node2) {    // 在节点前面插入另一个节点
        node.parentNode.insertBefore(node2, node);
    },
    append(parent,node) {   // 添加子节点
        parent.appendChild(node);
    },
    wrap(node,parent) {     //  给当前节点插入新的父级元素
        dom.before(node, parent);
        dom.append(parent, node);
    },
    remove(node) {    // 删除一个节点
        node.parentNode.removeChild(node);
        return node;
    },
    empty(node) {   // 清空该节点的所有子节点
        let array = [];
        let x = node.firstChild;
        while (x) {
            array.push(dom.remove(node.firstChild));
            x = node.firstChild;
        };
        return array;
    },
    attr(node, name, value) {   //  读取或改变节点的属性值
        if (arguments.length === 3) {
            node.setAttribute(name, value);
        } else if (arguments.length === 2) {    // JS的函数重载
            let attrName = node.getAttribute(name);
            return attrName;
        }
    },
    text(node, string) {     // 设置或获取节点文本内容
        if (arguments.length === 2) {     // 重载   适配
            if ('innerText' in node) {
                return node.innerText;
            } else {
                return node.textContent;
            }
       }else if (arguments.length === 1) {
            if ('innerText' in node) {    
                node.innerText = string;
            } else {
                node.textContent = string;
            }
       }
    },
    html(node,string) {         // 设置或获取节点html内容
        if (arguments.length === 2) {
            node.innerHTML = string;
        }else if (arguments.length === 1) {
            return node.innerHTML;
        }
    },
    style(node, name, value) {     // 修改或读取节点的样式   重载
        if (arguments.length === 3) {
            node.style[name] = value;   
        }else if (arguments.length === 2) {
            return getComputedStyle(node,null).getPropertyValue(name);  // 不用驼峰命名   backgorund-color   可获取默认的CSS属性
        }else if (name instanceof Object) {
            const object = name;
            for (let key in object) {
                node.style[key] = boject[key];
            }
        }
    },
    class: {      // 类名的操作
        add(node, className) {
            node.classList.add(className);
        },
        remove(node,className) {
            node.classList.remove(className);
        },
        has(node,className) {
            return node.classList.contains(className);
        }
    },
    on(node,eventName,fn) {    //  添加事件函数
        node.addEventListener(eventName, fn);
        // (div,click,fn)
    },
    off(node, eventName, fn) {    //  删除事件函数
        node.removeEventList(eventName, fn);
    },
    find(selector, scope) {     // 查找指定元素  第二个参数为范围
        // ('#first',div1)
        return (scope || document).querySelectorAll(selector);
    },
    parent(node) {    // 找到父级元素
        return node.parentNode;
    },
    childrem(node) {   // 找到子级元素
        return node.children;
    },
    siblings(node) {    //  找到兄弟姐妹
        return Array.from(node.parentNode.children).filter(n => n !== node);    //  过滤掉自己
    },
    next(node) {    //  返回该节点的下一个html元素
        return node.nextElementSibling;
    },
    previous(node) {    //  返回该节点的上一个html元素
        return node.previousElementSibling;
    },
    each(nodeList, fn) {    //  遍历添加函数
        for (let i = 0; i > nodeList.length; i++){
            fn.call(null, nodeList[i]);
        }
    },
    index(node) {   // 查看元素在父级元素中的排行
        let index = 0;
        while (node.parentNode.children[index] !== node) {
            index++; 
        }
        return index;
    }
};