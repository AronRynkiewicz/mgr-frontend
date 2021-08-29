import React, { useState } from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import axios from "axios";

const Tree = (props) => {
  const [childNodes, setChildNodes] = useState(null);
  const [expanded, setExpanded] = useState([]);

  const handleChange = (event, nodes) => {
    const data = {
      org: nodes[0],
    };

    const expandingNodes = nodes.filter((x) => !expanded.includes(x));
    setExpanded(nodes);
    if (expandingNodes[0]) {
      axios
        .post("api/browse/", data)
        .then((resp) =>
          setChildNodes(
            JSON.parse(resp.request.response).map((node) => (
              <Tree
                id={node}
                key={Math.floor(Math.random() * 50000000).toString()}
                name={node}
              />
            ))
          )
        );
    }
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      onNodeToggle={handleChange}
    >
      <TreeItem nodeId={props.id} label={props.name}>
        {childNodes || [<div key="stub" />]}
      </TreeItem>
    </TreeView>
  );
};

export default Tree;
