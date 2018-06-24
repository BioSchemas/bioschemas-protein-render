#Protein working group - Bioschemas implementation study - Year 1
The Protein working group was lead by Maria Martin and counted with the participation of people from UniProt (Maria Martin, Leyla Garcia), 
InterPro (Rob Finn, Aurelièn Luciani and Gustavo Salazar) and PDBe (Sameer Verlanka and Joseph Anyango).
The Protein working group aimed to define, prototype and test a schema.org to represent protein sequences as well as
their functional annotations and structures. The main goals includes (i) definition of a use case and scope of the WP, (ii)
definition of a draft schema.org data model for protein annotations involving relevant protein resources, and (iii)
test and evaluation of this model including identification of pros and cons of using schema.org and Bioschemas.


## Milestones
* M1. Identify needs and define use cases  Done. Use cases available at [1].
* M2. Analyze and map metadata and standards across selected protein data repositories  Done. Crosswalk available at [2].
* M3. Define minimum information guideline  Done. Contribution to Bioschemas types (i.e., those that will be propose
to schema.org) BioChemEntity [3] and DataRecord [4], and definition of Bioschemas profiles
(i.e., pseudo-types managed by Bioschemas) Gene [5], Protein [6], Protein Annotation [7] and Protein structure [8].
* M4. Test adoption by data repositories  On going. PDBe has already implemented a first version of Bioschemas markup
on their life web pages. InterPro will use Bioschemas types and profiles on their new website, currently under
development. UniProt will support Bioschemas types and profiles via web components [9].
* M5. Report pros and cons based on feedback  Done (but any further feedback should be integrated as needed). Initial
feedback has been gathered from people working on proteins in Italy as well as comments and discussions during the
Bioschemas meetings. We expect more feedback as data resources include the protein mark up on their pages.

## Deliverables
* D1. Bioschemas specification including a draft schema.org data model for protein annotations  Done. Rather than
a specific type for protein annotations, it was decided to use some generic types such as BioChemEntity [3] and
DataRecord [4] and specialize them via profiles such as Protein [6], protein annotation [7] and protein structure [8].
* D2. Data repository using Bioschemas compliant markup (could be mocked up)  Done in mockup via examples [10, 11, 12].
A live implementation is under development for the new InterPro website. A live implementation is already available on
PDBe web pages.
* D3. Create proof of concept client integrating annotation from several resources  Done via an example. 


### D3. Proof of concept: bioschemas-protein-render
One of the advantages of Bioschemas is the possibility of retrieving mark up from multiple complimentary sources in
order to create a quick and short summary, i.e., infobox. In the protein case, this can be easily achieved as UniProt, InterPro
and PDBe link and complement each other. Ideally a crawler would be used to retrieve information from these three
sources. A Bioschemas crawler is under construction but not yet finalized; thus we use here a minimalistic approach
to show how an infobox could work.

We have develop two web components capable of generating Bioschemas markup from web services. The first one,
bioschemas-uniprot-adapter [9], serves Bioschemas markup for a UniProt entry, while the second,
bioschemas-pdbe-adapter [13] does it for a PDBe 3D structure entry. Both web components
are put together by a third one, bioschemas-protein-render [14].

bioschemas-protein-render takes a hard-coded UniProt entry, P12272, and retrieves its mark up via bioschemas-uniprot-adapter. 
Any other valid UniProt accession is also possible via parameters, just add ?<accession> after the URL.
It then takes from this markup the first PDBe 3D structure, and uses bioschemas-pdbe-adapter to get the
corresponding PDBe 3D structure markup. It finally renders the JSON-LD for both. A more elaborated
infobox would render not the JSON-LD as it is, but would use it to create something more human-readable and
visual-appealing summary. That would be the next step once a crawler is available (so the markup is directly taken from
the web pages). See it in action here with the default accession [P12272](http://bioschemas.org/bioschemas-uniprot-render/poc.html) 
or with a different accession [P05067](http://bioschemas.org/bioschemas-uniprot-render/poc.html?P05067)

## Links
* [1] [Protein use](http://bioschemas.org/useCases/Proteins/)
* [2] [Crosswalk](https://docs.google.com/spreadsheets/d/1QQH4AkzdwPT1Qt5OLmH5HosLpkFU7khwE4Ql9_Cb9ZQ)
* [3] [BioChemEntity specification](http://bioschemas.org/types/BioChemEntity/specification)
* [4] [DataRecord specification](http://bioschemas.org/types/DataRecord/specification)
* [5] [Gene draft specification](http://bioschemas.org/devSpecs/Gene/specification)
* [6] [Protein specification](http://bioschemas.org/specifications/Protein/specification)
* [7] [Protein annotation specification](http://bioschemas.org/specifications/ProteinAnnotation/specification)
* [8] [Protein structure specification](http://bioschemas.org/specifications/ProteinStructure/specification)
* [9] [bioschemas-uniprot-adapter](https://github.com/BioSchemas/bioschemas-uniprot-adapter)
* [10] [Protein example](https://github.com/BioSchemas/specifications/tree/master/Protein/examples/)
* [11] [Protein annotation example](https://gist.github.com/kcmcleod/474f3a25d5b4b3a902552a88301d747b)
* [12] [Protein structure example](https://gist.github.com/kcmcleod/8b14caeeb7fa0cae2242af18c97c6690)
* [13] [bioschemas-pdbe-adapter](https://github.com/BioSchemas/bioschemas-pdbe-adapter)
* [14] [bioschemas-protein-render](https://github.com/BioSchemas/bioschemas-protein-render)