module.exports = {
  getSubmit: 'SELECT * FROM submit_order WHERE date=?',
  setSubmitInsert: 'INSERT INTO submit_order(status, date) VALUES(?,?)',
  setSubmitUpdate: 'UPDATE submit_order SET status=? WHERE date=?',
  queryAction: 'SELECT * FROM list WHERE name=? AND orderDate=?',
  queryOrderStatus: 'SELECT * FROM list WHERE name=? AND orderDate=?',
  insertOrder: 'INSERT INTO list(name, orderStatus, orderDate, orderTime, remarks, department, restaurant) VALUES(?,?,?,?,?,?,?)',
  checkRepeat: 'SELECT count(name) as total FROM list WHERE name=? AND department=? AND orderDate=?'
}