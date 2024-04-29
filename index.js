// Hey guys can you see this? It's from Rylan
const passport = require("./middleware/passport")
const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const { forwardAuthenticated, ensureAuthenticated, isAdmin } = require("./middleware/checkAuth");

app.use(express.static("public"))

// Adds session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

// Initializes passport
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

// Routes start here
app.get("/", function(req, res){
    res.render("index", { isAuthenticated: req.isAuthenticated() });
})
app.get("/reminders", ensureAuthenticated, reminderController.list);
app.get("/reminder/new", ensureAuthenticated, reminderController.new);
app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);
app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);
app.post("/reminder/", ensureAuthenticated, reminderController.create);

// ⭐ Implement these two routes below!
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

// 👌 Ignore for now
app.get("/register", authController.register);
app.get("/login", forwardAuthenticated, authController.login);
app.post("/login", authController.loginSubmit);
app.post("/register", authController.registerSubmit);

// Github login
app.get('/github',
    passport.authenticate('github'));

app.get('/github/callback',
    passport.authenticate('github', {
        successRedirect: '/reminders',
        failureRedirect: '/login',
        failureMessage: true }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);


app.get("/logout", authController.logout);

// Admin
app.get("/admin", isAdmin, authController.adminPanel);
app.get("/admin/revoke/:SessionID", isAdmin, authController.revokeSession);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/reminders in your browser 🚀"
  );
});
