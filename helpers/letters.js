// this helper will be used to generate an array of letters equals to the rows number: for example if the rows number is 4, it will return : 
// ["A", "B", "C","D"]
// if the rows number is larger than the english letters which is 26 letter, it will return the first 26 letter and AA,BB,CC,..... AAA,BBB,CCC,......... 

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
module.exports = (rowsNumber)=>{
    if (rowsNumber<=26){
        return letters.slice(0,rowsNumber);
    }else {
        let neededLoops = Math.ceil(rowsNumber / 26);
        let finalLetters = [...letters];
        for (let i=1;i<neededLoops;i++){
            let lettersAlice = [...letters]; 
            finalLetters = [...finalLetters, ...[...lettersAlice.map(letter=>{
                let mainLetter = letter;
                for(let j=0;j<i;j++){
                    letter += mainLetter;
                }
                return letter;
            })].slice(0,rowsNumber-26)]
        }
        return finalLetters;
    }
}