// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express();

app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Allow the server to read JSON from requests

mongoose.connect('mongodb://127.0.0.1:27017/internship_tracker')
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("Could not connect:", err));

const InternshipSchema = new mongoose.Schema({
    company : String,
    role : String,
    deadline : String,
    status : String,
    location : String,
    jdlink : String,
    notes : String
})

const InternshipModel = mongoose.model('Internship', InternshipSchema);

// GET: Send all internships to frontend
app.get('/api/internships', async (req, res) => {
    const internships = await InternshipModel.find();
    res.status(200).json(internships);
});

// POST: Receive a new internship from frontend
app.post('/api/internships', async (req, res) => {
    const newEntry = new InternshipModel(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
});

// DELETE: Delete an internship given ID
app.delete('/api/internships/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await InternshipModel.findByIdAndDelete(id);
        res.status(204).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Could not delete from database" });
    }
})

app.patch('/api/internships/:id', async (req, res) => {
    const id = req.params.id;
    const newFields = req.body;
    try {
        const updatedEntry = await InternshipModel.findByIdAndUpdate(id, newFields, { new : true});
        res.status(201).json(updatedEntry);
    } catch (error) {
        res.status(500).json({ error : "Could not update database"})
    }
})

app.listen(3000, () => console.log("Server running on port 3000"));