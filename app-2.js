"use strict";

// global variables here
var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

// step 1: get user input
$(function() {
            $('.js-search-form').submit(function(event) {
                event.preventDefault();
                var userInput = $('.js-query').val();
                console.log(userInput); // successfully console.logs the userInput var
                getResults(userInput);
                // step 2: make API call
                function getResults(searchTerm) {
                    $.getJSON(YOUTUBE_BASE_URL, {
                            part: 'snippet',
                            maxResults: 15,
                            key: 'AIzaSyAyV0mGwVu8ZQIlVZNZzSPbETD8PdTncZQ',
                            q: userInput,
                            type: "video" // search term as a string
                        },
                        function(receivedApiData) {
                            console.log(receivedApiData);
                            if (receivedApiData.pageInfo.totalResults == 0) {
                                console.log("No videos found!");
                            } else {
                                displaySearchResults(receivedApiData.items);
                            }
                        });

                    function displaySearchResults(videoArray) {
                    	console.log("Activating displaySearchResults()");
                        var htmlOutput = '';
                        $.each(videoArray, function(videoArrayKey, videoArrayValue) {
                            htmlOutput += "<li>";
                            htmlOutput += "<p>" + videoArrayValue.snippet.title + "</p>"; // output video title
                            htmlOutput += "<a href'https://www.youtube.com/watch?v=" + videoArrayValue.id.videoId + "' target='_blank'>"; // target blank will open video in new window
                            htmlOutput += "<img src='" + videoArrayValue.snippet.thumbnails.high.url + "'/>"; // display video thumbnail
                            htmlOutput += "</a>";
                            htmlOutput += "</li>";
                        });
                        $("#js-search-results").html(htmlOutput);
                    }
                };
            });
        });