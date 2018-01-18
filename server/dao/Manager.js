let Manager = {
    queryListAll: 'SELECT * FROM list',
    queryListByName: 'SELECT * FROM list WHERE name LIKE ?',
    queryListByDate: 'SELECT * FROM list WHERE orderDate=?',
    queryListByNameAndDate: 'SELECT * FROM list WHERE name=? AND orderDate=?',
    updateById: 'UPDATE list SET orderStatus=?, orderDate=?, orderTime=?, name=?, remarks=? WHERE id=?',
    deleteById: 'DELETE from list where id=?',
    login: 'SELECT * FROM admin WHERE user=? AND pass=?',
    setSubmitUpdate: 'UPDATE submit_order SET status=? WHERE date=?'
}

module.exports = Manager