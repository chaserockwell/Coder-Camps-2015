app.factory('blogFactory', function ($http, $q) {

    var blogPosts = [];
    var url = "https://rockwellblog.firebaseio.com/.json";
    var currIndex;
    var currPostId;

    function addNewPost(post) {
        $http.post(url, post)
        .success(function (data) {
            post.id = data.name; 
            blogPosts.push(post);
        })
        .error(function (data) {
            console.log('ERROR', data);
        })
    }

    function getPosts() {
        var deferred = $q.defer();
        $http.get(url)
        .success(function (data) {
            if (blogPosts.length > 0) {
                blogPosts = [];
            }
            for (var i in data) {
                data[i].id = i;
                blogPosts.push(data[i]);
            }
            deferred.resolve();
        })
        .error(function (data) {
            deferred.reject(data);
        })
        return deferred.promise;
    }

    function editPost(indx, post) {
        currPostId = blogPosts[indx].id;
        var tempUrl = "https://rockwellblog.firebaseio.com/" + currPostId + "/.json";
        var deferred = $q.defer();
        $http.put(tempUrl, post)
        .success(function (data) {
            blogPosts.splice(indx, 1, data);
            deferred.resolve();
        })
        .error(function (data) {
            console.log('ERROR', data);
            deferred.reject();
        })
        return deferred.promise;
    }

    function deletePost(indx) {
        var tempUrl = "https://rockwellblog.firebaseio.com/" + indx + "/.json";
        var deferred = $q.defer();
        $http.delete(tempUrl)
        .success(function (data) {
            blogPosts.splice(indx, 1);
            deferred.resolve();
        })
        .error(function (data) {
            console.log('DELETE ERROR', data);
            defferred.reject(data);
        })
        return deferred.promise;
    }

    function returnPosts() {
        return blogPosts;
    }

    function getIndex(indx) {
        currIndex = indx;
    }

    function sendEditIndex() {
        return currIndex;
    }




    return {
        addNewPost: addNewPost,
        getPosts: getPosts,
        returnPosts: returnPosts,
        getIndex: getIndex,
        sendEditIndex: sendEditIndex,
        deletePost: deletePost,
        editPost: editPost,
    }


})