const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const { appendFile } = require("fs");
const posts = [];
const _ = require("lodash");
// import {alert} from popup;

const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));    
app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res){
    res.render("home",{
        postsArray:posts
    });
});

app.get("/about",function(req,res){
    res.render("about");
});

app.get("/contact",function(req,res){
    res.render("contact");
});

app.get("/compose",function(req,res){
    res.render("compose");
});


app.get("/posts/:blogTitle", function(req,res){

    var found = false;
    for(var i=0;i<posts.length;i++)
    {
        var titleFind = _.lowerCase(req.params.blogTitle);
        if(titleFind === _.lowerCase(posts[i].title))
        {
            found =true;
            res.render("post",{
                title:posts[i].title,
                body:posts[i].body
            });
        }

    }
    if(found === false)
    {
        res.render("post",{
            title:"Not found!",
            body:""
        });
    }


    // console.log(req.params.blogTitle);
});

app.post("/",function(req,res){

    let blog = {
        title: req.body.title,
        body: req.body.post
    };

    posts.push(blog);
    res.redirect("/");
    // console.log(req.body.data);
});

app.post("/edit/:blogTitle",function(req,res){

    for(var i=0;i<posts.length;i++)
    {
        var titleFind = _.lowerCase(req.params.blogTitle);
        if(titleFind === _.lowerCase(posts[i].title))
        {
            var removedTitle = posts[i].title;
            var removedBody = posts[i].body;
            var removed = posts.splice(i,1);

            res.render("edit",{
                title:removedTitle,
                body:removedBody
            });
        }
    }

        res.render("edit",{
            title:"",
            body:""
        });
    
});


app.post("/delete/:postTitle",function(req,res){    
    
    for(var i=0;i<posts.length;i++)
    {
        var title = _.lowerCase(posts[i].title);
        var URLtitle = _.lowerCase(req.params.postTitle);
        if(URLtitle === title)
        {
            var removed = posts.splice(i,1);
            break;
        }
    }
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("Serving on port 3000.");
});