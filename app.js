"use strict";

// global variables here
var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

// step 1: get user input
$(function() {
            $('.js-search-form').submit(function(event) {
                event.preventDefault();
                var userInput = $('.js-query').val();
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
                            if (receivedApiData.pageInfo.totalResults == 0) {
                                alert("No videos found!");
                            } else {
                                displaySearchResults(receivedApiData.items);
                            }
                        });

                    function displaySearchResults(videoArray) {
                        var htmlOutput = '';
                        $.each(videoArray, function(videoArrayKey, videoArrayValue) {
                            htmlOutput += "<li>";
                            htmlOutput += "<div class='container'>";
                            htmlOutput += "<p>" + videoArrayValue.snippet.title + "</p>"; // output video title
                            htmlOutput += "<a href='https://www.youtube.com/watch?v=" + videoArrayValue.id.videoId + "' target='_blank'>"; // target blank will open video in new window
                            htmlOutput += "<img src='" + videoArrayValue.snippet.thumbnails.default.url + "'/>"; // display video thumbnail
                            htmlOutput += "</a>";
                            htmlOutput += "</div>";
                            htmlOutput += "</li>";
                        });
                        $("#js-search-results").html(htmlOutput);
                    }
                };
            });
        });

// TO DO: style and make it pretty with CSS; make responsive
