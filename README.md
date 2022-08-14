# Helsinki city bike app

This app fetches data from [Helsinki city bike data API](https://github.com/shimpukka/helsinki-city-bike-app) and displays data along with search/ordering functions.

## How to use
Before running this application, please read [README.md in Helsinki city bike data API](https://github.com/shimpukka/helsinki-city-bike-app) and follow the instruction to run the API.

```
# Clone the repository by
$ git clone https://github.com/shimpukka/helsinki-city-bike-app-react.git

# Run the app
$ npm install
$ npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Features
### Journey list view
- List journeys (For now it lists only 10000 journeys from API's first page)
- For each journey show departure and return stations, covered distance in kilometers and duration in minutes
- Ordering per column
- Rows per page select
- Dense padding select

### Station list
- List all the stations
- Pagination
- Searching

### Single station view
- Station name, address
- Total number of journeys starting from the station
- Total number of journeys ending at the station
- Station location on the map
- The average distance of a journey starting from the station
- The average distance of a journey ending at the station
- Top 5 most popular return stations for journeys starting from the station
- Top 5 most popular departure stations for journeys ending at the station
