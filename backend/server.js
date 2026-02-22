// server.js
import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Allow the server to read JSON from requests

let internships = []; // Your temporary "Database"

// GET: Send all internships to frontend
app.get('/api/internships', (req, res) => {
    res.status(200).json(internships);
});

// POST: Receive a new internship from frontend
app.post('/api/internships', (req, res) => {
    const newEntry = req.body;
    internships.push(newEntry);
    res.status(201).json(newEntry);
});

// DELETE: Delete an internship given ID
app.delete('/api/internships/:id', (req, res) => {
    const id = req.params.id;
    internships = internships.filter(item => item.id !== id);
    res.status(204).json({ message: "Deleted successfully" });
})

app.patch('/api/internships/:id', (req, res) => {
    const id = req.params.id;
    const newFields = req.body;
    const index = internships.findIndex(item => item.id === id);
    if (index != -1) {
        const updatedEntry = { ...internships[index], ...newFields };
        internships[index] = updatedEntry;
        res.status(200).json(updatedEntry);
    } else {
        res.status(404).json({ error : "Internship not found"})
    }
})

app.listen(3000, () => console.log("Server running on port 3000"));