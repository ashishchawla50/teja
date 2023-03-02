import React from "react";

function CommentExpand(props) {
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
              <td>2023-02-15</td>
              <td>First Name, Last Name</td>
              <td>Closed</td>
              <td>This feedback is not relevent</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}

export default CommentExpand;
