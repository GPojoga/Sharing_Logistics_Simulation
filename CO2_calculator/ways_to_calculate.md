# CO2 emissions calculator

## Input
In order to calculate the CO2 emissions of a truck we would need some parameters as input. These parameters could be: 

1. Total amount of fuel used (FU)
2. Total fuel spent (FS)
3. Total distance (D) and truck's fuel consumption (FC)
4. Total distance (D)

Moreover, we would also need some static values to help us in the calculations such as emissions per liter burnt(diesel) (EB), emission factor (EF) and average fuel price(FP). 

* emissions burnt/liter = 2,67 kg CO2 / ltr ([Source](https://ec.europa.eu/environment/enveco/taxation/pdf/Annex%205%20-%20Calculations%20from%20the%20case%20studies.pdf))
* emission factor = 0,85361 ([Source](https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2019), 2019, 50% laden)
* average fuel price = € 1,450 ([Source](http://www.fuel-prices-europe.info), 29 February 2020)

## The ways of calculating ([Source](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/218574/ghg-freight-guide.pdf))

### Case 1: Total amount of fuel used
		TOTAL EMISSIONS = FU x EB
### Case 2: Total fuel spent and truck's fuel consumption
		FUEL USE = FS / FP
		TOTAL EMISSIONS = FU x EB
### Case 3: Total distance and truck's fuel consumption
		FUEL USE = D / FC
		TOTAL EMISSIONS = FU x EB
### Case 4: Total distance
		TOTAL EMUSSIONS = D x EF
This method of calculating CO2 emission is the least reliable because we don't take in consideration factors that increases fuel consumption such as the weight of the truck or drivers way to drive.

## Sources

* [https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/218574/ghg-freight-guide.pdf](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/218574/ghg-freight-guide.pdf)
* [https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2019](https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2019)
* [https://ec.europa.eu/environment/enveco/taxation/pdf/Annex%205%20-%20Calculations%20from%20the%20case%20studies.pdf](https://ec.europa.eu/environment/enveco/taxation/pdf/Annex%205%20-%20Calculations%20from%20the%20case%20studies.pdf)
* [http://www.fuel-prices-europe.info](http://www.fuel-prices-europe.info)
