const { sql, getPool } = require("./sqlServer");

async function getAllTasks() {
    const pool = await getPool();

    const result = await pool.request().query(`
        SELECT
          id,
          title,
          description,
          priority,
          status,
          dueDate,
          dateCreated
        FROM dbo.tasks
        ORDER BY dateCreated DESC;
    `);
    return result.recordset;
};

async function getTaskbyId(id) {
    const pool = await getPool();

    const result = await pool.request().input("id", sql.Int, id).query(`
        SELECT
          id,
          title,
          description,
          priority,
          status,
          dueDate,
          dateCreated
        FROM dbo.tasks
        WHERE id = @id;
    `);
    return result.recordset[0] || null;
};

async function createTask({
    title,
    description,
    priority,
    status,
    dueDate,
}) {
    const pool = await getPool();
    const result = await pool.request().input("title", sql.NVarChar(255), title).input("description", sql.NVarChar(sql.MAX), description || null).input("priority", sql.NVarChar(20), priority).input("status", sql.NVarChar(30), status).input("dueDate",sql.Date, dueDate || null).query(`
        INSERT INTO dbo.tasks (
          title,
          description,
          priority,
          status,
          dueDate
        )
        OUTPUT
          INSERTED.id,
          INSERTED.title,
          INSERTED.description,
          INSERTED.priority,
          INSERTED.status,
          INSERTED.dueDate,
          INSERTED.dateCreated
        VALUES (
          @title,
          @description,
          @priority,
          @status,
          @dueDate
        );
    `);
    return result.recordset[0];
};


async function updateTask(
  id,
  {
    title,
    description,
    priority,
    status,
    dueDate,
  }
) {
  const pool = await getPool();

  const result = await pool.request().input("id", sql.Int, id).input("title", sql.NVarChar(255), title).input("description", sql.NVarChar(sql.MAX), description || null).input("priority", sql.NVarChar(20), priority).input("status", sql.NVarChar(30), status).input("dueDate", sql.Date, dueDate || null).query(`
    UPDATE dbo.tasks
    SET
      title = @title,
      description = @description,
      priority = @priority,
      status = @status,
      dueDate = @dueDate
    OUTPUT
      INSERTED.id,
      INSERTED.title,
      INSERTED.description,
      INSERTED.priority,
      INSERTED.status,
      INSERTED.dueDate,
      INSERTED.dateCreated
    WHERE id = @id;
  `);
  return result.recordset[0] || null;
};

async function deleteTask(id) {
  const pool = await getPool();

  const result = await pool.request().input("id", sql.Int, id).query(`
    DELETE FROM dbo.tasks
    OUTPUT DELETED.id
    WHERE id = @id;
  `);
  return result.recordset.length > 0;
};

module.exports = {
  getAllTasks,
  getTaskbyId,
  createTask,
  updateTask,
  deleteTask,
};

