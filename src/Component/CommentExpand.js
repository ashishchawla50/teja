import React from "react";

function CommentExpand({ data, row }) {
  // props.data[props.row.index];
  // console.log(props.data);
  return (
    <>
      <div className="CommentExpand">
        <div className="CommentExpandInner">
          <table>
            <thead>
              <th>Comment Date</th>
              <th>Commented By</th>
              <th>Status</th>
              <th>Comment</th>
            </thead>
            <tr>
              <td> {new Date().toLocaleDateString()} </td>
              <td>Teja</td>
              <td>Open</td>
              <td>This feedback is not relevent</td>
            </tr>
            {data && row && data[row.index] && data[row.index].commentData
              ? data[row.index].commentData.map((e) => (
                  <>
                    <tr>
                      <td>{e.date}</td>
                      <td>{e.name}</td>
                      <td>{e.status}</td>
                      <td>{e.comment}</td>
                    </tr>
                  </>
                ))
              : null}
          </table>
        </div>
      </div>
    </>
  );
}

export default CommentExpand;
