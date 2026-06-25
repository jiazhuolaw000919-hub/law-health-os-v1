/* =========================
   🇲🇾 MALAYSIA LOCAL + IMPORT FOOD DATABASE v4.0
   新增：乳制品、豆奶、酸奶、健康饮料
   ========================= */

const LOCAL_FOOD_DB = [
  // ============ Maggi 系列 (全部常见口味) ============
  { keywords: ["maggi", "maggie", "kari", "curry"], food: "Maggi Kari (1 pack)", calories: 380, protein: 8, carbs: 55, fat: 15 },
  { keywords: ["maggi", "maggie", "ayam", "chicken"], food: "Maggi Ayam (1 pack)", calories: 370, protein: 9, carbs: 56, fat: 14 },
  { keywords: ["maggi", "maggie", "tomyam"], food: "Maggi Tomyam (1 pack)", calories: 350, protein: 7, carbs: 58, fat: 12 },
  { keywords: ["maggi", "maggie", "asam laksa"], food: "Maggi Asam Laksa (1 pack)", calories: 360, protein: 8, carbs: 60, fat: 11 },
  { keywords: ["maggi", "maggie", "sup", "soup"], food: "Maggi Sup (1 pack)", calories: 360, protein: 9, carbs: 58, fat: 13 },
  { keywords: ["maggi", "maggie", "tomato"], food: "Maggi Tomato (1 pack)", calories: 370, protein: 8, carbs: 57, fat: 13 },
  { keywords: ["maggi", "maggie", "goreng", "fried"], food: "Maggi Goreng (1 pack)", calories: 400, protein: 8, carbs: 62, fat: 14 },
  { keywords: ["maggi", "maggie", "bihun", "tomyam"], food: "Maggi Bihun Tomyam (1 pack)", calories: 320, protein: 5, carbs: 52, fat: 10 },
  { keywords: ["maggi", "maggie", "bihun", "kari"], food: "Maggi Bihun Kari (1 pack)", calories: 340, protein: 6, carbs: 54, fat: 11 },
  { keywords: ["maggi", "maggie", "pedas", "gila"], food: "Maggi Pedas Gila (1 pack)", calories: 390, protein: 8, carbs: 57, fat: 15 },
  { keywords: ["maggi", "maggie", "kaw", "kari"], food: "Maggi Kari Kaw (1 pack)", calories: 400, protein: 8, carbs: 56, fat: 16 },

  // ============ 其他本地快熟面 ============
  { keywords: ["ibumie", "kari"], food: "Ibumie Kari (1 pack)", calories: 390, protein: 8, carbs: 60, fat: 14 },
  { keywords: ["ibumie", "tomyam"], food: "Ibumie Tomyam (1 pack)", calories: 370, protein: 7, carbs: 59, fat: 12 },
  { keywords: ["cintan", "mee goreng"], food: "Cintan Mee Goreng (1 pack)", calories: 400, protein: 8, carbs: 62, fat: 13 },
  { keywords: ["cintan", "kari"], food: "Cintan Kari (1 pack)", calories: 390, protein: 8, carbs: 60, fat: 14 },
  { keywords: ["mi sedap", "goreng"], food: "Mi Sedap Goreng (1 pack)", calories: 430, protein: 8, carbs: 67, fat: 15 },
  { keywords: ["mi sedap", "kari"], food: "Mi Sedap Kari (1 pack)", calories: 400, protein: 9, carbs: 63, fat: 14 },
  { keywords: ["mamee", "chef", "kari"], food: "Mamee Chef Kari (1 pack)", calories: 410, protein: 9, carbs: 63, fat: 15 },
  { keywords: ["mamee", "chef", "tomyam"], food: "Mamee Chef Tomyam (1 pack)", calories: 380, protein: 8, carbs: 62, fat: 12 },
  { keywords: ["vit's", "mi goreng"], food: "Vit's Mi Goreng (1 pack)", calories: 420, protein: 8, carbs: 65, fat: 15 },
  { keywords: ["vit's", "kari"], food: "Vit's Kari (1 pack)", calories: 400, protein: 9, carbs: 64, fat: 14 },
  { keywords: ["russki", "mi goreng"], food: "Russki Mi Goreng (1 pack)", calories: 420, protein: 8, carbs: 65, fat: 15 },

  // ============ 韩国拉面 ============
  { keywords: ["shin ramyun", "shin ramen", "辛辣面"], food: "Shin Ramyun (1 pack)", calories: 510, protein: 11, carbs: 82, fat: 16 },
  { keywords: ["shin ramyun black", "shin black"], food: "Shin Ramyun Black (1 pack)", calories: 530, protein: 12, carbs: 83, fat: 17 },
  { keywords: ["samyang", "hot chicken", "fire noodle"], food: "Samyang Hot Chicken Ramen (1 pack)", calories: 530, protein: 11, carbs: 85, fat: 16 },
  { keywords: ["samyang", "carbonara"], food: "Samyang Carbonara Hot Chicken (1 pack)", calories: 550, protein: 10, carbs: 82, fat: 20 },
  { keywords: ["samyang", "2x spicy", "double spicy"], food: "Samyang 2x Spicy (1 pack)", calories: 530, protein: 11, carbs: 85, fat: 16 },
  { keywords: ["neoguri", "udon"], food: "Neoguri Udon (1 pack)", calories: 480, protein: 10, carbs: 78, fat: 15 },
  { keywords: ["chapagetti", "jajangmyeon"], food: "Chapagetti (1 pack)", calories: 610, protein: 11, carbs: 98, fat: 20 },
  { keywords: ["ansung tangmyun"], food: "Ansung Tangmyun (1 pack)", calories: 500, protein: 10, carbs: 80, fat: 16 },

  // ============ 泰国快熟面 ============
  { keywords: ["mama", "tomyum", "creamy"], food: "Mama Creamy Tomyum (1 pack)", calories: 350, protein: 7, carbs: 56, fat: 11 },
  { keywords: ["mama", "tomyum", "clear", "nam sai"], food: "Mama Tomyum Clear (1 pack)", calories: 320, protein: 6, carbs: 53, fat: 9 },
  { keywords: ["mama", "seafood"], food: "Mama Seafood (1 pack)", calories: 340, protein: 7, carbs: 55, fat: 10 },
  { keywords: ["wai wai", "tomyum"], food: "Wai Wai Tomyum (1 pack)", calories: 360, protein: 7, carbs: 58, fat: 12 },
  { keywords: ["wai wai", "chicken"], food: "Wai Wai Chicken (1 pack)", calories: 370, protein: 8, carbs: 57, fat: 13 },

  // ============ 日本快熟面 / 干面 ============
  { keywords: ["nissin", "出前一丁", "sesame oil"], food: "Nissin Sesame Oil Ramen (1 pack)", calories: 480, protein: 10, carbs: 72, fat: 17 },
  { keywords: ["nissin", "tonkotsu"], food: "Nissin Tonkotsu Ramen (1 pack)", calories: 470, protein: 11, carbs: 68, fat: 16 },
  { keywords: ["nissin", "kyushu", "black"], food: "Nissin Kyushu Black (1 pack)", calories: 490, protein: 10, carbs: 71, fat: 18 },

  // ============ 印尼 Indomie 更多口味 ============
  { keywords: ["indomie", "mi goreng"], food: "Indomie Mi Goreng (1 pack)", calories: 410, protein: 9, carbs: 64, fat: 14 },
  { keywords: ["indomie", "rendang"], food: "Indomie Mi Goreng Rendang (1 pack)", calories: 420, protein: 9, carbs: 64, fat: 15 },
  { keywords: ["indomie", "soto"], food: "Indomie Soto (1 pack)", calories: 380, protein: 8, carbs: 60, fat: 13 },
  { keywords: ["indomie", "kari", "ayam"], food: "Indomie Kari Ayam (1 pack)", calories: 390, protein: 8, carbs: 61, fat: 14 },
  { keywords: ["indomie", "ayam bawang"], food: "Indomie Ayam Bawang (1 pack)", calories: 370, protein: 9, carbs: 59, fat: 12 },
  { keywords: ["indomie", "aceh"], food: "Indomie Aceh (1 pack)", calories: 400, protein: 8, carbs: 63, fat: 14 },
  { keywords: ["indomie", "jumbo", "double"], food: "Indomie Jumbo (1 pack)", calories: 610, protein: 14, carbs: 96, fat: 21 },

  // ============ 饼干 / 曲奇 (按片数细分) ============
  { keywords: ["hup seng", "cream cracker", "3 piece"], food: "Hup Seng Cream Cracker (3 pieces)", calories: 120, protein: 2, carbs: 20, fat: 3.5 },
  { keywords: ["hup seng", "cream cracker", "2 piece"], food: "Hup Seng Cream Cracker (2 pieces)", calories: 80, protein: 1.3, carbs: 13, fat: 2.3 },
  { keywords: ["hup seng", "sugar cracker"], food: "Hup Seng Sugar Cracker (3 pieces)", calories: 130, protein: 2, carbs: 22, fat: 4 },
  { keywords: ["julie's", "peanut butter", "sandwich"], food: "Julie's Peanut Butter Sandwich (1 pack, 2 crackers)", calories: 180, protein: 4, carbs: 21, fat: 9 },
  { keywords: ["julie's", "cheese", "sandwich"], food: "Julie's Cheese Sandwich (1 pack, 2 crackers)", calories: 170, protein: 4, carbs: 22, fat: 8 },
  { keywords: ["julie's", "oat 25", "oat cracker"], food: "Julie's Oat 25 (1 small pack)", calories: 120, protein: 2, carbs: 19, fat: 4 },
  { keywords: ["julie's", "cream cracker"], food: "Julie's Cream Cracker (3 pieces)", calories: 120, protein: 2, carbs: 20, fat: 3.5 },
  { keywords: ["khong guan", "soda", "cracker"], food: "Khong Guan Soda Cracker (3 pieces)", calories: 110, protein: 2, carbs: 19, fat: 3 },
  { keywords: ["khong guan", "marie", "biscuit"], food: "Khong Guan Marie Biscuit (3 pieces)", calories: 100, protein: 2, carbs: 18, fat: 2.5 },
  { keywords: ["tiger", "biskut", "3 piece"], food: "Tiger Biscuit (3 pieces)", calories: 130, protein: 2, carbs: 22, fat: 4 },
  { keywords: ["tiger", "biskut", "4 piece"], food: "Tiger Biscuit (4 pieces)", calories: 173, protein: 2.7, carbs: 29, fat: 5.3 },
  { keywords: ["oreo", "3 piece"], food: "Oreo (3 pieces)", calories: 160, protein: 2, carbs: 25, fat: 7 },
  { keywords: ["oreo", "6 piece"], food: "Oreo (6 pieces)", calories: 320, protein: 4, carbs: 50, fat: 14 },
  { keywords: ["chipsmore", "3 piece"], food: "Chipsmore (3 pieces)", calories: 150, protein: 2, carbs: 22, fat: 6 },
  { keywords: ["chipsmore", "mini"], food: "Chipsmore Mini (1 small pack)", calories: 140, protein: 2, carbs: 21, fat: 5.5 },
  { keywords: ["jacob's", "cream cracker", "3 piece"], food: "Jacob's Cream Cracker (3 pieces)", calories: 120, protein: 2, carbs: 21, fat: 3 },
  { keywords: ["jacob's", "hi-fibre", "3 piece"], food: "Jacob's Hi-Fibre (3 pieces)", calories: 110, protein: 2, carbs: 20, fat: 2.5 },
  { keywords: ["lexus", "cream cracker", "3 piece"], food: "Lexus Cream Cracker (3 pieces)", calories: 120, protein: 2, carbs: 20, fat: 3.5 },
  { keywords: ["muchys", "chocolate", "wafer"], food: "Munchy's Chocolate Wafer (1 pack)", calories: 180, protein: 3, carbs: 28, fat: 7 },
  { keywords: ["muchys", "oat krunch"], food: "Munchy's Oat Krunch (1 pack)", calories: 160, protein: 2, carbs: 26, fat: 5.5 },
  { keywords: ["muchys", "lexus", "cream"], food: "Munchy's Lexus Cream (3 pieces)", calories: 120, protein: 2, carbs: 20, fat: 3.5 },
  { keywords: ["dan biskut", "cream cracker"], food: "Dan Biskut Cream Cracker (3 pieces)", calories: 120, protein: 2, carbs: 20, fat: 3.5 },
  { keywords: ["tam tam", "cracker"], food: "Tam Tam Cracker (1 small pack)", calories: 130, protein: 1, carbs: 19, fat: 5 },
  { keywords: ["biskuat", "cream"], food: "Biskuat Cream (3 pieces)", calories: 130, protein: 2, carbs: 21, fat: 4 },
  { keywords: ["ritz", "cracker", "5 piece"], food: "Ritz Cracker (5 pieces)", calories: 120, protein: 2, carbs: 18, fat: 5 },

  // ============ 进口零食 ============
  { keywords: ["pejoy", "chocolate"], food: "Pejoy Chocolate (1 box)", calories: 280, protein: 4, carbs: 45, fat: 10 },
  { keywords: ["pejoy", "matcha"], food: "Pejoy Matcha (1 box)", calories: 270, protein: 4, carbs: 44, fat: 9 },
  { keywords: ["pocky", "chocolate"], food: "Pocky Chocolate (1 box)", calories: 260, protein: 4, carbs: 42, fat: 9 },
  { keywords: ["pocky", "strawberry"], food: "Pocky Strawberry (1 box)", calories: 250, protein: 3, carbs: 43, fat: 8 },
  { keywords: ["pocky", "matcha"], food: "Pocky Matcha (1 box)", calories: 250, protein: 4, carbs: 42, fat: 8 },
  { keywords: ["hello panda", "chocolate"], food: "Hello Panda Chocolate (1 small box)", calories: 210, protein: 3, carbs: 34, fat: 7 },
  { keywords: ["yan yan", "chocolate"], food: "Yan Yan Chocolate (1 pack)", calories: 160, protein: 3, carbs: 26, fat: 5 },
  { keywords: ["kit kat", "2 finger"], food: "Kit Kat (2 fingers)", calories: 106, protein: 2, carbs: 14, fat: 5.5 },
  { keywords: ["kit kat", "4 finger"], food: "Kit Kat (4 fingers)", calories: 212, protein: 4, carbs: 28, fat: 11 },
  { keywords: ["cadbury", "dairy milk", "30g"], food: "Cadbury Dairy Milk (30g)", calories: 160, protein: 2.5, carbs: 17, fat: 9 },
  { keywords: ["ferrero rocher", "3 piece"], food: "Ferrero Rocher (3 pieces)", calories: 230, protein: 3, carbs: 23, fat: 15 },
  { keywords: ["ritter sport", "standard"], food: "Ritter Sport (100g, whole bar)", calories: 560, protein: 6, carbs: 53, fat: 36 },
  { keywords: ["haribo", "goldbears", "small"], food: "Haribo Goldbears (small pack)", calories: 150, protein: 2, carbs: 34, fat: 0 },
  { keywords: ["tictac", "standard"], food: "Tic Tac (small pack)", calories: 100, protein: 0, carbs: 25, fat: 0 },
  { keywords: ["mentos", "fruit", "roll"], food: "Mentos Fruit (1 roll)", calories: 140, protein: 0, carbs: 35, fat: 0 },

  // ============ 本地零食 ============
  { keywords: ["twisties", "original"], food: "Twisties Original (1 small pack)", calories: 120, protein: 1, carbs: 16, fat: 6 },
  { keywords: ["twisties", "bbq"], food: "Twisties BBQ (1 small pack)", calories: 120, protein: 1, carbs: 16, fat: 6 },
  { keywords: ["super ring", "original"], food: "Super Ring (1 small pack)", calories: 130, protein: 1, carbs: 18, fat: 6 },
  { keywords: ["mamee", "monster", "small"], food: "Mamee Monster Snack (small)", calories: 100, protein: 1, carbs: 14, fat: 4 },
  { keywords: ["mamee", "monster", "big"], food: "Mamee Monster Snack (big)", calories: 200, protein: 2, carbs: 28, fat: 8 },
  { keywords: ["apollo", "layer cake"], food: "Apollo Layer Cake (1 piece)", calories: 150, protein: 3, carbs: 28, fat: 3 },
  { keywords: ["apollo", "chocolate", "wafer"], food: "Apollo Chocolate Wafer (1 pack)", calories: 170, protein: 2, carbs: 27, fat: 6 },
  { keywords: ["chacha", "nuts", "small"], food: "Chacha Roasted Nuts (small pack)", calories: 180, protein: 6, carbs: 10, fat: 14 },
  { keywords: ["keropok", "ikan", "small"], food: "Keropok Ikan (small pack)", calories: 150, protein: 3, carbs: 20, fat: 6 },
  { keywords: ["keropok lekor", "5 piece"], food: "Keropok Lekor (5 pieces)", calories: 200, protein: 5, carbs: 30, fat: 8 },
  { keywords: ["muruku", "small"], food: "Muruku (1 small pack)", calories: 140, protein: 2, carbs: 18, fat: 7 },
  { keywords: ["cucur udang", "1 piece"], food: "Cucur Udang (1 piece)", calories: 120, protein: 3, carbs: 15, fat: 5 },
  { keywords: ["pisang goreng", "2 piece"], food: "Pisang Goreng (2 pieces)", calories: 180, protein: 2, carbs: 30, fat: 7 },

  // ============ 饮料 (原基础上新增大量乳制品/健康饮) ============
  { keywords: ["milo", "3 in 1", "sachet"], food: "Milo 3-in-1 sachet (1 cup)", calories: 170, protein: 5, carbs: 30, fat: 4 },
  { keywords: ["milo", "kosong"], food: "Milo Kosong (1 cup, no sugar)", calories: 120, protein: 3, carbs: 21, fat: 2 },
  { keywords: ["nescafe", "3 in 1"], food: "Nescafe 3-in-1 (1 cup)", calories: 90, protein: 1, carbs: 17, fat: 2 },
  { keywords: ["teh tarik", "3 in 1"], food: "Teh Tarik 3-in-1 sachet", calories: 120, protein: 1, carbs: 22, fat: 3 },
  { keywords: ["horlicks", "3 in 1"], food: "Horlicks 3-in-1 (1 cup)", calories: 130, protein: 4, carbs: 25, fat: 2 },
  { keywords: ["vitagen", "original"], food: "Marigold Vitagen (1 bottle)", calories: 80, protein: 1, carbs: 18, fat: 0 },
  { keywords: ["yakult"], food: "Yakult (1 bottle)", calories: 50, protein: 0.5, carbs: 12, fat: 0 },
  { keywords: ["100 plus", "100plus"], food: "100 Plus (1 can)", calories: 90, protein: 0, carbs: 22, fat: 0 },
  { keywords: ["coca cola", "coke", "tin"], food: "Coca-Cola (1 can)", calories: 140, protein: 0, carbs: 39, fat: 0 },
  { keywords: ["sprite", "tin"], food: "Sprite (1 can)", calories: 140, protein: 0, carbs: 38, fat: 0 },
  { keywords: ["fanta", "orange", "tin"], food: "Fanta Orange (1 can)", calories: 160, protein: 0, carbs: 43, fat: 0 },
  { keywords: ["lipton", "tea", "no sugar"], food: "Lipton Tea (no sugar)", calories: 0, protein: 0, carbs: 0, fat: 0 },
  { keywords: ["soya bean", "drinho"], food: "Drinho Soya Bean (1 packet)", calories: 100, protein: 5, carbs: 13, fat: 2 },
  { keywords: ["bandung", "sirap"], food: "Sirap Bandung (1 glass)", calories: 150, protein: 0, carbs: 35, fat: 0 },

  // ============ 酸奶 (Yogurt) ============
  { keywords: ["yogurt", "nestle", "natural", "plain", "original"], food: "Nestle Natural Yogurt (1 cup, 135g)", calories: 90, protein: 5, carbs: 12, fat: 3 },
  { keywords: ["yogurt", "nestle", "strawberry", "fruit"], food: "Nestle Strawberry Yogurt (1 cup, 135g)", calories: 130, protein: 4, carbs: 23, fat: 2.5 },
  { keywords: ["yogurt", "nestle", "blueberry"], food: "Nestle Blueberry Yogurt (1 cup, 135g)", calories: 130, protein: 4, carbs: 23, fat: 2.5 },
  { keywords: ["yogurt", "dutch lady", "natural", "plain"], food: "Dutch Lady Plain Yogurt (1 cup, 140g)", calories: 95, protein: 6, carbs: 11, fat: 3 },
  { keywords: ["yogurt", "dutch lady", "strawberry"], food: "Dutch Lady Strawberry Yogurt (1 cup, 140g)", calories: 140, protein: 5, carbs: 24, fat: 2.5 },
  { keywords: ["yogurt", "dutch lady", "mixed berry"], food: "Dutch Lady Mixed Berry Yogurt (1 cup, 140g)", calories: 140, protein: 5, carbs: 24, fat: 2.5 },
  { keywords: ["yogurt", "marigold", "plain", "original"], food: "Marigold Plain Yogurt (1 cup, 135g)", calories: 88, protein: 5, carbs: 12, fat: 3 },
  { keywords: ["yogurt", "marigold", "fruit", "strawberry"], food: "Marigold Fruit Yogurt (1 cup, 135g)", calories: 125, protein: 4, carbs: 22, fat: 2.5 },
  { keywords: ["yogurt", "yogood", "plain"], food: "Yogood Plain Yogurt (1 cup, 140g)", calories: 100, protein: 6, carbs: 13, fat: 3 },
  { keywords: ["yogurt", "yogood", "mango"], food: "Yogood Mango Yogurt (1 cup, 140g)", calories: 140, protein: 5, carbs: 24, fat: 2.5 },
  { keywords: ["yogurt", "greek", "farm fresh", "plain"], food: "Farm Fresh Greek Yogurt (1 cup, 150g)", calories: 130, protein: 13, carbs: 8, fat: 5 },
  { keywords: ["yogurt", "greek", "anlene", "plain"], food: "Anlene Greek Yogurt (1 cup, 150g)", calories: 120, protein: 12, carbs: 9, fat: 4 },

  // ============ 酸奶饮品 (Yogurt Drink) ============
  { keywords: ["yogurt drink", "nestle", "original"], food: "Nestle Yogurt Drink Original (1 bottle, 200ml)", calories: 140, protein: 5, carbs: 24, fat: 2.5 },
  { keywords: ["yogurt drink", "dutch lady", "original"], food: "Dutch Lady Yogurt Drink (1 bottle, 200ml)", calories: 150, protein: 5, carbs: 26, fat: 2.5 },
  { keywords: ["yogurt drink", "marigold", "fruit"], food: "Marigold Yogurt Drink (1 bottle, 200ml)", calories: 160, protein: 4, carbs: 30, fat: 2 },
  { keywords: ["yakult", "ace", "light"], food: "Yakult Ace Light (1 bottle)", calories: 35, protein: 0.5, carbs: 8, fat: 0 },

  // ============ 牛奶 (Milk) ============
  { keywords: ["milk", "dutch lady", "full cream", "uht"], food: "Dutch Lady UHT Full Cream Milk (1 cup, 250ml)", calories: 160, protein: 8, carbs: 12, fat: 9 },
  { keywords: ["milk", "dutch lady", "low fat", "hl"], food: "Dutch Lady Low Fat Milk (1 cup, 250ml)", calories: 110, protein: 8, carbs: 13, fat: 3.5 },
  { keywords: ["milk", "farm fresh", "full cream", "fresh"], food: "Farm Fresh Full Cream Milk (1 cup, 250ml)", calories: 160, protein: 8, carbs: 12, fat: 9 },
  { keywords: ["milk", "farm fresh", "low fat"], food: "Farm Fresh Low Fat Milk (1 cup, 250ml)", calories: 105, protein: 8, carbs: 12, fat: 3 },
  { keywords: ["milk", "goodday", "full cream"], food: "Goodday Full Cream Milk (1 cup, 250ml)", calories: 155, protein: 8, carbs: 12, fat: 8.5 },
  { keywords: ["milk", "goodday", "low fat"], food: "Goodday Low Fat Milk (1 cup, 250ml)", calories: 100, protein: 8, carbs: 13, fat: 2.5 },
  { keywords: ["milk", "marigold", "hl", "low fat", "high calcium"], food: "Marigold HL Low Fat High Calcium Milk (1 cup, 250ml)", calories: 110, protein: 8, carbs: 13, fat: 3.5 },
  { keywords: ["milk", "marigold", "full cream"], food: "Marigold Full Cream Milk (1 cup, 250ml)", calories: 155, protein: 8, carbs: 12, fat: 8.5 },
  { keywords: ["milk", "anlene", "low fat"], food: "Anlene Low Fat Milk (1 cup, 250ml)", calories: 110, protein: 9, carbs: 14, fat: 2.5 },
  { keywords: ["milk", "anmum", "essential"], food: "Anmum Essential Milk (1 cup, 250ml)", calories: 180, protein: 9, carbs: 20, fat: 7 },
  { keywords: ["milk", "so good", "oat milk"], food: "So Good Oat Milk (1 cup, 250ml)", calories: 120, protein: 2, carbs: 24, fat: 3 },
  { keywords: ["milk", "so good", "almond milk", "unsweetened"], food: "So Good Almond Milk Unsweetened (1 cup, 250ml)", calories: 40, protein: 1, carbs: 2, fat: 3.5 },

  // ============ 巧克力牛奶 ============
  { keywords: ["chocolate milk", "dutch lady", "choc"], food: "Dutch Lady Chocolate Milk (1 cup, 250ml)", calories: 200, protein: 8, carbs: 28, fat: 6 },
  { keywords: ["chocolate milk", "farm fresh", "choc"], food: "Farm Fresh Chocolate Milk (1 cup, 250ml)", calories: 210, protein: 8, carbs: 30, fat: 6.5 },
  { keywords: ["chocolate milk", "goodday", "choc"], food: "Goodday Chocolate Milk (1 cup, 250ml)", calories: 190, protein: 7, carbs: 28, fat: 5.5 },
  { keywords: ["chocolate milk", "marigold", "hl", "choc"], food: "Marigold HL Chocolate Milk (1 cup, 250ml)", calories: 180, protein: 8, carbs: 28, fat: 4.5 },

  // ============ 豆奶 (Soy Milk) ============
  { keywords: ["soy milk", "v-soy", "original", "unsweetened"], food: "V-Soy Original Unsweetened Soy Milk (1 box, 300ml)", calories: 90, protein: 9, carbs: 6, fat: 3 },
  { keywords: ["soy milk", "v-soy", "sweetened", "classic"], food: "V-Soy Classic Soy Milk (1 box, 300ml)", calories: 150, protein: 9, carbs: 18, fat: 4 },
  { keywords: ["soy milk", "homesoy", "original"], food: "Homesoy Original Soy Milk (1 box, 300ml)", calories: 140, protein: 8, carbs: 17, fat: 4 },
  { keywords: ["soy milk", "homesoy", "reduced sugar"], food: "Homesoy Reduced Sugar Soy Milk (1 box, 300ml)", calories: 100, protein: 8, carbs: 10, fat: 3 },
  { keywords: ["soy milk", "yeo's", "original"], food: "Yeo's Soy Milk (1 box, 250ml)", calories: 120, protein: 7, carbs: 15, fat: 3.5 },
  { keywords: ["soy milk", "dutch lady", "soy"], food: "Dutch Lady Soy Milk (1 box, 250ml)", calories: 130, protein: 7, carbs: 16, fat: 3.5 },

  // ============ 健康饮料 / 果汁 / 茶饮 ============
  { keywords: ["ribena", "blackcurrant", "ready to drink"], food: "Ribena Ready-to-Drink (1 carton, 250ml)", calories: 130, protein: 0, carbs: 33, fat: 0 },
  { keywords: ["ribena", "concentrate", "per glass"], food: "Ribena Concentrate (1 glass, diluted)", calories: 80, protein: 0, carbs: 20, fat: 0 },
  { keywords: ["tropicana", "orange juice", "regular"], food: "Tropicana Orange Juice (1 cup, 250ml)", calories: 110, protein: 2, carbs: 26, fat: 0 },
  { keywords: ["tropicana", "apple juice"], food: "Tropicana Apple Juice (1 cup, 250ml)", calories: 120, protein: 0, carbs: 28, fat: 0 },
  { keywords: ["sunquick", "orange", "per glass"], food: "Sunquick Orange (1 glass, diluted)", calories: 70, protein: 0, carbs: 18, fat: 0 },
  { keywords: ["marigold", "fruit juice", "orange"], food: "Marigold Orange Juice (1 cup, 250ml)", calories: 100, protein: 0, carbs: 25, fat: 0 },
  { keywords: ["f&n", "orange juice"], food: "F&N Orange Juice (1 cup, 250ml)", calories: 120, protein: 0, carbs: 29, fat: 0 },
  { keywords: ["pokka", "green tea", "no sugar"], food: "Pokka Green Tea No Sugar (1 bottle, 500ml)", calories: 0, protein: 0, carbs: 0, fat: 0 },
  { keywords: ["pokka", "jasmine tea", "no sugar"], food: "Pokka Jasmine Tea No Sugar (1 bottle, 500ml)", calories: 0, protein: 0, carbs: 0, fat: 0 },
  { keywords: ["pokka", "oolong tea"], food: "Pokka Oolong Tea (1 bottle, 500ml)", calories: 0, protein: 0, carbs: 0, fat: 0 },
  { keywords: ["oishi", "green tea"], food: "Oishi Green Tea (1 bottle, 380ml)", calories: 0, protein: 0, carbs: 0, fat: 0 },
  { keywords: ["nescafe", "canned", "latte"], food: "Nescafe Canned Latte (1 can)", calories: 100, protein: 4, carbs: 14, fat: 2.5 },
  { keywords: ["wonda", "coffee", "original"], food: "Wonda Coffee Original (1 can)", calories: 90, protein: 2, carbs: 14, fat: 2 },
  { keywords: ["yogurt", "yogurt drink", "vitagen", "less sugar"], food: "Vitagen Less Sugar (1 bottle)", calories: 60, protein: 1, carbs: 13, fat: 0 },
  { keywords: ["soy milk", "v-soy", "multigrain"], food: "V-Soy Multi-Grain Soy Milk (1 box, 300ml)", calories: 160, protein: 9, carbs: 20, fat: 5 },
  { keywords: ["coconut water", "vita coco"], food: "Vita Coco Coconut Water (1 pack, 330ml)", calories: 60, protein: 0, carbs: 15, fat: 0 },
  { keywords: ["coconut water", "cocomax"], food: "Cocomax Coconut Water (1 pack, 330ml)", calories: 60, protein: 0, carbs: 15, fat: 0 },
  { keywords: ["coconut water", "drinkable"], food: "Fresh Coconut Water (1 whole coconut)", calories: 100, protein: 1, carbs: 24, fat: 0 },
  { keywords: ["kombucha", "humm"], food: "Humm Kombucha (1 bottle, 330ml)", calories: 35, protein: 0, carbs: 8, fat: 0 },

  // ============ 本地食物 (保持不变) ============
  { keywords: ["nasi lemak", "bungkus"], food: "Nasi Lemak Biasa (1 bungkus)", calories: 400, protein: 10, carbs: 50, fat: 18 },
  { keywords: ["nasi goreng", "kampung"], food: "Nasi Goreng Kampung (1 plate)", calories: 550, protein: 12, carbs: 70, fat: 22 },
  { keywords: ["roti canai", "kosong"], food: "Roti Canai Kosong (1 piece)", calories: 200, protein: 4, carbs: 30, fat: 8 },
  { keywords: ["roti canai", "telur"], food: "Roti Canai Telur (1 piece)", calories: 350, protein: 10, carbs: 35, fat: 18 },
  { keywords: ["tosai", "thosai", "plain"], food: "Thosai Plain (1 piece)", calories: 150, protein: 3, carbs: 30, fat: 2 },
  { keywords: ["mee goreng", "mamak"], food: "Mee Goreng Mamak (1 plate)", calories: 500, protein: 10, carbs: 65, fat: 20 },
  { keywords: ["mee rebus"], food: "Mee Rebus (1 bowl)", calories: 450, protein: 8, carbs: 60, fat: 18 },
  { keywords: ["laksa", "asam"], food: "Asam Laksa (1 bowl)", calories: 350, protein: 12, carbs: 50, fat: 10 },
  { keywords: ["kuey teow", "goreng"], food: "Kuey Teow Goreng (1 plate)", calories: 520, protein: 10, carbs: 68, fat: 22 },
  { keywords: ["chicken rice", "nasi ayam"], food: "Nasi Ayam (1 plate)", calories: 450, protein: 18, carbs: 55, fat: 15 },
  { keywords: ["cendol"], food: "Cendol (1 bowl)", calories: 250, protein: 2, carbs: 50, fat: 5 },
  { keywords: ["ais kacang", "abc"], food: "Ais Kacang (1 bowl)", calories: 300, protein: 3, carbs: 60, fat: 5 },
  { keywords: ["karipap", "curry puff"], food: "Karipap (1 piece)", calories: 180, protein: 4, carbs: 22, fat: 9 },
  { keywords: ["kuih lapis"], food: "Kuih Lapis (1 slice)", calories: 130, protein: 2, carbs: 28, fat: 1 },
  { keywords: ["onde-onde"], food: "Onde-onde (2 pieces)", calories: 120, protein: 1, carbs: 25, fat: 2 },
  { keywords: ["pulut panggang"], food: "Pulut Panggang (1 piece)", calories: 170, protein: 3, carbs: 30, fat: 4 }
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
