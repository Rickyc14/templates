// create inventory collection
await db.collection('inventory').insertMany([
  {
    item: 'journal',
    qty: 25,
    size: { h: 14, w: 21, uom: 'cm' },
    status: 'A'
  },
  {
    item: 'notebook',
    qty: 50,
    size: { h: 8.5, w: 11, uom: 'in' },
    status: 'A'
  },
  {
    item: 'paper',
    qty: 100,
    size: { h: 8.5, w: 11, uom: 'in' },
    status: 'D'
  },
  {
    item: 'planner',
    qty: 75,
    size: { h: 22.85, w: 30, uom: 'cm' },
    status: 'D'
  },
  {
    item: 'postcard',
    qty: 45,
    size: { h: 10, w: 15.25, uom: 'cm' },
    status: 'A'
  }
]);


// query on Nested Field with Dot Notation
const cursor = db.collection('inventory').find({
  'size.uom': 'in'
});


// specify Match using Query Operator
const cursor = db.collection('inventory').find({
  'size.h': { $lt: 15 }
});


// specify AND Condition
const cursor = db.collection('inventory').find({
  'size.h': { $lt: 15 },
  'size.uom': 'in',
  status: 'D'
});


// match an Embedded/Nested Document
const cursor = db.collection('inventory').find({
  size: { h: 14, w: 21, uom: 'cm' }
});
