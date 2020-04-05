
# Architecture document

<!-- The goal of this document is to allow you to present the architecture of what you have already but also what you are aiming at. (e.g. if you plan to use Angular on the front-end, but didn’t start using it yet, do mention this). One of the goals of this document is to make sure that the SE Staff has a good overview of what everybody is doing so we can offer you the best advice :)
-->

<!-- A nice cover:...will make the us happy. Add the project title, the client, the team names, TA name and the document version.
-->
<b>Sharing Logistics Simulation</b>

<i>Client: Astone Shi</i>

Version 1.0

Team:
- Antonin Thioux
- Bjar Karim
- Gheorghe Pojoga
- Lonneke Pulles
- Lorenzo La Rocca

Under supervision of Alex Tutea

## Introduction
<!-- A brief introduction to the product, highlighting the specifics that influence the architecture and design choices.-->

The product will be a web application that is simulating the effect that sharing 
space for goods would have. The application's main goal is to determine if it
would be a worthwhile idea to set up a platform on which companies or truck owners
could offer empty space to transport other people's goods.

The user can set multiple parameters for the simulation: 

1. the start and end locations,
2. the number of trucks for each of three predefined types, and
3. the types of goods, which each have a volume, a weight and a quantity.

To simplify the simulation in first instance, our client only needed to be able to enter
the start and end location of a trip. In the future, this may be extended to include 
locations in between those points.

The three metrics that will show the result of the simulation are

- transport time
- CO2 emissions
- number of trucks used


## Architectural overview
<!-- Architectural overview: What components are there and what are their functions?How are components connected/communicating?If a more general principle or a paradigm is applied that is worth mentioning, mention it.-->

The project does not need a persistent database, because all simulated data will be calculated on the spot every time.
This web application is designed without a database or back end and so the front end makes up the entire application.
We thought that the calculations for the simulation are simple
enough to be able to do them in the front-end application. Adding a back end and thus a necessary
API to connect the two applications would make the project unnecessarily complicated. If the
application should be extended to store the results of the simulation in the future, a database
and back-end application can be added to the project without having to change too much in the already
existing front-end application.

The application is mainly created with Vue.js. This is a lightweight and open source
front-end Javascript framework that mainly focuses on simplifying the creation of a dynamic Single Page Application.
The project is split into so-called Vue (view) components, which are reactive and can be composed of other Vue components.

<!-- Create nice schema to clarify architecture! -->

````
├── public
│   └── index.html
└── src
    ├── main.js                         # renders and mounts the app
    ├── App.vue                         # the root of the app
    ├── components
    │   ├── App.vue                     # the root of the app
    │   ├── ControlPanel.vue            # the panel on the left of the screen that handles the input
    │   ├── ControlPanelOutput.vue
    │   ├── DateInput.vue               # base input component for dates
    │   ├── JourneyInput.vue
    │   ├── LocationInput.vue           # base input component for locations
    │   ├── Map.vue
    │   ├── ProductInput.vue            # input component for the goods
    │   ├── SelectorCheckBox.vue        # base input component for a checkbox
    │   ├── VehicleSelector.vue         # input component for all vehicle types
    │   └── VehicleSelectorEntry.vue    # input component for 1 vehicle type
    └── store
        └── index.js                    # the store of the entire application
````

![Application's architecture](architecture.png)

The core of the application consists of a index.html file, a style.css file and main.js file.
This main.js file links to the file App.vue, which on its turn is linked to all Vue components.
The main.js file first renders the app, after which it is mounted.

The app consists of multiple components. The top level components are the map (Map.vue), the controlpanel on the left
(ControlPanel.vue) and the control panel on the right (ControlPanelOutput.vue).

These top level components use the middle level components JourneyInput, ProductInput and VehicleSelector.

These middle level components, on their turn, use the base components: DateInput, LocationInput and SelectorCheckBox.


## Technology Stack
<!-- Technology Stack: What programming languages are being used? What technologies are being used (Frameworks, libraries, platform, peripherals)? If different components have different technologies, present them individually.-->

The following is a list of used technologies and frameworks:

- HTML
- CSS
- JavaScript
- Vue.js
  - A Progressive JavaScript Framework
  - Libraries used:
    - Vuex: a state management pattern and library for Vue.js applications. Enables us to create a store which can be
    accessed anywhere in the application
    - Vue Router: enables us to map Vue components to routes and Vue Router renders them when needed. Makes it seem
    as if the application has multiple pages.
- npm
  - Node Package Manager. Required to install and run Vue.js
- Node.js
  - Required for npm. A back-end Javascript framework.

For the map, we use:
- Leaflet, an open source Javascript mapping library.
  - Open source alternative to Google Maps API. Javascript mapping library.
  - Plugins we used:
    - vue2-leaflet - it provides wrapping constructs of the basic Leaflet objects, which are designed for the Vue framework.
    - leaflet-routing-machine - this library is used for all the functionality that is related to routing e.g., finding the route,displaying the route, determining the distance and time necessary to complete the route etc.
- leaflet GeoSearch
  - To enable searching based on addresses and names instead of coordinates.
  - Though it is called leaflet GeoSearch, it has no dependencies on Leaflet.

### Why we chose these technologies

#### Vue.js

Since nobody in our team had any experience with creating web applications, we couldn't
make the decisions based on our own experience. We wanted to make a choice between the three
most popular front-end Javascript frameworks, Angular, React and Vue.js. These frameworks
allow Javascript code to be structured into components.

Since is Vue.js is said to have the lowest learning curve out of
the three frameworks, we decided to go with Vue.js. Our TA also recommended this and on 
Stackshare.io it can be seen that Vue.js has the highest approval ratings. It has been
developed by the Chinese Evan You and had been popular in China for some years already,
before spreading to the West.

Some other advantages of Vue.js are that it
- is lightweight and therefore quite fast, especially
in comparison with Angular.
- is an MVC framework.
- is the newest technology. It is meant as an improvement over Angular and React.

Some disadvantages are that it
- has a smaller community and less documentation. However, we considered the documentation to
be good enough.
- has fewer libraries than Angular and React. However, the framework offers more than enough libraries to
suit our project's needs.

#### Leaflet

Initially, we wanted to use the Google Maps API to show the map in the application, to show
markers on the map, to find the route between the start and end locations and to calculate
the time and distance needed for that route. Later on in the project we found out that we
had to fill in payment details for the routing functionality. Though it would initially be
free, we would have to pay if the application made more than a certain amount of requests per month. Since
we didn't want to have the risk of one of us or our client having to pay a lot of money
unintentionally, we decided to use an open source map API instead.

Leaflet is the most-used Javascript library for interactive maps. After some searching, we
found that it had all features we needed if we used some extra plugins. It allows us to
connect to OpenStreetMap, a free wiki world map.

## Team organization
<!-- Team Organization: What teams are there and what are their responsibilities? Are the team responsibilities focused on different components?-->

There is one team in our project. Each member of this team has their own Vue component to work on, however.
We created the architecture together and then divided the components. When
two components needed to be connected, the two team members worked on it together. Moreover,
if anyone needed help, we of course helped our team mate with their part.

The division was as follows: Antonin created the VehicleSelector, Bjar created the ProductInput, Gheorghe 
created the Map and the store, Lorenzo created the ControlPanelOutput and Lonneke created 
the JourneyInput.

## Change log
<!-- Change Log: Descriptive list of changes made to the document tagged with date and author.-->

| Who | When | What |
| --- | --- | --- |
| Lonneke | 11-3-2020 | First draft of the architecture document.
| Lonneke | 24-3-2020 | Updated technologies and added introduction, file structure and image of architecture. 
| Lonneke | 4-4-2020  | Added why we chose technologies and blackbox description in introduction.
| Gheorghe| 6-4-2020  | Added the plugins necessary for the map