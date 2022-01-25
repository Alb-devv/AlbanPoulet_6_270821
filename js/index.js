getDatasFromJson = async () =>
    await fetch("./json/FishEyeData.json", { mode: "no-cors" })
        .then((ressource) => ressource.json())
        .catch(function(error) { console.log("Erreur lors du fetch du json" + error.message)
        })

displayArtists = (photographers, tagElement='') => {
    let artistsSort = photographers
    if(tagElement != '') artistsSort = sortByTag(tagElement.replace(/(\s|\#)+/g, "").toLowerCase(), photographers)

    let singleProfile = ''
    artistsSort.forEach((artist_profile) => {
        let artistObject = new artistContent(artist_profile) 
        singleProfile += artistObject.singleArtistDatas 
    })
    document.querySelector(".artists").innerHTML = singleProfile
    window.location = "#header"
    addEventsOnTags(photographers)
}

sortByTag = (pressedTag, selectedArtists) => {
    if (pressedTag === "tous") return selectedArtists
    else return selectedArtists.filter((artistTag) => artistTag.tags.includes(pressedTag))
}

addEventsOnTags = (photographers, tempoRelance) => {
    let tags = document.querySelectorAll(".tag-list-interractive > li")

    tags.forEach((tag) => { 
        if(tag.dataset.eventListenerOn === undefined) {
            tag.dataset.eventListenerOn = 'true'

            let tagElement = tag.textContent
            tag.addEventListener("click", function () {                
                displayArtists(photographers, tagElement)
            })
            tag.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    displayArtists(photographers, tagElement)
                }
            })
        }
    })
}

scrollTopHandling= ()=> {
    document.addEventListener('scroll', function(e) {
        let style = 'none';
        if (document.documentElement.scrollTop != 0) style = 'block'; 
        document.querySelector(".hidden-link").style.display = style
    })
}

initIndex = async () => {
    let { photographers } = await getDatasFromJson()
    if (photographers === undefined) throw new errorAlert("Données sur les photographes introuvables.")
    
    let jsonString = new URLSearchParams(document.location.search.substring(1))
    let tagParametre = jsonString.get("tag")
    if(tagParametre !== undefined && tagParametre != null) displayArtists(photographers, tagParametre)
    else displayArtists(photographers)

    scrollTopHandling()
}

initIndex()


