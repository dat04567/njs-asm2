const dirname = require('../util/path');
const fs = require('fs');
const path = require('path');
const Cities = require('../models/Cities');
const Types = require('../models/Types');
const Hotels = require('../models/Hotels');
const Rooms = require('../models/Rooms');
const Transactions = require('../models/Transactions');

const mongoose = require('mongoose');

const p = path.join(dirname, 'public/images', 'image.json');

const getDataFromFile = (cb) => {
   fs.readFile(p, (err, fileContent) => {
      if (!err) {
         cb(JSON.parse(fileContent));
      } else {
         cb([]);
      }
   });
};

exports.getQuanlityForHotel = (req, res, next) => {
   // get count and encode 64
   Cities.aggregate()
      .lookup({ from: 'hotels', localField: 'city', foreignField: 'city', as: 'hotels' })
      .project({ _id: '$city', count: { $size: '$hotels' } })
      .then((city) => {
         getDataFromFile((image) => {
            const hotelForQuanlity = [];
            city.forEach((item, index) => {
               let imageEncode = '';
               if (item._id.includes('Ho Chi Minh')) imageEncode = image.HCM;
               else if (item._id.includes('Ha Noi')) imageEncode = image.HaNoi;
               else imageEncode = image.DaNang;

               const data = {
                  ...item,
                  image: imageEncode,
               };
               hotelForQuanlity.push(data);
            });
            res.send(hotelForQuanlity);
         });
      })
      .catch((err) => {
         console.log(err);
      });
};

exports.getHotelQuantityByType = (req, res, next) => {
   // join with collects hotels sorted by  decrease count
   Types.aggregate()
      .lookup({ from: 'hotels', localField: 'type', foreignField: 'type', as: 'hotels' })
      .project({ _id: '$type', count: { $size: '$hotels' }, image: '$image' })
      .sort({ count: -1 })
      .then((hotel) => {
         res.send(hotel);
      })
      .catch((err) => {
         console.log(err);
      });
};

exports.getHotelForRating = (req, res, next) => {
   Hotels.find()
      .sort({ rating: -1 })
      .limit(3)
      .select('rating _id name city title cheapestPrice photos')
      .exec()
      .then((hotel) => {
         res.send(hotel);
      })
      .catch((err) => {
         console.log(err);
      });
};

exports.searchHotels = (req, res, next) => {
   const { searchText, startDate, endDate, room } = req.query;
   Hotels.aggregate()
      .match({ $text: { $search: searchText } })
      .lookup({ from: 'rooms', localField: 'rooms', foreignField: '_id', as: 'rooms' })
      .lookup({
         from: 'transactions',
         localField: '_id',
         foreignField: 'idHotel',
         as: 'transactions',
      })
      .project({
         cheapestPrice: 1,
         name: 1,
         photos: 1,
         title: 1,
         featured: 1,
         distance: 1,
         title: 1,
         rating: 1,
         city: 1,
         transactions: {
            $filter: {
               input: '$transactions',
               as: 'transactions',
               cond: {
                  $and: [
                     // find startDate <= userEndDate  and endDate >= userStartDate betwwen two date did order
                     { $lte: ['$$transactions.startDate', { $toDate: endDate }] },
                     { $gte: ['$$transactions.endDate', { $toDate: startDate }] },
                  ],
               },
            },
         },
         rooms: 1,
      })
      .project({
         cheapestPrice: 1,
         name: 1,
         photos: 1,
         title: 1,
         featured: 1,
         distance: 1,
         title: 1,
         rating: 1,
         city: 1,
         rooms: {
            $reduce: {
               input: '$rooms',
               initialValue: [],
               in: { $setUnion: ['$$value', '$$this.roomNumbers'] },
            },
         },
         transactions: {
            $reduce: {
               input: '$transactions',
               initialValue: [],
               in: { $setUnion: ['$$value', '$$this.numberRoom'] },
            },
         },
      })
      .project({
         cheapestPrice: 1,
         name: 1,
         photos: 1,
         title: 1,
         featured: 1,
         distance: 1,
         title: 1,
         rating: 1,
         city: 1,
         rooms: {
            $filter: {
               input: '$rooms',
               as: 'rooms',
               cond: {
                  $not: {
                     $in: ['$$rooms', '$transactions'],
                  },
               },
            },
         },
      })
      .match({
         $expr: {
            $gte: [{ $size: '$rooms' }, +room],
         },
      })
      .project({
         cheapestPrice: 1,
         name: 1,
         photos: 1,
         title: 1,
         featured: 1,
         distance: 1,
         title: 1,
         rating: 1,
      })
      .then((hotel) => {
         res.status(200).send(hotel);
      });
};

// request  is input correct
function isValid(input) {
   return (
      (typeof input === 'string' && input.length === 24 && /^[0-9a-fA-F]+$/.test(input)) ||
      (input instanceof Uint8Array && input.length === 12) ||
      Number.isInteger(input)
   );
}

exports.getDetailsHotel = (req, res, next) => {
   const hotelID = req.params.hotelID;
   if (!isValid(hotelID)) {
      return res.status(404).send({
         message: 'Hotel not found',
      });
   }
   Hotels.findById(hotelID)
      .then((hotel) => {
         if (!hotel) {
            return res.status(404).send({
               message: 'Hotel not found',
            });
         }
         res.send(hotel);
      })
      .catch((err) => {
         console.log(err);
      });
};

exports.postRooms = (req, res, next) => {
   const { hotelID, startDate, endDate } = req.body;
   // filter room for date and id
   Hotels.aggregate()
      .match({ _id: new mongoose.Types.ObjectId(hotelID) })
      .lookup({ from: 'rooms', localField: 'rooms', foreignField: '_id', as: 'rooms' })
      .project({ rooms: 1, _id: 0 })
      .unwind('rooms')
      .replaceRoot('rooms')
      .lookup({
         from: 'transactions',
         localField: 'roomNumbers',
         foreignField: 'numberRoom',
         as: 'transactions',
      })
      .project({
         desc: 1,
         maxPeople: 1,
         price: 1,
         roomNumbers: 1,
         title: 1,
         transactions: {
            $filter: {
               input: '$transactions',
               as: 'item',
               cond: {
                  $and: [
                     // find startDate <= userEndDate  and endDate >= userStartDate betwwen two date did order
                     { $lte: ['$$item.startDate', { $toDate: endDate }] },
                     { $gte: ['$$item.endDate', { $toDate: startDate }] },
                  ],
               },
            },
         },
      })
      .project({
         desc: 1,
         maxPeople: 1,
         price: 1,
         roomNumbers: {
            $filter: {
               input: '$roomNumbers',
               as: 'roomNumber',
               cond: {
                  $not: {
                     $in: [
                        '$$roomNumber',
                        {
                           // add all number room
                           $reduce: {
                              input: '$transactions',
                              initialValue: [],
                              in: { $concatArrays: ['$$value', '$$this.numberRoom'] },
                           },
                        },
                     ],
                  },
               },
            },
         },
         title: 1,
      })
      .match({
         $expr: {
            $gt: [{ $size: '$roomNumbers' }, 0],
         },
      })
      .then((hotels) => {
         res.status(200).send(hotels);
      })
      .catch((err) => {
         console.log(err);
      });
};

const sumPrice = async (rooms, numberDate) => {
   const newRooms = rooms.reduce(function (sums, room) {
      sums[room] = (sums[room] || 0) + 1;
      return sums;
   }, {});
   return Object.keys(newRooms).reduce(async (acc, id) => {
      const result = await Rooms.findById(id);
      if (!result) {
         throw new Error();
      }
      return (await acc) + result.price * newRooms[id] * numberDate;
   }, Promise.resolve(0));
};

exports.postBooking = (req, res, next) => {
   const {
      idHotel,
      numberRoom,
      numberDate,
      rooms,
      name,
      phone,
      cardNumber,
      email,
      payMethod,
      date,
      user
   } = req.body;
   console.log(user);
   sumPrice(rooms, numberDate)
      .then((result) => {
         Transactions.create({
            name,
            phone,
            cardNumber,
            email,
            payMethod,
            idHotel,
            numberRoom,
            startDate: date.startDate,
            endDate: date.endDate,
            price: result,
            user
         })
            .then((result) => {
               res.status(200).json({ message: 'Create access' });
            })
            .catch((err) => {
               res.status(500).json({ message: 'Error ' });
            });
      })
      .catch((err) => {
         console.log(err);
      });
};

exports.postSumPrice = (req, res, next) => {
   const { rooms, numDate } = req.body;
   if (!rooms) {
      return res.status(500).json({
         message: 'Error',
      });
   }
   if (!numDate) {
      return res.status(500).json({
         message: 'Error',
      });
   }
   sumPrice(rooms, numDate)
      .then((result) => {
         res.status(200).json({
            result: result,
         });
      })
      .catch((err) => {
         console.log(err);
      });
};

exports.getTransactions = (req, res, next) => {
   const email = req.body.email;
   Transactions.aggregate()
      .match({ user : email })
      .lookup({ from: 'hotels', localField: 'idHotel', foreignField: '_id', as: 'hotels' })
      .unwind('hotels')
      .project({
         nameHotel: '$hotels.name',
         numberRoom: 1,
         payMethod: 1,
         price: 1,
         startDate: 1,
         endDate: 1,
         status: 1,
      })
      .then((transactions) => {
         res.status(200).json(transactions);
      })
      .catch((err) => {
         console.log(err);
      });
};

