function randomVector(n) {
  // https://stackoverflow.com/questions/5836833/create-an-array-with-random-values

  return Array.from({ length: n }, () => Math.random());
}

function createPopulation(generator, count, parent, mutation) {
  console.log("Create population", count, parent, mutation)
  let population = []
  
  // How big is this "dna"?
  // For comparison, smallest genome is the bacteria Mycoplasma genitalium with 482 genes, 
  // worms have 20,000, and you have 40,000 (twice as many as a worm, impressive!)
  let dnaLength = generator.sliders.length
  for (var i = 0; i < count; i++) {
    if (parent) {
//       clone the parent
      population[i] = parent.slice(0)
      mutate(population[i], mutation)
    } else {
       population[i] = randomVector(dnaLength)
    }
    
   
  }
  return population
}


function mutate(dna, mutation) {
  for (var i = 0; i < dna.length; i++) {
    dna[i] += (Math.random()-.5)*mutation
    // Regress to .5 a bit
    
    dna[i] = Math.max(0, Math.min(1, dna[i]))
    dna[i] = p.lerp(dna[i], .5, .1)
  }
}


function changeToCount(generator, population, count) {
 let dnaLength = generator.sliders.length
 let toAdd = count - population.length
 console.log("ADD", toAdd)
   for (var i = 0; i < toAdd; i++) {
//     Add one
    population.push(randomVector(dnaLength) )
  }
  
  let toRemove = population.length - count
    for (var i = 0; i < toRemove; i++) {
//     Remove one
    population.splice(population.length - 1, 1)
    
  }
 
  console.log("generator",population)
  
}