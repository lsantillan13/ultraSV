import app from './app.js';
import './database.js';
const PORT = process.env.PORT || 5001
app.listen(PORT)
console.log('Server is listening on port', PORT);