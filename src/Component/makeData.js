// import namor from "namor";
import { COULMN_HEADER, editIconUri, editIconUriconst } from "../Constant";

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const d = randomDate(new Date(2012, 0, 1), new Date());

const newPerson = () => {
  const statusChance = Math.random();
  return {
    // firstName: namor.generate({ words: 1, numbers: 0 }),
    // lastName: namor.generate({ words: 1, numbers: 0 }),
    [COULMN_HEADER.CREATED_DATE]: randomDate(
      new Date(2012, 0, 1),
      new Date()
    )?.toLocaleDateString(),

    [COULMN_HEADER.IS_WEB_PAGE_HELPFUL]: Math.random() < 0.5 ? "Yes" : "No",
    [COULMN_HEADER.FEEDBACK]: (
      <>
        <div className="link">View Feedback</div>
      </>
    ),
    [COULMN_HEADER.STATUS]: Math.random() < 0.5 ? "Open" : "Closed",
    [COULMN_HEADER.UPDATED_DATE]: randomDate(
      new Date(2012, 0, 1),
      new Date()
    )?.toLocaleDateString(),
    [COULMN_HEADER.COMMENTS]: (
      <>
        <div className="link">View Comments</div>
      </>
    ),
    [COULMN_HEADER.ACTIONS]: (
      <>
        <div className="editIconAction">
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
