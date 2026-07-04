// ==UserScript==
// @name         neis-one osm-suspicious OSMCha Links
// @namespace    https://github.com/marvk/neis-one-osm-suspicious-osmcha-links
// @version      1.1.0
// @description  Add OSMCha links to https://resultmaps.neis-one.org/osm-suspicious
// @author       marvk
// @match        https://resultmaps.neis-one.org/osm-suspicious*
// @icon         https://wiki.openstreetmap.org/w/images/7/79/Public-images-osm_logo.svg
// @grant        none
// ==/UserScript==

const list = document.getElementById('info').firstElementChild.firstElementChild;
const popupPane = document.getElementsByClassName("leaflet-popup-pane").item(0);

const modifyRow = (e) => {
    const link = createOsmChaLink(e);

    e.append(document.createTextNode("\n|\n"))
    e.append(link)
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

    rows.forEach(modifyRow)
}

function createOsmChaLink(e) {
    const id = e.firstElementChild.href.split("/").at(-1);

    const link = document.createElement("a");
    link.href = "https://osmcha.org/changeset/" + id
    link.textContent = "OSMCha"
    const bold = document.createElement("b");
    bold.append(link)
    return bold;
}

const modifyPopup = e => {
    const link = createOsmChaLink(e);

    e.append(document.createTextNode("\nor\n"))
    e.append(link)
};
const updatePopup = () => {
    const popupContent = document.getElementsByClassName("leaflet-popup-content").item(0);

    if (popupContent) {
        disconnectPopupObserver();
        modifyPopup(popupContent);
        connectPopupObserver();
    }
};

const listObserver = new MutationObserver(updateList)
const connectListObserver = () => {
    listObserver.observe(list, {childList: true, subtree: true})
};

const popupObserver = new MutationObserver(updatePopup);
const connectPopupObserver = () => {
    popupObserver.observe(popupPane, {attributes: true, childList: true, subtree: true});
};
const disconnectPopupObserver = () => {
    popupObserver.disconnect();
}

connectListObserver();
connectPopupObserver();
updateList();


