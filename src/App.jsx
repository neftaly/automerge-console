import { useState } from "react";

import { Tree } from "./Tree";

function App() {
  const [tree, setTree] = useState({
    a: {
      b: 123,
      c: "hello",
      w: {
        x: [{ y: "z" }],
        aaaa: 123.456,
      },
    },
    d: {},
    e: [true, false, null, 1],
  });

  return (
    <>
      <div>
        <Tree path={[]} data={tree} />
      </div>
    </>
  );
}

export default App;
