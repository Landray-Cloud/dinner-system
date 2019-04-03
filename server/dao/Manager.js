module.exports = {
  queryListAll: 'SELECT * FROM list',
  queryListByName: 'SELECT * FROM list WHERE name LIKE ?',
  queryListByDate: 'SELECT * FROM list WHERE orderDate LIKE ?',
  queryListByRangeDate: 'SELECT * FROM list WHERE orderTime between ? and ?',
  queryListByNameAndDate: 'SELECT * FROM list WHERE name=? AND orderDate LIKE ?',
  queryListByNameAndRangeDate: 'SELECT * FROM list WHERE name=? AND orderTime between ? and ?',
  queryListByDateAndDept: 'SELECT * FROM list WHERE orderDate LIKE ? AND department=?',
  queryListByRangeDateAndDept: 'SELECT * FROM list WHERE orderTime between ? and ? AND department=?',
  queryListByNameAndDateAndDept: 'SELECT * FROM list WHERE name=? AND orderDate LIKE ? AND department=?',
  queryListByNameAndRangeDateAndDept: 'SELECT * FROM list WHERE name=? AND orderTime between ? and ? AND department=?',
  updateById: 'UPDATE list SET orderStatus=?, name=?, remarks=?, department=?, restaurant=?, orderDate=?, orderTime=? WHERE id=?',
  deleteById: 'DELETE from list where id=?',
  login: 'SELECT * FROM admin WHERE user=? AND pass=?',
  setSubmitUpdate: 'UPDATE submit_order SET status=? WHERE date=?',
  setDinnerManager: 'UPDATE dinner_manager SET name=?'
}