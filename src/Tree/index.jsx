import { useState } from "react";
import { Actions, ExpandButton } from "./Buttons";
import { isObject, isString } from "./helpers";

/*
This tree editor presents a text view of pretty-printed JSON object,
which can be edited in place with instant feedback.

A "v2" could use a contenteditable and parse the JSON on the fly,
using context about the user actions to figure out what is being done on a 
per-node basis, and autocorrect/mark missing quotes/etc locally - as opposed to 
parsing the whole object at once.

This would present a developer-freindly interface similar to the experience of 
editing JSON in a text editor. This would let us get rid of the add/delete 
buttons. The import/export buttons could operate on the node closest to the 
cursor, which would mean we don't need to superimpose them over the content, 
and could use keyboard shortcuts. It'd also be nice to have keyboard shortcuts 
for navigating between nodes.

We would probably want to batch changes, so that we don't accidentally persist 
intermeditate states. A "commit changes" button would work for now.
*/

const stringColor = "DarkViolet"; // Make quoted strings more visible

export const Input = ({ value, onChange, path, showTrailingComma }) => {
  const v = JSON.stringify(value);
  // When editing a node, if it's not a primitive/number (isString),
  // we'll automatically wrap it in quotes
  return (
    <>
      <span children=": " />
      <span style={{ color: "transparent" }} children={v} />
      <input
        style={{
          fontFamily: "inherit",
          fontSize: "inherit",
          border: 0,
          backgroundColor: "transparent",
          color: isString(value) && stringColor,
          width: `${v.length}ch`,
          position: "absolute",
          padding: 0,
          margin: `0 0 0 -${v.length}ch`,
        }}
        value={v}
        onChange={onChange}
      />
      {showTrailingComma && <span children={","} />}
    </>
  );
};

export const Node = ({ name, value, path, isLast }) => {
  const [expanded, setExpanded] = useState(true);
  const expandable = isObject(value);
  const [openBracket, closeBracket] = Array.isArray(value)
    ? ["[", "]"]
    : ["{", "}"];
  const [hover, setHover] = useState(false);
  const showTrailingComma = !isLast;
  return (
    <div
      style={{
        marginLeft: "calc(2ch - 1px)",
        borderLeft: hover ? "1px dotted black" : "1px solid transparent",
      }}
      onMouseOver={(e) => {
        setHover(true);
        e.stopPropagation();
      }}
      onMouseOut={(e) => setHover(false)}
    >
      {expandable && (
        <ExpandButton
          expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        />
      )}
      {name && <b children={`"${name}"`} />}
      {name && expandable && ": "}
      {expandable && openBracket}
      {expanded && expandable && hover && <Actions path={path} isBranch />}
      {expanded &&
        (expandable ? (
          <Branch value={value} path={path} />
        ) : (
          <Input
            value={value}
            path={path}
            showTrailingComma={showTrailingComma}
            onChange={console.info}
          />
        ))}
      {!expandable && hover && <Actions path={path} />}
      {expandable && !expanded && "..."}
      {expandable && `${closeBracket}${showTrailingComma ? "," : ""}`}
    </div>
  );
};

export const Branch = ({ path, value }) => {
  const entries = Object.entries(value);
  const lastKey = entries.length - 1;
  return entries.map(([name, v], key) => (
    <Node
      key={key}
      name={name}
      value={v}
      path={[...path, name]}
      isLast={key === lastKey}
    />
  ));
};

export const Tree = ({ path, data }) => (
  <div style={{ fontFamily: "monospace", fontSize: "14px" }}>
    <Node name="" path={path} value={data} />
  </div>
);
