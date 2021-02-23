<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="com/layout-full.xsl"/>

    <xsl:template match="/root">
        <xsl:call-template name="full-layout">
            <xsl:with-param name="usejs"></xsl:with-param>
            <xsl:with-param name="title">Autopub</xsl:with-param>
            <xsl:with-param name="content">
             
                
            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>

</xsl:stylesheet>
