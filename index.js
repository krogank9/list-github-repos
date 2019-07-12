function displayRepos(json, handle) {
	$("#repos-container").removeClass("hidden");
	$("#repos-header").html(`Repo List for User ${handle}`);
	
	$("#repos-list").empty();
	
	json.forEach(function(repo) {
		$("#repos-list").append(`
		<li>
			<h3>${repo.name}</h3>
			<p><a href="${repo.html_url}">Link</a></p>
		</li>`);
	});
	
	console.log(json);
}

function watchForm() {
	$("form").submit(function(event){
		event.preventDefault();
		let handle = $("#user-handle").val();
		
		fetch(`https://api.github.com/users/${handle}/repos`)
		.then(function(response){
			if(response.ok) {
				return response.json();
			}
			else {
				throw new Error(response.statusText);
			}
		})
		.then(json => displayRepos(json, handle))
		.catch(err => alert(`${err}\nTry again.`));
	});
}

$(function() {
	console.log("App loaded. Watching form...");
	watchForm();
});
