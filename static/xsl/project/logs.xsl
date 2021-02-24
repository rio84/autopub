<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="../com/layout-full.xsl"/>

    <xsl:template match="/root">
        <xsl:call-template name="full-layout">
            <xsl:with-param name="usejs">project/logs</xsl:with-param>
            <xsl:with-param name="title">系统日志</xsl:with-param>
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
<p>
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
		</p>
		<div id="J_Container">
		</div>

		<script><![CDATA[
		    ]]>
		</script>
		             	
                
            </xsl:with-param>
        </xsl:call-template>
    </xsl:template>

</xsl:stylesheet>
