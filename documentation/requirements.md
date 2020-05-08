
# Requirements Document
### **Sharing Logistics Simulation** -  2020
   Version : 1.0   
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

## User Stories
The requirements for this project are described with user stories. We have converted the client's description
of the project into these user stories.

This project only has a single user who is using the applet: our client.
This user wants to know which how the two methods of transportation (traditional / **sharing logistics**) differ on
given variables, such as total distance travelled and overall carbon emissions.
The outcomes depend on different parameters that the user can vary: the number and types of trucks, start
locations, number and types of goods/products, etc.

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
As a user of this applet I want to ...  
1. (C1) be able to accurately and easily compare the CO2 emission (=energy) of two methods of transport so that I can inform my opinion of which method is better.
2. (C2) be able to accurately and easily compare the time difference of two methods of transport so that I can inform my opinion of which method is better.

### Important User Stories - should haves
As a user of this applet I want to ...  
1. (I1) be able to change points A & B as well as their radius.
2. (I2) be able to change the number of vehicles of a specific type which make the back and fourth journey so that I can observe the difference this makes to the comparison.
3. (I3) have 3 types of vehicles (all different sizes) so that I can change between the 3 which is relevant for the previous step.
4. (I4) be able to change the weight of the goods that need to be transported so that I can see what effects this has on both systems of transportation.
5. (I5) be able to change the size of the goods that need to be transported so that I can see what effect this has on the transportation of these goods under both systems.
6. (I6) be able to specify the pick-up and delivery location of every product within the range of the points A & B so that I can see what effect this has on the transportation of these goods under both systems.

### Useful User Stories - could haves
As a user of this applet I want to ...  
1. (U1) be able to change the points A & B using google maps or any other digital map so that I can change the points easily.
2. (U2) have an animation of a truck moving with numbers next to it for CO2 emissions (=energy) so that I can have a very visual representation of the problem.

### Unused User Stories - won't haves
As a user of this applet I want to ...  
1. (W1) be able to add point C where that is part of the **sharing logistics** which allows vehicles to move goods in different ways so that the simulation is more accurate.

### Non functional User Stories
As a user of this applet I want to ...  
1. (N1) have a effective interface to look at where information is organized in an effective manner so I have easy access it.
2. (N2) have the simulation as realistic as possible.
3. (N3) be able not to change certain parameters and have the simulation use a default value for this parameter so that I can quickly start simulating.
4. (N4) have the simulation always give the same outcomes when I run it with the same parameters so that I only have to run the simulation once.

## Traceability Matrix
| **Requirement** | **Files Affected** | **Test** | **Passed**
|----------------|------------|--------|---------|
| Be able to compare the CO2 emission of the two methods    |   |   |   |
| Be able to compare the time difference of the two methods|   |   |   |
| Be able to change the points A & B|   |   |   |
| Be able to change the radius of the points A & B |   |   |   |
| Be able to change the number of vehicles of a specific type  |   |   |   |
| Have 3 predefined vehicle types |   |   |   |
| Be able to change the weight of the products |   |   |   |
| Be able to change the size of a product |   |   |   |
| Be able to specify the pick-up location of a product   |   |   |   |
| Be able to specify the delivery location of a product   |   |   |   |
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
communicated via email. The pdfs of all email exchanges can be found in the folder documentation/client communication in
our GitHub repository.

## Change Log
| **Who**        | **When**  | **Which Section** | **What**
|----------------|:---------:|-------------------|----------
| Antonin Thioux | 23rd Feb. | The document.     | Created the document, added sections: introduction, user wishes, customer meetings, changelog.
| Bjar Karim 	| 22nd Mar.	| Customer meetings.  | Added the new meeting (email) with the customer.
| Bjar Karim   | 6th  Apr. | Customer meetings.  | Added the new meeting (email) with the customer and updated the user stories.
| Gheorghe Pojoga   | 20th Apr.  | Important user stories. Non functional requirements. Customer meetings. Traceability matrix.   | Added a new important user story.  Combined two important user stories. Removed one non-functional requirement and added a new one. Added a new client meeting (video chat). Created the sketch of the Traceability Matrix.   |
| Lonneke Pulles | 7th May | User Stories | Processed teacher's feedback: added IDs to user stories, MoSCoW naming, explanation of used terms; goal of client formulated more precisely.



