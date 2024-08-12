const express = require('express');
const app = express();
const path = require('path');

// Middleware to verify working hours
function workingHours(req, res, next) {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const hour = currentDate.getHours();

    // Check if it's Monday to Friday, 9 AM to 5 PM
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.send('<h1>Sorry, our service is only available from Monday to Friday, 9 AM to 5 PM.</h1>');
    }
}

// Set the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Apply the working hours middleware to all routes
app.use(workingHours);

// Serve static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});