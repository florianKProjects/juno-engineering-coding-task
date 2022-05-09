////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

const fetchAllOrders = () => {
  //get all the ids
  const ids = allIds;
  //loop over all the ids and get the orders
  const resOrderPromises = ids.map((id) => fetchOrderById(id));
  return Promise.all(resOrderPromises);
};

const bucketOrdersByUsers = async () => {
  let ordersByUsers = {};
  let bucketOrders = [];
  //Get  all the orders of the users
  await fetchAllOrders().then((data) => (bucketOrders = data));

  //create list of hashKey,userid is the key and value is the order
  bucketOrders.map((item) =>
    !ordersByUsers[item.userId]
      ? (ordersByUsers[item.userId] = [item])
      : ordersByUsers[item.userId].push(item)
  );

  return ordersByUsers;
};
const getLast2WeeksOrders = async () => {
  let orders = [];
  const numberOfWeeks = 2;
  //Get  all the orders of the users
  const timestamp2WeeksAgo =
    new Date() - 1000 * 60 * 60 * 24 * (numberOfWeeks * 7); // last 2 weeks

  await fetchAllOrders().then((data) => (orders = data));
  const ordersByLast2Weeks = orders.filter((order) => {
    return timestamp2WeeksAgo <= order.timestamp ? order : null; // filter all the 2 weeks ago
  });
  return ordersByLast2Weeks;
};

const bucketOrdersByDate = async () => {
  let ordersByDate = {};
  let orders = [];
  //get all the last 2 weeks order
  await getLast2WeeksOrders().then((data) => (orders = data));
  //create list if hashmaps ,key is the user timeStemp ,value order
  orders.map((order) =>
    !ordersByUsers[order.timestamp]
      ? (ordersByUsers[order.timestamp] = [order])
      : ordersByUsers[order.timestamp].push(order)
  );
  debugger;
  return ordersByDate;
};

fetchAllOrders()
  .then((data) => console.table(data))
  .catch((err) => console.log(err));

bucketOrdersByUsers()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

getLast2WeeksOrders()
  .then((data) => console.table(data))
  .catch((err) => console.log(err));

bucketOrdersByDate()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

////////////////////////////////////////
