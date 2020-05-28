
# Requirements Document
### **Sharing Logistics Simulation** -  2020
   Version : 2.0   
   Client : Astone Shi ( astone.shi@gmail.com or c.shi@rug.nl )  
   TA : Alex Tutea
* Antonin Thioux
* Bjar Karim
* Gheorghe Pojoga
* Lonneke Pulles
* Lorenzo La Rocca

## Introduction
As the world is more globally connected now than ever, goods are transported large distances before reaching the locations where they will be used and sold.
One of the many ways these goods are transported is by road vehicles.
These vehicles often make journeys carrying less than complete capacity.
This is expected to be an inefficient use of resources and an increase in carbon emissions.
However, it is unclear whether or not a system of **sharing logistics** would have a worthwhile impact on the inefficient
use of resources and carbon emission.

The goal of this project is to produce a program with simulation functionality.
The simulation should provide insight into these use of resources and carbon emissions in the context of transport of goods by road vehicles.
Two processes need to be simulated so that they can be compared. The first process should be the current (traditional) 
method that goods are transported, the second process should be the **sharing logistics** method.

### System overview
The system of this project is pretty simple since the system doesn't require any information to be saved.
Hence the system doesn't require a database and all calculation can be performed in the front end.
Additionally, none of the calculation needs to be done in secrecy from the user such that they can't be copied.
For these two reasons we have decided to structure the system entirely in the website.

### Actors and stakeholders

Our system has only one actor: the person that wants to see the simulation and results given certain input.

In addition to the actor there are also stakeholders that may have in interest in this system. These are:

- Existing digital freight platforms that apply the sharing logistics method, such as Saloodo.com
- Transportation and logistics companies such as Uber and DHL, since they could use the system to calculate how much money they could save by sharing logistics.
- Otherwise unrelated companies that have a delivery branch, such as pizza chains, since they could calculate how much money they could save by sharing logistics for small packages.
- Governments and environmental NGOs, since they could calculate how much CO2 and fuel could be saved when trucks start sharing logistics.


## User Stories
The requirements for this project are described with user stories. We have converted the client's description
of the project into these user stories.

This project only has a single user who is using the applet: our client.
This user wants to know which how the two methods of transportation (traditional / **sharing logistics**) differ on
given variables, such as total distance travelled and overall carbon emissions.
The outcomes depend on different parameters that the user can vary: the number and types of trucks, start
locations, number and types of goods, etc.

We have divided the user stories in five categories. Critical, important and useful user stories are functional
requirements and have different degrees of priority, from high to low. 
The critical user stories are ones that have to be in the final product: they are must haves. They have to
be in the minimum viable product (MVP). Important user stories should be in the final product, but have less priority
than critical user stories: they are should have. Useful user stories would be nice to add to the system if time allows
it: they are could haves.

There are also user stories that we won't implement in this project: won't haves. They could
be implemented in the future, but they definitely won't be implemented during this course.

Must haves, should haves, could haves and won't haves are different ways of classifying these user stories, 
from the naming system called MoSCoW.

The non-functional requirements are constraints on the system or development process.

<!-- All requirements and user stories should be able to be objectively verified. -->

### Critical User Stories - must haves
As a user of this applet I want to be able to...  
1. [x] (C1) compare the two methods of transport based on certain parameters so that I can inform my opinion of which method is better.
   - [x] (C1.1) compare the two methods based on the CO2 emission (= energy).
   - [x] (C1.2) compare the two methods based on the total distance travelled.
   - [x] (C1.3) compare the two methods based on the number of trucks used so that I get an indication of additional costs, such as paying truck drivers.
3. [x] (C3) input at least one truck starting from a given location.
4. [x] (C4) input the quantity of a good.

### Important User Stories - should haves
As a user of this applet I want to be able to...  
1. [x] (I1) input a single starting location for all trucks so that the path and distance travelled by the truck can be realistically simulated.
2. [x] (I2) have three types of vehicles with different sizes so that I can easily vary between the three.
   - [x] (I2.1) change the number of vehicles of each type so that I can observe the difference this makes to the comparison.
3. [x] (I3) vary some parameters of the goods so that I can make the simulation more realistic.
   - [x] (I3.1) change the weight of the goods that need to be transported so that I can see what effects this has on both systems of transportation.
   - [x] (I3.2) change the size of the goods that need to be transported so that I can see what effect this has on the transportation of these goods under both systems.
   - [x] (I3.3) specify the pick-up and delivery location of every good so that I can see what effect this has on the transportation of these goods under both systems.

### Useful User Stories - could haves
As a user of this applet I want to be able to...  
1. [x] (U1) change the starting locations of trucks and pickup and delivery locations of goods using a digital map so that I can change the locations easily by clicking.
2. [x] (U2) add trucks one by one and set different parameters so that I can have more control over the trucks that are inputted.
   - [x] (U2.1) input a different starting location for each truck.
   - [x] (U2.2) set the type of truck for each truck.
   - [x] (U2.3) set the quantity of each truck that is inputted.
3. [x] (U3) (but not obliged to) vary some parameters that are used in the background of the simulation (emission burnt factor, average speed of the trucks and for each type of truck the max volume, max payload, empty fuel consumption and full fuel consumption)
such that I can adapt these values to maybe more realistic ones and see the influence that varying these values has.
4. [x] (U4) run the simulation over time so that I can more realistically see how the trucks and goods are transported over time.
   - [x] (U4.1) have an animation of a truck moving so that I can have a visual representation of the problem.


<!-- should these be added?

- add numbers next to the trucks for CO2 emissions (=energy)
-->


### Unused User Stories - won't haves
As a user of this applet I won't be able to ...  
1. [ ] (W1) add a point C to the routes of trucks that are part of the **sharing logistics** which allows vehicles to move goods in different ways so that the simulation is more accurate.



## Non functional Requirements
We group the non-functional requirements based on the categories in the book The Quest for Software Requirements by Roxanne Miller.
Examples of these categories are usability, safety, integrity, efficiency and reusability.

Some categories that are not relevant to our project are access security and safety (since we have no private data), interoperability 
(since the system isn't coupled to others) and scalability (since the project is only meant to be used by one person and stay small).

As a user of this applet I think the following non-functional requirements are important...
1. [ ] (N1) usability: ease with which the user is able to learn, operate, prepare inputs and interpret outputs through interaction with a system.
   - [ ] (N1.1) The user should be able to understand how to use the system without having to consult another source, such as a guide or one of the developers.
TODO





   - [x] (N1.1) The results should be on a separate output page from which I can easily go back to the input page.
   - [x] (N1.2) The map and the input panel should be on the same page of the web application.
   - [ ] (N1.3) Each inputted truck should have different images.
   - [ ] (N1.4) Each of the routes that trucks travel along should have different colors.
   - [ ] (N1.5) The simulation should have default values for certain parameters so that I can quickly start simulating.
2. [ ] (N2) integrity: degree to which the data maintained by the software system are accurate, authentic and without corruption.
   - [ ] (N2.1) The simulation should be as realistic as possible.
   - [ ] (N2.2) The simulation should always give the same outcomes when I run it with the same parameters so that I only have to run the simulation once.
3. [ ] (N3) 
4. [ ] (N4) 



## Traceability Matrix
| **Requirement** | **Files Affected** | **Test** | **Passed**
|----------------|------------|--------|---------|
| Be able to compare the CO2 emission of the two methods    |   |   |   |
| Be able to compare the time difference of the two methods|   |   |   |
| Be able to change the points A & B|   |   |   |
| Be able to change the radius of the points A & B |   |   |   |
| Be able to change the number of vehicles of a specific type  |   |   |   |
| Have 3 predefined vehicle types |   |   |   |
| Be able to change the weight of the goods |   |   |   |
| Be able to change the size of a good |   |   |   |
| Be able to specify the pick-up location of a good   |   |   |   |
| Be able to specify the delivery location of a good   |   |   |   |
| Be able to change the points A & B using a digital map   |   |   |   |
| Be able to visualize the current location of a truck   |   |   |   |
| Be able to visualize the CO2 emission of a specific truck  |   |   |   |


## Meeting Log
| **When**  | **What**
|:---------:|----------
| 17th Feb. | Introduction of project; discussion of projects goals, stages (priorities), different simulations methods, accuracy of the goal, technologies needed.
| 16th Mar. | Feedback received on the draft UI and code.
| 24th Mar. | Feedback regarding different parameters.
| 15th Apr. | Feedback regarding the way the simulation should work. Added the requirement that the (theoretical) future application we're simulating is like Uber in some specific ways. |

Not all client communication went via meetings. Especially after the restrictions due to COVID-19 took effect, we mainly
communicated via email. The pdfs of all email exchanges can be found in the folder documentation/client communication of
our GitHub repository.

## Change Log
| **Who**        | **When**  | **Which Section** | **What**
|----------------|:---------:|-------------------|----------
| Antonin Thioux | 23rd Feb. | The document.     | Created the document, added sections: introduction, user wishes, meeting log, changelog.
| Bjar Karim 	| 22nd Mar.	| Meeting Log.  | Added the new meeting (email) with the customer.
| Bjar Karim   | 6th  Apr. | Meeting Log.  | Added the new meeting (email) with the customer and updated the user stories.
| Gheorghe Pojoga   | 20th Apr.  | Important user stories. Non functional requirements. Meeting Log. Traceability matrix.   | Added a new important user story.  Combined two important user stories. Removed one non-functional requirement and added a new one. Added a new client meeting (video chat). Created the sketch of the Traceability Matrix.   |
| Lonneke Pulles | 7th May | User Stories | Processed Andrea's feedback: added IDs to user stories, MoSCoW naming, explanation of used terms; goal of client formulated more precisely.
| Lonneke Pulles | 8th May | User Stories. Meeting log. | Added checkboxes to requirements. Split and combined some requirements into, and added, subrequirements. Added input of a truck and a good to critical user stories (C3, C4). Added user story varying multiple background parameters (U3). Added user story to be able to run simulation over time (U4). Changed 'points A & B' to a single start location for trucks.
| Lonneke Pulles | 28th May | User Stories. Non-functional requirements. Actors and stakeholders. | Extract all 'be able to's. Add actors and stakeholders. Change non-functional user stories to requirements and link them to standard categories (in line with Mohammed's feedback). Process feedback from Mohammed: specify actors.
| Lonneke Pulles | TODO/future | User Stories. | Add blackbox overview of system. Do spelling/grammar check. Process feedback from Mohammed: Categorize, specify and explain non-function requirements more. Explain user stories more and make them less abstract. Make introduction and user stories a bit longer.