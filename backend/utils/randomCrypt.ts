const pickAlgorithm = (algortihms: [String]) => {
    //randomly picks an element from the algortihms array
    const randAlgo = Math.floor(Math.random() * algortihms.length);

    return algortihms[randAlgo];
}

export default pickAlgorithm