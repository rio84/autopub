<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="./common.xsl" />
    <xsl:output method="html" doctype-public="" encoding="UTF-8"/>
    <xsl:template match="/root" name="full-layout">
        <xsl:param name="title" />
        <xsl:param name="content" />
        <xsl:param name="usejs" />
        <xsl:param name="tab" />
        <xsl:param name="forcelogin">T</xsl:param>
        <xsl:variable name="sitemap_full" select="$sitemap/layout/full"/>
        <xsl:variable name="pathserial" select="h/pathserial" />

        <xsl:variable name="current_channel" select="$sitemap_full/i[@name = $pathserial]" />
        <xsl:variable name="current_group" select="h/group" />
        <xsl:variable name="current_group_id" select="substring-after(h/xslpath,'/')" />

        <xsl:variable name="current_channel_title" select="$current_channel/attribute::title"/>
        <xsl:variable name="home_href" select="$current_channel/attribute::home"/>
   
        <html layout="full" lang="zh-CN">
            <head>
                <xsl:call-template name="common-header" />
                <title><xsl:value-of select="$title"/> - <xsl:value-of select="$site_brand"/></title>
            </head>
            <body>
                
                <style>
                    body{
                        background-image:linear-gradient(#f2f2f2, #f2f2f2), linear-gradient(#ccc, #ccc);
                        background-size:199px 100%, 1px 100%;
                        background-repeat:repeat-y;
                        background-position:0 0,199px 0;
                    }
                </style>

                <xsl:if test="$forcelogin = 'T'"><xsl:call-template name="common-login"/></xsl:if>
                <xsl:call-template name="admin-nav"/>

                <aside style="position:sticky;top:0px;width:200px;float:left;padding:0px 0;text-align:left;">
                    <h2 style="text-align:center;font-size:16px;margin:0;padding:10px 28px;box-shadow:0 1px 1px #ccc;">
                        
                        <xsl:if test="$home_href">
                            <a href="{$home_href}" class="bt-up" title="返回上级">
                                <i class="iconfont">&#xe67e;</i>
                            </a>
                        </xsl:if>
                        <xsl:choose>
                            
                            <xsl:when test="$current_channel_title = 'pjtitle'">
                                <xsl:value-of select="data/project/name"/>
                            </xsl:when>
                            <xsl:when test="$current_channel_title = 'pagetitle'">
                                <xsl:value-of select="data/page/title"/>
                            </xsl:when>
                            <xsl:when test="$current_channel_title = 'chntitle'">
                                <xsl:value-of select="data/chn/title"/>
                            </xsl:when>

                            
                            
                            <xsl:when test="$current_channel_title = 'ds'">
                                
                                <xsl:value-of select="data/ds/title"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="$current_channel_title"/>
                            </xsl:otherwise>
                        </xsl:choose>
                        
                        
                    </h2>
                    <div class="tabbar" style="" id="J_tabs">
                        
                        <xsl:for-each select="$current_channel/i">
                            <a href="{href}">
                                
                                <xsl:if test="$tab = attribute::name">
                                    <xsl:attribute name="class">tabbar-item-on</xsl:attribute>
                                </xsl:if>
                                <xsl:if test="icon"><big class="iconfont"><xsl:copy-of select="icon"/></big>&#160;</xsl:if>
                                <xsl:value-of select="title"/>
                            </a>
                        </xsl:for-each>
                    </div>
                </aside>

               
                <main style="margin-left:220px;padding-right:20px;background-color:#fff;text-align:left;min-height:400px;">
                    <xsl:if test="error">
                    <h2 style="color:red;text-align:center;">
                        <xsl:value-of select="error"/>
                    </h2>
                    </xsl:if>

                    <style>
                        .tabbar{margin-top:10px;}
                        .tabbar a{
                            display:inline-block;
                            line-height:20px;
                            padding:8px 0px;
                            
                            font-size:14px;
                            width:100%;
                            text-indent:32px;
                        }
                        .tabbar-item-on,
                        .tabitem-<xsl:value-of select="$tab"/>{
                            color:#f90;
                            font-weight:700;
                            
                        }
                        .tabbar-item-on .iconfont{font-weight:400;}
                        .tabbar-item-on:before,
                        .tabitem-<xsl:value-of select="$tab"/>:before{
                            position:absolute;
                            content:'\3009';
                            font-size:12px;
                            color:#f90;
                            text-indent:0;
                            margin-left:140px;
                        }

                        .section-tabs{
                            height:30px;
                            border-bottom:solid 1px #333;
                            font-size:14px;
                            margin-bottom:15px;
                        }
                        .section-tabs a{
                            color:inherit;
                        }
                        .section-tabs>span:hover{
                            opacity:.7;
                        }
                        .section-tabs>span{
                            display:inline-block;
                            height:29px;
                            line-height:30px;
                            padding:0 20px;
                            background-color:#f9f9f9;
                            vertical-align:bottom;
                            border-right:solid 1px #ececec;
                            border-top:solid 1px #fff;
                            min-width:50px;
                            text-align:center;
                        }
                        .section-tabs>span.section-tab-current{
                            color:#fff;
                            background-color:#333;
                            border-top-color:#333;
                            font-weight:700;
                        }
                    </style>
                    
                    <xsl:if test="$title !='' ">
                        <h1 class="pagetitle" style="margin:0;padding:10px 0;margin-bottom:10px;"><xsl:value-of select="$title"/></h1>
                    </xsl:if>
                    <xsl:copy-of select="$content"/>
                </main>
                <xsl:call-template name="common-script">
                    <xsl:with-param name="usejs" select="$usejs"/>
                </xsl:call-template>
            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
