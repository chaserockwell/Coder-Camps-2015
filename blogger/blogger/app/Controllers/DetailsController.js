app.controller('DetailsController', function ($scope, blogFactory, $window) {
    $scope.currIndex;
    $scope.posts = [];
    $scope.currPost;

    $scope.BlogPost = function (title, summary, post) {
        this.title = title;
        this.summary = summary;
        this.post = post;
        this.timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');
    }

    $scope.getIndex = function () {
        $scope.currIndex = blogFactory.sendEditIndex();
    }

    $scope.getPosts = function () {
        blogFactory.getPosts()
        .then(function () {
            if ($scope.posts.length > 0) {
                $scope.posts = [];
            }
            $scope.posts = blogFactory.returnPosts();
            $scope.currPost = $scope.posts[$scope.currIndex];
            $scope.editTitle = $scope.currPost.title;
            $scope.editSummary = $scope.currPost.summary;
            $scope.editContent = $scope.currPost.post;


        }),
        (function (data) {
            console.log("GET FAILED", data)
        })
    }

    $scope.deletePost = function () {
        blogFactory.deletePost($scope.currPost.id)
        .then(function () {
            $scope.posts.splice(currIndex, 1);
            $window.location.href = '#/home';
        })
    }

    $scope.editPost = function () {
        $scope.tempPost = new $scope.BlogPost($scope.editTitle, $scope.editSummary, $scope.editContent)
        blogFactory.editPost($scope.currIndex, $scope.tempPost)
        .then(function () {
            $scope.getPosts();
        })
    }

    $scope.getIndex();
    $scope.getPosts();
})