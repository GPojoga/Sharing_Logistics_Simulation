# Design of Simulation Function

This document explores the way the simulation should take place. Before this exploration there are many questions marks about how the calculations where going to take place. Hopefully this document will find **possible algorithms** to calculated the **outputs** of the program.

## Constants

- Average fuel price (Euros per liter)

  ![equation](https://latex.codecogs.com/gif.latex?FP%20%3D%201.450%20%5Cfrac%7B%5Ceuro%7D%7BL%7D)

- Emissions burnt (Kilograms of Carbon dioxide per liter)

  ![equation](https://latex.codecogs.com/gif.latex?EB%20%3D%202.67%20%5Cfrac%7BKg%20%5Ccdot%20CO_%7B2%7D%7D%7BL%7D)

- Fuel consumption of empty truck (Liters per kilometer)
  
  ![equation](https://latex.codecogs.com/gif.latex?FC0%20%3D%20.2374%20%5Cfrac%7BL%7D%7Bkm%7D)

- Fuel consumption of full truck (Liters per kilometer)
  
  ![equation](https://latex.codecogs.com/gif.latex?FC1%20%3D%20.3616%20%5Cfrac%7BL%7D%7Bkm%7D)

- Truck 1 Volume (Cubic meters)
  
  ![equation](https://latex.codecogs.com/gif.latex?V1%3D%208.925%20m%5E%7B3%7D)

- Truck 1 Max payload (Kilograms)
  
  ![equation](https://latex.codecogs.com/gif.latex?P1%20%3D%204700%20kg)

- Truck 2 Volume (Cubic meters)
  
  ![equation](https://latex.codecogs.com/gif.latex?V2%20%3D%2091.233%20m%5E%7B3%7D)

- Truck 2 Max payload (Kilograms)
  
  ![equation](https://latex.codecogs.com/gif.latex?P2%20%3D%2032018%20kg)

- Truck 3 Volum (Cubic meters)
  
  ![equation](https://latex.codecogs.com/gif.latex?V3%20%3D%20115%20m%5E%7B3%7D)

- Truck 3 Max payload (Kilograms)
  
  ![equation](https://latex.codecogs.com/gif.latex?P3%20%3D%2035800%20kg)

- Average speed of transport (Kilometers per hour)
  
  ![equation](https://latex.codecogs.com/gif.latex?AS%3D%20100%20%5Cfrac%7Bkm%7D%7Bh%7D)

## Variables

* Distance between points A and B in kilometers
  
  ![equation](https://latex.codecogs.com/gif.latex?D%20km)

* The number of trucks type i at point A, where i is an interger from 1 to 3
  
  ![equation](https://latex.codecogs.com/gif.latex?T%5E%7BA%7D_%7Bi%7D)

* The number of trucks type i at point B, where i is an interger from 1 to 3
  
  ![equation](https://latex.codecogs.com/gif.latex?T%5E%7BB%7D_%7Bi%7D)

* The quanity of a good  k at point A, where k is an positive interger
  
  ![equation](https://latex.codecogs.com/gif.latex?GQ%5E%7BA%7D_%7Bk%7D)

* The weight of a good k at point A, in kilograms
  
  ![equation](https://latex.codecogs.com/gif.latex?GW%5E%7BA%7D_%7Bk%7D%20%5C%20kg)

* The volume of a $k$ at point A, in meters cubed
  
  ![equation](https://latex.codecogs.com/gif.latex?GV%5E%7BA%7D_%7Bk%7D%5C%20m%5E%7B3%7D)

* The quanity of a good j at point B, where j is an positive interger
  
  ![equation](https://latex.codecogs.com/gif.latex?GQ%5E%7BB%7D_%7Bj%7D)

* The weight of a good j at point B, in kilograms
  
  ![equation](https://latex.codecogs.com/gif.latex?GW%5E%7BB%7D_%7Bj%7D%20%5C%20kg)

* The volume of a good j at point B, in meters cubed
  
  ![equation](https://latex.codecogs.com/gif.latex?GV%5E%7BB%7D_%7Bj%7D%5C%20m%5E%7B3%7D)

## Outputs

* The time it takes for all goods to be transported to the opposite point, hours

* The number of vehicles used to transport all goods

* The amount of Carbon dioxide emissions released into the atmosphere, kilograms

## Constraints

These constraints will for a large part define the algorithms we use. We pobably want different constraints for different algorithms.

### Traditional

The idea behind these constraits is to simulated a situtation where different clients are all trying to get their goods to the opposite point, without cooperation.

* Goods (Clients) are always procceed inorder they are inputted. (No optimizing done)

* Trucks always come back empty.

* Trucks must always return to their point of origin.

* Clients try to get their goods delivered as quickly as possible, even if this is less effective.

* Clients will prefer trucks biggest to smallest, useless all their remaining goods fit in a smaller truck.

### Sharing logistics

The idea behind these constraits is to simulated a situation where all logistics space is shared with the interests of all client.

* Trucks must always return to their point of origin.

* The all total goods are attempted to be delivered as quickly as possible. However individual goods aren't delivered as quickly as possible.

* Point A is processed before point B, so left over trucks of point A are used before B sends trucks itself.

* Goods are simplief by an average good that represents are all goods at a point.

## Possible Algorithms

### Traditional

The time complexity of this algorithm is O(n) where n is the total number of trucks needed.

```python
# This python code probably doesn't work, I have no idea I didn't test it.
# The purpose of this code is to give an idea of how the code could look and how it's logic could work.

# (*): There are some duplicated lines. 
# if we can iterate over a list of truck types in JS we decrease the number of lines 
# (I would need to look up how to do this in python).

def send(good, trucks):
    """ 
    This function sends trucks loaded with the goods, in a list.
    :param good: The good that needs to be transported.
    :param trucks: The list of trucks available.
    :return: A list of trucks, where each truck has a certain payload.
    """
    sent_trucks = []
    if good.quantity == 0 or isEmpty(trucks):
        return sent_trucks  # Base case no trucks will be sent.

    tv = good.volume * good.quantity # calculate the total volume
    tw = good.weight * good.quantity # calculate the total weight
    
    # Cases in which all the goods fit in a single truck*
    if trucks[0] > 0 and V1 > tv and P1 > tw:
        # Everything fits in a light-duty van!
        trucks[0] -= 1
        good.quantity = 0
        send_trucks.append(Truck("Ligth", tw))
        return sent_trucks
    elif trucks[1] > 0 and V2 > tv and P2 > tw:
        # Everything fits in a heavy-duty truck!
        trucks[1] -= 1
        good.quantity = 0
        send_trucks.append(Truck("Heavy", tw))
        return sent_trucks
    elif trucks[2] > 0 and V3 > tv and P3 > tw:
        # Everything fits in a train truck!
        trucks[2] -= 1
        good.quantity = 0
        send_trucks.append(Truck("Train", tw))
        return sent_trucks
    
    # Multiple Trucks needed*
    if trucks[2] > 0:
        # There is a train truck available
        q_fit = min(V3 // good.volume, P3 // good.weight)
        good.quantity -= q_fit
        trucks[2] -= 1
        sent_trucks = send(good, trucks)
        sent_trucks.append(Truck("Train", q_fit * good.weight))
    elif trucks[1] > 0:
        # There is a heavy-duty truck available
        q_fit = min(V2 // good.volume, P2 // good.weight)
        good.quantity -= q_fit
        trucks[1] -= 1
        sent_trucks = send(good, trucks)
        sent_trucks.append(Truck("Heavy", q_fit * good.weight))
    else:
        # There are only light-duty van(s) available
        q_fit = min(V1 // good.volume, P1 // good.weight)
        good.quantity -= q_fit
        trucks[0] -= 1
        sent_trucks = send(good, trucks)
        sent_trucks.append(Truck("Light", q_fit * good.weight))
    return sent_trucks
    

def tradition(A, B):
    """
    This function simulates the traditional method of sending packages between two points A & B.
    :param A: Point A Location object.
    :param B: Point B Location object.
    :return: The time, emission, number of trucks used.
    """
    dis = distance(A, B)
    times = {A: 0, B: 0}
    emission = 0
    trucks_used = 0
    
    for p in [A, B]:  # For each of the points
        for g in p.goods:
            while g.quantity != 0:
                trucks_sent = send(g, p.trucks)
                trucks_used += len(trucks_sent)
                
                for t in trucks_sent:
                    fuel_rate = FC0 + t.payload/t.maxload * (FC1 - FC0)
                    emission += EB * (fuel_rate * dis)
                    
                if isEmpty(p.trucks): # No more trucks
                    p.resetTrucks() # wait for the other to return
                    times{p} += 2 * dis * AVG_SPEED
                    
    return max(times{A}, times{B}), emission, trucks_used
```

### Sharing logistics

The time complexity of this algorithm is O(n) where n is the total number of trucks needed.

```python
# This python code also probably doesn't work for the same reasons as the code above.
# Note: this code used the send function defined above.

def get_average_good(goods):
    """
    This function finds the average good giving a list of goods.
    :param goods: The list of goods to find the average from.
    :return: A good representing the average of a list.
    """
    quantity = 0
    total_weight = 0
    total_volume = 0
    
    for good in goods:
        quantity += good.quantity
        total_weight += good.weight * good.quantity
        total_volume += good.weight * good.volume
        
    return Good(quantity, total_weight/quantity, total_volume/quantity)
    
def get_reusable_trucks(sent_trucks):
    """
    This function finds the reusable trucks, making a journey back.
    :param sent_trucks: The list of the trucks sent.
    :return: The count of each type of truck sent.
    """
    reusable = [0, 0, 0]
    for truck in sent_trucks:
        if truck.Type == "Light":
            truck[0] += 1
        elif truck.Type == "Heavy":
            truck[1] += 1
        else: # truck.Type == "Train"
            truck[2] += 1
    return reusable

def sharing_logistics(A, B):
    """
    This function simulates the sharing method of sending packages between two points A & B.
    :param A: Point A Location object.
    :param B: Point B Location object.
    :return: The time, emission, number of trucks used.
    """
    dis = distance(A, B)
    time = 0
    emission = 0
    trucks_used = 0
    
    good_A = get_average_good(A.goods)
    good_B = get_average_good(B.goods)

    while good_A.quantity =! 0 or good_B.quantity != 0:
        trucks_sent = send(good_A, A.trucks) # goods are sent from A
        trucks_used += len(trucks_sent)
        
        for t in trucks_sent:
            fuel_rate = FC0 + t.payload/t.maxload * (FC1 - FC0)
            emission += EB * (dis * fuel_rate)
        
        reused = get_reusable_trucks(trucks_sent) 
        send(good_B, reused)  # Use extra shared trucks
        
        trucks_sent = send(good_B, B.trucks) # goods are sent from B
        trucks_used += len(trucks_sent)
        
        for t in trucks_sent:
            fuel_rate = FC0 + t.payload/t.maxload * (FC1 - FC0)
            emission += EB * (dis * fuel_rate)
            
        reused = get_reusable_trucks(trucks_sent)
        send(good_B, reused) # Use extra shared trucks
        
        # One iteration of the while loop represents a single journey
        time = 2 * dis * AVG_SPEED
        
    return time, emission, trucks_used
```

## Changes in inputted variables

* Date isn't used, however can be used to calculate the returned date.

* Returned date doesn't do anything, since it is never enfored

* Point A and Point B both need vehicle fields

* Point A and Point B both need product fields

## Changes in outputted variables

* Cost is no longer calculated however code can easly be apapted to calculate this. Simply output the total fuel used multiply it by FP (fuel price) and add the time multiplied by the average wage of a truck driver.

* Expected deilvery date, is also not caculated however can be easily caculated using the outputted time (assuming the trucks drive 24 hours a day).

## List of invalid inputs

* TODO
