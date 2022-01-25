var artistDatasObject = '' 

getDatasFromJson = async () =>
await fetch("./json/FishEyeData.json", { mode: "no-cors" })
    .then((ressourcejson) => ressourcejson.json())
    .catch((error) => console.log("Erreur lors du fetch du json", error))

displayArtistDatas = async () => {
	let {media, photographers} = await getDatasFromJson()  
	let jsonString = new URLSearchParams(document.location.search.substring(1)) 
	let artistId = jsonString.get("id") 

    if (photographers === undefined) throw new errorAlert("Impossible d'afficher les données des photographes")
	else if (media === undefined) throw new errorAlert("Impossible d'afficher les données des medias")

	artistDatasObject = photographers.find(
		(photographer) => photographer.id == artistId 
	)
	if (artistDatasObject === undefined) throw new errorAlert("Impossible d'afficher les données du photographe")
    let artistObject = new artistContent(artistDatasObject) 

	document.title = document.title + ' : ' + artistObject.singleArtistName 
	document.querySelector(".modal-title").innerHTML +=  `<br /> ${artistObject.singleArtistName}` 

	let displayMedias = media.filter((media) => media.photographerId == artistId) 
	updateMedias(displayMedias) 
	
	document.getElementById("sortBy").addEventListener("change", function (event) {
		let mediaGallerySort = ''
		switch ( event.target.value) { 
			case "date":
				mediaGallerySort =  displayMedias.sort(function(a, b) {
					let recentMedia = new Date(a.date)
					let oldMedia = new Date(b.date)
					return  oldMedia - recentMedia})
				break
			case "title":
				mediaGallerySort = displayMedias.sort((a, b) => a.title.localeCompare(b.title))
				break
			default: 
				mediaGallerySort =  displayMedias.sort(function(a, b) {return b.likes - a.likes})
				break
		} 

		updateMedias(mediaGallerySort)

	})

	let artistMainDatas = document.querySelector(".profile-main-datas")
	let artistSecondaryDatas = document.querySelector("#footer-secondary-datas")
	artistMainDatas.innerHTML += artistObject.artistProfileContent  
	artistSecondaryDatas.innerHTML += artistObject.artistProfileContentAside
}

updateMedias = (gallery) => {
	let profileGalleryContainer = document.querySelector(".profile-gallery")
	profileGalleryContainer.innerHTML = ""
	let counter = 0
	gallery.forEach((media) => {
		counter++  
		profileGalleryContainer.innerHTML += displayMediasHtml(media)
	})

	let LightboxComponent = new lightbox("#gallery")
}

displayMediasHtml = (mediaParam) => {

	let photographerId = mediaParam.photographerId
	let htmlTag = ''
	let mediaId = mediaParam.id 
    let image = mediaParam.image
    let video = mediaParam.video
	let title = mediaParam.title
	let description = mediaParam.description
    let likes = mediaParam.likes
	
    if (image != undefined) {
		imageAvailability = `./medias/${photographerId}/${image}`
		var test=new Image()
		test.src=imageAvailability
		test.onerror=function() {console.log('Erreur : media introuvable : ' + test.src)}
	
		htmlTag = `<img class="profile-content profile-gallery__media" tabindex="5" src="${imageAvailability}" alt="${description}" title="${title}" />`
	}
    else if (video !== undefined)  htmlTag = `<video class="profile-content profile-gallery__media" tabindex="5"  alt="${description}" title="${title}">
                                                        <source src="./medias/${photographerId}/${video}"/>
                                            	</video>`
    else throw new errorAlert("Média non pris en charge. (id : " + mediaId + ")")

    return `
    <figure class="profile-content profile-gallery__card" aria-label="${title}">
        ${htmlTag}
        <footer class="profile-gallery__media-footer">
            <figcaption class="profile-gallery__media-footer-figcaption">${title}</figcaption>
            <div class="profile-gallery__media-footer-like-section">
                <p class="profile-gallery__media-footer-like-section-counter">${likes}</p>
                <button class="profile-gallery__media-footer-like-section-button" title="J'aime" tabindex="5" aria-label="likes"><i class="far fa-heart" aria-hidden="true"></i></button>
            </div>
        </footer>
    </figure>`
}


likeSection = () => {
	let nodeListBlocLike = document.querySelectorAll(".profile-gallery__media-footer-like-section")

	nodeListBlocLike.forEach(function (i) {
		i.addEventListener("click", function () {
			let likeContainer = i.querySelector(".profile-gallery__media-footer-like-section-counter") 
			let likeButton = i.querySelector(".profile-gallery__media-footer-like-section-button") 
			let likeButtonIcon = i.querySelector(".fa-heart") 
			let likeNumber = Number(likeContainer.textContent) 
            let alreadyPressed = i.dataset.alreadyPressed === "true"
             
			if (alreadyPressed) {
                likeContainer.innerHTML = likeNumber-1

				updateTotalLikes() 
 				likeButton.ariaLabel = "Je n'aime pas"
				likeButtonIcon.classList.add("far")
				likeButtonIcon.classList.remove("fas")
			} else if (!alreadyPressed) { 
                likeContainer.innerHTML = likeNumber+1

				updateTotalLikes()
				likeButtonIcon.ariaLabel = "J'aime"
				likeButtonIcon.classList.add("fas")
				likeButtonIcon.classList.remove("far")
			}
            i.dataset.alreadyPressed = !alreadyPressed 
		})
	})
}

updateTotalLikes = () => {
    let likeCounter = document.querySelector('.profile-secondary-datas__aside-total-likes')

    if(likeCounter != null) {
        let artistObject = new artistContent(artistDatasObject)
        let counter = artistObject.artistTotalLike

        likeCounter.innerHTML = counter
        return counter
    }
    else throw 'attention .profile-secondary-datas__aside-total-likes introuvable'
}

addEventArtistProfileTags
 = () => {
	let tags = document.querySelectorAll(".profile-main-datas__content-taglist > li")

	tags.forEach((tag) => { 
		tag.addEventListener("click", function () {
			window.location = 'index.html?tag=' + tag.textContent.replace(/(\s|\#)+/g, "").toLowerCase()
		})
		tag.addEventListener("keypress", function (e) {
			if (e.key === "Enter") window.location = 'index.html?tag=' + tag.textContent.replace(/(\s|\#)+/g, "").toLowerCase()
		})

	})

}

modalFormButton = (classModal) => {
	document.querySelector(classModal).style.display = "none"
	let elemnt = document.querySelector("#btContact")
	elemnt.addEventListener("click", function () {
		displayModalForm(classModal)
	})
	elemnt.addEventListener("keypress", function (e) {
		if (e.key === "Enter") displayModalForm(classModal)
	})
}

displayModalForm = (classModal) => {
	let inputs = new formDatasValidation 
	inputs.addEventListenerFormFields() 


	let modal = document.querySelector(classModal)
	modal.style.display = "block" 
	let profileContent = document.querySelector(".profile-content")
	profileContent.style.opacity = "10%" 
	let footerSecondaryDatas = document.querySelector("#footer-secondary-datas")
	footerSecondaryDatas.style.opacity = "10%" 

	closingModalForm = () => {
		modal.style.display = "none"
		profileContent.style.opacity = "100%"
		footerSecondaryDatas.style.opacity = "100%"
	}

	document.querySelector(".close").onclick = function () {
		closingModalForm()
	};

	window.onclick = function (event) {
		if (event.target == modal) closingModalForm()
	};

	document.addEventListener('keydown', function(e) {
		if ( e.key === "Escape") closingModalForm()
	});
		
	if (document.getElementById("form-button")) {
		document.getElementById("form-button").addEventListener("click", function (event) {
			event.preventDefault()
			let firstName = document.getElementById("firstName")
			let lastName = document.getElementById("lastName")
			let mail = document.getElementById("mail")
			let message = document.getElementById("message")
			console.log(
				`Informations saisies : ${firstName.value} ${lastName.value} ${mail.value} ${message.value}`
			);

			formValidation = inputs.checkFormDatas() 
			if(formValidation == true) {
				alert ('Vos informations ont bien été prises en compte, merci')
				closingModalForm()
			}
		});
	}
}

displayPage = async () => {
	await displayArtistDatas()
	modalFormButton(".modal")
    likeSection() 
	addEventArtistProfileTags()
}

displayPage() 
