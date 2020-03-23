# Design of Simulation Function

This document explores the way the simulation should take place. Before this exploration there are many questions marks about how the calculations where going to take place. Hopefully this document will find **possible algorithms** to calculated the **outputs** of the program.

## Constants

- FP (Average fuel price) = 1.450$\frac{€}{L}$  (euros pre liter) 

- EB (Emissions burnt) = 2.67$\frac{Kg}{L}$ (Kilograms of $CO_{2}$ per liter)

- FC0 (Fuel consumption Empty) = 0.2374 $\frac{L}{km}$ (Liters per kilometer)

- FC1 (Fuel consumption Full) = 0.3616 $\frac{L}{km}$ (Liters per kilometer)

- V1 (Truck 1 Volume) = 8.925 $m^{3}$ (Cubic meters)

- P1 (Truck 1 Max payload) = 4,700 $kg$ (Kilograms)

- V2 (Truck 2 Volume) = 91.233 $m^{3}$ (Cubic meters)

- P2 (Truck 2 Max payload) = 32,018 $kg$ (Kilograms)

- V3 (Truck 3 Volum) = 115 $m^{3}$ (Cubic meters)

- P3 (Truck 3 Max payload) = 35,800 $kg$ (Kilograms)

## Variables

* D $km$ (distance between point A and B in kilometers)

* T$^{A}_{i}$ (The number of trucks type $i$ at point A, where $i$ is an interger from 1 to 3)

* T$^{B}_{i}$ (The number of trucks type $i$ at point B, where $i$ is an interger from 1 to 3)

* GQ$^{A}_{k}$ (The quanity of a good type $k$ at point A, where $k$ is an positive interger)

* GW$^{A}_{k}$ $kg$ (The weight of a good type $k$ at point A, in kilograms)

* GV$^{A}_{k}$ $m^{3}$ (The volume of a good type $k$ at point A, in meters cubed)

* GQ$^{B}_{j}$ (The quanity of a good type $j$ at point B, where $j$ is an positive interger)

* GW$^{B}_{j}$ $kg$ (The weight of a good type $j$ at point B, in kilograms)

* GV$^{B}_{j}$ $m^{3}$ (The volume of a good type $j$ at point B, in meters cubed)

## Outputs

* T $h$ (The time it takes for all goods to be transported to the opposite point, hours)

* N (The number of vehicles used to transport all goods)

* E $kg$ (The amount of $CO_{2}$ emissions released into the atmosphere, kilograms)

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

* The goods are attempted to be delivered as quickly as possible.

## Possible Algorithms

### Traditional

The time complexity of this algorithm is O(n$\times$t), where n is the number of unique goods (client), and t is the average number of trucks sent per client.

```python
def tradition(A, B):
    """Input: point A and B. Output: time, emission, trucks_used."""
    dis = distance(A, B)
    times = {A: 0, B: 0}
    emission = 0
    trucks_used = 0
    
    for p in [A, B]:  # For each of the points
        for g in p.goods:
            if isFit(g, p.trucks, 1):
                # All goods transported in truck 1
                trucks_sent = send(g, p.trucks, 1)
            elif isFit(g, p.trucks, 2):
                # All goods transported in truck 2 or smaller
                trucks_sent = send(g, p.trucks, 2)
            else:
                # Send as much as needed or possible
                trucks_sent = send(g, p.trucks, 3)
                
            for t in trucks_sent:
                fuel = (FC0 + t.payload/t.maxload * (FC1 - FC0)) * dis
                emission += EB * fuel
                trucks_used += 1

            if isEmpty(p.trucks): # When there are no longer any trucks
                A.resetTrucks()   #  wait for the others to return
                times{p} += 2 * dis * AVG_SPEED
                p.goods.append(g) # consider remaining goods
    
    return max(times), emission, trucks_used
```

### Sharing logistics

The time complexity of this algorithm is O(n) where n is the total number of trucks needed.

```python
def sharing_logistics(A, B):
    """Input: point A and B. Output: time, emission, trucks_used."""
    dis = distance(A, B)
    time = 0
    emission = 0
    trucks_used = 0
    
    good_q_A = sum(A.goods.quantity)
    good_w_A = average(A.goods.weight)
    good_v_A = average(A.goods.volume)
    good_q_B = sum(B.goods.quantity)
    good_w_B = average(B.goods.weight)
    good_v_B = average(B.goods.volume)

    trucks = A.trucks + B.trucks
    
    while good_q_A =! 0 or good_q_B != 0:
        
        for i in range(1,4):
            while trucks[i] != 0:
                trucks_used += 1
                trucks[i] -= 1
                
                if good_q_A == 0 and good_q_B == 0:
                    break
         

    return times, emission, trucks_used
```
