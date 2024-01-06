const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");


 app.set("views",path.join(__dirname,"views"));
 app.set("view enfine","ejs");
 app.use(express.static(path.join(__dirname,"public")));
 app.use(express.urlencoded({extended:true}));
 app.use(methodOverride("_method"));

main().then((res)=>{console.log("Connected Successfully")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

//Index route
app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();
    //console.log(chats);
    res.render("index.ejs",{chats});
});

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/chats",(req,res)=>{
    let {from,msg,to}=req.body;
    let newChat=new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date(),
    });
    newChat.save().then((res)=>{console.log(res);}).catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});

app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let oldchat=await Chat.findOne({_id:id});
    res.render("edit.ejs",{oldchat});
});

app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg}=req.body;
    await Chat.updateOne({_id:id},{msg:msg},{runValidators:true},{new:true});
    res.redirect("/chats");
});

app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    console.log(id);
    await Chat.deleteOne({_id:id});
    res.redirect("/chats");
});


app.get("/",(req,res)=>{
    res.send("root is working");
});

app.listen(8080,()=>{
    console.log("listenting to the port 8080");
});