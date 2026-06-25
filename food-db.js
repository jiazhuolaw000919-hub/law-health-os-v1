/* =========================
   🇲🇾 MALAYSIA LOCAL + IMPORT FOOD DATABASE v5.0 (Sugar & Grade)
   包含糖分 (g) 和营养等级 (A-E)
   ========================= */

const LOCAL_FOOD_DB = [
  // ============ Maggi 系列 ============
  { keywords: ["maggi", "maggie", "kari", "curry"], food: "Maggi Kari (1 pack)", calories: 380, protein: 8, carbs: 55, fat: 15, sugar: 4, grade: "C" },
  { keywords: ["maggi", "maggie", "ayam", "chicken"], food: "Maggi Ayam (1 pack)", calories: 370, protein: 9, carbs: 56, fat: 14, sugar: 5, grade: "C" },
  { keywords: ["maggi", "maggie", "tomyam"], food: "Maggi Tomyam (1 pack)", calories: 350, protein: 7, carbs: 58, fat: 12, sugar: 3, grade: "C" },
  { keywords: ["maggi", "maggie", "asam laksa"], food: "Maggi Asam Laksa (1 pack)", calories: 360, protein: 8, carbs: 60, fat: 11, sugar: 2, grade: "C" },
  { keywords: ["maggi", "maggie", "sup", "soup"], food: "Maggi Sup (1 pack)", calories: 360, protein: 9, carbs: 58, fat: 13, sugar: 3, grade: "C" },
  { keywords: ["maggi", "maggie", "tomato"], food: "Maggi Tomato (1 pack)", calories: 370, protein: 8, carbs: 57, fat: 13, sugar: 5, grade: "C" },
  { keywords: ["maggi", "maggie", "goreng", "fried"], food: "Maggi Goreng (1 pack)", calories: 400, protein: 8, carbs: 62, fat: 14, sugar: 4, grade: "C" },
  { keywords: ["maggi", "maggie", "bihun", "tomyam"], food: "Maggi Bihun Tomyam (1 pack)", calories: 320, protein: 5, carbs: 52, fat: 10, sugar: 3, grade: "C" },
  { keywords: ["maggi", "maggie", "bihun", "kari"], food: "Maggi Bihun Kari (1 pack)", calories: 340, protein: 6, carbs: 54, fat: 11, sugar: 4, grade: "C" },
  { keywords: ["maggi", "maggie", "pedas", "gila"], food: "Maggi Pedas Gila (1 pack)", calories: 390, protein: 8, carbs: 57, fat: 15, sugar: 5, grade: "C" },
  { keywords: ["maggi", "maggie", "kaw", "kari"], food: "Maggi Kari Kaw (1 pack)", calories: 400, protein: 8, carbs: 56, fat: 16, sugar: 4, grade: "C" },

  // ============ 其他本地快熟面 ============
  { keywords: ["ibumie", "kari"], food: "Ibumie Kari (1 pack)", calories: 390, protein: 8, carbs: 60, fat: 14, sugar: 4, grade: "C" },
  { keywords: ["ibumie", "tomyam"], food: "Ibumie Tomyam (1 pack)", calories: 370, protein: 7, carbs: 59, fat: 12, sugar: 3, grade: "C" },
  { keywords: ["cintan", "mee goreng"], food: "Cintan Mee Goreng (1 pack)", calories: 400, protein: 8, carbs: 62, fat: 13, sugar: 5, grade: "C" },
  { keywords: ["cintan", "kari"], food: "Cintan Kari (1 pack)", calories: 390, protein: 8, carbs: 60, fat: 14, sugar: 4, grade: "C" },
  { keywords: ["mi sedap", "goreng"], food: "Mi Sedap Goreng (1 pack)", calories: 430, protein: 8, carbs: 67, fat: 15, sugar: 6, grade: "C" },
  { keywords: ["mi sedap", "kari"], food: "Mi Sedap Kari (1 pack)", calories: 400, protein: 9, carbs: 63, fat: 14, sugar: 5, grade: "C" },
  { keywords: ["mamee", "chef", "kari"], food: "Mamee Chef Kari (1 pack)", calories: 410, protein: 9, carbs: 63, fat: 15, sugar: 5, grade: "C" },
  { keywords: ["mamee", "chef", "tomyam"], food: "Mamee Chef Tomyam (1 pack)", calories: 380, protein: 8, carbs: 62, fat: 12, sugar: 4, grade: "C" },
  { keywords: ["vit's", "mi goreng"], food: "Vit's Mi Goreng (1 pack)", calories: 420, protein: 8, carbs: 65, fat: 15, sugar: 6, grade: "C" },
  { keywords: ["vit's", "kari"], food: "Vit's Kari (1 pack)", calories: 400, protein: 9, carbs: 64, fat: 14, sugar: 5, grade: "C" },
  { keywords: ["russki", "mi goreng"], food: "Russki Mi Goreng (1 pack)", calories: 420, protein: 8, carbs: 65, fat: 15, sugar: 6, grade: "C" },

  // ============ 韩国拉面 ============
  { keywords: ["shin ramyun", "shin ramen", "辛辣面"], food: "Shin Ramyun (1 pack)", calories: 510, protein: 11, carbs: 82, fat: 16, sugar: 4, grade: "C" },
  { keywords: ["shin ramyun black", "shin black"], food: "Shin Ramyun Black (1 pack)", calories: 530, protein: 12, carbs: 83, fat: 17, sugar: 5, grade: "C" },
  { keywords: ["samyang", "hot chicken", "fire noodle"], food: "Samyang Hot Chicken Ramen (1 pack)", calories: 530, protein: 11, carbs: 85, fat: 16, sugar: 7, grade: "C" },
  { keywords: ["samyang", "carbonara"], food: "Samyang Carbonara Hot Chicken (1 pack)", calories: 550, protein: 10, carbs: 82, fat: 20, sugar: 8, grade: "D" },
  { keywords: ["samyang", "2x spicy", "double spicy"], food: "Samyang 2x Spicy (1 pack)", calories: 530, protein: 11, carbs: 85, fat: 16, sugar: 7, grade: "C" },
  { keywords: ["neoguri", "udon"], food: "Neoguri Udon (1 pack)", calories: 480, protein: 10, carbs: 78, fat: 15, sugar: 5, grade: "C" },
  { keywords: ["chapagetti", "jajangmyeon"], food: "Chapagetti (1 pack)", calories: 610, protein: 11, carbs: 98, fat: 20, sugar: 9, grade: "D" },
  { keywords: ["ansung tangmyun"], food: "Ansung Tangmyun (1 pack)", calories: 500, protein: 10, carbs: 80, fat: 16, sugar: 6, grade: "C" },

  // ============ 泰国快熟面 ============
  { keywords: ["mama", "tomyum", "creamy"], food: "Mama Creamy Tomyum (1 pack)", calories: 350, protein: 7, carbs: 56, fat: 11, sugar: 4, grade: "C" },
  { keywords: ["mama", "tomyum", "clear", "nam sai"], food: "Mama Tomyum Clear (1 pack)", calories: 320, protein: 6, carbs: 53, fat: 9, sugar: 3, grade: "C" },
  { keywords: ["mama", "seafood"], food: "Mama Seafood (1 pack)", calories: 340, protein: 7, carbs: 55, fat: 10, sugar: 4, grade: "C" },
  { keywords: ["wai wai", "tomyum"], food: "Wai Wai Tomyum (1 pack)", calories: 360, protein: 7, carbs: 58, fat: 12, sugar: 5, grade: "C" },
  { keywords: ["wai wai", "chicken"], food: "Wai Wai Chicken (1 pack)", calories: 370, protein: 8, carbs: 57, fat: 13, sugar: 5, grade: "C" },

  // ============ 日本快熟面 / 干面 ============
  { keywords: ["nissin", "出前一丁", "sesame oil"], food: "Nissin Sesame Oil Ramen (1 pack)", calories: 480, protein: 10, carbs: 72, fat: 17, sugar: 6, grade: "C" },
  { keywords: ["nissin", "tonkotsu"], food: "Nissin Tonkotsu Ramen (1 pack)", calories: 470, protein: 11, carbs: 68, fat: 16, sugar: 5, grade: "C" },
  { keywords: ["nissin", "kyushu", "black"], food: "Nissin Kyushu Black (1 pack)", calories: 490, protein: 10, carbs: 71, fat: 18, sugar: 5, grade: "C" },

  // ============ 印尼 Indomie 更多口味 ============
  { keywords: ["indomie", "mi goreng"], food: "Indomie Mi Goreng (1 pack)", calories: 410, protein: 9, carbs: 64, fat: 14, sugar: 7, grade: "C" },
  { keywords: ["indomie", "rendang"], food: "Indomie Mi Goreng Rendang (1 pack)", calories: 420, protein: 9, carbs: 64, fat: 15, sugar: 7, grade: "C" },
  { keywords: ["indomie", "soto"], food: "Indomie Soto (1 pack)", calories: 380, protein: 8, carbs: 60, fat: 13, sugar: 5, grade: "C" },
  { keywords: ["indomie", "kari", "ayam"], food: "Indomie Kari Ayam (1 pack)", calories: 390, protein: 8, carbs: 61, fat: 14, sugar: 6, grade: "C" },
  { keywords: ["indomie", "ayam bawang"], food: "Indomie Ayam Bawang (1 pack)", calories: 370, protein: 9, carbs: 59, fat: 12, sugar: 4, grade: "C" },
  { keywords: ["indomie", "aceh"], food: "Indomie Aceh (1 pack)", calories: 400, protein: 8, carbs: 63, fat: 14, sugar: 6, grade: "C" },
  { keywords: ["indomie", "jumbo", "double"], food: "Indomie Jumbo (1 pack)", calories: 610, protein: 14, carbs: 96, fat: 21, sugar: 10, grade: "D" },

  // ============ 饼干 / 曲奇 ============
  { keywords: ["hup seng", "cream cracker", "3 piece"], food: "Hup Seng Cream Cracker (3 pieces)", calories: 120, protein: 2, carbs: 20, fat: 3.5, sugar: 1, grade: "B" },
  { keywords: ["hup seng", "cream cracker", "2 piece"], food: "Hup Seng Cream Cracker (2 pieces)", calories: 80, protein: 1.3, carbs: 13, fat: 2.3, sugar: 0.7, grade: "B" },
  { keywords: ["hup seng", "sugar cracker"], food: "Hup Seng Sugar Cracker (3 pieces)", calories: 130, protein: 2, carbs: 22, fat: 4, sugar: 6, grade: "C" },
  { keywords: ["julie's", "peanut butter", "sandwich"], food: "Julie's Peanut Butter Sandwich (1 pack, 2 crackers)", calories: 180, protein: 4, carbs: 21, fat: 9, sugar: 9, grade: "D" },
  { keywords: ["julie's", "cheese", "sandwich"], food: "Julie's Cheese Sandwich (1 pack, 2 crackers)", calories: 170, protein: 4, carbs: 22, fat: 8, sugar: 8, grade: "D" },
  { keywords: ["julie's", "oat 25", "oat cracker"], food: "Julie's Oat 25 (1 small pack)", calories: 120, protein: 2, carbs: 19, fat: 4, sugar: 5, grade: "C" },
  { keywords: ["julie's", "cream cracker"], food: "Julie's Cream Cracker (3 pieces)", calories: 120, protein: 2, carbs: 20, fat: 3.5, sugar: 1, grade: "B" },
  { keywords: ["khong guan", "soda", "cracker"], food: "Khong Guan Soda Cracker (3 pieces)", calories: 110, protein: 2, carbs: 19, fat: 3, sugar: 0.5, grade: "A" },
  { keywords: ["khong guan", "marie", "biscuit"], food: "Khong Guan Marie Biscuit (3 pieces)", calories: 100, protein: 2, carbs: 18, fat: 2.5, sugar: 4, grade: "B" },
  { keywords: ["tiger", "biskut", "3 piece"], food: "Tiger Biscuit (3 pieces)", calories: 130, protein: 2, carbs: 22, fat: 4, sugar: 6, grade: "C" },
  { keywords: ["tiger", "biskut", "4 piece"], food: "Tiger Biscuit (4 pieces)", calories: 173, protein: 2.7, carbs: 29, fat: 5.3, sugar: 8, grade: "C" },
  { keywords: ["oreo", "3 piece"], food: "Oreo (3 pieces)", calories: 160, protein: 2, carbs: 25, fat: 7, sugar: 14, grade: "D" },
  { keywords: ["oreo", "6 piece"], food: "Oreo (6 pieces)", calories: 320, protein: 4, carbs: 50, fat: 14, sugar: 28, grade: "E" },
  { keywords: ["chipsmore", "3 piece"], food: "Chipsmore (3 pieces)", calories: 150, protein: 2, carbs: 22, fat: 6, sugar: 12, grade: "D" },
  { keywords: ["chipsmore", "mini"], food: "Chipsmore Mini (1 small pack)", calories: 140, protein: 2, carbs: 21, fat: 5.5, sugar: 11, grade: "D" },
  { keywords: ["jacob's", "cream cracker", "3 piece"], food: "Jacob's Cream Cracker (3 pieces)", calories: 120, protein: 2, carbs: 21, fat: 3, sugar: 1, grade: "B" },
  { keywords: ["jacob's", "hi-fibre", "3 piece"], food: "Jacob's Hi-Fibre (3 pieces)", calories: 110, protein: 2, carbs: 20, fat: 2.5, sugar: 1, grade: "A" },
  { keywords: ["lexus", "cream cracker", "3 piece"], food: "Lexus Cream Cracker (3 pieces)", calories: 120, protein: 2, carbs: 20, fat: 3.5, sugar: 1, grade: "B" },
  { keywords: ["muchys", "chocolate", "wafer"], food: "Munchy's Chocolate Wafer (1 pack)", calories: 180, protein: 3, carbs: 28, fat: 7, sugar: 16, grade: "D" },
  { keywords: ["muchys", "oat krunch"], food: "Munchy's Oat Krunch (1 pack)", calories: 160, protein: 2, carbs: 26, fat: 5.5, sugar: 10, grade: "C" },
  { keywords: ["muchys", "lexus", "cream"], food: "Munchy's Lexus Cream (3 pieces)", calories: 120, protein: 2, carbs: 20, fat: 3.5, sugar: 7, grade: "C" },
  { keywords: ["dan biskut", "cream cracker"], food: "Dan Biskut Cream Cracker (3 pieces)", calories: 120, protein: 2, carbs: 20, fat: 3.5, sugar: 1, grade: "B" },
  { keywords: ["tam tam", "cracker"], food: "Tam Tam Cracker (1 small pack)", calories: 130, protein: 1, carbs: 19, fat: 5, sugar: 8, grade: "C" },
  { keywords: ["biskuat", "cream"], food: "Biskuat Cream (3 pieces)", calories: 130, protein: 2, carbs: 21, fat: 4, sugar: 10, grade: "C" },
  { keywords: ["ritz", "cracker", "5 piece"], food: "Ritz Cracker (5 pieces)", calories: 120, protein: 2, carbs: 18, fat: 5, sugar: 2, grade: "B" },

  // ============ 进口零食 ============
  { keywords: ["pejoy", "chocolate"], food: "Pejoy Chocolate (1 box)", calories: 280, protein: 4, carbs: 45, fat: 10, sugar: 28, grade: "E" },
  { keywords: ["pejoy", "matcha"], food: "Pejoy Matcha (1 box)", calories: 270, protein: 4, carbs: 44, fat: 9, sugar: 26, grade: "E" },
  { keywords: ["pocky", "chocolate"], food: "Pocky Chocolate (1 box)", calories: 260, protein: 4, carbs: 42, fat: 9, sugar: 24, grade: "D" },
  { keywords: ["pocky", "strawberry"], food: "Pocky Strawberry (1 box)", calories: 250, protein: 3, carbs: 43, fat: 8, sugar: 22, grade: "D" },
  { keywords: ["pocky", "matcha"], food: "Pocky Matcha (1 box)", calories: 250, protein: 4, carbs: 42, fat: 8, sugar: 22, grade: "D" },
  { keywords: ["hello panda", "chocolate"], food: "Hello Panda Chocolate (1 small box)", calories: 210, protein: 3, carbs: 34, fat: 7, sugar: 19, grade: "D" },
  { keywords: ["yan yan", "chocolate"], food: "Yan Yan Chocolate (1 pack)", calories: 160, protein: 3, carbs: 26, fat: 5, sugar: 15, grade: "D" },
  { keywords: ["kit kat", "2 finger"], food: "Kit Kat (2 fingers)", calories: 106, protein: 2, carbs: 14, fat: 5.5, sugar: 10, grade: "D" },
  { keywords: ["kit kat", "4 finger"], food: "Kit Kat (4 fingers)", calories: 212, protein: 4, carbs: 28, fat: 11, sugar: 20, grade: "D" },
  { keywords: ["cadbury", "dairy milk", "30g"], food: "Cadbury Dairy Milk (30g)", calories: 160, protein: 2.5, carbs: 17, fat: 9, sugar: 16, grade: "D" },
  { keywords: ["ferrero rocher", "3 piece"], food: "Ferrero Rocher (3 pieces)", calories: 230, protein: 3, carbs: 23, fat: 15, sugar: 17, grade: "D" },
  { keywords: ["ritter sport", "standard"], food: "Ritter Sport (100g, whole bar)", calories: 560, protein: 6, carbs: 53, fat: 36, sugar: 49, grade: "E" },
  { keywords: ["haribo", "goldbears", "small"], food: "Haribo Goldbears (small pack)", calories: 150, protein: 2, carbs: 34, fat: 0, sugar: 28, grade: "E" },
  { keywords: ["tictac", "standard"], food: "Tic Tac (small pack)", calories: 100, protein: 0, carbs: 25, fat: 0, sugar: 23, grade: "E" },
  { keywords: ["mentos", "fruit", "roll"], food: "Mentos Fruit (1 roll)", calories: 140, protein: 0, carbs: 35, fat: 0, sugar: 32, grade: "E" },

  // ============ 本地零食 ============
  { keywords: ["twisties", "original"], food: "Twisties Original (1 small pack)", calories: 120, protein: 1, carbs: 16, fat: 6, sugar: 2, grade: "C" },
  { keywords: ["twisties", "bbq"], food: "Twisties BBQ (1 small pack)", calories: 120, protein: 1, carbs: 16, fat: 6, sugar: 2, grade: "C" },
  { keywords: ["super ring", "original"], food: "Super Ring (1 small pack)", calories: 130, protein: 1, carbs: 18, fat: 6, sugar: 1, grade: "C" },
  { keywords: ["mamee", "monster", "small"], food: "Mamee Monster Snack (small)", calories: 100, protein: 1, carbs: 14, fat: 4, sugar: 0.5, grade: "B" },
  { keywords: ["mamee", "monster", "big"], food: "Mamee Monster Snack (big)", calories: 200, protein: 2, carbs: 28, fat: 8, sugar: 1, grade: "C" },
  { keywords: ["apollo", "layer cake"], food: "Apollo Layer Cake (1 piece)", calories: 150, protein: 3, carbs: 28, fat: 3, sugar: 18, grade: "D" },
  { keywords: ["apollo", "chocolate", "wafer"], food: "Apollo Chocolate Wafer (1 pack)", calories: 170, protein: 2, carbs: 27, fat: 6, sugar: 19, grade: "D" },
  { keywords: ["chacha", "nuts", "small"], food: "Chacha Roasted Nuts (small pack)", calories: 180, protein: 6, carbs: 10, fat: 14, sugar: 2, grade: "B" },
  { keywords: ["keropok", "ikan", "small"], food: "Keropok Ikan (small pack)", calories: 150, protein: 3, carbs: 20, fat: 6, sugar: 1, grade: "B" },
  { keywords: ["keropok lekor", "5 piece"], food: "Keropok Lekor (5 pieces)", calories: 200, protein: 5, carbs: 30, fat: 8, sugar: 0, grade: "B" },
  { keywords: ["muruku", "small"], food: "Muruku (1 small pack)", calories: 140, protein: 2, carbs: 18, fat: 7, sugar: 0, grade: "B" },
  { keywords: ["cucur udang", "1 piece"], food: "Cucur Udang (1 piece)", calories: 120, protein: 3, carbs: 15, fat: 5, sugar: 1, grade: "B" },
  { keywords: ["pisang goreng", "2 piece"], food: "Pisang Goreng (2 pieces)", calories: 180, protein: 2, carbs: 30, fat: 7, sugar: 14, grade: "C" },

  // ============ 饮料 ============
  { keywords: ["milo", "3 in 1", "sachet"], food: "Milo 3-in-1 sachet (1 cup)", calories: 170, protein: 5, carbs: 30, fat: 4, sugar: 20, grade: "D" },
  { keywords: ["milo", "kosong"], food: "Milo Kosong (1 cup, no sugar)", calories: 120, protein: 3, carbs: 21, fat: 2, sugar: 0, grade: "B" },
  { keywords: ["nescafe", "3 in 1"], food: "Nescafe 3-in-1 (1 cup)", calories: 90, protein: 1, carbs: 17, fat: 2, sugar: 11, grade: "C" },
  { keywords: ["teh tarik", "3 in 1"], food: "Teh Tarik 3-in-1 sachet", calories: 120, protein: 1, carbs: 22, fat: 3, sugar: 17, grade: "D" },
  { keywords: ["horlicks", "3 in 1"], food: "Horlicks 3-in-1 (1 cup)", calories: 130, protein: 4, carbs: 25, fat: 2, sugar: 14, grade: "C" },
  { keywords: ["vitagen", "original"], food: "Marigold Vitagen (1 bottle)", calories: 80, protein: 1, carbs: 18, fat: 0, sugar: 15, grade: "D" },
  { keywords: ["yakult"], food: "Yakult (1 bottle)", calories: 50, protein: 0.5, carbs: 12, fat: 0, sugar: 9, grade: "C" },
  { keywords: ["100 plus", "100plus"], food: "100 Plus (1 can)", calories: 90, protein: 0, carbs: 22, fat: 0, sugar: 22, grade: "D" },
  { keywords: ["coca cola", "coke", "tin"], food: "Coca-Cola (1 can)", calories: 140, protein: 0, carbs: 39, fat: 0, sugar: 39, grade: "E" },
  { keywords: ["sprite", "tin"], food: "Sprite (1 can)", calories: 140, protein: 0, carbs: 38, fat: 0, sugar: 38, grade: "E" },
  { keywords: ["fanta", "orange", "tin"], food: "Fanta Orange (1 can)", calories: 160, protein: 0, carbs: 43, fat: 0, sugar: 43, grade: "E" },
  { keywords: ["lipton", "tea", "no sugar"], food: "Lipton Tea (no sugar)", calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, grade: "A" },
  { keywords: ["soya bean", "drinho"], food: "Drinho Soya Bean (1 packet)", calories: 100, protein: 5, carbs: 13, fat: 2, sugar: 10, grade: "C" },
  { keywords: ["bandung", "sirap"], food: "Sirap Bandung (1 glass)", calories: 150, protein: 0, carbs: 35, fat: 0, sugar: 33, grade: "E" },

  // ============ 酸奶 ============
  { keywords: ["yogurt", "nestle", "natural", "plain", "original"], food: "Nestle Natural Yogurt (1 cup, 135g)", calories: 90, protein: 5, carbs: 12, fat: 3, sugar: 10, grade: "C" },
  { keywords: ["yogurt", "nestle", "strawberry", "fruit"], food: "Nestle Strawberry Yogurt (1 cup, 135g)", calories: 130, protein: 4, carbs: 23, fat: 2.5, sugar: 19, grade: "D" },
  { keywords: ["yogurt", "nestle", "blueberry"], food: "Nestle Blueberry Yogurt (1 cup, 135g)", calories: 130, protein: 4, carbs: 23, fat: 2.5, sugar: 19, grade: "D" },
  { keywords: ["yogurt", "dutch lady", "natural", "plain"], food: "Dutch Lady Plain Yogurt (1 cup, 140g)", calories: 95, protein: 6, carbs: 11, fat: 3, sugar: 9, grade: "C" },
  { keywords: ["yogurt", "dutch lady", "strawberry"], food: "Dutch Lady Strawberry Yogurt (1 cup, 140g)", calories: 140, protein: 5, carbs: 24, fat: 2.5, sugar: 20, grade: "D" },
  { keywords: ["yogurt", "dutch lady", "mixed berry"], food: "Dutch Lady Mixed Berry Yogurt (1 cup, 140g)", calories: 140, protein: 5, carbs: 24, fat: 2.5, sugar: 19, grade: "D" },
  { keywords: ["yogurt", "marigold", "plain", "original"], food: "Marigold Plain Yogurt (1 cup, 135g)", calories: 88, protein: 5, carbs: 12, fat: 3, sugar: 9, grade: "C" },
  { keywords: ["yogurt", "marigold", "fruit", "strawberry"], food: "Marigold Fruit Yogurt (1 cup, 135g)", calories: 125, protein: 4, carbs: 22, fat: 2.5, sugar: 18, grade: "D" },
  { keywords: ["yogurt", "yogood", "plain"], food: "Yogood Plain Yogurt (1 cup, 140g)", calories: 100, protein: 6, carbs: 13, fat: 3, sugar: 10, grade: "C" },
  { keywords: ["yogurt", "yogood", "mango"], food: "Yogood Mango Yogurt (1 cup, 140g)", calories: 140, protein: 5, carbs: 24, fat: 2.5, sugar: 21, grade: "D" },
  { keywords: ["yogurt", "greek", "farm fresh", "plain"], food: "Farm Fresh Greek Yogurt (1 cup, 150g)", calories: 130, protein: 13, carbs: 8, fat: 5, sugar: 4, grade: "B" },
  { keywords: ["yogurt", "greek", "anlene", "plain"], food: "Anlene Greek Yogurt (1 cup, 150g)", calories: 120, protein: 12, carbs: 9, fat: 4, sugar: 4, grade: "B" },

  // ============ 酸奶饮品 ============
  { keywords: ["yogurt drink", "nestle", "original"], food: "Nestle Yogurt Drink Original (1 bottle, 200ml)", calories: 140, protein: 5, carbs: 24, fat: 2.5, sugar: 20, grade: "D" },
  { keywords: ["yogurt drink", "dutch lady", "original"], food: "Dutch Lady Yogurt Drink (1 bottle, 200ml)", calories: 150, protein: 5, carbs: 26, fat: 2.5, sugar: 22, grade: "D" },
  { keywords: ["yogurt drink", "marigold", "fruit"], food: "Marigold Yogurt Drink (1 bottle, 200ml)", calories: 160, protein: 4, carbs: 30, fat: 2, sugar: 25, grade: "D" },
  { keywords: ["yakult", "ace", "light"], food: "Yakult Ace Light (1 bottle)", calories: 35, protein: 0.5, carbs: 8, fat: 0, sugar: 6, grade: "C" },

  // ============ 牛奶 ============
  { keywords: ["milk", "dutch lady", "full cream", "uht"], food: "Dutch Lady UHT Full Cream Milk (1 cup, 250ml)", calories: 160, protein: 8, carbs: 12, fat: 9, sugar: 11, grade: "C" },
  { keywords: ["milk", "dutch lady", "low fat", "hl"], food: "Dutch Lady Low Fat Milk (1 cup, 250ml)", calories: 110, protein: 8, carbs: 13, fat: 3.5, sugar: 12, grade: "B" },
  { keywords: ["milk", "farm fresh", "full cream", "fresh"], food: "Farm Fresh Full Cream Milk (1 cup, 250ml)", calories: 160, protein: 8, carbs: 12, fat: 9, sugar: 11, grade: "C" },
  { keywords: ["milk", "farm fresh", "low fat"], food: "Farm Fresh Low Fat Milk (1 cup, 250ml)", calories: 105, protein: 8, carbs: 12, fat: 3, sugar: 11, grade: "B" },
  { keywords: ["milk", "goodday", "full cream"], food: "Goodday Full Cream Milk (1 cup, 250ml)", calories: 155, protein: 8, carbs: 12, fat: 8.5, sugar: 11, grade: "C" },
  { keywords: ["milk", "goodday", "low fat"], food: "Goodday Low Fat Milk (1 cup, 250ml)", calories: 100, protein: 8, carbs: 13, fat: 2.5, sugar: 12, grade: "B" },
  { keywords: ["milk", "marigold", "hl", "low fat", "high calcium"], food: "Marigold HL Low Fat High Calcium Milk (1 cup, 250ml)", calories: 110, protein: 8, carbs: 13, fat: 3.5, sugar: 12, grade: "B" },
  { keywords: ["milk", "marigold", "full cream"], food: "Marigold Full Cream Milk (1 cup, 250ml)", calories: 155, protein: 8, carbs: 12, fat: 8.5, sugar: 11, grade: "C" },
  { keywords: ["milk", "anlene", "low fat"], food: "Anlene Low Fat Milk (1 cup, 250ml)", calories: 110, protein: 9, carbs: 14, fat: 2.5, sugar: 13, grade: "B" },
  { keywords: ["milk", "anmum", "essential"], food: "Anmum Essential Milk (1 cup, 250ml)", calories: 180, protein: 9, carbs: 20, fat: 7, sugar: 12, grade: "C" },
  { keywords: ["milk", "so good", "oat milk"], food: "So Good Oat Milk (1 cup, 250ml)", calories: 120, protein: 2, carbs: 24, fat: 3, sugar: 7, grade: "B" },
  { keywords: ["milk", "so good", "almond milk", "unsweetened"], food: "So Good Almond Milk Unsweetened (1 cup, 250ml)", calories: 40, protein: 1, carbs: 2, fat: 3.5, sugar: 0, grade: "A" },

  // ============ 巧克力牛奶 ============
  { keywords: ["chocolate milk", "dutch lady", "choc"], food: "Dutch Lady Chocolate Milk (1 cup, 250ml)", calories: 200, protein: 8, carbs: 28, fat: 6, sugar: 24, grade: "D" },
  { keywords: ["chocolate milk", "farm fresh", "choc"], food: "Farm Fresh Chocolate Milk (1 cup, 250ml)", calories: 210, protein: 8, carbs: 30, fat: 6.5, sugar: 26, grade: "D" },
  { keywords: ["chocolate milk", "goodday", "choc"], food: "Goodday Chocolate Milk (1 cup, 250ml)", calories: 190, protein: 7, carbs: 28, fat: 5.5, sugar: 25, grade: "D" },
  { keywords: ["chocolate milk", "marigold", "hl", "choc"], food: "Marigold HL Chocolate Milk (1 cup, 250ml)", calories: 180, protein: 8, carbs: 28, fat: 4.5, sugar: 25, grade: "D" },

  // ============ 豆奶 ============
  { keywords: ["soy milk", "v-soy", "original", "unsweetened"], food: "V-Soy Original Unsweetened Soy Milk (1 box, 300ml)", calories: 90, protein: 9, carbs: 6, fat: 3, sugar: 0, grade: "A" },
  { keywords: ["soy milk", "v-soy", "sweetened", "classic"], food: "V-Soy Classic Soy Milk (1 box, 300ml)", calories: 150, protein: 9, carbs: 18, fat: 4, sugar: 16, grade: "D" },
  { keywords: ["soy milk", "homesoy", "original"], food: "Homesoy Original Soy Milk (1 box, 300ml)", calories: 140, protein: 8, carbs: 17, fat: 4, sugar: 14, grade: "C" },
  { keywords: ["soy milk", "homesoy", "reduced sugar"], food: "Homesoy Reduced Sugar Soy Milk (1 box, 300ml)", calories: 100, protein: 8, carbs: 10, fat: 3, sugar: 5, grade: "B" },
  { keywords: ["soy milk", "yeo's", "original"], food: "Yeo's Soy Milk (1 box, 250ml)", calories: 120, protein: 7, carbs: 15, fat: 3.5, sugar: 12, grade: "C" },
  { keywords: ["soy milk", "dutch lady", "soy"], food: "Dutch Lady Soy Milk (1 box, 250ml)", calories: 130, protein: 7, carbs: 16, fat: 3.5, sugar: 13, grade: "C" },

  // ============ 健康饮料 / 果汁 / 茶饮 ============
  { keywords: ["ribena", "blackcurrant", "ready to drink"], food: "Ribena Ready-to-Drink (1 carton, 250ml)", calories: 130, protein: 0, carbs: 33, fat: 0, sugar: 31, grade: "E" },
  { keywords: ["ribena", "concentrate", "per glass"], food: "Ribena Concentrate (1 glass, diluted)", calories: 80, protein: 0, carbs: 20, fat: 0, sugar: 18, grade: "D" },
  { keywords: ["tropicana", "orange juice", "regular"], food: "Tropicana Orange Juice (1 cup, 250ml)", calories: 110, protein: 2, carbs: 26, fat: 0, sugar: 22, grade: "D" },
  { keywords: ["tropicana", "apple juice"], food: "Tropicana Apple Juice (1 cup, 250ml)", calories: 120, protein: 0, carbs: 28, fat: 0, sugar: 25, grade: "D" },
  { keywords: ["sunquick", "orange", "per glass"], food: "Sunquick Orange (1 glass, diluted)", calories: 70, protein: 0, carbs: 18, fat: 0, sugar: 16, grade: "C" },
  { keywords: ["marigold", "fruit juice", "orange"], food: "Marigold Orange Juice (1 cup, 250ml)", calories: 100, protein: 0, carbs: 25, fat: 0, sugar: 23, grade: "D" },
  { keywords: ["f&n", "orange juice"], food: "F&N Orange Juice (1 cup, 250ml)", calories: 120, protein: 0, carbs: 29, fat: 0, sugar: 26, grade: "D" },
  { keywords: ["pokka", "green tea", "no sugar"], food: "Pokka Green Tea No Sugar (1 bottle, 500ml)", calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, grade: "A" },
  { keywords: ["pokka", "jasmine tea", "no sugar"], food: "Pokka Jasmine Tea No Sugar (1 bottle, 500ml)", calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, grade: "A" },
  { keywords: ["pokka", "oolong tea"], food: "Pokka Oolong Tea (1 bottle, 500ml)", calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, grade: "A" },
  { keywords: ["oishi", "green tea"], food: "Oishi Green Tea (1 bottle, 380ml)", calories: 0, protein: 0, carbs: 0, fat: 0, sugar: 0, grade: "A" },
  { keywords: ["nescafe", "canned", "latte"], food: "Nescafe Canned Latte (1 can)", calories: 100, protein: 4, carbs: 14, fat: 2.5, sugar: 13, grade: "C" },
  { keywords: ["wonda", "coffee", "original"], food: "Wonda Coffee Original (1 can)", calories: 90, protein: 2, carbs: 14, fat: 2, sugar: 12, grade: "C" },
  { keywords: ["yogurt", "yogurt drink", "vitagen", "less sugar"], food: "Vitagen Less Sugar (1 bottle)", calories: 60, protein: 1, carbs: 13, fat: 0, sugar: 9, grade: "C" },
  { keywords: ["soy milk", "v-soy", "multigrain"], food: "V-Soy Multi-Grain Soy Milk (1 box, 300ml)", calories: 160, protein: 9, carbs: 20, fat: 5, sugar: 12, grade: "C" },
  { keywords: ["coconut water", "vita coco"], food: "Vita Coco Coconut Water (1 pack, 330ml)", calories: 60, protein: 0, carbs: 15, fat: 0, sugar: 11, grade: "B" },
  { keywords: ["coconut water", "cocomax"], food: "Cocomax Coconut Water (1 pack, 330ml)", calories: 60, protein: 0, carbs: 15, fat: 0, sugar: 11, grade: "B" },
  { keywords: ["coconut water", "drinkable"], food: "Fresh Coconut Water (1 whole coconut)", calories: 100, protein: 1, carbs: 24, fat: 0, sugar: 20, grade: "C" },
  { keywords: ["kombucha", "humm"], food: "Humm Kombucha (1 bottle, 330ml)", calories: 35, protein: 0, carbs: 8, fat: 0, sugar: 6, grade: "C" },

  // ============ 本地食物 ============
  { keywords: ["nasi lemak", "bungkus"], food: "Nasi Lemak Biasa (1 bungkus)", calories: 400, protein: 10, carbs: 50, fat: 18, sugar: 5, grade: "C" },
  { keywords: ["nasi goreng", "kampung"], food: "Nasi Goreng Kampung (1 plate)", calories: 550, protein: 12, carbs: 70, fat: 22, sugar: 3, grade: "C" },
  { keywords: ["roti canai", "kosong"], food: "Roti Canai Kosong (1 piece)", calories: 200, protein: 4, carbs: 30, fat: 8, sugar: 1, grade: "B" },
  { keywords: ["roti canai", "telur"], food: "Roti Canai Telur (1 piece)", calories: 350, protein: 10, carbs: 35, fat: 18, sugar: 2, grade: "C" },
  { keywords: ["tosai", "thosai", "plain"], food: "Thosai Plain (1 piece)", calories: 150, protein: 3, carbs: 30, fat: 2, sugar: 0, grade: "A" },
  { keywords: ["mee goreng", "mamak"], food: "Mee Goreng Mamak (1 plate)", calories: 500, protein: 10, carbs: 65, fat: 20, sugar: 6, grade: "C" },
  { keywords: ["mee rebus"], food: "Mee Rebus (1 bowl)", calories: 450, protein: 8, carbs: 60, fat: 18, sugar: 8, grade: "C" },
  { keywords: ["laksa", "asam"], food: "Asam Laksa (1 bowl)", calories: 350, protein: 12, carbs: 50, fat: 10, sugar: 4, grade: "C" },
  { keywords: ["kuey teow", "goreng"], food: "Kuey Teow Goreng (1 plate)", calories: 520, protein: 10, carbs: 68, fat: 22, sugar: 5, grade: "C" },
  { keywords: ["chicken rice", "nasi ayam"], food: "Nasi Ayam (1 plate)", calories: 450, protein: 18, carbs: 55, fat: 15, sugar: 4, grade: "C" },
  { keywords: ["cendol"], food: "Cendol (1 bowl)", calories: 250, protein: 2, carbs: 50, fat: 5, sugar: 38, grade: "E" },
  { keywords: ["ais kacang", "abc"], food: "Ais Kacang (1 bowl)", calories: 300, protein: 3, carbs: 60, fat: 5, sugar: 45, grade: "E" },
  { keywords: ["karipap", "curry puff"], food: "Karipap (1 piece)", calories: 180, protein: 4, carbs: 22, fat: 9, sugar: 2, grade: "C" },
  { keywords: ["kuih lapis"], food: "Kuih Lapis (1 slice)", calories: 130, protein: 2, carbs: 28, fat: 1, sugar: 21, grade: "D" },
  { keywords: ["onde-onde"], food: "Onde-onde (2 pieces)", calories: 120, protein: 1, carbs: 25, fat: 2, sugar: 18, grade: "D" },
  { keywords: ["pulut panggang"], food: "Pulut Panggang (1 piece)", calories: 170, protein: 3, carbs: 30, fat: 4, sugar: 5, grade: "C" }
];

/* ================= 查询函数 ================= */
function searchLocalFood(query) {
  const q = query.toLowerCase().trim();
  let best = null;
  let bestScore = 0;

  for (let item of LOCAL_FOOD_DB) {
    let score = 0;
    for (let kw of item.keywords) {
      if (q === kw) score += 100;
      else if (q.includes(kw)) score += 50;
      else if (kw.includes(q)) score += 30;
    }
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  return bestScore >= 20 ? best : null;

}

/* =========================
   🇲🇾 MALAYSIA LOCAL + IMPORT FOOD DATABASE v5.0 (Sugar & Grade)
   新增 searchLocalFoods 支持下拉建议
   ========================= */

// ... 数据库数组 LOCAL_FOOD_DB 保持不变，此处省略，你已有完整版 ...

// 原有的精确查询函数（保留）
function searchLocalFood(query) {
  const q = query.toLowerCase().trim();
  let best = null;
  let bestScore = 0;
  for (let item of LOCAL_FOOD_DB) {
    let score = 0;
    for (let kw of item.keywords) {
      if (q === kw) score += 100;
      else if (q.includes(kw)) score += 50;
      else if (kw.includes(q)) score += 30;
    }
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }
  return bestScore >= 20 ? best : null;
}

// ✅ 新增：返回多个匹配项（用于下拉建议）
function searchLocalFoods(query, maxResults = 6) {
  const q = query.toLowerCase().trim();
  const scored = [];
  for (let item of LOCAL_FOOD_DB) {
    let score = 0;
    for (let kw of item.keywords) {
      if (q === kw) score += 100;
      else if (kw.startsWith(q)) score += 60;   // 以输入开头优先
      else if (kw.includes(q)) score += 40;
    }
    // 也检查食物名称
    if (item.food.toLowerCase().includes(q)) score += 50;
    if (score > 0) scored.push({ item, score });
  }
  // 按分数降序排列，取前 maxResults
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, maxResults).map(s => s.item);
}
