export const ZIYARAH_TOURS: Record<string, any> = {
  makkah: {
    displayName: "Makkah Ziyarat",
    city: "Makkah",
    durationHours: 3,
    stops: [
      { name: "Jabal al-Thawr",   note: "Cave where the Prophet ﷺ sheltered during the Hijrah" }, //verify
      { name: "Masjid Nimrah",    note: "Mosque at Arafat where the Hajj sermon is delivered" },   //verify
      { name: "Jabal al-Rahma",   note: "Mount of Mercy at Arafat" },                               //verify
      { name: "Zubaida Canal",    note: "Historic water channel that served pilgrims" },            //verify
      { name: "Muzdalifa",        note: "Hajj overnight station between Arafat and Mina" },         //verify
      { name: "Ismail Spot",      note: "" },
      { name: "Khaif Mosque",     note: "Historic mosque in Mina" },                                //verify
      { name: "Mina",             note: "Tent valley and site of Hajj rites" },                     //verify
      { name: "Jamarat",          note: "Site of the stoning ritual" },                             //verify
      { name: "Jabal al-Nour",    note: "‘Mountain of Light’, home to the Cave of Hira" },          //verify
      { name: "Hira Cave",        note: "Where the first revelation of the Qur’an came" },          //verify
    ],
  },
  madinah: {
    displayName: "Madinah Ziyarat",
    city: "Madinah",
    durationHours: 3,
    stops: [
      { name: "Masjid Quba",         note: "The first mosque in Islam" },                    //verify
      { name: "Salman Farsi Garden", note: "Historic date garden linked to Salman al-Farsi (RA)" }, //verify
      { name: "Masjid Jumma",        note: "Where the first Friday prayer was held" },       //verify
      { name: "Jabal Uhud",          note: "Site of the Battle of Uhud" },                   //verify
      { name: "Masjid al-Qiblatayn", note: "‘Mosque of the two qiblas’" },                   //verify
      { name: "Masjid Faseh",        note: "" },
      { name: "Al Ghars Well",       note: "Historic well associated with the Prophet ﷺ" },  //verify
      { name: "Maqam-e-Khandak",     note: "Site of the Battle of the Trench" },             //verify
      { name: "7 Mosques",           note: "Cluster of historic mosques near the Trench" },  //verify
    ],
  },
  badr: {
    displayName: "Badr Ziyarat",
    city: "Badr",
    durationHours: 4,
    stops: [
      { name: "Beer Al Roha",              note: "" },
      { name: "Beer-e-Shifa",              note: "" },
      { name: "Masjid Areesh",             note: "Marks the Prophet’s ﷺ command post at Badr" }, //verify
      { name: "Site of the Battle of Badr",note: "The first major battle in Islam" },            //verify
      { name: "Jabal-e-Malaika",           note: "‘Mountain of the Angels’ at Badr" },           //verify
    ],
  },
  taif: {
    displayName: "Taif Ziyarat",
    city: "Taif",
    durationHours: 6,
    stops: [
      { name: "Masjid Adas",                note: "" },
      { name: "Masjid Ali",                 note: "" },
      { name: "Masjid Meeqat",              note: "Miqat mosque — station for entering ihram" }, //verify
      { name: "Masjid Rasool",              note: "" },
      { name: "Masjid Abdullah bin Abbas",  note: "Mosque named after Abdullah ibn Abbas (RA)" },//verify
    ],
  },
};

// Shown on every ziyarah tour (owner-editable)
export const ZIYARAH_PICKUP_NOTE = "We pick you up from your hotel or the Haram for the ziyarah and drop you back at your hotel.";
