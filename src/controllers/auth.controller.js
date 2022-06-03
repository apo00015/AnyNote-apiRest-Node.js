import passport from "passport";

export const renderSignUp = (req, res) => {
  res.render("auth/signup");
};

export const signUp = passport.authenticate("local.signup", {
  successRedirect: "/profile",
  failureRedirect: "/signup",
  failureFlash: true,
});

export const renderSignIn = (req, res, next) => {
  res.render("auth/signin");
};

export const signIn = passport.authenticate("local.signin", {
  successRedirect: "/profile",
  failureRedirect: "/signin",
  failureFlash: true,
});

export const logout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

// todo Sigue petando
import { getAuth, signInWithCustomToken } from "firebase/auth";

const auth = getAuth();
signInWithCustomToken(auth, token)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });