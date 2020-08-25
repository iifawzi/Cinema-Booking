// this helper will be used to generate the array which will be used to draw the seats structure

module.exports = (letters,rowsNumber,columnNumber,rowCorridors,columnCorridors,bookedSeats,lockedSeats)=>{
    const seats = [];
    for(let i=1;i<=rowsNumber;i++){
        let startNumber = 1;
        if (rowCorridors.includes(i)){
            seats.push(''); // this indicates that it's a row
            continue;
        }else {
            seats.push({key: letters[0], seats: []}); // push an object with a row key which is a letter and empty array which will be used below to fill the seats
        }
       for (let j=1;j<=columnNumber;j++){
           if (columnCorridors.includes(j)){ // if seat's column is corridor fill its position in the array with zero
            seats[i-1]["seats"].push(0);
           }else if (lockedSeats.includes(letters[0]+startNumber)){ // if the seat is closed fill its position with zero
            seats[i-1]["seats"].push(0);
            startNumber++
           }else if (bookedSeats.includes(letters[0]+startNumber)){ // if the seat is closed fill its position with one
            seats[i-1]["seats"].push(1);
            startNumber++
           }else {
            seats[i-1]["seats"].push(letters[0]+startNumber); // if not closed or booked or in the corridor - fill its position in array with the seat name which consists of (LETTER `refers to the row` AND COLUMN NUMBER )
            startNumber++
        }
       }
       letters.shift();
    };
    return seats;
}



