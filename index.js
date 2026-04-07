// Tracks login attempts and locks the account after 3 failures
const createLoginTracker = (userInfo) => {
    let attemptCount = 0;

    return (passwordAttempt) => {
        attemptCount++;

        // Lock the account once the 3-attempt limit is exceeded
        if (attemptCount > 3) {
            return "Account locked due to too many failed login attempts";
        }

        if (passwordAttempt === userInfo.password) {
            return "Login successful";
        }

        return `Attempt ${attemptCount}: Login failed`;
    };
};


// --- Test it out ---
const userLogin = createLoginTracker({
    username: "user1",
    password: "password123"
});

console.log(userLogin("wrongPass"));       // Attempt 1: Login failed
console.log(userLogin("anotherWrong"));    // Attempt 2: Login failed
console.log(userLogin("wrongAgain"));      // Attempt 3: Login failed
console.log(userLogin("password123"));     // Account locked

module.exports = {
  ...(typeof createLoginTracker !== 'undefined' && { createLoginTracker })
};