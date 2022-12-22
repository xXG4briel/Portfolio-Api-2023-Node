const express = require('express');
const router = express.Router();
const Projects = require('../models/project')

// C -> Create
router.post('/', async (req, res) => {
    const body = JSON.parse(req.body);
    try {
        const projects = await Projects.setProject(body);
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});
// R -> Read
router.get('/', async (req, res) => {
    try {
        const projects = await Projects.getProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});
// U -> Update
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const body = JSON.parse(req.body);
    try {
        const projects = await Projects.updateProject(id, body);
        if (projects) {
            res.status(200).json(projects);
        }
        res.status(400).json({ message: "Não foi possível criar o projeto." });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// D -> Delete
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if(await Projects.deleteProject(id)) {
            res.status(200).json("Ok");
        }
        res.status(400).json("Não foi possível apagar o projeto.");
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;