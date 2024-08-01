import './database.js';
import app from './app.js';
const PORT = process.env.PORT || 80
app.listen(PORT)
console.log('Server is listening on port', PORT);
