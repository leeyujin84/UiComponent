

var PageControl = function( o ){
    var Page = function( o ){
        this.id = o.id;
        this.tabId = o.pageControlId+"_tabId_"+ o.id;
        this.pageId = o.pageControlId+"_pageId_"+ o.id;
        this.src = o.src;
        this.title = o.title;
        this.pageControlId = o.pageControlId;
        this.tab =  _tabHtml( this );
        this.page =  _pageHtml( this );

        this.show = function(){
            document.querySelectorAll("li[id^='"+this.pageControlId+"_tabId']").forEach(function(item){
                item.classList.remove("active");
                item.addEventListener("click", function(){
                    for(let children of this.parentElement.children){
                        children.classList.remove("active")
                    }
                    this.classList.add("active");

                    let page = document.getElementById(this.getAttribute("page"))
                    for(let children of page.parentElement.children){
                        children.classList.remove("inactive")
                        children.classList.remove("active")
                        children.classList.add("inactive");
                    }
                    page.classList.add("active");
                    page.classList.remove("inactive");

                })

            })
            document.querySelectorAll("div[id^='"+o.pageControlId+"_pageId']").forEach(function(item){
                item.classList.remove("inactive");
                item.classList.remove("active");
                item.classList.add("inactive");
            })
            document.getElementById(this.tabId).classList.add("active");
            document.getElementById(this.pageId).classList.add("active");
            document.getElementById(this.pageId).classList.remove("inactive");
        }
        this.remove = function(){

        }
    }

    var _pageControlHtml = function(o){
        return '    <div id="'+o.id+'_pageControl" style="height: '+o.height+'; width: 100% border: 1px solid">\n' +
            '      <ul id="'+o.tabAreaId+'" style="display: flex; list-style: none"></ul>\n' +
            '      <div id="'+o.pageAreaId+'" style="border: 1px solid; padding-top: 20px"></div>\n' +
            '    </div>\n'
    }

    var _tabHtml = function(o){
        return '<li id="'+o.tabId+'" page="'+o.pageId+'">'+o.title+'</li>';
    }
    var _pageHtml = function(o){
        return '<div id="'+o.pageId+'" style="border: 1px solid; height: 600px">\n' +
               '          <iframe src="'+o.src+'" width="100%" height="100%"></iframe>\n' +
               '        </div>';

    }
    this.id = o.id;
    this.tabAreaId = o.id+"_pageControl_tabArea";
    this.pageAreaId = o.id+"_pageControl_pageArea";
    this.target = o.target;
    this.height = o.height;
    this.pages = [];
    this.selectedPage = null;

    document.getElementById(o.id).innerHTML = _pageControlHtml(this);

    this.add = function(o){
        let page = this.findPage(o.id)
        if(page){
            page.show();
        }else{
            o.pageControlId = this.id;
            page= new Page(o);
            console.log(page);
            document.getElementById(this.tabAreaId).innerHTML +=  page.tab;
            document.getElementById(this.pageAreaId).innerHTML +=  page.page;
            page.show();
            this.pages.push(page);
        }
    }
    this.remove = function(tabId){
        let page = this.findPage(o.id)

    }
    this.findPage = function(tabId){
        for(let page of this.pages){
            if(page.id == tabId){
                return page;
            }
        }
        return null;
    }
    this.onChange = o.onchange;
}