const BOTS = {
  
  myBot: {
    grammar: {
      
      "texture" : ["silky", "rough", "textured", "rippling", "creased", "pleated", "ruffled", "starched", "supple", "satiny", "velvety"],
      "fabric" : ["leather", "taffeta", "satin", "silk", "lamé", "calico", "jersey", "sateen", "lace", "alpaca", "wool", "burlap", "cashmere", "angora", "pleather", "cotton", "rayon", "nylon"],
      "suprising" : ["welcome", "unexpected", "unfamiliar", "surpising"],
      "knowledge" : ["awareness", "a realization", "a dream", "the fantasy", "the dream", "the illusion", "the hope"],
      "love" : ["love", "know", "kiss", "see", "fear", "hear", "agree with", "forgive", "be forgiven by", "fight with", "reconcile with", "hold"],
      "relative" : ["grandmother", "mother", "grandfather", "father", "son", "daughter", "child", "first child"],
      "memory" : ["remembrance", "a sense of peace", "serenity", "the inevitability of death", "the immateriality of all things", "fall leaves", "newfallen snow", "the ocean", "your first kiss", "mother's perfume", "your future", "your dreams", "your past", "destiny", "faint hope", "false hope", "loss", "sunscreen in the summer", "the heat of the sun", "bitter cold", "forgiveness", "a newborn child", "the first day of school", "the day #they# left", "the first day you saw #them#", "autumn leaves", "the sea at night", "your #relative#'s smile", "father's aftershave", "grass after the rain", "disappointment", "Christmas morning", "birthday cake", "wedding cake", "#knowledge# that you will never #love# your #relative#", "what it is to #love# someone", "#knowledge#, just #knowledge#"],
      "gone" : ["gone", "lost", "past", "forgotten", "forgiven"],
      "rhetoricalQuestion" : ["#they# will not return this time.", "that time is #gone#", "could #they# even #love# you?", "what would #they# say if #they# knew?", "you can never #love# #them# again.", "it is #gone#, all is #gone#.", "#gone#, it is too late to #love# #them#.", "this is not what #they# wanted.", "all you wanted was #memory#.", "this was not #their# #intention#.", "what did you think would happen?"],
      "intention" : ["intention", "plan"],
      "adj" : ["#landscapeAdj#", "#color#", "#flavorMod#"],
      
      "coffeeName" : ["#hpn# #coffeeType.capitalizeAll#", "#landscapeComplex.capitalizeAll# #coffeeType.capitalizeAll#", "#name#'s #coffeeType.capitalizeAll#"],
      "coffeeDesc" : ["#flavorAttr.capitalize#.  #coffeeServingInstruction#.", "#flavorAttr.capitalize# and #flavorAttr#.  #coffeeServingInstruction#."],

       
    },
    
    states: {
      origin: "",
      exits: [""]
    }
  }
  
}