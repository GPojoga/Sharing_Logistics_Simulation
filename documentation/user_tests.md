# User tests

User tests are tests that can not be tested or impractical to test with automatic unit tests, and are therefore written
in natural language like a sort of recipe to be executed by human beings.

## U_T_C1 : 
 1. Navigate to the SettingsPage
 2. Enter/Change input until all fields are no longer red.
 3. Navigate to the HomePage and repeat step 2.
 4. Press Simulate tradition method button at the bottom right of left panel.
 5. In case of popup return to step 1.
 6. Wait for simulation to complete, (optional press + button at bottom of page to speed up simulation)
 7. Press Simulate shared method button at the bottom right of left panel.
 8. Wait for simulation to complete. (in case the simulation is paused, press the unpause button)
 9. Navigate to the OutputPage by pressing the blue Show results button.

## U_T_C1.1 :
  1. Complete steps 1-9 of U_T_C1.
  2. Compare CO2 emission for Sharing Logistics (left) vs Traditional Method (left). 

## U_T_C1.2 :
  1. Complete steps 1-9 of U_T_C1.
  2. Compare number of trucks used for Sharing Logistics (left) vs Traditional Method (right). 

## U_T_C1.3 :
  1. Complete steps 1-9 of U_T_C1.
  2. Compare total distance travelled for Sharing Logistics (left) vs Traditional Method (right). 

## U_T_I1 :
  1. Navigate to the HomePage.
  2. In case there is no truck add a new truck by pressing ![Add vehicle Button](images/add_vehicle_button.png)
  3. Press one of the 3 different vehicle drawings.
  
## U_T_I1.1 : 
  1. Navigate to the HomePage.
  2. In case there is no truck add a new truck by pressing ![Add vehicle Button](images/add_vehicle_button.png)
  3. Press one of the 3 different vehicle drawings to change according to desired truck type.

## U_T_I2
  1. Execute the application
  2. Go to control panel
  3. Create as many Good entries as necessary
  4. For each Good input the desired weight and volume, in the according input boxes
  5. If the entered values are valid the color of the background of the input box will turn from red to blue
  6. In order to test whether the given parameters affect the simulation, run the same type of simulation with different weight/volume values and analyze the results, by pressing the button "Show results" from the control panel.
  7. If weight/volume is the only variable parameter, then its value must be proportional with the fuel consumed during the simulation


## U_T_U1
  1. Execute the application
  2. Go to control panel
  3. Create as many Good/ Truck entries as necessary
  4. Each truck has only one location input (initial location), while each good has two location inputs (From, To)
  5. Next to each location input a location button is present. It looks the following way : ![Location Button](images/location_button.png)
  6. After it is pressed, you can select any location on the map.
  7. After the location has been selected, the location input will contain the name of the selected location.
  8. If this way was selected the initial location of a specific type, then after the simulation starts, the icon for that truck will be initially displayed at that location.
  9. If this way was selected the pickup/delivery location of a product, then after the simulation starts, the respective icon will be displayed at that location.

## U_T_U2
  1. Execute the application
  2. Go to the control panel
  3. Find the button ![Add vehicle Button](images/add_vehicle_button.png)
  4. By pressing this button

## U_T_U2.1
  1. Execute the application
  2. Create as many truck entries as necessary
  3. Now we will focus on one single truck entry, as the same process applies to the others.
  2. There are 2 ways for setting the initial location of a truck. The first way is the one described in U_T_U1. The second one is by typing the desired location in the location input box.
  3. The location input box has the label "Starting at"
  4. While typing the name of the location, a dropdown menu will suggest some locations.
  5. If the menu contains the desired location, select it. Otherwise, continue typing
  6. After the location was inputted. If the entered location is valid the color of the background of the location input box will turn from red to blue
  7. If the location is valid, then after the simulation starts, the icon for that truck will be initially displayed at that location.

## U_T_U3.1
  1. Create a certain amount of truck entries. Remember the exact settings.
  2. Create a certain amount of good entries. Remember the exact settings.
  3. Run one of the types of simulations. Remember the exact settings.
  4. Click on the button to view the results.
  5. Write down the amount of CO2 emitted.
  6. Go back to the home page.
  7. Fill in the exact same settings as before, for trucks and goods.
  8. Click on the button at the bottom of the control panel called 'settings'.
  9. Change the emission burnt factor to a number 100 times as high as the default value.
  10. Run the same type of simulation again.
  11. View the results on the output page. The CO2 emitted should be 100 times as high as the value we wrote down.

## U_T_U3.2
  1. Create one truck entry. The parameters don't matter.
  2. Create one good entry with a quantity >= n.
  2. Change the value of 'max splits' to n.
  2. Run one of the simulations.
  3. Make sure that there are exactly n goods in the data panel on the right of the screen, under the goods tab.

## U_T_U3.3.1
  1. Go to the settings page and change the max volume for any truck type to n.
  2. Create a good such that volume < n and volume * quantity > n.
  3. Create a truck entry of the changed truck type.
  4. Run the sharing logistics simulation.
  5. Make sure on the data panel on the right that each truck doesn't transport more than their capacity at any point in time.
  
## U_T_U3.3.2
  Similar to U_T_U3.3.1, but now for the payload (weight) instead of the volume.

## U_T_U3.3.3
  1. Create a truck entry and choose any truck type.
  2. Create a good entry and enter the lowest possible values for each fields. Make the pickup and delivery locations as close as possible to the start location of the truck.
  3. Run the simulation of any type and write down the resulting fuel consumption.
  4. Go back to the home page and enter the same input.
  5. Go to the settings page and multiply the default empty fuel consumption of the chose truck type by n.
  6. Run the same simulation.
  7. Go to the results page and make sure that the fuel consumption is about n times the previously found fuel consumption.
  
## U_T_U3.3.4
  1. Create a truck entry and choose any truck type. Set the quantity to 1.
  2. Create a good entry. Make sure the distance between the pickup and delivery locations is not trivial and make sure the good fits into one truck, so that it can be transported in one transit.
  3. Run the simulation of any type and write down the resulting fuel consumption.
  4. Go back to the home page and enter the same input.
  5. Go to the settings page and multiply the default full fuel consumption by n.
  6. Run the same simulation.
  7. Go to the results page and make sure that the fuel consumption is about n times the previously found fuel consumption.
