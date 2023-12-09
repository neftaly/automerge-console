import { useState } from "react";
import { Actions, ExpandButton } from "./Buttons";
import { isObject, isString } from "./helpers";

const stringColor = "DarkViolet"; // Make quoted strings more visible

export const Input = ({ value, onChange, path }) => {
  const v = JSON.stringify(value);
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
    </>
  );
};

export const Node = ({ name, value, path }) => {
  const [expanded, setExpanded] = useState(true);
  const expandable = isObject(value);
  const [openBracket, closeBracket] = Array.isArray(value)
    ? ["[", "]"]
    : ["{", "}"];
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        marginLeft: hover ? "calc(2ch - 1px)" : "2ch",
        borderLeft: hover && "1px dotted black",
        // backgroundColor: hover && "rgba(1,1,1,0.1)",
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
          <Input value={value} path={path} onChange={console.info} />
        ))}
      {!expandable && hover && <Actions path={path} />}
      {expandable && !expanded && "..."}
      {expandable && `${closeBracket},`}
    </div>
  );
};

export const Branch = ({ path, value }) =>
  Object.entries(value).map(([key, v]) => (
    <Node key={key} name={key} value={v} path={[...path, key]} />
  ));

export const Tree = ({ path, data }) => (
  <div style={{ fontFamily: "monospace", fontSize: "14px" }}>
    <Node name="" path={path} value={data} />
  </div>
);
