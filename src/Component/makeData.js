// import namor from "namor";
import { COULMN_HEADER, editIconUri, editIconUriconst } from "../Constant";

const range = (len) => {
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
    [COULMN_HEADER.CREATED_DATE]: "12/12/2015",

    [COULMN_HEADER.IS_WEB_PAGE_HELPFUL]: "No",
    [COULMN_HEADER.FEEDBACK]: "View Feedback",
    [COULMN_HEADER.STATUS]: "Open",
    [COULMN_HEADER.UPDATED_DATE]: "12/12/2015",
    [COULMN_HEADER.COMMENTS]: "View Comments",
    [COULMN_HEADER.ACTIONS]: (
      <>
        {" "}
        <div className="editIconAction">
          {" "}
          <img src={editIconUri} />{" "}
        </div>
      </>
    ),
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
