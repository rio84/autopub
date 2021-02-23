<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="com/layout-full.xsl"/>
    <!--
    <xsl:template match="*" mode="combo">
        msg:<xsl:value-of select="."/>
    </xsl:template> -->
    <xsl:template match="/root">
        <xsl:call-template name="full-layout">
            <xsl:with-param name="usejs"></xsl:with-param>
            <xsl:with-param name="title">PAGE NOT FOUND</xsl:with-param>
            <xsl:with-param name="content">
                <div class="mid-main">
                    <h1>404
                        <br/>page not found
                    </h1>
                    <xsl:if test="q/backurl">
                        <h3>
                            check url again:`
                            <script>document.write(decodeURIComponent('<xsl:value-of select="q/backurl"/>'))
                            </script>
                            `
                        </h3>
                    </xsl:if>
                </div>

            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>

</xsl:stylesheet>
