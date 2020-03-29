var code = new Code();
//初始化 firebase

var config = {
	apiKey: code.decode(unescape("AoI6z1a3SnyrD3gfrczxx4jwmee4ZoLtWu8nQcoow3q9mu8wbtMlTej1dvinld49foWgZyXd1rjhYz")),
	authDomain: code.decode(unescape("woe6d9dvinntgx-rdxa81pe0c7.4fhiwrbe2blajsyeia0pcpm.rcco7mr")),
	databaseURL: code.decode(unescape("h3t2twp1sy%3A7/z/2wme8d0d9ixneg2-4deaw1xe1c5.sfoi7r6e5bvajs3eyieo3.pcvowm1")),
	projectId: code.decode(unescape("wieldxdiijnhgj-2dza610eqc0")),
	storageBucket: code.decode(unescape("wxe1ddd3irnpgn-0ddar1keocq.valp7pjsbpcoctu.0clommi")),
	messagingSenderId: code.decode(unescape("7q8e9b7o2p8u6y857l9j2858"))
};
firebase.initializeApp(config);

$(function() {
    $("#createInvitation").on("submit", function(e) {
    	e.preventDefault();
    	var relation = "";
		var card = "不需要";
		var feast = "不參加";
		var phone1 = "";
		var address1 = "";
		var count_person1 = 0;
		var count_child1 = 0;
		var count_veg1 = 0;
		if ($("input[name='relation']")[0].checked==true){
			relation = "男方親友";
		}
		else{
			relation = "女方親友";
		}
		if ($("input[name='join']")[0].checked==true){//參加
			phone1 = $("#phone").val();
			count_person1 = +$("#count_person").val();
			count_child1 = +$("#count_child").val();
			count_veg1 = +$("#count_veg").val();
			feast = "參加";
		};

	  	if ($("input[name='RDaddress']")[0].checked==true || $("input[name='RDaddress']")[2].checked==true){
			address1 = $("#address").val();
			card = "需要";
		};
		/*
		var reply = {
			name: $("#name").val(),
			phone: phone1,
			address: address1,
			count_person: count_person1,
			count_child: count_child1,
			count_veg: count_veg1,
			message: $("#message").val()
		};
		*/

		var db = firebase.firestore();

		db.collection("Wedding").doc($("#name").val()).set({
			關係: relation,
		    喜帖: card,
		    宴會: feast,
		    電話: phone1,
		    住址: address1,
		    參加人數: count_person1,
		    兒童人數: count_child1,
		    素食數量: count_veg1,
		    備註: $("#message").val()
		});
		//createInvitation(reply);
		jQuery.noConflict(); 
		setTimeout(
			function(){
				alert("上傳成功，感謝您的填寫");
				if ($("input[name='join']")[0].checked==true){
	            	$("#myModal").modal();
	            	$(function () { $('#myModal').on('hidden.bs.modal', function () {
						window.location.reload();})
					});
				}
				else{
					window.location.reload();	
				}		
			}, 2000);
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

function Code() {      
	var key = 'abcdefghijklmnopqrstuvwxyz0123456789';
	//取隨機數
	function sum(m, n) {
		var num = Math.floor(Math.random() * (m - n) + n);
		return num;
	}
	//取key池的隨機數
	function getRandomChar() {
		var index = sum(1, key.length);
		var result = key.charAt(index);
		return result;
	}
	//加密
	this.encode = function (src) {
		var result = "";
		var length = src.length;
		for (var i = 0; i < length; i++) {
			result += src.charAt(i) + getRandomChar();
		}
			return result;
		}
	//解密
	this.decode = function (src) {
		var result = "";
		var length = src.length;
		for (var j = 0; j < length; j++) {
			if (j % 2 == 0) {
				result += src.charAt(j);
			}
		}
		return result;
	}
}
