const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

main().then((res)=>{console.log("Connected Successfully")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};


let allChat=[
    {
    from:"Sweta",
    to:"Anjali",
    msg:"Dude,please bring us maggie.",
    created_at: new Date(),
    },
    {
        from:"Sana",
        to:"Archana",
        msg:"I have stomach ache. I will not come today",
        created_at: new Date(),
    },
   {
        from:"Mr.Arjit",
        to:"dr.Shaork",
        msg:"I need one appoinment today.",
        created_at: new Date(),
    },
    {
            from:"Pinki",
            to:"Sharada",
            msg:"I am getting lot of errors",
            created_at: new Date(),
    }, 
    {
        from:"Rahul",
        to:"Mohan",
        msg:"Lets go to see a movie",
        created_at: new Date(),
    }, 
];

Chat.insertMany(allChat);