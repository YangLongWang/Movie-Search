var getWatchApi = function(){ 
    var response= fetch("https://api.github.com/users/octocat/repos");
    console.log(response);
    //console.log("I'm alive!")
};

getWatchApi();