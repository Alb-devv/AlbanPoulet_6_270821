class  mediaFactory {

	constructor(container, url, tagline, alternateText) {
		this.url = url
		this.tagline = tagline
		this.alternateText =  alternateText

		this.createMedia = function(type) {
			let media;
			if (type === 'image') media = new image(this.url, this.alternateText);
			else if (type === 'video') media = new video(this.url);
	  
			container.innerHTML = ""
			container.appendChild(media)

			let mediaTagline = document.createElement("p")
			mediaTagline.innerHTML = this.tagline
			container.appendChild(mediaTagline)

			return media;
		 };
	}
}
class  image { 
	constructor(url, alt) {
		const image = new Image()
		image.alt = alt
		image.src = url
		return image
	}
}
class  video { 
	constructor(url) {
		const video = document.createElement("video")
		video.setAttribute("controls", "")
		video.src = url
		return video
	}
}
