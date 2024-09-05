function VideoPage() {
    // get video src from URL (?src=)
    return <video src="" className="w-100 h-100" controls autoPlay></video>;
}

export default VideoPage;
function addVideo(videoSrc) {
    var video = document.getElementById("mySpecialVideoID");

    if (video == null) {
        var newVideo = document.createElement("video");
        newVideo.id = "mySpecialVideoID";
        newVideo.style =
            "z-index:99999999;position:absolute;left:0;top:0;right:0;bottom:0;width:100vw;height:100vh";
        document.body.appendChild(newVideo);
    }

    // Change video source and start from beginning
    video.src = videoSrc;
    video.play();
}
