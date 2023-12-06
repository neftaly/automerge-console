import { useState } from 'react'

import { Tree } from './Tree'

function App() {
  const [tree, setTree] = useState({
    a: {
      b: 123,
      c: 'hello'
    },
    d: {},
    e: [ true, false, null, 1 ]
  })

  return (
    <>
      <div>
        <Tree path={[]} data={tree} />
      </div>
    </>
  )
}

export default App
