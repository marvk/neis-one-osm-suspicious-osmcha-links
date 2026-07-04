// ==UserScript==
// @name         neis-one osm-suspicious OSMCha Links
// @namespace    https://github.com/marvk/neis-one-osm-suspicious-osmcha-links
// @version      1.0.1
// @description  Add OSMCha links to https://resultmaps.neis-one.org/osm-suspicious
// @author       marvk
// @match        https://resultmaps.neis-one.org/osm-suspicious*
// @icon         https://wiki.openstreetmap.org/w/images/7/79/Public-images-osm_logo.svg
// @grant        none
// ==/UserScript==

const list = document.getElementById('info')
    .firstElementChild
    .firstElementChild;

const modify = (e) => {
    let id = e.firstElementChild.href.split("/").at(-1);

    let newLink = document.createElement("a");
    newLink.href = "https://osmcha.org/changeset/" + id
    newLink.textContent = "OSMCha"

    e.append(document.createTextNode("\n|\n"))
    e.append(newLink)
};

const updateList = () => {
    let rows = Array.from(list.children)
        .slice(1)
        .map(e =>
            e.children
                .item(1)
                .lastElementChild
                .firstElementChild
                .firstElementChild
                .lastElementChild
        );

    if (rows.some(e => e.textContent.includes("OSMCha"))) {
        return
    }

    rows.forEach(modify)
}

const observer = new MutationObserver(updateList)
observer.observe(list, {childList: true, subtree: true})

updateList();
