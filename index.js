import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

const submittedItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//MAIN PAGE
app.get("/", (req, res) => {
    res.render("index.ejs", { submittedItems });
});

//ABOUT PAGE
app.get("/create", (req, res) => {
    res.render("create.ejs");
  });

//NEW POST
app.post("/submit", (req, res) => {
  const ptitle = req.body["title"];
  const ptext = req.body["text"];
  const newPost = { 
    fTitle: ptitle, 
    fText: ptext};

  submittedItems.push(newPost);
    res.redirect("/")
});

//GET POST TO EDIT
app.get("/edit/:id", (req, res) => {
  //Make id for the selected post
  const postId = req.params.id;
  //Catch a post from submitedItems based on postId
  const postToEdit = submittedItems[postId];

  if (!postId) {
    res.status(404).send("Post not found");
    return;
  }

  res.render("create.ejs", {postToEdit, postId });
});


//PUSH EDITED POST
app.post("/edit/:id", (req, res) => {
  const postId = req.params.id;
   // Update the post in submittedItems based on the edited data in req.body
   submittedItems[postId].fTitle = req.body.title;
   submittedItems[postId].fText = req.body.text;

  res.redirect("/");
});



app.post("/delete/:id", (req, res) => {
  const postId = req.params.id;
  
  submittedItems.splice(postId, 1);

  res.redirect("/");
});




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });