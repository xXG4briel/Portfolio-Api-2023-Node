var sqlite3 = require('sqlite3');

new sqlite3.Database('./portfolio.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase();
        return;
        } else if (err) {
            console.log("[x] getting error " + err);
            exit(1);
    }
    runQueries(db);
});
function createDatabase() {
    var newdb = new sqlite3.Database('portfolio.db', (err) => {
        if (err) {
            console.log("[x] getting error " + err);
            exit(1);
        }
        createTables(newdb);
    });
}
function createTables(newdb) {
    newdb.exec(`
    create table if not exists projects (
        projectId int primary key not null,
        name text not null,
        title text not null,
        url text not null,
        description text not null,
        image text not null
    );
    `, ()  => {
        runQueries(newdb);
    });
    // insert into hero (hero_id, hero_name, is_xman, was_snapped)
    // values
    // (1, 'Spiderman', 'N', 'Y'),
    // (2, 'Tony Stark', 'N', 'N'),
    // (3, 'Jean Grey', 'Y', 'N');
}
function runQueries(db) {
    db.all(`
    select * from projects`, "Projects", (err, rows) => {
        rows.forEach(row => {
            console.log(row.projectId + "\t" +
            row.name + "\t" +
            row.url);
        });
    });
}

