# Proof of concept: bioschemas-protein-render

## Example

See the prototype in action here with the default accession [P12272](http://bioschemas.org/bioschemas-protein-render/poc.html) or with a different accession [P05067](http://bioschemas.org/bioschemas-protein-render/poc.html?P05067). This is just a proof of concept so not all UniProt accessions will work, we have not checked for possible exceptions. We have tested with some [human proteins with available 3D structures](http://www.uniprot.org/uniprot/?query=database%3a(type%3apdb)&fil=reviewed%3ayes+AND+organism%3a%22Homo+sapiens+(Human)+%5b9606%5d%22&columns=id%2centry+name%2creviewed%2cprotein+names%2cgenes%2corganism%2clength&offset=0&sort=score). 

## Details

One of the advantages of [Bioschemas](https://bioschemas.org) is the possibility of retrieving mark up from multiple complimentary sources in order to create a quick and short summary, i.e., infobox. In the protein case, this can be easily achieved as UniProt, InterPro and PDBe link and complement each other. Ideally a crawler would be used to retrieve information from these three sources. A [Bioschemas crawler](http://bioschemas.org/tools/) is under construction but not yet finalized; thus we use here a minimalistic approach to show how an infobox could work.

We have develop two web components capable of generating Bioschemas markup from web services. The first one,
[bioschemas-uniprot-adapter](https://github.com/BioSchemas/bioschemas-uniprot-adapter), serves Bioschemas markup for a UniProt entry, while the second, [bioschemas-pdbe-adapter](https://github.com/BioSchemas/bioschemas-pdbe-adapter) does it for a PDBe 3D structure entry. Both web components are put together by a third one, [bioschemas-protein-render](https://github.com/BioSchemas/bioschemas-protein-render).

[bioschemas-protein-render](https://github.com/BioSchemas/bioschemas-protein-render) takes a hard-coded UniProt entry, [P12272](http://www.uniprot.org/uniprot/P12272), and retrieves its mark up via [bioschemas-uniprot-adapter](https://github.com/BioSchemas/bioschemas-uniprot-adapter). 
Any other valid UniProt accession is also possible via parameters, just add `?<accession>` after the URL.
It then takes from this markup the first PDBe 3D structure, and uses [bioschemas-pdbe-adapter](https://github.com/BioSchemas/bioschemas-pdbe-adapter) to get the
corresponding PDBe 3D structure markup. It finally renders the JSON-LD for both. 

A more elaborated infobox would render not the JSON-LD as it is, but would use it to create something more human-readable and visual-appealing summary. That would be the next step once a crawler is available (so the markup is directly taken from
the web pages). 

## About
This work was conducted by the Bioschemas [Protein working group](http://bioschemas.org/groups/Proteins/) led by Maria Martin, with participation from UniProt (Maria Martin, Leyla Garcia), InterPro (Rob Finn, Aurelièn Luciani and Gustavo Salazar) and PDBe (Sameer Verlanka and Joseph Anyango).
The Protein working group aimed to define, prototype, and test using [schema.org] markup to represent protein sequences as well as their functional annotations and structures. The main goals included (i) definition of a use case and scope of the WP, (ii) definition of a draft schema.org data model for protein annotations involving relevant protein resources, and (iii)
test and evaluation of this model including identification of pros and cons of using schema.org and Bioschemas.

