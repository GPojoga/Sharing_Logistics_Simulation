# Requirements Document
### **Sharing Logistics Simulation** -  2020
   Version : 1.0   
   Client : Astone Shi ( astone.shi@gmail.com or c.shi@rug.nl )  
   TA : Alex   
* Antonin Thioux
* Bjar Karim
* Gheorghe Pojoga
* Lonneke Pulles
* Lorenzo La Rocca

## Introduction
As the world is more globally connect now than ever, goods are transported large distances before reaching the locations where they will be used and sold.
One of the many methods that these goods are transported is through road vehicles.
These vehicles often perform journeys carrying less than complete capacity, this is expected to be an inefficient use of resources and an increase in carbon emissions.
However it is unclear whether or not a system of **sharing logistics** would have a worthwhile impact on the inefficient use of resources and carbon emission.

The goal of this project is to produce a program with simulation functionality. 
The simulation should provide insight into these use of resources and carbon emissions in the context of transport of goods by road vehicles.
Two processes need to be simulated so that they can be compared, the first process should be the current (traditional) method that goods are transported, the second process should be the **sharing logistics** method.

### System overview
The system of this project is pretty simple since the system doesn't require any information to be saved.
Hence the system doesn't require a database and all calculation can be performed in the front end.
Additionally none of the calculation need to be done in secrecy from the user such that they can't be copied. 
For these two reasons we have decided to structure the system entirely in the website.

## User Stories
This project only has a single user who is using the applet.
This user is curious about which of the two methods of transportation (traditional / **sharing logistics**) are better.
In order to gain information about the use of resources and carbon emissions the user turns to this applet adjusting different parameters and comparing the outcomes under both methods.

### Critical User Stories
As a user of this applet I want to ...  
- be able to accurately and easily compare the CO2 emission (=energy) of two methods of transport so that I can inform my opinion of which method is better.
- be able to accurately and easily compare the time difference of two methods of transport so that I can inform my opinion of which method is better.

### Important User Stories
As a user of this applet I want to ...  
- be able to change points A & B so that I can compare different journeys.
- be able to change the quantity of vehicles makes the back and fourth journey so that I can observer the difference this makes to the comparison.
- be able to change the distribution of vehicles making the back and fourth journey so that I can observer the difference this makes to the comparison.
- have 3 types of vehicles (all different sizes) so that I can change between the 3 which is relevant for the previous step.
- be able to change the amount of goods that need to be transported A->B and B->A.
- be able to change the weight of the goods that need to be transported so that I can see what effects this has on both systems of transport. 
- be able to change the size of the the goods that need to be transported so that I can see what effect this has on the transportation of these goods under both systems.

### Useful User Stories
As a user of this applet I want to ...  
- be able to change the points A & B using google maps or an other digital map so that I can change the points easily.
- have an animation of a truck moving with numbers next to it for CO2 emissions (=energy) so that I can have a very visual representation of the problem.

### User Stories that wouldn't be implemented
As a user of this applet I want to ...  
- be able add point C where that is part of the **sharing logistics** which allows vehicles to move goods in different ways so that the simulation is more accurate.

### Non functional User Stories
As a user of this applet I want to ...  
- have a effective interface to look at where information is organized in an effective manner so I have easy access it.
- be able to change a parameter within 2 clicks from the home screen so that I can quickly change a parameter.
- be able not to change certain parameters and have the simulation use a default value for this parameter so that I can quickly start simulating.
- have the simulation always give the same outcomes when I run it with the same parameters so that I only have to run the simulation once.

## Customer meetings
| **When**  | **What** 
|:---------:|----------
| 17th Feb. | Introduction of project; discussion of projects goals, stages (priorities), different simulations methods, accuracy of the goal, technologies needed.

## Changelog
| **Who**        | **When**  | **Which Section** | **What** 
|----------------|:---------:|-------------------|----------
| Antonin Thioux | 23rd Feb. | The document.     | Created the document, added sections: introduction, user wishes, customer meetings, changelog.