app.controller('HomeController', function ($scope, blogFactory) {

    $scope.currIndex;

    $scope.BlogPost = function (title, summary, post) {
        this.title = title;
        this.summary = summary;
        this.post = post;
        this.timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');
    }
    

    $scope.posts = [];

    $scope.addPost = function () {
        $scope.tempPost = new $scope.BlogPost($scope.addTitle, $scope.addSummary, $scope.addContent);
        blogFactory.addNewPost($scope.tempPost);
    };

    

    $scope.getPosts = function () {
        blogFactory.getPosts()
        .then(function () {
            if ($scope.posts.length > 0) {
                $scope.posts = [];
            }
            $scope.posts = blogFactory.returnPosts();
        }),
        (function (data) {
            console.log("GET FAILED", data)
        })
    }

    $scope.getIndex = function (indx) {
        currIndex = indx;
        $scope.sendIndex(currIndex);
    }

    $scope.sendIndex = function (indx) {
        blogFactory.getIndex(indx);
    }

    $scope.getPosts();
})