use enron;

db.messages.find({}, {body: 0}).limit(3).pretty();

db.messages.find(
  {mailbox: "bass-e"}, 
  {body: 0}
).limit(5).pretty();

db.messages.find(
  {"headers.Subject": "83929275 Marriott  Reservation Confirmation Number"}, 
  {body: 0}
).limit(5).pretty();


// E-mails where there is more than one recipient
// (It would have been nice if we could use $size: {$gt: 1} but 
// we can only use $size for equal comparison)
db.messages.find(
  {"headers.To.1": {$exists: 1}},
  {body:0}
).limit(3).pretty();


// E-mails sent to Timothy and he was not the only
// recipient
db.messages.find(
  {
    "headers.To": "timothy.blanchard@enron.com",
    "headers.To.1": {$exists: 1}
  },
  {body:0}
).limit(3).pretty();

