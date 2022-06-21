$(document).ready(function()
{
	$.get("http://localhost/API/user.php?username="+getUserName(), function(data){

		if (data !== "null "){
			$('#not-user').hide();
			var user = $.parseJSON(data);
			var images = user.images.replace(/\}\,\{/gm,"};{").replace("[","").replace("]","").split(";");
			for(let i = 0 ; i < images.length ; i++){
				images[i] = $.parseJSON(images[i]);
			}
			delete user.images;
			
			var name = "<p class='name'>"+ user.NAME +"</p>";
			var icon = "<p class='icon'><img alt='user_"+user.NAME+"' src='"+ user.icon+"'/>";
			var bio = "<p class='bio'>"+ user.bio +"</p>";
			var email = "<p class='mail'>";
			if (user.contactable === 1){
				email += user.mail;
			}
			else{
				email += user.NAME + " n'a pas souhaité communiquer ses coordonnées.";
			}

			email+= "</p>";

			$("#content").append(name);
			$("#content").append(icon);
			$("#content").append(bio);
			$("#content").append(email);

			console.log(images);

		}
		else{
			$('#not-user').show();
		}
	})

});

function getUserName(){
	//from current url//
	return window.location.href.match("[\%a-zA-Z0-9_\-]+[^\/]$")[0];
} 