import { getMinifiedRecords, table, findRecordByFilter } from "@/lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const records = await findRecordByFilter(id);
      if (records.length !== 0) {
        res.json(records);
        res.json({ message: "ID found", id });
      } else {
        res.status(400);
        res.json({ message: "wrong id or id is missing", error });
      }
    }
  } catch (error) {
    res.status(500);
    res.json({ message: "something went wrong", error });
  }
};

export default getCoffeeStoreById;
