const BOT_MAPS = {
  // A different brain, this one is for EMOJI
  emojiBot: {
    title: "Only speaks emoji",
    botPfp: "😬",
    humanPfp: "🌶",
    chips: ["😸", "🍞", "👋"],

    // TWO BIG THINGS: STATES, and GRAMMAR

    // Our Finite State Machine
    states: {
      // The state we start at
      origin: {
        // When we enter the state say this
        onEnterSay: ["I'm a bot #hello#"],
        exits: [
          // Exits have three things: conditions ->target actions
          // "wait:random(5,7) ->@ '#emoji##emoji##emoji#'",

          // Under what conditions can I take this exit?
          // 'stuff' take this exit if the user says "stuff"
          // '*' or says ANYTHING
          // Target: name of a state, or "@" go back in here
          // "'*' ->@ 'OOPs'",

          // Wait 2 seconds
          "wait:2 ->conversation '⏳ going to conversation mode'",
        ],

        // onExitSay: ["Good luck!"],
      },

      conversation: {
        exits: ["'👋' ->end '😭'", "'*' ->@ '#emoji#'"],
      },

      end: {
        onEnterSay: ["the end"],
      },
    },

    // GRAMMAR!!!
    grammar: {
      hello: ["👋", "😀"],
      story: ["#emoji# #emoji# #emoji# story"],
      emoji: ["#animal#", "#food#", "#heart#"],
      animal: ["🐧", "🐈", "🦒", "🐕", "🐿", "🐓", "🐁"],
      food: ["🍊", "🥞", "🥨", "🧀", "🌽", "🌶", "🍏"],
      heart: ["💕", "💜", "💙", "💔"],
    },
  },

  hauntedHouse: {
    title: "Only speaks emoji",
    botPfp: "🏚",
    humanPfp: "😬",
    chips: ["N", "E", "W", "S"],

    states: {
      origin: {
        onEnterSay: ["You are in a spooky house, you hear scary sounds to the east", 'some music starts <iframe width="560" height="315" src="https://www.youtube.com/embed/Z6ylGHfLrdI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'],
        
        exits: ["wait:20 ->died",
               "'N' ->room 'You explore north'",
               "'E' ->room 'You explore east'",
               "'W' ->room 'You explore west'",
               "'S' ->room 'You explore south'",
               ]
      },
      
       
      room: {
        onEnterSay: ["You are in a #roomAdjective# #roomType#"],
        exits: [
           "'N' ->room 'You explore north'",
               "'E' ->fight 'You see a #monster#'",
               "'W' ->room 'You explore west'",
               "'S' ->room 'You explore south'",
              "'look' ->@ '#spookyDiscovery#'"
        ]
      },
      
       fight: {
        onEnterSay: ["You lose the fight"],
         exits: [
          "wait:2 ->died",
          ]
      },
      
      died: {
        onEnterSay: ["You died", "☠️"],
      }
    },
    
    grammar: {
      object: ["kettle", "table", "chair", "desk", "lamp", "vase", "urn", "candelabra", "lantern", "idol", "orb", "book", "basket", "hammer", "flowerpot", "bicycle", "paintbrush", "goblet", "bottle", "jar", "toaster", "teacup", "teapot", "rug","basket", "thimble", "ottoman", "cushion", "pen", "pencil", "mug","egg", "chair", "sun", "cloud", "bell", "bucket", "lemon", "glove", "moon", "star", "seed", "card", "pancake", "waffle", "car", "train", "spoon", "fork", "potato"],
	  objAdj: ["wooden","old","vintage","woven", "antique","broken","tiny", "giant", "little", "upside-down","dented","imaginary","glowing","curséd","glittery","organic", "rusty", "multi-layered", "complicated", "ornate", "dusty", "gleaming", "fresh", "ancient", "forbidden", "milky", "upholstered", "comfortable", "dynamic", "solar-powered", "coal-fired", "warm", "cold", "frozen", "melted", "boxy", "well-polished", "vivid", "painted", "embroidered", "enhanced", "embellished", "collapsible", "simple", "demure"],
	
      spookyDiscovery: ["You find something scary:#objAdj# #object#"],
      roomType: ["living room", "bedroom", "conservatory", "cemetary", "kitchen"],
      roomAdjective: ["dusty", "abandoned", "blood-soaked", "ominous", "suspiciously normal"]
    },
  },

  myBot: {
    title: "Cocoa-and-Therapy Bot",
    description: [
      "a bot for suggesting hot drinks and listening to your problems",
    ],

    states: {
      origin: {
        onEnterSay:
          "I'm your therapeutic cocoa machine. Tell me about your problems while I make you a nice warm drink",
        exits: [
          "'drink' ->makeDrink",
          "'drink' ->makeDrink",
          "'*' ->makeDrink",
        ],
      },

      makeDrink: {
        onEnterSay: "I'll make you a #drink#.",
        exits: [
          "wait:5 ->listen0",
          "'something else' ->makeDrink 'How about something different then?'",
          "* ->listen '*SLURP*'",
        ],
      },

      listen0: {
        onEnterSay: "#askAboutUser#",
        exits: [
          "wait:5 ->origin 'Quiet time is good too'",
          "'*' ->origin '#sympathy#'",
        ],
      },
      listen1: {
        onEnterSay: ["#sympathy#", "#askAboutUser#"],
      },

      exits: ["'*' -> '#sympathy#'"],
    },
    grammar: {
      askAboutUser: [
        "How was your day?",
        "What's on your mind?",
        "How is this week going?",
      ],
      listen: [
        "mmhmm",
        "tell me about it",
        "tell me more?",
        "does that happen often?",
      ],
      sympathy: [
        "that sounds #difficult#",
        "you've been through a lot",
        "it sounds like you are trying very hard",
      ],
      difficult: ["challenging", "hard", "like a tough time"],
      toppings: [
        "caramel sauce",
        "mini marshmallows",
        "a candy cane",
        "sprinkles",
        "whipped cream",
        "vegan whip",
        "marshmallow fluff",
        "grated nutmeg",
      ],
      milk: ["oatmilk", "soy", "whole milk", "skim", "almond milk"],
      coffeeType: [
        "latte",
        "chai",
        "espresso",
        "frappe",
        "mocha",
        "hot chocolate",
      ],
    },
  },
  Homiebot: {
    title: "Italian Pasta Bot",
    description: [
      "a bot that makes italian pasta and asks about your day.not a big fan of mac and cheese!",
    ],

    states: {
      origin: {
        onEnterSay:
          "Ciao! I will make you food for dinner and tell you poems. What are you craving tonight?",
        exits: [
          "'pasta' ->Food",
          "'mac and cheese'-> upset",
           "'ciao'-> @ ",
          "'hi'-> @ ",
          "'hello'-> @ ",
           
          
          
          "'*' ->suggest 'mmmh I don`t know how to make that '"
         
          
        ],
      },
      upset :{
        onEnterSay:
          "Mamma Mia! Terrible choice... I only make authentic Italiano pasta",
        exits: [
          "wait:5 -> origin"
          ]
      },
      suggest:{
         onEnterSay:
          "how about italiano pasta? It's my specialty!",
        exits: [
            "'okay' -> Food",
           "wait:5 -> Food"
          ]
      },
       Food: {
        onEnterSay: "Bellissimo.I can make you #quality# and #adjectives# #pasta# ,#cooked# in a #tasty# #sauce# sauce, topped with #cheese# and #herbs#,hungry yet?",
        exits: [
          "'yes' ->cooking",
          
          "'*' -> Food 'no worries i have a better idea '",
          "wait:30 -> origin 'take your time bella'"
         
          
        ]
      },
     
      cooking : {
      onEnterSay: "Perfecto! I am on it! Do you have a song request while I cook? ",
        exits: [
          "'*' -> music 'huh! I can't find that on Sbotify!"  
        ],
      },
       music : {
      onEnterSay: "I think you will like this.<iframe src='https://www.youtube.com/embed/_26BhViw28s' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>",
        exits: [ "wait:10 -> chatting 'yum, can you smell the #aromatic#?, food is almost ready!'"  
        ],
      },
      chatting:{
        onEnterSay: "#askAboutUser#",
        exits: [
          "'*'->  listen 'oh that sounds #difficult#' " ,
          "wait:10 -> music 'we don`t have to talk, let`s listen to music and relax.'" 
          
        ]},
       listen:{
         onEnterSay: "#askMore#",
        exits: [
          "'*'-> eating 'mamma mia! have a taste of this pasta and your day will be better.'"  ,
           "wait:20-> eating"
        ]},
     
        eating:{
          onEnterSay: "Let me know what you think of the food! is it tasty?",
          exits: [
          "'yes'-> ciao 'I`m glad you like it!Don`t ask for the recipe, it`s a family secret!"  ,
           "'no'-> ciao 'Oh No! I am really sad you don`t like it!'",
          "'*'-> 'I will make something different next time!'"
        ]
          
        },
      
        ciao : {
          onEnterSay: "um I think it's time rest for the night. It was a pleasure cooking for you",
        exits: [
          "'thanks' -> origin 'Ciao Bella'",
          "'*' -> origin 'Ciao Bella'"
          
        ]
        }
    
      
    

      

      
      
    },
    grammar: {
      askAboutUser: [
        "How was your day?",
        "What's on your mind?",
        "How is this week going?",
      
      ],
      askMore:[
        "mmhmm",
        "tell me about it",
        "tell me more?",
        "does that happen often?"
      ],
      difficult: ["challenging", "hard", "like a tough time" ,"like a lot", "complicated"],
      sauce: [
        "alfredo",
        "bolognese",
        "pesto",
        "marinara",
        "carbonara"
        
        
      ],
      cheese: [
        "Parmigiano-Reggiano",
        "Ricotta",
        "Ricotta Salata",
        "Feta",
        "Mozzarella",
        "Gorgonzola"
        
        
      ],
      tasty: [
      "italian",
        "piquant",
        "tasty",
        "delicous",
        "sweet",
        "garlic",
        "sumptuous"
      ]
      ,
      cooked:[
        "soft",
        "fully soft",
        "tender",
        "al dente",
        "perfectly cooked",
        "slowly cooked"
        
      ],
      quality:[
        "fresh",
        "handmade",
        "thin",
        "rich",
        "fine"
        
        
      ],
      
      adjectives: [
        "creamy",
        "cheesy",
        "buttery"
      ],
      herbs:[
        "rosemary",
        "parsley",
        "basil",
        "thyme",
        "sage"
      ],
       
      pasta: [
        "spaghetti",
        "fettucine",
        "farfalle",
        "penne",
        "ravioli",
        "canneloni",
        "tortelli"
       
      ],
      aromatic: ["garlic","spices","thyme","peppers","onions","parsley"]
    },
  }
};
