import createData from "../Tools/create-data";

const filterTable = (
  event,
  value,
  setRows,
  setOpenModal,
  setModalData,
  setFilters
) => {
  event.preventDefault();
  const virus_name = event.target.elements.viruses_names.value;
  const virus_taxid = event.target.elements.viruses_taxids.value;
  const host_name = event.target.elements.hosts_names.value;
  const host_taxid = event.target.elements.hosts_taxids.value;
  const evidence = event.target.elements.evidences.value;
  const pubmedid = event.target.elements.pubmedid.value;

  let data = JSON.parse(sessionStorage.getItem("searchResults"));

  if (virus_name) {
    data = data.filter(
      (interaction) => interaction.virus.organism_name === virus_name
    );
  }

  if (+virus_taxid) {
    data = data.filter(
      (interaction) => interaction.virus.tax_id === +virus_taxid
    );
  }

  if (host_name) {
    data = data.filter(
      (interaction) => interaction.host.organism_name === host_name
    );
  }

  if (+host_taxid) {
    data = data.filter(
      (interaction) => interaction.host.tax_id === +host_taxid
    );
  }

  if (evidence) {
    data = data.filter((interaction) =>
      interaction.evidence
        .map((evidence) => {
          return String(evidence.name);
        })
        .includes(evidence)
    );
  }

  if (pubmedid) {
    data = data.filter(
      (interaction) =>
        interaction.article
          .map((article) => {
            return article.pmid;
          })
          .filter((pmid) => {
            return +pmid !== -1 && pmid !== "";
          }).length !== 0
    );
  }

  setFilters({
    "Virus name": virus_name,
    "Virus taxID": virus_taxid,
    "Host name": host_name,
    "Host taxID": host_taxid,
    Evidence: evidence,
    "PubMed ID": pubmedid,
  });

  setRows(createData(data, setOpenModal, setModalData, false));
};

export default filterTable;
