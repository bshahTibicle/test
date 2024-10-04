// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    var videoContainer = document.getElementById('video-container');
    // var message = document.getElementById('message');

    // Function to get the ID from the URL
    function getIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');  // Get the 'id' parameter from the URL
    }

    var videoId = getIdFromUrl();

    // Function to resize the video player based on the iframe dimensions
    function resizeVideoPlayer(videoElement) {
        // Get the iframe's width and height
        var iframeWidth = window.innerWidth;
        var iframeHeight = window.innerHeight;

        // Adjust the video player size to fit within the iframe
        videoElement.style.width = `${iframeWidth}px`;
        videoElement.style.height = `${iframeHeight}px`;
    }

    // Function to create the video element and append it to the container
    function createVideoPlayer(videoUrl) {
        // Create a video element dynamically
        var videoElement = document.createElement('video');
        videoElement.id = 'my-video';
        videoElement.className = 'video-js vjs-big-play-centered vjs-theme-sea';
        videoElement.setAttribute('controls', 'controls');
        videoElement.setAttribute('preload', 'auto');

        // Create a source element for the video
        var sourceElement = document.createElement('source');
        sourceElement.src = videoUrl;
        sourceElement.type = 'application/x-mpegURL';

        // Append the source to the video element
        videoElement.appendChild(sourceElement);

        // Append the video element to the container
        videoContainer.appendChild(videoElement);

        // Resize the video player to fit the iframe
        resizeVideoPlayer(videoElement);

        // Initialize video.js on the dynamically added video element
        var player = videojs('my-video');

        // Show a message to indicate the video is ready to play manually
        // message.textContent = 'Video is loaded. Press play to start the video.';

        // Add an event listener to adjust the video player size when the window is resized
        window.addEventListener('resize', function() {
            resizeVideoPlayer(videoElement);
        });
    }

    // If there is a videoId, call the API to get the video URL
    if (videoId) {
        // Example POST API request using fetch
        fetch('https://api-videofredo.testdemo.im/v1/auth/login', {  // Replace with your actual API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ id: videoId })  // Send the video ID to the API
            body: JSON.stringify({"email":"bnayak@tibicle.com","password":"Admin@123"})
        })
        .then(response => response.json())
        .then(data => {
            if (data) {
                // If the API returns a video URL, create and load the video player
                data.videoUrl = 'https://converted-hls-bucket.s3.amazonaws.com/converted-files/25_min_hls.m3u8'
                createVideoPlayer(data.videoUrl);
            } else {
                // message.textContent = 'Error: No video URL returned from API.';
            }
        })
        .catch(error => {
            // message.textContent = 'Error fetching video URL: ' + error.message;
        });
    } else {
        // Show a message if no 'id' parameter is found in the URL
        // message.textContent = 'No video ID provided in the URL.';
    }
});
