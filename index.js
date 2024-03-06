const express=require("express");
const app=express();

let port=8080;

const path=require("path");
//uuid for id generation after installing
const { v4: uuidv4 } = require('uuid');
//uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended: true}));  //for geting inside the post request to acquire the info
app.use(express.json());


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));  //views folder for the templating

app.use(express.static(path.join(__dirname,"public")));  //public folder for making more file like css

let posts=[
    {
        id:uuidv4(),
        username:"Nabin",
        content:"Why do so many students dropout of computer science? This depend on the population you're looking at,but not only this region. "
    },
    {   
        id:uuidv4(),
        username:"Tushar",
        content:"I love to do coding,because it motivates me a lot to know how one code will change the whole scenario."
    },
    {   
        id:uuidv4(),
        username:"sathi",
        content:"consistency is way better then perfection."
    }
]
//first router-->through this we are sending the get request(retrive the request)
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
//second router-->through this we want to post the new request in the 2 below steps
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
});

app.post("/posts",(req,res)=>{
let {username,content}=req.body;
let id=uuidv4();
posts.push({id,username,content});   //we are puhing the new data in the array
//res.send("your post is working");
//redirecting the page,in parameter we provide the link where we redirect
res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let { id } =req.params;
    let post=posts.find((p)=>id===p.id)
    //console.log(post);
    res.render("show.ejs",{post});
});

//for update the thing-->patch request
app.patch("/posts/:id",(req,res)=>{
    let { id } =req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id)
    post.content=newcontent;
    console.log(post);
    res.redirect("/posts");

})

//edit the content
app.get("/posts/:id/edit",(req,res)=>{
    let { id } =req.params;
    let post=posts.find((p)=>id===p.id)
    res.render("edit.ejs",{post})
})

//deleting
app.delete("/posts/:id" ,(req,res)=>{
    let { id } =req.params;
     posts=posts.filter((p)=>id!==p.id)
     res.redirect("/posts");
})

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
});