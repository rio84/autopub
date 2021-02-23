<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- import 的东西都是比较固定的类库，所以不带版本号不清缓存也是合理的 -->
    
    
    <xsl:variable name="staticbase" select="/root/staticbase"/>

    <xsl:variable name="sitemap" select="document(concat('/xsl/com/sitemap.xml?v=',/root/assetversion))/root"/>

    <xsl:variable name="env" select="/root/env" />
    
    <xsl:variable name="site_brand">Autopub</xsl:variable>
    <xsl:variable name="origin" select="$sitemap/origin[@env = $env and @for= $site_brand]"/>

    <xsl:template match="*" name="common-cnzz">
    </xsl:template>


    <xsl:template match="*" name="common-header">
        <xsl:param name="callby"/>
        <link rel="dns-prefetch" href="http://i.oxm1.cc"/>
        <link rel="dns-prefetch" href="//a.oxm1.cc"/>
        <link rel="dns-prefetch" href="//l.oxm1.cc"/>

        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta content="unsafe-url" name="referrer"/>

        <meta name="author" content="杭州声罄科技有限公司"/>
        <meta name="description" content="{$site_brand} - 自助建站,模板建站,低成本建站,让你体验一键建站的便捷;"/>
        <meta name="keywords" content="公众号,自助建站,模板建站,移动站点,一键建站,智能建站,云建站" />

        <meta name="xmldata" content="env={env},oss_host={oss_host},img_host={img_host},assetversion={assetversion},ts_q={sys/ts_q}"/>
        <link rel="shortcut icon" href="/img/autopub.ico" type="image/x-icon"/>
        <link href="{$origin}/img/{$site_brand}.png" rel="apple-touch-icon-precomposed"/>
        <xsl:if test="$callby != 'system'">
            <link rel="stylesheet" href="{$staticbase}/css/index.css?v={/root/assetversion}" />
        </xsl:if>
<style src="src-common-header">
@font-face{font-family:iconfont;src:url(//at.alicdn.com/t/font_156358_kbjs9hrp9y.eot);src:url(//at.alicdn.com/t/font_156358_kbjs9hrp9y.eot?#iefix) format('embedded-opentype'),url(//at.alicdn.com/t/font_156358_kbjs9hrp9y.woff2) format('woff2'),url(//at.alicdn.com/t/font_156358_kbjs9hrp9y.woff) format('woff'),url(//at.alicdn.com/t/font_156358_kbjs9hrp9y.ttf) format('truetype'),url(//at.alicdn.com/t/font_156358_kbjs9hrp9y.svg#iconfont) format('svg')}.iconfont{font-family:iconfont;font-style:normal}html.popup-show{overflow:hidden}body{padding:0;margin:0;-webkit-font-smoothing:antialiased;color:#333;text-align:center}body,button,input,select,textarea{font:14px/1.5 tahoma,arial,'Hiragino Sans GB','Helvetica Neue',Helvetica,'Microsoft Yahei','\5b8b\4f53',sans-serif}li,ul{list-style:none}dd,dl,dt,li,ul{margin:0;padding:0}a{color:#00B7FF;text-decoration:none}a:hover{color:#f3ab26}.hidden{display:none!important}.momofox{font-size:0}.openxsl{font-weight:400;font-size:18px}.openxsl .iconfont{font-size:32px;float:left;margin-right:5px}.momofox-logo{height:50px;width:120px;background:url(https://i.oxm1.cc/uploads/585ddffec9ac184572606aa8/img/29flnfedmTk3qpm7c6Rpeh3A1zvr-461.jpg) no-repeat 0 center;background-size:auto 100%;margin-top:-5px}input[type=date],input[type=datepicker],input[type=datetime-local],input[type=datetime],input[type=email],input[type=number],input[type=password],input[type=search],input[type=text],input[type=time],input[type=url],select:not([multiple]),textarea{height:34px;border-radius:1px;border:solid 1px #f9f9f9;padding:0 5px;outline-color:gold;font-family:arial,sans-serif;font-size:14px;letter-spacing:1px;background-color:#fafaf1}input[type=search]{-webkit-appearance:textfield}textarea{height:auto}input[type=datepicker]{background:#fafbf1 url(https://i.oxm1.cc/uploads/git/wurui/img/29r3hcrnaTjs8vou2iR2q9yA155-1000.svg) no-repeat right center}.buttonlike,button{padding:5px 20px;border-radius:1px;border:solid 1px #999;background-color:#ececec;color:#333;font-size:14px}.buttonlike:hover,button:hover{background-color:#ddd;color:#111}button:disabled{color:#666;background:#ccc}input[type=button]{background-color:#f5f5f5;border:solid 1px #ccc;border-radius:1px;color:#222}input[type=button]:hover{background-color:#eee;box-shadow:0 0 1px #999;color:#000}.buttonlike{display:inline-block;padding:2px 10px;font-size:12px;height:20px;line-height:20px}textarea{resize:vertical}
</style>
    </xsl:template>

    <xsl:template match="/root" name="admin-nav">
<style src="src-admin-nav">header{background-color:#393;box-shadow:0 1px 1px #666;min-width:1250px;position:relative;z-index:10}.admin-nav{margin:0 auto;position:relative;z-index:10;text-align:left;height:40px;line-height:40px;color:#fff;font-size:14px;min-width:1100px;padding:10px}.admin-nav a{color:inherit}.admin-nav a:hover{color:#fa0}.multi-menu{padding:1px}.multi-menu dt{text-indent:12px;padding-right:5px}.multi-menu dd{font-size:13px;display:none;background-color:#f8f8f8;text-indent:7px}.multi-menu dd:hover{background-color:#e9e9e9}.multi-menu dd a{display:inline-block;width:100%;color:#333}.multi-menu dd.line{height:1px;font-size:0;background-color:#ececec}.multi-menu:hover{border:solid 1px #f9f9f9;box-shadow:0 0 2px #666;padding:0}.multi-menu:hover dt{color:#fa0}.multi-menu:hover dd{display:block}.admin-nav-menu{float:right;height:30px;margin-top:5px}.admin-nav-menu li{height:30px;float:left;margin-right:10px;min-width:94px;line-height:30px;text-indent:12px}.admin-nav-menu li .iconfont{font-size:1.2em}.admin-nav-menu li:hover dt{background-color:#f8f8f8}.admin-nav-main marquee a{margin-right:30px}.admin-nav-logo{display:inline-block;margin-right:20px;font-size:20px;float:left}.admin-nav-logo img{vertical-align:top}.user-avatar{border-radius:0;vertical-align:middle;width:24px;height:24px}</style>
        <xsl:variable select="login/developer" name="is_developer"/>
        <header>
            <nav class="admin-nav">
                <ul class="admin-nav-menu">
                    <xsl:for-each select="$sitemap/top/i">
                        <xsl:variable name="role" select="attribute::role" />
                        <xsl:if test="not($role) or $role = 'developer' and $is_developer">
                            <li>
                                <xsl:choose>
                                    <xsl:when test="count(tabs/i) &gt; 0">
                                        <dl class="multi-menu">
                                            <dt>
                                                <a href="{$origin}{path}"><i class="iconfont"><xsl:value-of select="icon" /></i>&#160;
                                                <xsl:value-of select="title" /></a>
                                            </dt>
                                            <xsl:for-each select="tabs/i">
                                                <xsl:variable name="role2" select="attribute::role" />
                                                <xsl:if test="not($role2) or $role2 = 'developer' and $is_developer">
                                                    <dd><a href="{$origin}{path}"><xsl:value-of select="title" /></a></dd>
                                                </xsl:if>
                                            </xsl:for-each>
                                        </dl>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        
                                        <a href="{$origin}{path}"><i class="iconfont"><xsl:copy-of select="icon" /></i>&#160;
                                        <xsl:value-of select="title" /></a>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </li>
                        </xsl:if>
                    </xsl:for-each>

                

                    <xsl:choose>
                        <xsl:when test="login/uid">
                            <li class="user-info menu-user">
                                <dl class="multi-menu">
                                    <dt>
                                        <a href="{$origin}/user/login">
                                            <i class="iconfont">&#xe61a;</i>&#160;<xsl:value-of select="login/nick"/>
                                        </a>
                                    </dt>
                                    <xsl:for-each select="$sitemap/layout/user/i">
                                        <dd>
                                            <a href="{$origin}{path}"><xsl:value-of select="title" /></a>
                                        </dd>
                                    </xsl:for-each>
                                    <dd class="line"></dd>
                                    
                                    <dd>
                                        <a href="/user/logout">退出登录</a>
                                    </dd>
                                </dl>
                            </li>
                        </xsl:when>
                        <xsl:otherwise>
                            <li class="user-info menu-user">
                                <i class="iconfont">&#xe667;</i>&#160;
                                <a href="/user/login">登录</a>
                            </li>
                        </xsl:otherwise>
                    </xsl:choose>


                </ul>
                <div class="admin-nav-main">

                    <span class="admin-nav-logo">
                        <a href="/">
                            <span class="weixinpush">
                                <svg style="margin-top:-5px;vertical-align:top;" width="50" height="50" 
                                     viewBox="0 0 1000 1000" version="1.1"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <style>
                                        polygon{fill:#fff;}
                                        polygon:hover{fill:#fc0;}
                                    </style>
                                    <polygon stroke="#333" stroke-width="2" points="150,200 400,300 500,100 600,300 850,200 700,450, 500,350 300,450"/>
                                    <polygon stroke="#333" stroke-width="2" points="100,600 350,600 500,900 650,600 900,600 500,400">
                                    </polygon>
                                </svg>
                                Autopub
                            </span>
                        </a>
                    </span>
                    <xsl:if test="sys/notify/i">
                        <marquee behavior="scroll" width="360"  height="30" onmouseover="this.stop()" onmouseout="this.start()">
                            <xsl:for-each select="sys/notify/i">
                                <a href="{action}" class="notify-type-{type}"><xsl:value-of select="msg"/></a>
                            </xsl:for-each>
                        </marquee> 
                    </xsl:if>
                    
                </div>
            </nav>
        </header>
    </xsl:template>
    <xsl:template match="*" name="common-login">
        
        <xsl:if test="not(login/uid)"><script>location.href='/user/login'</script></xsl:if>
        
    </xsl:template>
    <xsl:template match="*" name="common-footer">
        <xsl:param name="usejs"/>
       <xsl:call-template name="common-script">
           <xsl:with-param name="usejs" select="$usejs"/>
       </xsl:call-template>

        <xsl:call-template name="common-beian-cnzz"/>
    </xsl:template>

    <xsl:template match="*" name="common-beian-cnzz">
        <xsl:if test="not(q/iniframe)">
        <style>
            footer{
                padding:10px 10px;
                font-size:12px;
                color:#666;
                margin-top: 10px;
            }

            footer a{
                color:inherit;

            }
            footer  img{
                vertical-align: middle;
            }
        </style>
        <footer>
            <div class="copyright">
                <span>© 2017 - 2021 <a href="http://www.cenchin.com">杭州声罄科技有限公司</a> 版权所有</span>
                <span>
                    &#160;&#160;&#160;&#160;
                    <a href="http://beian.miit.gov.cn" target="_blank">浙ICP备15031769号-10</a>
                    &#160;&#160;&#160;&#160;
                    联系我们: <a href="mailto:ox@cenchin.com">ox@cenchin.com</a>
                </span>
            </div>
                       
                <!--
                <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011002011272">
                    <img src="{$staticbase}/img/beian.png"/><font color="#939393">浙公网安备 33011002011272号</font>
                </a>
                &#160;&#160;&#160;&#160;-->
                
            
            <xsl:call-template name="common-cnzz"/>
        </footer>
        </xsl:if>
    </xsl:template>

    <xsl:template match="*" name="common-script">
        <xsl:param name="usejs"/>
        <script><![CDATA[customElements.define("ox-time",class extends HTMLElement{static get observedAttributes(){return["value","format"]}constructor(){super()}set value(e){if(this.shadowRoot){var t=function(e){return e>=0&&e<10?"0"+e:e},a=(e=e||this.getAttribute("value"),this.getAttribute("format")||"yyyy-MM-dd hh:mm"),r="";if(e)if("ago"==a)for(var n,o=new Date(e-0),i=Math.round((new Date-o)/1e3),s=i>0?"前":"后",u=[{gte:31536e3,text:"{n}年"},{gte:2592e3,text:"{n}个月"},{gte:86400,text:"{n}天"},{gte:3600,text:"{n}小时"},{gte:60,text:"{n}分钟"},{gte:1,text:"{n}秒"}],l=0;n=u[l++];){var h=Math.abs(i);if(h>=n.gte){var c=Math.round(h/n.gte);r=n.text.replace("{n}",c)+s;break}}else{var g=new Date(e-0),d=(new Date).getFullYear(),p=g.getFullYear();r=a.replace(/yyyy([^\?]?)\?/,d==p?"":function(e,t){return p+""+t}).replace(/yy([^\?]?)\?/,d==p?"":function(e,t){return p.toString().substring(2,4)+t}).replace("yyyy",p).replace("yy",p.toString().substring(2,4)).replace("MM",t(g.getMonth()+1)).replace("M",g.getMonth()+1).replace("dd",t(g.getDate())).replace("d",g.getDate()).replace("hh",t(g.getHours())).replace("h",g.getHours()).replace("mm",t(g.getMinutes())).replace("m",g.getMinutes()).replace("ss",t(g.getSeconds())).replace("s",g.getSeconds())}this.shadowRoot.querySelector("span").textContent=r}}connectedCallback(){if(!this.shadowRoot){var e=this.attachShadow({mode:"open"}),t=document.createElement("span");e.appendChild(t),this.value=this.getAttribute("value")}}attributeChangedCallback(){this.shadowRoot&&(this.value=this.getAttribute("value"))}}),customElements.define("ox-timeinput",class extends HTMLElement{constructor(){super()}get name(){return this.getAttribute("name")}set value(e){var t,a=function(e){return e>=0&&e<10?"0"+e:e},r="00:00";if(e=e||this.getAttribute("value")){var n=new Date(e-0);t=n.getFullYear()+"-"+a(n.getMonth()+1)+"-"+a(n.getDate()),r=a(n.getHours())+":"+a(n.getMinutes())}this.shadowRoot.querySelector('input[type="date"]').value=t,this.shadowRoot.querySelector('input[type="time"]').value=r}get value(){var e=this.shadowRoot.querySelector('input[type="date"]').value,t=this.shadowRoot.querySelector('input[type="time"]').value;return new Date(e+"T"+t).getTime()}connectedCallback(){if(!this.shadowRoot){var e=this.attachShadow({mode:"open"}),t=document.createElement("input");t.type="date",t.max="2999-12-31";var a=document.createElement("input");if(a.type="time",t.style.fontSize=a.style.fontSize="12px",e.appendChild(t),e.appendChild(a),this.value=this.getAttribute("value"),this.name){for(var r=this;"form"!=r.tagName.toLowerCase();)r=r.parentNode;r&&(r[this.name]=this)}}}attributeChangedCallback(){this.value=this.getAttribute("value")}});
              ]]> </script>
        <xsl:if test="sys/ts_q">
        <script>!function(delta){if( delta > 10000 ){location.reload(true)}}((new Date) - <xsl:value-of select="sys/ts_q"/>)</script></xsl:if>
        <xsl:if test="$usejs">
            <script>window.QueryString={<xsl:for-each select="q/*">'<xsl:value-of select="name(.)"/>':'<xsl:value-of select="."/>',</xsl:for-each>}</script>
            <script src="//l.oxm1.cc/3rd/jquery.js"></script>
            <xsl:choose>
                <xsl:when test="/root/system/id"><script data-main="/{/root/system/id}/js/page/{$usejs}.js" src="//l.oxm1.cc/3rd/require.js"></script></xsl:when>
                <xsl:otherwise><script data-main="{$staticbase}/js/page/{$usejs}.js" src="//l.oxm1.cc/3rd/require.js"></script></xsl:otherwise>
            </xsl:choose>
            
            <script>
                var $staticbase='<xsl:value-of select="$staticbase"/>';
                var $assetversion='<xsl:value-of select="/root/assetversion"/>';
                require.config({
                    urlArgs: function(id, url) {
                        if (url.indexOf('l.oxm1.cc') > -1) {
                            return ''
                        }
                        return '?v='+$assetversion;
                    },
                    paths: {
                        mustache: '//l.oxm1.cc/3rd/mustache',
                        jquery: '//l.oxm1.cc/3rd/jquery',
                        oxm:'/oxm/'
                    }
                });
            </script>

        </xsl:if>
    </xsl:template>

</xsl:stylesheet>
