$(function(){
if($('body.inpatients').length){

	//DECLARE VARIABLES
		var ID = '';
		  	function set_id(x){ID = x};
	// alert('in inpatients.js');
	refreshgrid('nil');

	// STYLING
	$('#divFields').hide();

	// BUTTONS
	$('#bNew').click(function(){
			var first_name = $('#first_name').val();
			var last_name = $('#last_name').val();
			var c_number = $('#c_number').val();
			var ward = $('#ward').val();
			var diagnosis = $('#diagnosis').val();
			// Create strong parameter
			form_data ={inpatient: {'first_name': first_name, 'last_name': 
							last_name, 'c_number': c_number, 
					  	    'ward': ward, 'diagnosis': diagnosis}}

			//VALIDATION
				if (last_name == '') {
					alert('Please enter a Last Name');
					return false;
				};

			$.ajax({
				url: '/inpatients/new2',
				type: 'POST',
				data: form_data,
				datatype: 'json'
			}).done(function(data){
				refreshgrid();
				clearFields();
				$('#divFields, #bEdit, #bNew, #bDelete, #bBack').hide();

			}).fail(function(){
				alert('Error in invoicenew');
			});
		});
	$('#bEdit').click(function(){

	});

	$('#bSearch').click(function(){
			var first_name = $('#s_first_name').val();
			var last_name = $('#s_last_name').val();
			var c_number = $('#s_c_number').val();
			var ward = $('#s_ward').val();
			var diagnosis = $('#s_diagnosis').val();

			$("#gridGrid").remove();         
			// $('#divGrid').html('<table id="divTable"></table><div id="divPager"></div>');
		
			refreshgrid('/inpatients_search?first_name='+first_name+'&last_name='+last_name+'&c_number='+c_number+'&ward='+ward+'&diagnosis='+diagnosis+'');
	});

	

	//*****************************************************
	//FUNCTIONS CALLED FROM ABOVE
	function refreshgrid(url){
		// var ward = $('#select_ward').val();
		if (url == 'nil') {url = '/inpatients'};

		
		//Create Table and Div for grid and navigation "pager" 
	 	// $("#gridWork").remove();         
		$('#divGrid').html('<table id="divTable"></table><div id="divPager"></div>');
		//Define grid
		$("#divTable").jqGrid({
			url: url,
			// url: "/inpatients",
			// url: "/inpatients_search?diagnosis=Schizophrenia",
			// url: "/inpatients?_search=true&diagnosis=Schizophrenia",
			//url: '/select_grid?ward='+ward+'',
			datatype:"json",
			mtype:"GET",
			colNames:["id","FirstName","LastName","C #","Ward", "Diagnosis"],
			colModel:[
				{name:"id",index:"id",width:55, hidden:true},
				{name:"first_name",index:"first_name",width:150,align:"center"},
				{name:"last_name",index:"last_name",width:150,align:"center",editable:true},
				{name:"c_number",index:"c_number",width:100,align:"center"},
				{name:"ward",index:"ward",width:100,align:"center"},
				{name:"diagnosis",index:"diagnosis",width:150,align:"center"}
			],
			editurl:"/inpatient/update",
			pager:"#divPager",
			height:350,
			width: 700,
			rowNum:10,
			rowList:[10,20,30],
			sortname:"first_name",
			sortorder:"asc",
			viewrecords:true,
			gridview: true, //increased speed can't use treeGrid, subGrid, afterInsertRow
			// loadonce: true,  //grid load data only once. datatype set to 'local'. Futher manip on client. 'Pager' functions disabled
			caption:"jqGRID PLUGIN. ",

		        loadComplete: function(){
		        	// alert('in loadComplete')
		        },

				onSelectRow:function(id) { 
					set_id(id);  //set the ID variable
					json_data = {inpatient: {id: id}}

					$.ajax({ 
							  // url: '/inpatient_show',
							  url: '/inpatients/'+id+'',
							  data: json_data,
							  //type: 'POST',
							  type: 'GET',
							  dataType: 'json'
						}).done(function(data){
							$('#divFields, #bEdit, #bDelete, #bBack').show();
							$('#bDelete, #bNew').hide();
							$('#id').val(data.id);
							$('#first_name').val(data.first_name);
							$('#last_name').val(data.last_name);
							$('#c_number').val(data.c_number);
							$('#ward').val(data.ward);
							$('#diagnosis').val(data.diagnosis);

													  
						}).fail(function(){
							alert('Error in: /inpatient');
						});
				},

				loadError: function (jqXHR, textStatus, errorThrown) {
			        alert('HTTP status code: ' + jqXHR.status + '\n' +
			              'textStatus: ' + textStatus + '\n' +
			              'errorThrown: ' + errorThrown);
			        alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
			    },

			    //The JASON reader. This defines what the JSON data returned should look 
				    //This is the default. Not needed - only if return does NOT look like this
					// jsonReader: { 
					// 	root: "rows", 
					// 	page: "page", 
					// 	total: "total", 
					// 	records: "records", 
					// 	repeatitems: true, 
					// 	cell: "cell", 
					// 	id: "id",
					// 	userdata: "userdata",
					// 	subgrid: { 
					// 	 root:"rows", 
					// 	 repeatitems: true, 
					// 	 cell:"cell" 
					// 	} 
					// },	

		})
		.navGrid('#divPager', 
			{edit:false,add:false,del:false,search:false,refresh:false}
			// {"del":true}, 
			// {"closeAfterEdit":true,"closeOnEscape":true}, 
			// {}, {}, {}, {}
	 	  )
		.navButtonAdd('#divPager', {
			caption: 'New',
			buttonicon: '',
			onClickButton: function(){
				$('#divFields, #bNew, #bBack').show();
				$('#bDelete, #bEdit').hide();
			},
			position:'last'
		});
	};
};  //if($('body.inpatients').length){
});	//$(function(){
