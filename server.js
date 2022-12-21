const express = require('express');
const app = express();

app.use(express.json());

const projectsRouter = require('./routes/projects');

app.use('/projects', projectsRouter);

app.listen(3000, () => console.log('Server Started'));