gb.cafe.view.CafeItemTemplate = new Ext.XTemplate(
    '<div style="float: left; padding-right: 10px; padding-left:10px;"><img height="32" src="images/<tpl if="Enabled == 1">roundtick.png</tpl><tpl if="Enabled == 0">roundcross.png</tpl>"></div>' +
    '<div style="float: left;"><div class="cafelist_cafename">{Name}</div><div class="cafelist_cafeaddress">{Address}</div></div><div style="float: right; padding-right: 4px;"><table border="0"><tr><td valign="middle"><img src="images/mappin.png">{Distance}</td></tr></table></div>'
    );