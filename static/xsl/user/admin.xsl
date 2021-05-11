<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="../com/layout-full.xsl"/>

    <xsl:template match="/root">
        <xsl:call-template name="full-layout">
            <xsl:with-param name="usejs"></xsl:with-param>
            <xsl:with-param name="title">用户管理</xsl:with-param>
            <xsl:with-param name="tab">admin</xsl:with-param>
            <xsl:with-param name="forcelogin">T</xsl:with-param>
            <xsl:with-param name="content">

            
    			<p style="color:#333;font-size:15px;border:solid 1px #090;padding:10px;">
    				<b><xsl:value-of select="login/nick"/></b> 以下是授权码
    			</p>
    			<div>
    				<br/>
    				<input type="text" size="50" readonly="readonly" value="{data/authcode}" placeholder="点击生成新的授权码"/>
    				<br/><br/>
    				
    				<form method="post">
    					<input type="hidden" name="act" value="new"/>
	    				<button>生成新的授权码</button>
	    			</form>
		    		
    			</div>
  

            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>

</xsl:stylesheet>
