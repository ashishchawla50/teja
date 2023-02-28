// import namor from "namor";
import { editIconUri, editIconUriconst } from '../Constant';


const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    // firstName: namor.generate({ words: 1, numbers: 0 }),
    // lastName: namor.generate({ words: 1, numbers: 0 }),
    createdDate:"12/12/2015",
    createdDates:"ok",
    isWebPageHelpful:"No",
    feedback: "View Feedback",
    status: "Open",
    updatedDate: "12/12/2015",
    comments: "View Comments",
    actions: <> <div className='editIconAction'> <img src={editIconUri} /> </div></>,
  
  };
}; 

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
}
