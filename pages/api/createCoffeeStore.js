import { getMinifiedRecords } from "../../lib/airtable";
const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base("Discover Coffee stores");
const getMinifiedRecord = (record) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    //find a record

    const { id, name, neighbourhood, address, imgUrl, voting } = req.body;
    try {
      if (id) {
        const findCoffeeStoreRecords = await table
          .select({ filterByFormula: `id="${id}"` })
          .firstPage();
        if (findCoffeeStoreRecords.length !== 0) {
          const records = getMinifiedRecords(findCoffeeStoreRecords);
          res.json(records);
        } else {
          //create a record
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  imgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecords);
            res.json(records);
          } else {
            res.status(400);
            res.json({ message: "Id or name is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing" });
      }
    } catch (err) {
      console.error("Error creating or finding a store", err);
      res.status(500);
      res.json({ message: "Error creating or finding a store", err });
    }
  }
};
export default createCoffeeStore;

// const createCoffeeStore = async (req, res) => {
//   if (req.method === "POST") {
//     //find a record

//     const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

//     try {
//       const records = await findRecordByFilter(id);
//       //check  select filter by formula id to string

//       if (records.length !== 0) {
//         res.json(records);
//       } else {
//         //create a record
//         if (name) {
//           const createRecords = await table.create([
//             {
//               fields: {
//                 id,
//                 name,
//                 address,
//                 neighbourhood,
//                 voting,
//                 imgUrl,
//               },
//             },
//           ]);

//           const records = getMinifiedRecords(createRecords);
//           res.json(records);
//           console.log(records);
//         }
//       }
//     } catch (err) {
//       console.error("Error creating or finding a store", err);
//       res.status(500);
//       res.json({ message: "Error creating or finding a store", err });
//     }
//   }
// };

// export default createCoffeeStore;
