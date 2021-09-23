import React, { useState } from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import axios from "axios";
import BrowseTags from "../UI/BrowseTags";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

const sendRequest = (data, setChildNodes, props) => {
  axios.post("api/browse/", data).then((resp) =>
    setChildNodes(
      JSON.parse(resp.request.response).map((node) => (
        <Tree
          id={node.tax_name}
          key={node.tax_id}
          handleBrowseToSearch={props.handleBrowseToSearch}
          name={
            <p>
              <BrowseTags
                tag_rank={node.tax_rank}
                tag_text={node.tax_rank[0].toUpperCase()}
              />{" "}
              {node.tax_name} <i>({node.orgs_below})</i>
              <IconButton
                color="primary"
                onClick={() => {
                  props.handleBrowseToSearch(node.tax_name);
                }}
              >
                <SearchIcon fontSize="small" />
              </IconButton>
            </p>
          }
        />
      ))
    )
  );
};

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
      sendRequest(data, setChildNodes, props);
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
