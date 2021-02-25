

var PageControl = function( o ){
    var Page = function( o ){
        this.id = o.id;
        this.tabId = o.pageControl.tabAreaId+"_tabId_"+ o.id;
        this.pageId = o.pageControl.pageAreaId+"_pageId_"+ o.id;
        this.closeId = o.pageControl.pageAreaId+"_tabCloseId_"+ o.id;
        this.src = o.src;
        this.title = o.title;
        this.close = _tabCloseHtml(this);
        this.tab =  _tabHtml( this );
        this.page =  _pageHtml( this );
    }

    var _pageControlHtml = function(o){
        let pageControlElement = document.createElement("div");
        pageControlElement.setAttribute("id", o.id);
        let tabAreaElement = document.createElement("ul");
        tabAreaElement.setAttribute("id", o.tabAreaId);
        tabAreaElement.setAttribute("style", "display: flex; list-style: none");
        pageControlElement.append(tabAreaElement);
        let pageAreaElement = document.createElement("div");
        pageAreaElement.setAttribute("id", o.pageAreaId);
        pageAreaElement.setAttribute("style", "border: 1px solid;");
        pageControlElement.append(pageAreaElement);
        return pageControlElement;
    }

    var _tabHtml = function(o){
        let tabElement = document.createElement("li");
        tabElement.setAttribute("id", o.tabId);
        tabElement.setAttribute("page", o.pageId);
        tabElement.setAttribute("close", o.closeId);
//        tabElement.innerText = o.title;
        let titleElement = document.createElement("a");
        titleElement.innerText = o.title;
        tabElement.appendChild(titleElement);
        tabElement.appendChild(o.close);
        return tabElement;
    }

    var _tabCloseHtml = function(o){
        let closeElement = document.createElement("a");
        closeElement.setAttribute("id", o.closeId);
        closeElement.innerText = "X";
        return closeElement;
    }

    var _pageHtml = function(o){
        let pageElement = document.createElement("div");
        pageElement.setAttribute("id", o.pageId);
        let iframeElement = document.createElement("iframe");
        iframeElement.setAttribute("id", o.pageId);
        iframeElement.setAttribute("src", o.src);
        iframeElement.setAttribute("width", "100%");
        iframeElement.setAttribute("height", "100%");
        pageElement.appendChild(iframeElement);
        return pageElement;

    }
    this.id = o.id;
    this.pageControlId = this.id+"_pageControl";
    this.tabAreaId = this.pageControlId+"_tabArea";
    this.pageAreaId = this.pageControlId+"_pageArea";
    this.target = o.target;
    this.height = o.height;
    this.pages = [];
    this.selectedPage = null;

    document.getElementById(this.target).appendChild(_pageControlHtml(this));

    this.add = function(o){
        let page = this.findPageId(o.id);
        if(page){
            this.selectPage(page);
        }else{
            o.pageControl = this;
            page = new Page(o);
            page.tab.addEventListener("click", function(){
                if(document.getElementById(this.id)){
                    for(let item of document.getElementById(this.id).parentElement.children){
                        item.classList.remove("active");
                    }
                    let page = document.getElementById(this.getAttribute("page"));
                    for(let item of page.parentElement.children){
                        item.classList.remove("inactive");
                        item.classList.remove("active");
                        item.classList.add("inactive");
                    }
                    this.classList.add("active");
                    page.classList.add("active");
                    page.classList.remove("inactive");
                }

            });

            page.close.addEventListener("click", function(){
                let deleteTab = this.parentElement;
                let deletePage = document.getElementById(deleteTab.getAttribute("page"));


                if(deleteTab.classList.contains("active")){
                    for(let item of document.getElementById(deleteTab.id).parentElement.children){
                        item.classList.remove("active");
                    }
                    let page = document.getElementById(deleteTab.getAttribute("page"));
                    for(let item of page.parentElement.children){
                        item.classList.remove("inactive");
                        item.classList.remove("active");
                        item.classList.add("inactive");
                    }
                    let tab = deleteTab.previousSibling ? deleteTab.previousSibling : deleteTab.nextSibling;

                    if(tab != null){
                        tab.classList.add("active");
                        let page = document.getElementById(tab.getAttribute("page"));
                        page.classList.add("active");
                        page.classList.remove("inactive");
                    }
                }
                deleteTab.remove();
                deletePage.remove();
            });
            document.getElementById(this.tabAreaId).appendChild(page.tab);
            document.getElementById(this.pageAreaId).appendChild(page.page);
            this.selectPage(page.tab);
            this.pages.push(page);
        }
    }
    this.findPageId = function(tabId){
        return document.getElementById(this.tabAreaId+"_tabId_"+tabId);
        for(let page of this.pages){
            if(page.id == tabId){
                return page;
            }
        }
        return null;
    }
    this.selectPage = function(tab){
        for(let item of document.getElementById(tab.id).parentElement.children){
            item.classList.remove("active");
        }
        let page = document.getElementById(tab.getAttribute("page"));
        for(let item of page.parentElement.children){
            item.classList.remove("inactive");
            item.classList.remove("active");
            item.classList.add("inactive");
        }
        tab.classList.add("active");
        page.classList.add("active");
        page.classList.remove("inactive");
    }
}