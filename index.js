// Tracks login attempts and locks the account after 3 failures
const createLoginTracker = (userInfo) => {
    let attemptCount = 0;

    return (passwordAttempt) => {
        attemptCount++;

        // Block access once the limit is exceeded
        if (attemptCount > 3) {
            return "Account locked due to too many failed login attempts";
        }

        if (passwordAttempt === userInfo.password) {
            return `Login successful. Welcome, ${userInfo.username}!`;
        }

        return `Attempt ${attemptCount}: Login failed. Incorrect password.`;
    };
};


// --- Test it out ---
const userLogin = createLoginTracker({
    username: "user1",
    password: "password123"
});

console.log(userLogin("wrongPass"));       // Attempt 1: failed
console.log(userLogin("anotherWrong"));    // Attempt 2: failed
console.log(userLogin("password123"));     // Attempt 3: success
console.log(userLogin("password123"));     // Locked


module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};