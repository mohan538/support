$(document).ready(function(){
				
	var div = $("<div />");
	div.html(GetDynamicTextBox(""));
	$("#TextBoxContainer").append(div);
	
	$('table').on('click', 'tr.parent .fa-chevron-down', function(){
		$(this).closest('tbody').toggleClass('open');
	});
	$("#filterdiv").css("display", "none");
	$("#scfilterdiv").css("display", "none");
	$('#options').click(function() {
		$("#filterdiv").toggle(500);
	});
	$('#scoptions').click(function() {
		$("#scfilterdiv").toggle(500);
	});
	$('#btnFilter').click(function() {
		filterTable();
	});
	$('#scbtnFilter').click(function() {
		scfilterTable();
	});
	$(".trhide").css("display", "none");
	$(".cchild").css("display", "none");
	$('.parent').click(function() { // toggle single by click
		var trElem = $(this).closest("tr");
		trElem.nextAll('tr').each(function() {
			if ($(this).is('.parent')) {
				return false;
			}
			$(this).toggle(500);
		});
	});
	$('#expand_all').click(function() { // show all
		$(".trhide").css("display", "table-row");
		$(".cchild").css("display", "table-row");
		$(".parent").css("display", "table-row");
	});
	$('#collaps_all').click(function() { // hide all
		$(".trhide").css("display", "none");
		$(".cchild").css("display", "none");
	});	
	
	//dynamic field adding
	$("#btnAdd").bind("click", function () {
		var div = $("<div />");
		div.html(GetDynamicTextBox(""));
		$("#TextBoxContainer").append(div);
	});
	$("#btnGet").bind("click", function () {
		
		var valid = true;
		var values = "";
		var searchValues = [];
		var rows=[];
		$("input[name=DynamicTextBox]").each(function () {
			values = $(this).val();
			if(values == null || values.length<1){
				alert("input is mandatory"); 
				valid = false;
			}
			searchValues.push(values);
		});
		if(valid)
			rows = searchTable(searchValues);
		
		getFilterItems(true,rows);
		});
/////////////////////////////////////////////////////////////////////////////////////
		
	////////////////////////////////////////////////////////
	$("body").on("click", ".remove", function () {
		$(this).closest("div").remove();
	});

	
	$('#export').on('click', function() {    
		var data_type = 'data:application/vnd.ms-excel';
		var table_div = document.getElementById('foo');
		var table_html = table_div.outerHTML.replace(/ /g, '%20');

		var a = document.createElement('a');
		a.href = data_type + ', ' + table_html;
		a.download = 'ExcelExport.xls';
		a.click();
	});

	$('#btnExport').on('click', function() {    
		
		var data_type = 'data:application/vnd.ms-excel';
		var table_div = document.getElementById('myTable');
		//var table_html = table_div.outerHTML.replace(/ /g, '%20');
		var table_html = table_div.outerHTML

		var a = document.createElement('a');
		xData = new Blob([table_html], { type: 'text/csv' });
		var xUrl = URL.createObjectURL(xData);
		a.href = xUrl;
		a.download = 'ExcelExport.xls';
		a.click();
	});
	
	$('#entry').delay(5000).fadeOut();
	$('#actbody').delay(5000).fadeIn('slow');
	
	$('#ParentChart').hide();
	
});

function filterTable(){
		
		var value = $( "#myList" ).val();
		var start = $( "#startDate" ).val();
		var end = $( "#endDate" ).val();
		var checkDate = false;
		if(start != undefined && start != null && start.length >0 
			&& end != undefined && end != null && end.length >0){
			checkDate = true;
		}
		var input, filter, filter1, table, tr, td, i;
		table = document.getElementById("foo");
		tr = table.getElementsByTagName("tr");
		
		var display = false;
		for (i = 0; i < tr.length; i++) {
			
			td = tr[i].getElementsByTagName("td")[1];
			if (td) {
				display = false;
					if (td.innerHTML.trim().toLowerCase() === value.toLowerCase() || value.toLowerCase() ==='all') {
						display = true;
					}
			} else {
				display = false;
				tr[i].style.display = "none";
			}
			
			td = tr[i].getElementsByTagName("td")[2];
			if (td) {
				if(checkDate){
					var date = td.innerHTML.trim();
					if(date != undefined && date != null && date.length>0){
						display = dateValidation(date);
					}else{
						display = false;
					}
				}
			}
			if (display) {
					tr[i].style.display = "none";
					var k=i-2;
					tr[k].style.display = "";
					k=i-1;
					tr[k].style.display = "none";					
				} else {
					tr[i].style.display = "none";
				}
		}
}

function scfilterTable(){
		var value = $( "#scmyList" ).val();
		var start = $( "#startDate" ).val();
		var end = $( "#endDate" ).val();
		var checkDate = false;
		if(start != undefined && start != null && start.length >0 
			&& end != undefined && end != null && end.length >0){
			checkDate = true;
		}
		var input, filter, filter1, table, tr, td, i;
		table = document.getElementById("foo");
		tr = table.getElementsByTagName("tr");
		
		var display = false;
		for (i = 0; i < tr.length; i++) {
			
			td = tr[i].getElementsByTagName("td")[3];
			if (td) {
				display = false;
					if (td.innerHTML.trim().toLowerCase() === value.toLowerCase() || value.toLowerCase() ==='all') {
						display = true;
					}
			} else {
				display = false;
				tr[i].style.display = "none";
			}
			
			td = tr[i].getElementsByTagName("td")[2];
			if (td) {
				if(checkDate){
					var date = td.innerHTML.trim();
					if(date != undefined && date != null && date.length>0){
						display = dateValidation(date);
					}else{
						display = false;
					}
				}
			}
			if (display) {
					tr[i].style.display = "none";
					var k=i-4;
					tr[k].style.display = "";
					k=i-1;
					tr[k].style.display = "none";					
					k=i-2;
					tr[k].style.display = "none";
					k=i-3;
					tr[k].style.display = "none";
				} else {
					tr[i].style.display = "none";
				}
		}
}
function dateValidation(date) {
    var start = $( "#startDate" ).val();
	var end = $( "#endDate" ).val();
    var date = new Date(date);
      d1   = date.getTime();
      d2   = new Date(start).getTime();
      d3   = new Date(end).getTime();

   if (d1 > d2 && d1 < d3) {
       return true;
   }else{
       return false;
   }
}

function searchTable(searchValues){
	//**************************
	$('#ParentChart').hide();
	$('#ParentChart').show(3000);
	$('#piechart').hide(2000);
	
	var filteredRows=[];
	var input, filter, filter1, table, tr, td, i;
	table = document.getElementById("myTable");
	tr = table.getElementsByTagName("tr");
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[3];
		if (td) {
			var display = false;
			for(var searchText =0;searchText<searchValues.length;searchText++) {
				if (td.innerHTML.trim().toLowerCase() === searchValues[searchText].trim().toLowerCase()) {
					display = true;
				}else{
					var hasSlash = td.innerHTML.indexOf("/");
					if(hasSlash != -1){
						var text1 = td.innerHTML.split("/")[1];
						if (text1 != null && text1 != undefined && text1.trim().toLowerCase() === searchValues[searchText].trim().toLowerCase()) {
							display = true;
						}
					}
				}
			}
			if (display) {
				tr[i].style.display = "";
				//need this rows
				filteredRows.push(tr[i]);
			} else {
				tr[i].style.display = "none";
			}
		}
	}
	return filteredRows;
	//****************************
}

var count = 1;
function GetDynamicTextBox(value) {
	return '<input name = "DynamicTextBox" type="text" value = "' + value + '" />&#160;' +
			'<input type="button" value="Remove" class="remove" />'
}

function reset(){
	$('#ParentChart').hide();
	$('#piechart').show();
	$("#TextBoxContainer").empty();
	$("#btnAdd").click();
	var table, tr, td, i;
	table = document.getElementById("myTable");
	tr = table.getElementsByTagName("tr");
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[1];
		tr[i].style.display = "";
	}
}
