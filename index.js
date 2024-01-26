import express from 'express';
const app= express();
app.use(express.json())
const PORT=process.env.PORT||8000;

const rooms=[
              {roomID:1,
                            roomName:"single",
                            amenitiesinRoom:["Free wifi","Hot shower","Room Service","AC"],
                            numberofSeatAvailable:"1",
                            pricefor1Hour:"200",
                            bookedStatus:false,
                            customDetails:{
                                          customerName:"",
                                          date:"",
                                          startTime:"",
                                          endTime:""}

                            },
{             roomId:2,
              roomName:"Studio",
              amenitiesinRoom:["personal care","tissuebox","coffee kit"],
              numberofSeatAvailable:"3",
              pricefor1Hour:"400",
              bookedStatus:true,
              customerDetails:{
                            customerName:"Dharani",
                                          date:"29.11.2023",
                                          startTime:"10.00AM",
                                          endTime:"9.00 PM"}
              },
              { roomID:3,
              roomName:"Hollywood Twin",
              amenitiesinRoom:["Bathrobes&slippers","FreeBreakfast","Freewifi"],
              numberofSeatAvailable:"5",
              pricefor1Hour:"300",
              bookedStatus:false,
              customerDetails:{
                            customerName:"",
                                          date:"",
                                          startTime:"",
                                          endTime:""}
},
{ roomID:4,
              roomName:"Quad",
              amenitiesinRoom:["optionsforpillows","Premiumcoffee"],
              numberofSeatAvailable:"4",
              pricefor1Hour:"200",
              bookedStatus:true,
              customerDetails:{
                            customerName:"Kannan",
                                          date:"12.11.2023",
                                          startTime:"9.00 AM",
                                          endTime:"3.00 PM"}
              },
              { roomID:5,
                            roomName:"Delux Room",
                            amenitiesinRoom:["mobilecheckIn","Gym","Free wifi"],
                            numberofSeatAvailable:"2",
                            pricefor1Hour:"200",
                            bookedStatus:true,
                            customerDetails:{
                                          customerName:"Mano",
                                                        date:"12.10.2023",
                                                        startTime:"9.00 AM",
                                                        endTime:"6.00 PM"}
                            },
]
//routes to home
app.get('/',(req,res)=>{
              res.send("Hall Booking");
})
//room creation
app.post('/rooms/create',(req,res)=>{
              const newRoom=req.body;
              rooms.push(newRoom);
              res.send(newRoom)
})

//booking a room

app.post('/rooms',(req,res)=>{
              const booking=req.body;

              rooms.map((room)=>{
                            if (room.roomId==booking.roomId)
                            {
                                          console.log(room);
                             if(room.customDetails.date !=booking.date){
                                room.customDetails.customerName=booking.customerName;
                                room.customDetails.date=booking.date;
                                room.customerDetails.startTime=booking.startTime;
                                room.customerDetails.endTime=booking.endTime;
                                room.bookedStatus=!room.bookedStatus;
                                res.send('Room booked successfully')          
                             }
                             else{
                                          res.send("Room already booked on this date")
                             }

                            }
              return room;
              })
})

//list all rooms with booked data

app.get('/rooms',(req,res)=>{
res.send(
              rooms.map((room)=>{
                            if(room.bookedStatus==true)
                            {
                                          return{
                                                        "Room name":room.roomName,
                                                        "Boked Status":"Booked",
                                                        "Customer Name":room.customerDetails.customerName,
                                                        "Date":room.customerDetails.date,
                                                        "Start Time":room.customerDetails.endTime,
                                          }
                            }
                           else{
                            return{"Room name":room.roomName,"Booked Status":"Vacant"}
                           }
               })
);
              });


app.get('/customers',(res,req)=>{
              res.send(
                  rooms.filter((room)=>{
                      if(room.bookedStatus===true){
                          return room;
                      }
                  })
                  .map((room)=>{
                      return{
                          "Customer name":room.customerDetails.customerName,
                          "Room name":room.roomName,
                          Date:room.customerDetails.date,
                          "Start Time":room.customerDetails.startTime,
                          "End Time":room.customerDetails.endTime,
                             };
                       })
              )
          })
          app.listen(PORT,()=>console.log(`server is listening http://localhost:${PORT}`))