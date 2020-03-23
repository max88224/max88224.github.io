$(function() {
    $("#createInvitation").on("submit", function(e) {
    	e.preventDefault();

		var phone1 = "";
		var address1 = "";
		var count_person1 = 0;
		var count_child1 = 0;
		var count_veg1 = 0;
		if ($("input[name='join']")[0].checked==true){//參加
			phone1 = $("#phone").val();
			count_person1 = +$("#count_person").val();
			count_child1 = +$("#count_child").val();
			count_veg1 = +$("#count_veg").val();
		};

	  	if ($("input[name='RDaddress']")[0].checked==true || $("input[name='RDaddress']")[2].checked==true){
			address1 = $("#address").val();
		}
		var reply = {
			name: $("#name").val(),
			phone: phone1,
			address: address1,
			count_person: count_person1,
			count_child: count_child1,
			count_veg: count_veg1,
			message: $("#message").val()
		};

		createInvitation(reply);
		jQuery.noConflict(); 
		//window.location.reload();

    });
  });
  
  function createInvitation(reply) {
	var trackingJSON = JSON.stringify(reply);
	var urlAjax =  "https://whateat.azurewebsites.net/api/Applications";

	$.ajax({
		type: "POST",
		url: urlAjax,
		contentType: "application/json",
		data: trackingJSON,
	        success: function( data, textStatus, jQxhr ){    
            	$("#myModal").modal();
            	$(function () { $('#myModal').on('hidden.bs.modal', function () {
					window.location.reload();})
				});
	        },
		    error: function( jqXhr, textStatus, errorThrown ){
            	alert("上傳失敗")
		    //console.log( errorThrown );
		     },
		dataType: 'json'
	});
  }
