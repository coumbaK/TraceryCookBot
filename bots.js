const BOTS = {
  
  myBot: {
    title: "Cocoa-and-Therapy Bot",
    description: ["a bot for suggesting hot drinks and listening to your problems"],
    grammar: {
      toppings: ["caramel sauce", "mini marshmallows", "a candy cane", "sprinkles", "whipped cream", "vegan whip", "marshmallow fluff", "grated nutmeg"],
      milk: ["oatmilk", "soy", "whole milk", "skim", "almond milk"],
       coffeeType: ["latte", "chai", "espresso", "frappe", "mocha", "hot chocolate"],
    },
    
    states: {
      origin: "",
      exits: [""]
    }
  }
  
}