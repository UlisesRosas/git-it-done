var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
      // response was successful
      if (response.ok) {
        response.json().then(function(data) {
            // pass response data to dom function
            displayIssues(data);
        });
    }
    else {
        alert("There was a broblem with your request!");
    }
    });  
};

getRepoIssues("facebook/react");

var displayIssues = function(issues) {
    if(issues.lenght === 0) {
        issueContainerEl.textContent = "This repo has no open issues!"
    }
    for (var i = 0; i < issues.length; i++){
        var issuesEL = document.createElement("a");
        issuesEL.classList = "lisr-item flex-row justify-space-between align-center";
        issuesEL.setAttribute("href", issues[i].html_url);
        issuesEL.setAttribute("target", "_blank")
    
        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issuesEL.appendChild(titleEl);
        
        //createa typr element
        var typeEl = document.createElement("span");
        //  check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }else {
            typeEl.textContent = "(Issue)"
        }
        // append to container
        issuesEL.appendChild(typeEl);
        issueContainerEl.appendChild(issuesEL);
    }
};