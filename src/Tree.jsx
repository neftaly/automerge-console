import { useState } from 'react'
import './tree.css'

export const isObject = v => typeof v === 'object' && v !== null

export const Actions = ({ path }) => {
  /*
    import JSON
    export JSON
    copy to clipboard
    add
    delete
  */
}

export const Node = ({ name, value, path }) => {
  const [ expanded, setExpanded ] = useState(true)
  const expandable = isObject(value)
  return (
  <>
    { expandable && <button
      className='expand'
      children={expanded ? '-' : '+'}
      onClick={() => setExpanded(!expanded)}
    /> }
    <b children={name} />
    {
      expanded && (expandable
        ? <Branch data={value} path={path} />
        : <input value={JSON.stringify(value)} onChange={console.info} />)
    }
  </>
  )
}

export const Branch = ({ path, data }) => {
  return (
    <ul>
      {Object.entries(data).map(
        ([key, value]) => (
          <li key={key}>
            <Node name={key} value={value} path={[...path, key]} />
          </li>
        )
      )}
    </ul>
  )
}

export const Tree = ({ path, data }) => (
<div className="tree">
  <Branch path={path} data={data} />
 </div>
)
