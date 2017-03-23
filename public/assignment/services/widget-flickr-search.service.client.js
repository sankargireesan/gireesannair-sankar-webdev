(function(){
    angular
        .module("WebAppMaker")
        .factory("FlickrService",FlickrService);

    var key = "e4f6b0703141e01f5482ad2f51f38890";
    var secret = "ac69219d256a8e59";
    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http){
        var api = {
            searchPhotos : searchPhotos
        };
        return api;

        function searchPhotos(searchText){
            var new_url = url
                .replace("API_KEY", key)
                .replace("TEXT", searchText);
            return $http.get(new_url);
        }
    }
})();