import Button from "@material-ui/core/Button";
import EvidenceTags from "../UI/EvidenceTags";

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

const createData = (data, setOpenModal, setModalData) => {
  if (data) {
    const tmpArray = [];

    for (const interaction of data) {
      const pmids = interaction.article
        .map((article) => {
          return article.pmid;
        })
        .filter((pmid) => {
          return +pmid !== -1 && pmid !== "";
        })
        .join(", ");

      const evidences = interaction.evidence.map((evidence) => {
        return evidence.name;
      });

      if (pmids.length !== 0) {
        evidences.push("Literature");
      }

      tmpArray.push({
        virus: (
          <Button
            variant="contained"
            style={{ textTransform: "none" }}
            onClick={() => {
              setOpenModal(true);
              setModalData({
                organismName: interaction.virus.organism_name,
                taxID: interaction.virus.tax_id,
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

        evidence: evidences.map((evidence) => (
          <EvidenceTags tag_name={evidence} />
        )),

        virusAccession: (
          <a
            href={
              "https://www.ncbi.nlm.nih.gov/nuccore/" +
              interaction.virus.accession_number
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {interaction.virus.accession_number}
          </a>
        ),

        genomeType: interaction.virus.genome_type.genome_type,

        genomeDB: interaction.virus.genome_db.genome_db,

        assemblyLevel: interaction.virus.assembly_level.assembly_level,

        sequenceLength:
          interaction.virus.sequence_length !== -1
            ? interaction.virus.sequence_length
            : 0,
      });
    }
    return tmpArray;
  }
  return [];
};

export default createData;
