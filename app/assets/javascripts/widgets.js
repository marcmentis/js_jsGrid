$(function(){
if ($('body.widgets').length) {

	alert('in widgets');

	// DATEPICKERS
	$('Input[id^=date]').datepicker(
			{	changeMonth: true,
				changeYear: true,
				yearRange: "-100: +10"
			}
	);
	
};
});