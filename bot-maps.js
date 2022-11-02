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
        onEnterSay: "You are in a spooky house",
        
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
               "'E' ->room 'You explore east'",
               "'W' ->room 'You explore west'",
               "'S' ->room 'You explore south'",
              "'look' ->@ '#spookyDiscovery#'"
        ]
      },
      
      died: {
        onEnterSay: ["You died", "☠️"],
      }
    },
    
    grammar: {
      spookyDiscovery: ["something scary"],
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
          "wait:5 ->origin 'Ah, not quite the right time, I see.' 'Something else maybe?'",
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
};
