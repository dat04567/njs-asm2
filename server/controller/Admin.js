const Transaction = require('../models/Transactions');
const Hotels = require('../models/Hotels');
const Transactions = require('../models/Transactions');
const { default: mongoose } = require('mongoose');
const Rooms = require('../models/Rooms');

const ObjectId = mongoose.Types.ObjectId;


exports.getTopTransaction = (req, res, next) => {
   // find top transaction  most recent now and show 8 transactions
   Transaction.aggregate()
      .lookup({
         from: 'hotels',
         localField: 'idHotel',
         foreignField: '_id',
         as: 'hotels',
      })
      .unwind('hotels')
      .project({
         _id: 1,
         startDate: 1,
         endDate: 1,
         user: 1,
         status: 1,
         numberRoom: 1,
         payMethod: 1,
         price: 1,
         title: '$hotels.title',
         name: '$hotels.name',
         createdAt: 1,
      })
      .sort({ createdAt: -1 })
      .limit(8)
      .then((transaction) => {
         res.status(200).send(transaction);
      })
      .catch((err) => {
         console.log(err);
      });
};

exports.getTransactions = (req, res, next) => {
   // find top transaction  most recent now
   Transaction.aggregate()
      .lookup({
         from: 'hotels',
         localField: 'idHotel',
         foreignField: '_id',
         as: 'hotels',
      })
      .unwind('hotels')
      .project({
         _id: 1,
         startDate: 1,
         endDate: 1,
         user: 1,
         status: 1,
         numberRoom: 1,
         payMethod: 1,
         price: 1,
         title: '$hotels.title',
         name: '$hotels.name',
         createdAt: 1,
      })
      .sort({ createdAt: -1 })
      .then((transaction) => {
         res.status(200).send(transaction);
      })
      .catch((err) => {
         console.log(err);
      });
};

exports.getHotels = (req, res, next) => {
   Hotels.find()
      .select('_id name type title city')
      .then((hotels) => {
         res.status(200).send(hotels);
      })
      .catch((err) => {
         console.log(err);
      });
};

exports.deleteHotel = async (req, res, next) => {
   const { _id } = req.body;
   try {
      //  check transaction exists
      const count = await Transactions.find({ idHotel: _id }).countDocuments();
      if (!count) {
         const hotels = await Hotels.findById(_id);
         if (hotels) {
            Hotels.deleteOne({ _id: _id })
               .then((hotels) => {
                  res.status(200).json({ message: 'Delete success' });
               })
               .catch((err) => {
                  console.log(err);
               });
         } else {
            res.status(404).json({ message: 'Not found hotels' });
         }
      } else {
         res.status(400).json({ message: 'Transaction exists' });
      }
   } catch (error) {
      console.log(error);
   }
};

exports.getSingleHotel = async (req, res, next) => {
   const { _id } = req.body;
   // get single hotel
   Hotels.aggregate()
      .match({ _id: new ObjectId(_id) })
      .lookup({
         from: 'rooms',
         let: { roomsId: '$rooms' },
         pipeline: [
            {
               $match: {
                  $expr: {
                     $in: ['$_id', '$$roomsId'],
                  },
               },
            },
            {
               $project: {
                  title: 1,
                  _id: 0,
               },
            },
         ],
         as: 'rooms',
      })
      .project({ rating: 0 })
      .then((hotel) => {
         if (hotel.length) {
            res.status(200).json(hotel);
         } else {
            res.status(404).json({ message: 'Not found hotel' });
         }
      })
      .catch((error) => {
         console.log(error);
      });
};

exports.postUpdateHotel = async (req, res, next) => {
   let hotel = req.body;
   const id = hotel.hotelId;
   delete hotel.hotelId;

   try {
      // find all roomId for room title
      const roomsSearch = await Rooms.find({ title: { $in: hotel.rooms } }, { _id: 1 });

      delete hotel.rooms;
      hotel.rooms = roomsSearch.map((obj) => obj._id);
      if (!id) {
         await Hotels.create(hotel);
         res.status(200).send({ message: 'Create success' });
      } else {
         await Hotels.findByIdAndUpdate(id, hotel);
         res.status(200).send({ message: 'Update success' });
      }
   } catch (error) {
      console.log(error);
   }
};

exports.getTitleHotels = (req, res, next) => {
   Hotels.find({}, { name: 1 })
      .then((hotels) => {
         res.status(200).send(hotels);
      })
      .catch((err) => {
         console.log(err);
      });
};

exports.getRooms = (req, res, next) => {
   Rooms.find()
      .select('_id title price maxPeople desc')
      .then((rooms) => {
         res.status(200).send(rooms);
      })
      .catch((err) => {
         console.log(err);
      });
};

exports.deleteRoom = async (req, res, next) => {
   const { _id } = req.body;

   try {
      const rooms = await Rooms.findById(_id).select('roomNumbers');

      // check have room in transaction
      const count = await Transactions.aggregate()
         .unwind('numberRoom')
         .lookup({
            from: 'rooms',
            let: { roomsId: '$numberRoom' },
            pipeline: [
               {
                  $match: {
                     $expr: {
                        $in: ['$$roomsId', '$roomNumbers'],
                     },
                  },
               },
               {
                  $project: {
                     roomNumbers: 1,
                     _id: 0,
                  },
               },
            ],
            as: 'rooms',
         })
         .unwind('rooms')
         .project({ roomNumbers: '$rooms.roomNumbers', _id: 0 })
         .unwind('roomNumbers')
         .group({ _id: null, roomNumbers: { $addToSet: '$roomNumbers' } })
         .unwind('roomNumbers')
         .match({ $expr : { $in: [ '$roomNumbers', rooms.roomNumbers] } })

         if(!count.length){
            await Hotels.updateMany({ rooms: _id }, { $pull: { rooms: _id } });
            await Rooms.deleteOne({ _id: _id });
            res.status(200).json({ message: 'Delete success' });
         } else 
         {
            res.status(400).json({ error: 'Transaction exists room' });
         }
         
   } catch (error) {
      console.log(error);
   }
};

exports.postUpdateRoom = async (req, res, next) => {
   let room = req.body;
   const idHotel = room.hotelId;
   const idRoom = room._id;
   console.log(idRoom);
   delete room.hotelId;
   delete room._id;

   try {
      // find all room numeber for hotels
      const isRooms = await Hotels.aggregate()
         .match({ _id: new ObjectId(idHotel) })
         .lookup({
            from: 'rooms',
            localField: 'rooms',
            foreignField: '_id',
            as: 'rooms',
         })
         .project({ rooms: 1, _id: 0 })
         .unwind('rooms')
         .project({ roomNumbers: '$rooms.roomNumbers' })
         .unwind('roomNumbers')
         .match({ $expr: { $in: ['$roomNumbers', room.roomNumbers] } })
         .group({ _id: null, count: { $sum: 1 } });

      if (!idRoom) {
         if (!isRooms.length) {
            // create new room and push hotel 
            const roomNew = await Rooms.create(room);
            await Hotels.findByIdAndUpdate(idHotel, {
               $push: { rooms: new ObjectId(roomNew._id) },
            });
            res.status(200).send({ message: 'Create success' });
         } else {
            res.status(409).send({ error: 'Room number already exists.' });
         }
      } else {
         await Rooms.findByIdAndUpdate(idRoom, room);
         res.status(200).send({ message: 'Update success' });
      }
   } catch (error) {
      if (error.code === 11000 || error.code === 11001) {
         res.status(409).send({ error: 'Title already exists.' });
      } else {
         console.log(error);
         res.status(500).send({ error: 'An unexpected error occurred.' });
      }
   }
};

exports.getSingleRoom = (req, res, next) => {
   const { _id } = req.body;
   Rooms.findById(_id)
      .select('-_id -createdAt -updatedAt -__v')
      .then((room) => {
         if (room) {
            res.status(200).json(room);
         } else {
            res.status(404).json({ message: 'Not found room' });
         }
      })
      .catch((error) => {
         console.log(error);
      });
};
