class errorAlert {
  message 

	constructor(message) {
    this.message = message
    const newElt = document.createElement("div")
    newElt.innerHTML = `${this.message} Veuillez nous excuser pour la gêne occasionnée.`
    let elt = document.querySelector("#main")
    elt.appendChild(newElt)
  }
}