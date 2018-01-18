let Index = {
    getSubmit: 'SELECT * FROM submit_order WHERE date=?',
    setSubmitInsert: 'INSERT INTO submit_order(status, date) VALUES(?,?)',
    setSubmitUpdate: 'UPDATE submit_order SET status=? WHERE date=?',
    queryAction: 'SELECT * FROM list WHERE name=? AND orderDate=?',
    queryOrderStatus: 'SELECT * FROM list WHERE name=? AND orderDate=?',
    insertOrder: 'INSERT INTO list(name, orderStatus, orderDate, orderTime) VALUES(?,?,?,?)'
}
 
module.exports = Index