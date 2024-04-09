show dbs;
show collections;


db.getCollection('collection_name').find();

db.getCollection('collection_name').find().count();

db.getCollection('collection_name').find().limit(50);

db.getCollection('collection_name').find({
    'someField': 123456,
});

db.getCollection('collection_name').find({"someField": {"$ne": 0}});

db.getCollection('collection_name').find({
    "doc.embeddedDoc.someField": "123456789",
});

db.getCollection('collection_name').find({
    "some_field": "some_value"
}).limit(50);

db.getCollection('collection_name').find({
    "someField": "98765432100",
    "d.dd.field": "value"
}).count();

db.getCollection('collection_name').distinct("doc.embeddedDoc.someField");

db.getCollection('collection_name').find({
    "$expr": {
        "$gt": [
            "$someField.anotherField",
            "$someOtherField"
        ]
    }
});

db.getCollection('collection_name').find({
    'someId': 'acbc3894-4b88-4e67-94fb-953f6916f0d1'
}).limit(5);

db.getCollection('collection_name').find({
    "someField": {
        "$eq": "someValue"
    }
});

// "<embedded document>.<field>"

db.getCollection('collection_name').find({
    "someField.someField": {
        "$exists": true
    },
    "$and": [
        {
            "$expr": {
                "$ne": [ { "$strLenCP": "$EmbeddedDocument.field" }, 11 ],
            },
        },
        {
            "$expr": {
                "$ne": [ { "$strLenCP": "$EmbeddedDocument.field" }, 14 ],
            },
        }
    ]
});

db.getCollection('collection_name').find({
    'Doc.field': {
        '$exists': false
    }
}).count();

db.getCollection("collection_name").aggregate([{
   $project: {
      date: {
         $dateFromString: {
            dateString: '$date'
         }
      }
   }
}, { $sort: { date : 1} } ] );


db.getCollection("collection_name").find({
    "someField": "123",
    "d.d.field": {
        "$ne": "value"
    }
}).limit(5);


// "<array>.<index>"

db.getCollection('collection_name').find({
    'someField': {
        '$in': [123, 456, 78, 90]
    }
}).sort({ 'doc.0.field': 1})


db.getCollection('collection_name').aggregate([
    {
        "$lookup": {
            from: "someCollec",
            localField: "someField",
            foreignField: "anotherField",
            as: "same"
        }
   },
   {
      "$match": { "same": { $ne: [] } }
   }
]);

