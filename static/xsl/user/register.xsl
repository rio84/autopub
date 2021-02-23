<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="../com/layout-full.xsl"/>

    <xsl:template match="/root">
        <xsl:call-template name="full-layout">
            <xsl:with-param name="usejs"></xsl:with-param>
            <xsl:with-param name="title">用户注册</xsl:with-param>
            <xsl:with-param name="tab">register</xsl:with-param>
            <xsl:with-param name="content">
             	<xsl:choose>
                    <xsl:when test="data/allow">
                        <form method="POST">
                            <table class="form-section">
                                <tbody>
                                    <tr>
                                        <td>用&#160;户&#160;名</td>
                                        <td><input name="name" type="text"/></td>
                                    </tr>
                                    <tr>
                                        <td>密&#160;&#160;&#160;&#160;&#160;码</td>
                                        <td><input name="pwd" type="password"/></td>
                                    </tr>
                                    <tr>
                                        <td>密码确认</td>
                                        <td><input type="password"/></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <button>提&#160;&#160;&#160;&#160;交</button>
                                            &#160;&#160;&#160;&#160;
                                            <a href="login">登录</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </xsl:when>
                    <xsl:otherwise>
                        <h3>未开放注册，请联系已注册用户</h3>
                    </xsl:otherwise>
                </xsl:choose>
                
                
            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>

</xsl:stylesheet>
