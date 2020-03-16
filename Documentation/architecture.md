
# Architecture document

<!-- The goal of this document is to allow you to present the architecture of what you have already but also what you are aiming at. (e.g. if you plan to use Angular on the front-end, but didn’t start using it yet, do mention this). One of the goals of this document is to make sure that the SE Staff has a good overview of what everybody is doing so we can offer you the best advice :)
-->

<!-- A nice cover:...will make the us happy. Add the project title, the client, the team names, TA name and the document version.
-->
<b>Sharing Logistics Simulation</b>

<i>Client: Astone Shi</i>

Version 1.0

Team:       Antonin Thioux, Bjar Karim, Gheorghe Pojoga, Lonneke Pulles & Lorenzo La Rocca

Under supervision by Alex Tutea

## Introduction
<!-- A brief introduction to the product, highlighting the specifics that influence the architecture and design choices.-->




## Architectural overview
<!-- Architectural overview: What components are there and what are their functions?How are components connected/communicating?If a more general principle or a paradigm is applied that is worth mentioning, mention it.-->

The project does not need a persistent database, because all simulated data will be calculated on the spot. This means that
here is no back-end and the front-end makes up the entire application.

The application is mainly created with Vue.js. This is a lightweight and open source
Javascript framework that simplifies creating a dynamic Single Page Application.

<!-- Create nice schema to clarify architecture! -->

The core of the application consists of a index.html file, a style.css file and main.js file.
This main.js file links to the file App.vue, which on its turn is linked to all Vue components.


## Technology Stack
<!-- Technology Stack: What programming languages are being used? What technologies are being used (Frameworks, libraries, platform, peripherals)? If different components have different technologies, present them individually.-->

The following is a list of used technologies and frameworks:

- HTML
- CSS
- Javascript
- Vue.js
  - todo
- npm
  - Required to install and run Vue.js
- Node.js
  - Required for npm. A back-end javascript framework.

For the map, we use:
- Google Maps API / Leaflet, an open source Javascript mapping library.

- leaflet: npm install leaflet
  - Open source alternative to Google Maps API. Javascript mapping library.
- leaflet GeoSearch: npm install --save leaflet-geosearch
  - to enable searching based on addresses and names instead of coordinates
  - Though it is called leaflet geosearch, it has no dependencies on Leaflet.

Vue plugin's used:
- npm install vue-async-computed --save

## Team organization
<!-- Team Organization: What teams are there and what are their responsibilities?Are the team responsibilities focused on different components?-->

There is one team in our project. Each member of this team has their own Vue component to work on, however.


## Change log
<!-- Change Log: Descriptive list of changes made to the document tagged with date and author.-->

| Who | When | What |
| --- | --- | --- |
| Lonneke | 11-3-2020 | First draft of the architecture document.