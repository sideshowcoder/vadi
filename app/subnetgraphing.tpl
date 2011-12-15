<TABLE>
<TR>
<TD>
<SELECT SIZE=30 onchange="if (this.selectedIndex > 0) document.location.href='/subnet-report/' + this.value;">
% for report in reports:
    <OPTION VALUE="{{reports[report].name}}">{{reports[report].name}}</OPTION>
% end
</SELECT>
</TD>
<TD>
% if image != None:
    <img src="{{image}}"/>
% else:
    No image data for report
% end
</TD>
<TD>
% if text != None:
    <textarea rows=30 cols=60>{{text}}</textarea>
% else:
    No report text for report
% end</TD>
</TABLE>
