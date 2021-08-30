import Button from "@material-ui/core/Button";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const extractLineage = (org) => {
  let lineage = org.lineage;
  let taxonomyArray = [];

  while (lineage) {
    taxonomyArray.push({
      taxRank: capitalizeFirstLetter(lineage.taxonomy_rank.lineage_rank),
      taxName: lineage.taxonomy_name,
      taxid: lineage.tax_id,
    });

    lineage = lineage.parent_node;
  }

  return taxonomyArray;
};

const createData = (data, setOpenModal, setModalData, saveToSession) => {
  data = data ? data : JSON.parse(sessionStorage.getItem("searchResults"));
  if (data) {
    const tmpArray = [];

    if (saveToSession) {
      try {
        sessionStorage.setItem("searchResults", JSON.stringify(data));
      } catch (error) {
        sessionStorage.setItem("searchResults", JSON.stringify(""));
      }
    }

    for (const interaction of data) {
      tmpArray.push({
        virus: (
          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: "none" }}
            onClick={() => {
              setOpenModal(true);
              setModalData({
                organismName: interaction.virus.organism_name,
                taxID: interaction.virus.tax_id,
                accessionNumber: interaction.virus.accession_number,
                sequenceLength: interaction.virus.sequence_length,
                genomeType: interaction.virus.genome_type,
                lineage: extractLineage(interaction.virus),
              });
            }}
          >
            {interaction.virus.organism_name}
          </Button>
        ),

        host: (
          <Button
            variant="contained"
            color="secondary"
            style={{ textTransform: "none" }}
            onClick={() => {
              setOpenModal(true);
              setModalData({
                organismName: interaction.host.organism_name,
                taxID: interaction.host.tax_id,
                speciesTaxID: interaction.host.species_tax_id,
                lineage: extractLineage(interaction.host),
              });
            }}
          >
            {interaction.host.organism_name}
          </Button>
        ),

        evidence: interaction.evidence
          .map((evidence) => {
            return evidence.name;
          })
          .join(", "),

        pmid: interaction.article
          .map((article) => {
            return article.pmid;
          })
          .filter((pmid) => {
            return +pmid !== -1 && pmid !== "";
          })
          .join(", "),
      });
    }
    return tmpArray;
  }
  return [];
};

export default createData;
