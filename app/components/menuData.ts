export type MenuItem = {
  name: string;
  desc: string;
  price: string;
  category: string;
};

export const CATEGORIES = [
  "Soups",
  "Veg Appetizers",
  "Chicken Appetizers",
  "Mutton Appetizers",
  "Seafood Appetizers",
  "Veg Tandoori",
  "Chicken Tandoori",
  "Mutton Tandoori",
  "Veg Entrees",
  "Egg Entrees",
  "Chicken Entrees",
  "Mutton Entrees",
  "Fusion Biryanis/Pulavs",
  "OG Dum Biryanis",
  "Classic Arabian Mandis",
  "Indo-Chinese",
  "Sides",
  "South Indian Breakfast",
  "Lunch Specials",
  "Little Royals Menu",
  "Coolers & Sips",
  "Heavenly Delights",
];

export const MENU_ITEMS: MenuItem[] = [
  // Soups
  { name: "Rasam-Gosht", desc: "Spicy lamb rasam with tender mutton pieces and aromatic spices.", price: "$8.99", category: "Soups" },
  { name: "Marag Mutton", desc: "Rich mutton broth slow-cooked with marrow bones and royal spices.", price: "$9.49", category: "Soups" },
  { name: "Nawabi Tamatar Shorbha", desc: "Creamy tomato shorba infused with Nawabi spices and fresh cream.", price: "$6.99", category: "Soups" },
  { name: "Marag Chicken", desc: "Hyderabadi-style chicken marag with tender pieces and warm spices.", price: "$8.49", category: "Soups" },
  { name: "Rasam-Kodi", desc: "Traditional chicken rasam with peppercorn and curry leaves.", price: "$7.99", category: "Soups" },
  { name: "Man Chow Soup (Chicken)", desc: "Indo-Chinese chicken soup with vegetables and crispy noodles.", price: "$7.99", category: "Soups" },
  { name: "Man Chow Soup (Veg)", desc: "Indo-Chinese vegetable soup with crispy noodles and herbs.", price: "$6.99", category: "Soups" },
  { name: "Rasam-Veg", desc: "Classic South Indian tamarind rasam with vegetables and spices.", price: "$5.99", category: "Soups" },

  // Veg Appetizers
  { name: "Amaravati Baby Corn", desc: "Crispy fried baby corn tossed in spicy Amaravati-style masala.", price: "$14.99", category: "Veg Appetizers" },
  { name: "Gobi Manchurian", desc: "Cauliflower florets in tangy Indo-Chinese Manchurian sauce.", price: "$15.99", category: "Veg Appetizers" },
  { name: "Velluli Karam Paneer", desc: "Paneer cubes in fiery garlic and red chili masala.", price: "$15.99", category: "Veg Appetizers" },
  { name: "Chilli Idly", desc: "Crispy fried idly pieces tossed in spicy chilli sauce.", price: "$12.99", category: "Veg Appetizers" },
  { name: "Ghee Roast Paneer", desc: "Paneer roasted in ghee with traditional South Indian spices.", price: "$15.99", category: "Veg Appetizers" },
  { name: "Baby Corn Manchurian", desc: "Baby corn in sweet and spicy Manchurian glaze.", price: "$14.99", category: "Veg Appetizers" },
  { name: "Paneer Chilli", desc: "Paneer cubes in spicy chilli and soy sauce with peppers.", price: "$15.99", category: "Veg Appetizers" },
  { name: "Avakai Idly", desc: "Idly pieces tossed with tangy mango pickle masala.", price: "$12.99", category: "Veg Appetizers" },
  { name: "Cut Mirchi", desc: "Sliced green chilies stuffed and fried in crispy batter.", price: "$9.99", category: "Veg Appetizers" },
  { name: "Gobi Chilli", desc: "Cauliflower in spicy chilli sauce with onions and peppers.", price: "$15.99", category: "Veg Appetizers" },
  { name: "Amaravati Paneer", desc: "Paneer in signature spicy Amaravati masala with curry leaves.", price: "$15.99", category: "Veg Appetizers" },
  { name: "Baby Corn Chilli", desc: "Baby corn tossed in fiery chilli and garlic sauce.", price: "$14.99", category: "Veg Appetizers" },
  { name: "Crispy Corn", desc: "Golden fried corn kernels tossed with spices and herbs.", price: "$12.99", category: "Veg Appetizers" },
  { name: "Paneer 65", desc: "Spicy deep-fried paneer with curry leaves and red chilies.", price: "$15.99", category: "Veg Appetizers" },

  // Chicken Appetizers
  { name: "Chicken 65", desc: "Spicy deep-fried chicken with curry leaves and red chilies.", price: "$17.49", category: "Chicken Appetizers" },
  { name: "Karimnagar Dream Nut Chicken", desc: "Chicken with crunchy peanuts in Karimnagar-style spicy masala.", price: "$17.99", category: "Chicken Appetizers" },
  { name: "Pachimirchi Kodi Vepudu", desc: "Green chili chicken fry with fresh coriander and spices.", price: "$17.99", category: "Chicken Appetizers" },
  { name: "Thaliva Chicken Pakoda", desc: "Crispy chicken pakoda with signature Thaliva spice blend.", price: "$17.99", category: "Chicken Appetizers" },
  { name: "Butter Garlic Chicken", desc: "Chicken in rich butter garlic sauce with herbs.", price: "$17.99", category: "Chicken Appetizers" },
  { name: "Madras Chicken Devil (Bone-In)", desc: "Fiery bone-in chicken with Madras-style spicy masala.", price: "$17.49", category: "Chicken Appetizers" },
  { name: "Chicken Majestic", desc: "Hyderabadi-style chicken with creamy spicy marinade.", price: "$17.99", category: "Chicken Appetizers" },
  { name: "Karvepaku Chicken", desc: "Chicken with fresh curry leaves and roasted spices.", price: "$17.99", category: "Chicken Appetizers" },
  { name: "Chicken Manchuria", desc: "Chicken in tangy Indo-Chinese Manchurian sauce.", price: "$17.49", category: "Chicken Appetizers" },
  { name: "Amaravati Chicken", desc: "Signature spicy Amaravati chicken with curry leaves.", price: "$17.99", category: "Chicken Appetizers" },
  { name: "Velluli Karam Kodi", desc: "Chicken in fiery garlic and red chili masala.", price: "$17.99", category: "Chicken Appetizers" },
  { name: "Chicken Chilly", desc: "Chicken in spicy chilli and soy sauce with peppers.", price: "$17.49", category: "Chicken Appetizers" },

  // Mutton Appetizers
  { name: "Madras Mutton Devil (Bone In)", desc: "Fiery bone-in mutton with Madras-style spicy masala.", price: "$18.99", category: "Mutton Appetizers" },
  { name: "Telangana Mutton Ghee Roast", desc: "Mutton roasted in ghee with Telangana-style spices.", price: "$18.99", category: "Mutton Appetizers" },

  // Seafood Appetizers
  { name: "Butter Garlic Prawn", desc: "Prawns sautéed in rich butter garlic sauce with herbs.", price: "$17.99", category: "Seafood Appetizers" },
  { name: "Amritsari Fish Pakoda", desc: "Crispy battered fish with ajwain and chaat masala.", price: "$17.99", category: "Seafood Appetizers" },
  { name: "Velluli Karam Fish", desc: "Fish in fiery garlic and red chili masala.", price: "$17.49", category: "Seafood Appetizers" },
  { name: "Loose Prawns", desc: "Prawns tossed in spicy dry masala with curry leaves.", price: "$17.49", category: "Seafood Appetizers" },
  { name: "Chilly Prawn", desc: "Prawns in spicy chilli and soy sauce with peppers.", price: "$17.49", category: "Seafood Appetizers" },
  { name: "Chilly Fish", desc: "Fish in spicy chilli sauce with onions and peppers.", price: "$17.49", category: "Seafood Appetizers" },
  { name: "Apollo Fish", desc: "Fried fish in tangy spicy Apollo-style masala.", price: "$17.49", category: "Seafood Appetizers" },

  // Veg Tandoori
  { name: "Panner Tikka", desc: "Char-grilled cottage cheese marinated in spiced yogurt.", price: "$17.99", category: "Veg Tandoori" },
  { name: "Hariyali Panner Tikka", desc: "Paneer tikka marinated in fresh green herb chutney.", price: "$17.99", category: "Veg Tandoori" },
  { name: "Malai Broccoli", desc: "Broccoli florets in creamy malai marinade, char-grilled.", price: "$16.99", category: "Veg Tandoori" },

  // Chicken Tandoori
  { name: "Tandoori Chicken", desc: "Chicken marinated in yogurt and spices, roasted in clay oven.", price: "$16.99", category: "Chicken Tandoori" },
  { name: "Malai Chicken Tikka", desc: "Creamy chicken tikka with cashew and cream marinade.", price: "$17.99", category: "Chicken Tandoori" },
  { name: "Lucknow Chicken Tikka", desc: "Awadhi-style chicken tikka with delicate Lucknow spices.", price: "$17.99", category: "Chicken Tandoori" },
  { name: "Hariyali Chicken Tikka", desc: "Chicken tikka marinated in fresh green herb chutney.", price: "$17.99", category: "Chicken Tandoori" },

  // Mutton Tandoori
  { name: "Mutton Sheek Kabab", desc: "Minced mutton skewers grilled in the tandoor with spices.", price: "$19.99", category: "Mutton Tandoori" },

  // Veg Entrees
  { name: "Malai Methi Paneer", desc: "Paneer in creamy malai gravy with fresh fenugreek leaves.", price: "$17.49", category: "Veg Entrees" },
  { name: "Paneer Butter Masala(Makhani)", desc: "Paneer in rich tomato-butter makhani gravy.", price: "$17.49", category: "Veg Entrees" },
  { name: "Tadka Wali Daal", desc: "Yellow dal tempered with cumin, garlic, and red chili.", price: "$14.99", category: "Veg Entrees" },
  { name: "Kadai Paneer", desc: "Paneer cooked in spicy kadai masala with bell peppers.", price: "$17.49", category: "Veg Entrees" },
  { name: "Cashew Tomoto Curry", desc: "Creamy cashew and tomato curry with whole spices.", price: "$16.99", category: "Veg Entrees" },
  { name: "Palak Paneer", desc: "Cottage cheese in creamy spinach gravy.", price: "$16.99", category: "Veg Entrees" },
  { name: "Mix Veg Pasanda", desc: "Mixed vegetables in rich creamy pasanda gravy.", price: "$16.99", category: "Veg Entrees" },
  { name: "Guttu Vankaya Masala", desc: "Stuffed eggplant in spicy Andhra-style masala.", price: "$15.99", category: "Veg Entrees" },
  { name: "Malai Kofta", desc: "Vegetable dumplings in creamy malai gravy.", price: "$17.49", category: "Veg Entrees" },
  { name: "Paneer Tikka Masala", desc: "Grilled paneer in spicy tikka masala gravy.", price: "$17.49", category: "Veg Entrees" },
  { name: "Chana Masala", desc: "Chickpeas in spicy onion-tomato masala.", price: "$14.99", category: "Veg Entrees" },

  // Egg Entrees
  { name: "Egg Burji", desc: "Scrambled eggs with onions, tomatoes, and spices.", price: "$15.99", category: "Egg Entrees" },
  { name: "Egg Mughalai", desc: "Eggs in rich Mughlai gravy with cream and nuts.", price: "$15.99", category: "Egg Entrees" },
  { name: "Egg Masala", desc: "Boiled eggs in spicy onion-tomato masala.", price: "$15.99", category: "Egg Entrees" },
  { name: "Egg Pulusu", desc: "Eggs in tangy tamarind-based Andhra gravy.", price: "$15.99", category: "Egg Entrees" },

  // Chicken Entrees
  { name: "Chettinad Chicken Curry", desc: "Spicy Chettinad-style chicken with roasted spice blend.", price: "$17.99", category: "Chicken Entrees" },
  { name: "Chicken Saag", desc: "Chicken in creamy spinach gravy with whole spices.", price: "$17.99", category: "Chicken Entrees" },
  { name: "Telangana Chicken Curry", desc: "Fiery Telangana-style chicken curry with dry spices.", price: "$17.99", category: "Chicken Entrees" },
  { name: "Chicken Mugalai", desc: "Chicken in rich Mughlai gravy with cream and nuts.", price: "$17.99", category: "Chicken Entrees" },
  { name: "Hyderabad Dum Ka Murg", desc: "Hyderabadi dum-cooked chicken with royal spices.", price: "$17.99", category: "Chicken Entrees" },
  { name: "Butter Chicken (Chicken Makhani)", desc: "Tender chicken in rich tomato-butter makhani gravy.", price: "$17.99", category: "Chicken Entrees" },
  { name: "Kadai Chicken", desc: "Chicken cooked in spicy kadai masala with bell peppers.", price: "$17.99", category: "Chicken Entrees" },
  { name: "Palnadu Chicken Curry", desc: "Traditional Palnadu-style chicken curry with spices.", price: "$17.99", category: "Chicken Entrees" },
  { name: "Chicken Tikka Masala", desc: "Grilled chicken tikka in spicy masala gravy.", price: "$17.99", category: "Chicken Entrees" },
  { name: "Sahi Murug Masala", desc: "Royal chicken masala with creamy spiced gravy.", price: "$17.99", category: "Chicken Entrees" },
  { name: "Gongura Chicken Curry", desc: "Chicken curry with tangy gongura (sorrel) leaves.", price: "$17.99", category: "Chicken Entrees" },

  // Mutton Entrees
  { name: "Gongura Mutton Curry", desc: "Mutton curry with tangy gongura (sorrel) leaves.", price: "$18.99", category: "Mutton Entrees" },
  { name: "Karaikudi Mutton Curry", desc: "Spicy Karaikudi-style mutton curry with roasted spices.", price: "$18.99", category: "Mutton Entrees" },
  { name: "Mutton Rogan Josh", desc: "Kashmiri-style mutton curry with whole spices.", price: "$18.99", category: "Mutton Entrees" },
  { name: "Mutton Kheema", desc: "Minced mutton cooked with onions, peas, and spices.", price: "$18.99", category: "Mutton Entrees" },
  { name: "Telangana Mutton Curry", desc: "Fiery Telangana-style mutton curry with dry spices.", price: "$18.99", category: "Mutton Entrees" },
  { name: "Palnadu Mutton Curry", desc: "Traditional Palnadu-style mutton curry with spices.", price: "$18.99", category: "Mutton Entrees" },
  { name: "Shahi Gosht Masala", desc: "Royal mutton masala with creamy spiced gravy.", price: "$18.99", category: "Mutton Entrees" },
  { name: "Mutton Saag", desc: "Mutton in creamy spinach gravy with whole spices.", price: "$18.99", category: "Mutton Entrees" },

  // Tandoori Breads
  { name: "Butter Naan", desc: "Soft tandoor-baked bread brushed with butter.", price: "₹60", category: "Tandoori Breads" },
  { name: "Garlic Kulcha", desc: "Stuffed bread with fresh garlic and coriander.", price: "₹80", category: "Tandoori Breads" },
  { name: "Tandoori Roti", desc: "Whole wheat flatbread from the clay oven.", price: "₹40", category: "Tandoori Breads" },
  { name: "Laccha Paratha", desc: "Flaky multi-layered whole wheat bread.", price: "₹70", category: "Tandoori Breads" },

  // Vegetarian Biryani/Pulavs
  { name: "Veg Dum Biryani", desc: "Garden vegetables and basmati rice sealed and dum-cooked.", price: "₹260", category: "Vegetarian Biryani/Pulavs" },
  { name: "Paneer Pulav", desc: "Fragrant rice with paneer cubes and whole spices.", price: "₹240", category: "Vegetarian Biryani/Pulavs" },
  { name: "Mushroom Biryani", desc: "Button mushrooms with saffron rice and herbs.", price: "₹280", category: "Vegetarian Biryani/Pulavs" },

  // Fusion Biryanis/Pulavs
  { name: "Chicken Tikka Biryani", desc: "Tikka-spiced chicken layered with masala rice.", price: "₹340", category: "Fusion Biryanis/Pulavs" },
  { name: "Chilli Chicken Biryani", desc: "Indo-Chinese style spicy chicken biryani.", price: "₹360", category: "Fusion Biryanis/Pulavs" },
  { name: "Prawn Masala Biryani", desc: "Coastal prawns with fiery masala and basmati.", price: "₹420", category: "Fusion Biryanis/Pulavs" },

  // OG Dum Biryanis
  { name: "Royal Chicken Biryani", desc: "Aromatic basmati, tender chicken, royal spices, dum style.", price: "₹380", category: "OG Dum Biryanis" },
  { name: "Mutton Shahi Biryani", desc: "Slow-cooked mutton with Mughlai spices and fried onions.", price: "₹460", category: "OG Dum Biryanis" },
  { name: "Lamb Biryani", desc: "Tender lamb with saffron rice, sealed and slow-cooked.", price: "₹440", category: "OG Dum Biryanis" },

  // Classic Arabian Mandis
  { name: "Chicken Mandi", desc: "Yemeni-style rice with slow-roasted chicken and spices.", price: "₹380", category: "Classic Arabian Mandis" },
  { name: "Mutton Mandi", desc: "Tender mutton over fragrant mandi rice with dry lime.", price: "₹480", category: "Classic Arabian Mandis" },
  { name: "Chicken Madhbi", desc: "Grilled chicken on stone with smoky mandi rice.", price: "₹400", category: "Classic Arabian Mandis" },

  // Indo-Chinese
  { name: "Chilli Chicken", desc: "Crispy chicken in spicy soy-chili sauce.", price: "₹260", category: "Indo-Chinese" },
  { name: "Veg Hakka Noodles", desc: "Stir-fried noodles with vegetables and soy.", price: "₹180", category: "Indo-Chinese" },
  { name: "Schezwan Fried Rice", desc: "Fiery schezwan sauce with rice and veggies.", price: "₹200", category: "Indo-Chinese" },

  // Sides
  { name: "Mirchi Ka Salan", desc: "Green chilies in peanut-sesame gravy.", price: "₹120", category: "Sides" },
  { name: "Bagara Baingan", desc: "Stuffed eggplant in tangy tamarind gravy.", price: "₹140", category: "Sides" },
  { name: "Dahi Chutney", desc: "Cool yogurt mint chutney.", price: "₹50", category: "Sides" },
  { name: "Salan & Raita Combo", desc: "Mirchi salan with fresh cucumber raita.", price: "₹150", category: "Sides" },

  // South Indian Breakfast
  { name: "Masala Dosa", desc: "Crispy rice crepe with spiced potato filling.", price: "₹120", category: "South Indian Breakfast" },
  { name: "Idli Sambar", desc: "Steamed rice cakes with lentil sambar.", price: "₹90", category: "South Indian Breakfast" },
  { name: "Pesarattu Upma", desc: "Green gram dosa with savory upma.", price: "₹110", category: "South Indian Breakfast" },

  // Lunch Specials
  { name: "Mini Biryani Thali", desc: "Mini biryani with salan, raita, and dessert.", price: "₹320", category: "Lunch Specials" },
  { name: "Executive Meal", desc: "Curry, rice, roti, dal, and dessert.", price: "₹280", category: "Lunch Specials" },
  { name: "Mutton Biryani Bucket", desc: "Generous mutton biryani with sides for two.", price: "₹680", category: "Lunch Specials" },

  // Little Royals Menu
  { name: "Mini Chicken Biryani", desc: "Kid-sized chicken biryani with raita.", price: "₹180", category: "Little Royals Menu" },
  { name: "Cheese Naan & Gravy", desc: "Soft cheese naan with mild butter gravy.", price: "₹150", category: "Little Royals Menu" },
  { name: "Veg Pulav & Curd", desc: "Mild veg pulav with fresh curd.", price: "₹140", category: "Little Royals Menu" },

  // Coolers & Sips
  { name: "Royal Falooda", desc: "Rose milk with vermicelli, basil seeds, and ice cream.", price: "₹160", category: "Coolers & Sips" },
  { name: "Mango Lassi", desc: "Thick mango yogurt smoothie.", price: "₹90", category: "Coolers & Sips" },
  { name: "Saffron Buttermilk", desc: "Chilled buttermilk with saffron and mint.", price: "₹70", category: "Coolers & Sips" },
  { name: "Rose Sherbet", desc: "Refreshing rose syrup with chilled milk.", price: "₹80", category: "Coolers & Sips" },

  // Heavenly Delights
  { name: "Shahi Tukda", desc: "Saffron bread pudding with rabri and nuts.", price: "₹140", category: "Heavenly Delights" },
  { name: "Double Ka Meetha", desc: "Fried bread soaked in saffron milk and garnished.", price: "₹130", category: "Heavenly Delights" },
  { name: "Qubani Ka Meetha", desc: "Apricot dessert with cream and nuts.", price: "₹150", category: "Heavenly Delights" },
];
