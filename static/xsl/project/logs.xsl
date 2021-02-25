<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="../com/layout-full.xsl"/>

    <xsl:template match="/root">
        <xsl:call-template name="full-layout">
            <xsl:with-param name="usejs">project/logs</xsl:with-param>
            <xsl:with-param name="title">
            	<xsl:choose>
            		<xsl:when test="q/appname and q/appname !='' "><xsl:value-of select="q/appname"/> - 应用日志</xsl:when>
            		<xsl:otherwise>系统日志</xsl:otherwise>
            	</xsl:choose>
            </xsl:with-param>
            <xsl:with-param name="tab">logs</xsl:with-param>
            <xsl:with-param name="content">
<style>
    body{
        font-family: sans-serif;
    }
    .log{
        margin:5px 0;
        font-size:12px;

    }
    div#J_Container{
        border:solid 3px sienna;
        border-radius: 10px;;
        padding:10px;
        background-color: beige;
        color:green;
    }
</style>

				<div>
					<input type="hidden" value="{q/appname}" id="J_appname"/>
					Limit:
					<select id="J_Limit">
					    <option>10</option>
					    <option>20</option>
					    <option>50</option>
					    <option>100</option>
					</select>
					&#160;&#160;&#160;&#160;&#160;&#160;
					Refresh Delay:
					<select id="J_Refresh">
					    <option value="1000">Normal</option>
					    <option value="200">Quick</option>
					    <option value="0">NO Delay</option>
					    <option value="10000">Slow</option>
					</select>
				</div>
				<div id="J_Container">
				</div>

            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>

</xsl:stylesheet>
