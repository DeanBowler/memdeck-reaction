import React from 'react';
import { useState } from 'react';

import { shuffle, newTamariz } from './deck-engine';
import Card from './components/Card';
import Deck from './components/Deck';

// function Test() {
//     // const newDeck = newTamariz();
//     // const [deck, setDeck] = useState(0);

//     const [count, setCount] = useState(0);
//     // debugger;
//     // // let deck = newTamariz();
//     // // deck = shuffle(deck);

//     // console.log(deck);
//     // console.log(deck);

//     // const shuffley = () => {
//     //     setDeck(shuffle(deck));
//     // };

//     return (
//         <div className="App">
//             {/* <button onClick={shuffley}>fuck</button>
//             <Deck model={deck} /> */}
//         </div>
//     );
// }

const Test = () => {
    debugger;
    const [count, setCount] = useState<number>(0);

    return (
        <div className="counter">
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
};

export default Test;
