let list = {
    insert:'INSERT INTO list(orderStatus, orderDate, orderTime, name) VALUES(?,?,?,?)',
    update:'UPDATE list SET orderStatus=?, orderDate=?, orderTime=? WHERE name=?',
    delete: 'DELETE from list where id=?',
    queryListAll: 'SELECT * FROM list',
    queryListByName: 'SELECT * FROM list WHERE name=?',
    queryListByDate: 'SELECT * FROM list WHERE orderDate=?',
    queryListByNameAndDate: 'SELECT * FROM list WHERE name=? AND orderDate=?'
}
 
module.exports = list