/**
	Abstract : Ajax Page Js File
	File : ic.ajax.js
	#CSS attributes: 
		.icForm : Form class for ajax submission. 
		.icFormMsg  : Div Class| Show Form validation error/success message on ajax form submission
		
	#Javascript Variable
	.icRes : ajax request result variable
	.icFormAction : Form action variable
	.icFormData : Form serialize data variable

**/

function contactForm()
{
	
	window.verifyRecaptchaCallback = function (response) {
        $('input[data-recaptcha]').val(response).trigger('change');
    }
    
	window.expiredRecaptchaCallback = function () {
        $('input[data-recaptcha]').val("").trigger('change');
    }
	
	'use strict';
	var msgDiv;
	$(".icForm").on('submit',function(e)
	{
		e.preventDefault();	//STOP default action
		$('.icFormMsg').html('<div class="gen alert alert-success">Submitting..</div>');
		var icFormAction = $(this).attr('action');
		var icFormData = $(this).serialize();
		
		$.ajax({
			method: "POST",
			url: icFormAction,
			data: icFormData,
			dataType: 'json',
			success: function(icRes){
				if(icRes.status == 1){
					msgDiv = '<div class="gen alert alert-success">'+icRes.msg+'</div>';
				}
				
				if(icRes.status == 0){
					msgDiv = '<div class="err alert alert-danger">'+icRes.msg+'</div>';
				}
				$('.icFormMsg').html(msgDiv);
				
				
				setTimeout(function(){
					$('.icFormMsg .alert').hide(1000);
				}, 10000);
				
				$('.icForm')[0].reset();
                grecaptcha.reset();
			}
		})
	});
	
	
	/* This function is for mail champ subscription START*/
	$(".icSubscribe").on('submit',function(e)
	{
		e.preventDefault();	//STOP default action
		var thisForm = $(this);
		var icFormAction = thisForm.attr('action');
		var icFormData = thisForm.serialize();
		thisForm.addClass('ic-ajax-overlay');
		
		$.ajax({
			method: "POST",
			url: icFormAction,
			data: icFormData,
			dataType: 'json',
		  success: function(icRes) {
			thisForm.removeClass('ic-ajax-overlay');
			if(icRes.status == 1){
				msgDiv = '<div class="gen alert alert-success">'+icRes.msg+'</div>';
			}
			if(icRes.status == 0){
				msgDiv = '<div class="err alert alert-danger">'+icRes.msg+'</div>';
			}
			$('.icSubscribeMsg').html(msgDiv);
			
			setTimeout(function(){
				$('.icSubscribeMsg .alert').hide(1000);
			}, 10000);
			
			$('.icSubscribe')[0].reset();
		  }
		}) 
	});
	
	/* This function is for mail champ subscription END*/
	
}

jQuery(document).ready(function() {
    'use strict';
	contactForm();
})