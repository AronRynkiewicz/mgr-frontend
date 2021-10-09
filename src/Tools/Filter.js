import React from "react";
import AutocompleteTextBox from "./AutocompleteTextBox";
import Grid from "@material-ui/core/Grid";

const extractLineage = (org) => {
  let lineage = org.lineage;
  let taxonomyArray = [];

  while (lineage) {
    taxonomyArray.push(lineage.taxonomy_name);
    taxonomyArray.push(lineage.tax_id);

    lineage = lineage.parent_node;
  }

  return taxonomyArray;
};

const createFilterArray = (data) => {
  const viralDataSet = new Set();
  const hostDataSet = new Set();

  if (data) {
    for (const interaction of data) {
      viralDataSet.add(interaction.virus.organism_name);
      viralDataSet.add(String(interaction.virus.tax_id));
      extractLineage(interaction.virus).forEach((lin) =>
        viralDataSet.add(String(lin))
      );
      hostDataSet.add(interaction.host.organism_name);
      hostDataSet.add(String(interaction.host.tax_id));
      extractLineage(interaction.host).forEach((lin) =>
        hostDataSet.add(String(lin))
      );
    }
  }

  return [[...viralDataSet], [...hostDataSet]];
};

const Filter = (props) => {
  const [viralDataSet, hostDataSet] = createFilterArray(props.data);

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <AutocompleteTextBox
          options={viralDataSet}
          label={"Viral organism name or taxID or taxonomy"}
        />
      </Grid>

      <Grid item xs={6}>
        <AutocompleteTextBox
          options={hostDataSet}
          label={"Host organism name or taxID or taxonomy"}
        />
      </Grid>
    </Grid>
  );
};

export default Filter;
