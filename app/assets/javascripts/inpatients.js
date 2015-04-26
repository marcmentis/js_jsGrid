$(function(){
	//DECLARE VARIABLES
		var ID = '';
		  	function set_id(x){ID = x};
	// alert('in inpatients.js');
	refreshgrid();

//*****************************************************
//FUNCTIONS CALLED FROM ABOVE
	function refreshgrid(){
		// var ward = $('#select_ward').val();

		//Create Table and Div for grid and navigation "pager" 
	 	// $("#gridWork").remove();         
		$('#divGrid').html('<table id="divTable"></table><div id="divPager"></div>');
		//Define grid
		$("#divTable").jqGrid({
			// url:"/inpatients?ward="+ward+"",
			url: "/inpatients",
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
			// editurl:"/inpatient/update",
			pager:"#divPager",
			height:350,
			width: 700,
			rowNum:10,
			rowList:[10,20,30],
			sortname:"first_name",
			sortorder:"asc",
			viewrecords:true,
			gridview: true, //increased speed can't use treeGrid, subGrid, afterInsertRow
			loadonce: true,
			caption:"jqGRID PLUGIN. ",

		        loadComplete: function(){
		        	// alert('in loadComplete')
		        },

				onSelectRow:function(id) { 
					set_id(id);  //set the ID variable
					alert(id)
					$.ajax({ 
							  url: '/inpatient_show',
							  data: {id: id},
							  //type: 'POST',
							  type: 'GET',
							  dataType: 'json'
						}).done(function(data){
							$('#divFields, #bEdit, #bDelete, #bBack').show();
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
			//{edit:false,add:false,del:false,search:false,refresh:false}
			{"del":true}, 
			{"closeAfterEdit":true,"closeOnEscape":true}, 
			{}, {}, {}, {}
	 	  )
		.navButtonAdd('#divPager', {
			caption: 'New',
			buttonicon: '',
			onClickButton: function(){
				$('#divFields, #bNew, #bBack').show();
			},
			position:'last'
		});

	};

});