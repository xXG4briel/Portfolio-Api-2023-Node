const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('portfolio.db', (err) => {
    if (err) {
      console.error("[x] getting error " + err);
    }
    else {
      console.log('[+] connected to the database.')
      db.exec(`CREATE TABLE IF NOT EXISTS projects (
        projectId INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL
      );`, (error) => {  if(error) console.error(error) });
    }
});

router.post('/', (req, res) => {
    try {
        const body = req.body;
        const values = [body.name, body.title, body.url, body.description, body.image];
        const sql = `INSERT INTO projects (name, title, url, description, image)
        VALUES (?, ?, ?, ?, ?)`;
        db.run(sql, values, ( error ) => {
                if (error) {
                    return res.status(400).json({ message: error.message });
                }
                res.status(200).json({ message: "Ok" });
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/', (req, res) => {
    try {
        const sql = `SELECT * FROM projects;`;
        db.all(sql, (error, rows) => {
                if (error) {
                    return res.status(400).json({ message: error.message });
                }
                res.status(200).json(rows);
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const values = [body.name, body.title, body.url, body.description, body.image, id];
    const sql = `UPDATE projects
    SET name = ?,
    title = ?,
    url = ?,
    description = ?,
    image = ?
    WHERE projectId = ?`;
    try {
        db.run(sql, values, (error) => {
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            res.status(200).json({ message: "Ok" });
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM projects WHERE projectId = ?`;
    try {
        db.run(sql, id, (error) => {
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            res.status(200).json({ message: "Ok" });
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router;