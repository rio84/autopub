<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="../com/layout-full.xsl"/>

    <xsl:template match="/root">
        <xsl:call-template name="full-layout">
            <xsl:with-param name="usejs"></xsl:with-param>
            <xsl:with-param name="title">用户登录</xsl:with-param>
            <xsl:with-param name="tab">login</xsl:with-param>
            <xsl:with-param name="content">
            	<xsl:choose>
            		<xsl:when test="login/uid">
            			<p style="color:#333;font-size:15px;border:solid 1px #090;padding:10px;">
            				<b><xsl:value-of select="login/nick"/></b> 欢迎登录!
            			</p>
            		</xsl:when>
            		<xsl:otherwise>
            			<xsl:if test="data/result = 0">
	            			<p style="color:#f10;font-size:12px;border:solid 1px #ccc;padding:10px;">用户名或密码错误</p>
	            		</xsl:if>
            			<form method="POST">
		             		<table class="form-section">
		                        <tbody>
		                            <tr>
		                                <td>用户名</td>
		                                <td><input name="name" value="{data/submit/name}" type="text"/></td>
		                            </tr>
		                            <tr>
		                                <td>密&#160;&#160;&#160;码</td>
		                                <td><input name="pwd" value="{data/submit/pwd}" type="password"/></td>
		                            </tr>
		                            <tr>
		                                <td></td>
		                                <td>
		                                	<button>提&#160;&#160;&#160;&#160;交</button>
		                                	&#160;&#160;&#160;&#160;
		                                	<a href="register">注册</a>

		                            	</td>
		                            </tr>
		                        </tbody>
		                    </table>
		                    
		                </form>
            		</xsl:otherwise>
            	</xsl:choose>
  
             	
                
            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>

</xsl:stylesheet>
