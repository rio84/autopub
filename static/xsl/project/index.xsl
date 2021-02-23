<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="../com/layout-full.xsl"/>

    <xsl:template match="/root">
        <xsl:call-template name="full-layout">
            <xsl:with-param name="usejs">project/index</xsl:with-param>
            <xsl:with-param name="title">项目列表</xsl:with-param>
            <xsl:with-param name="tab">index</xsl:with-param>
            <xsl:with-param name="content">
            	<xsl:choose>
            		<xsl:when test="list/i">
            			
            		</xsl:when>
            		<xsl:otherwise>
            			
            		</xsl:otherwise>
            	</xsl:choose>
<style>
[data-status]{}
[data-status]:before{
	content:'\20';
	display:inline-block;
	width:6px;
	height:6px;
	border-radius:50%;
	background-color:#ececec;
	border:solid 1px #999;
	box-shadow:0 0 1px #000;
	margin-right:2px;

}
[data-status="on"]{}
[data-status="on"]:before{
	background-color:#0f0;
	border-color:#090;	
}
[data-static]{color:darkcyan;}
[data-static="T"]{color:darkgoldenrod;}
.action{display:inline-block;height:20px;line-height:20px;width:20px;padding:5px;overflow:hidden;background-color:#dcdcdc;border-radius:10px;color:darkblue;white-space:nowrap;transition:all .2s;}
.action:before{content:'\e662';font-family:iconfont;font-size:20px;}
.action:hover{width:180px;color:#f90;}
.action>b{display:inline-block;margin-left:10px;}

[data-action]{font-family:iconfont;}
[data-action="restart"]:before{content:'\e670';color:#09c;}
[data-action="stop"]:before{content:'\e63c';color:#f10;}
[data-action="start"]:before{content:'\e622';color:#090;}

</style>
  			<table class="list-table">
  				<thead>
  					<tr>
  						
  						
  						<th width="200">项目名</th>
  						<th width="120">端口</th>
  						<th width="120">部署版本</th>
  						<th width="100">主机数</th>
  						<!--
  						<th width="80">所有者</th>-->
  						<th></th>
  					</tr>
  				</thead>
  				<tbody>

	  				<xsl:for-each select="data/list/i">
	  					<xsl:sort select="name" data-type="string" order="" case-order="" lang="" />
	  					<tr>
	  						
	  						<td>
	  							<span data-static="{static}">
	  								<xsl:value-of select="name"/>
	  							</span>
	  							<xsl:if test="dirname != name">
	  								&lt;<xsl:value-of select="dirname"/>&gt;
	  							</xsl:if>
	  							
	  						</td>
	  						
	  						
	  						<td>
	  							<xsl:if test="port and port != ''">
	  								<span class="J_port" data-value="{port}" data-status=""><xsl:value-of select="port"/></span>
	  							</xsl:if>
	  						</td>
	  						<td><xsl:value-of select="version"/></td>
	  						<td><xsl:value-of select="hostcount"/></td>
	  						<!--
	  						<td><xsl:value-of select="owner"/></td>-->
	  						<td>
	  							<xsl:if test="port and port != ''">
		  							<span data-dir="{dirname}" class="J_action action">
		  								<!--
	  									<b onclick="UIAction(this)" data-action="restart" class="linklike">重启</b>
	  									<b onclick="UIAction(this)" data-action="stop" class="linklike">停机</b>
	  									<b onclick="UIAction(this)" data-action="start" class="linklike">启动</b>-->
		  							</span>
		  						</xsl:if>
	  						</td>
	  					</tr>
	  				</xsl:for-each>
	  			</tbody>
	  			<tfoot>
	  				<tr>
	  					<td colspan="4">
	  						目录<xsl:value-of select="data/dir"/>
	  					</td>
	  					<td colspan="1">
	  						<xsl:value-of select="count(data/list/i)"/>个项目
	  					</td>
	  				</tr>
	  			</tfoot>
  			</table>
  			<br/><br/><br/><br/><br/><br/><br/><br/>
             	
                
            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>

</xsl:stylesheet>
