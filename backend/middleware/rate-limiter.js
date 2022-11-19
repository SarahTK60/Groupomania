// import express-rate-limit to limit the incoming request.
const rateLimiter = require("express-rate-limit");

const signUpLimiter = rateLimiter({
    max: 30,
    windowMS: 60 * 1000, // 1 minute in milliseconds
    message: "Too many sign up attempts. Try again later."
})

const loginLimiter = rateLimiter({
    max: 20,
    windowMS: 60 * 1000,
    message: "Too many login attempts. Try again later."
})
 
module.exports = {
    signUpLimiter,
    loginLimiter
}