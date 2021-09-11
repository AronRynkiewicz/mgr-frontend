import createData from "../Tools/create-data";

const filterTable = (
  event,
  value,
  setRows,
  setOpenModal,
  setModalData,
  setFilters,
  evidenceFilters,
  setEvidencesFilters
) => {
  event.preventDefault();
  const virus_name = event.target.elements.viruses_names.value;
  const virus_taxid = event.target.elements.viruses_taxids.value;
  const host_name = event.target.elements.hosts_names.value;
  const host_taxid = event.target.elements.hosts_taxids.value;

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

  if (evidenceFilters) {
    const newData = [];

    for (const interaction of data) {
      let pushArray = [];

      if (evidenceFilters.includes("Literature")) {
        const pmids = interaction.article
          .map((article) => {
            return article.pmid;
          })
          .filter((pmid) => {
            return +pmid !== -1 && pmid !== "";
          });
        if (pmids.length !== 0) {
          pushArray.push(true);
        } else {
          pushArray.push(false);
        }
      }

      const databases = interaction.evidence.map((evidence) => {
        return String(evidence.name);
      });

      for (const filter of evidenceFilters) {
        if (filter === "Literature") {
          continue;
        }
        if (databases.includes(filter)) {
          pushArray.push(true);
        } else {
          pushArray.push(false);
          break;
        }
      }

      if (!pushArray.includes(false)) {
        newData.push(interaction);
      }
    }

    data = newData;
  }

  setFilters({
    "Virus name": virus_name,
    "Virus taxID": virus_taxid,
    "Host name": host_name,
    "Host taxID": host_taxid,
    Evidence: evidenceFilters.join(", "),
  });

  setEvidencesFilters([]);
  setRows(createData(data, setOpenModal, setModalData, false));
};

export default filterTable;
