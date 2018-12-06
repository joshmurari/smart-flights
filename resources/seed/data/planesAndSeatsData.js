$(document).ready(function() {
airlinesData = [{id:0,name:'Southwest Airlines',logo_url:'http://cloud2.whattheflight.com/images/wtf/logos/airlines/southwest-airlines.jpg'},
{id:1,name:'Delta Air Lines',logo_url:'http://cloud2.whattheflight.com/images/wtf/logos/airlines/delta-air-lines.gif'},
{id:2,name:'American Airlines',logo_url:'http://cloud1.whattheflight.com/images/wtf/logos/airlines/American_Airlines_logo_2013_svg.png'},
{id:3,name:'United Airlines',logo_url:'http://cloud2.whattheflight.com/images/wtf/logos/airlines/united_tm.jpg'},
{id:4,name:'JetBlue Airlines',logo_url:'http://cloud2.whattheflight.com/images/wtf/logos/airlines/jetblue-airways.jpg'},
{id:5,name:'SkyWest Airlines',logo_url:'http://cloud2.whattheflight.com/images/wtf/logos/airlines/sky-west-airlines.gif'},
{id:6,name:'Falcon Air',logo_url:'http://cloud2.whattheflight.com/images/wtf/logos/airlines/falcon-aviation-ab.gif'},
{id:7,name:'Spirit Air Lines',logo_url:'http://cloud2.whattheflight.com/images/wtf/logos/airlines/spirit-airlines.gif'},
{id:8,name:'Regional Airlines',logo_url:'http://cloud2.whattheflight.com/images/wtf/logos/airlines/regional.gif'},
{id:9,name:'Eaglexpress',logo_url:'http://cloud1.whattheflight.com/images/wtf/logos/airlines/Eaglexpress.jpg'},
]
//PLANES 10 per Airlines
//SEATS 15 rows of 4 seats per plane
planesData = [];
seatsData = [];
let planeId=0;
let seatId=0;

//Create seats and planes
for(let i=0;i<airlinesData.length;i++){
    for(let j=0;j<10;j++){
        //Create Plane
        planesData.push({
            id:planeId,
            name:`${airlinesData[i].name}-Plane-${j}`,
            seatmap_url:'http://www.aviationexplorer.com/airline_aircraft_seat_maps/midwest-airlines-seat-charts-map-layout/midwest_airlines_dc-9-series-10-seating-map.gif',
            airline_id: i
        });

        //Create 15 rows of 4 seats
        for(let k=1;k<16;k++){
            for(let l=1;l<5;l++){
                //Map number to seat letter
                let seatLetter;
                let isWindow = false;
                let isAisle = false;
                if(l==1){
                    seatLetter="A";
                    isWindow=true;
                }else if(l==2){
                    seatLetter="B";
                    isAisle=true;
                }else if(l==3){
                    seatLetter="C";
                    isAisle=true;
                }else if(l==4){
                    seatLetter="D";
                    isWindow=true;
                }

                //Create seat
                seatsData.push({
                    id:seatId,
                    plane_id:planeId,
                    row:k,
                    number:seatLetter,
                    is_window:isWindow,
                    is_aisle:isAisle
                })

                //Increment seatID
                seatId++;
            }
        }

        //Increment planeID
        planeId++;
    }
}

});

