module.exports = {
  queryListAll: 'SELECT * FROM list',
  queryListByName: 'SELECT * FROM list WHERE name LIKE ?',
  queryListByDate: 'SELECT * FROM list WHERE orderDate=?',
  queryListByNameAndDate: 'SELECT * FROM list WHERE name=? AND orderDate=?',
  queryListByDateAndDept: 'SELECT * FROM list WHERE orderDate=? AND department=?',
  queryListByNameAndDateAndDept: 'SELECT * FROM list WHERE name=? AND orderDate=? AND department=?',
  updateById: 'UPDATE list SET orderStatus=?, name=?, remarks=?, department=?, restaurant=? WHERE id=?',
  deleteById: 'DELETE from list where id=?',
  login: 'SELECT * FROM admin WHERE user=? AND pass=?',
  setSubmitUpdate: 'UPDATE submit_order SET status=? WHERE date=?'
}