let list = {
    insert: 'INSERT INTO list(orderStatus, orderDate, orderTime, name) VALUES(?,?,?,?)',
    update: 'UPDATE list SET orderStatus=?, orderDate=?, orderTime=? WHERE name=?',
    updateById: 'UPDATE list SET orderStatus=?, orderDate=?, orderTime=?, name=? WHERE id=?',
    delete: 'DELETE from list where id=?',
    queryListAll: 'SELECT * FROM list',
    queryListByName: 'SELECT * FROM list WHERE name=?',
    queryListByDate: 'SELECT * FROM list WHERE orderDate=?',
    queryListByNameAndDate: 'SELECT * FROM list WHERE name=? AND orderDate=?',
    login: 'SELECT * FROM admin WHERE user=? AND pass=?',
    getSubmit: 'SELECT * FROM submit_order WHERE date=?',
    setSubmitInsert: 'INSERT INTO submit_order(status, date) VALUES(?,?)',
    setSubmitUpdate: 'UPDATE submit_order SET status=? WHERE date=?'
}
 
module.exports = list