# CBN26 - Guida di manutenzione sito

Questa guida spiega come mantenere il sito e, in particolare, come funzionano i file JSON che popolano le sezioni modulari.

## 1) Panoramica rapida

- Il progetto e un sito statico HTML/CSS/JS.
- Non c'e build step obbligatorio: le pagine leggono direttamente file JSON e frammenti HTML.
- Le parti principali aggiornabili senza toccare il layout sono:
  - programma eventi
  - menu
  - sponsor
  - premi lotteria
  - gallerie foto (nuove e anni scorsi)
  - navbar condivisa

## 2) Struttura utile del progetto

- index.html: home, programma, menu dinamico, sponsor, preview foto
- lotteria.html: premi lotteria dinamici
- foto-nuove.html: gallery foto nuove da manifest
- foto-anni-scorsi.html: gallery foto storiche da manifest
- assets/components/navbar.html: componente navbar condiviso
- assets/navbar-loader.js: script che inietta la navbar nelle pagine
- assets/programma.json: dati eventi home
- assets/menu.json: dati menu home
- assets/sponsor.json: dati sponsor home
- assets/premiLotteria.json: dati premi lotteria
- assets/images/new/manifest.json: lista immagini nuove
- assets/images/old/manifest.json: lista immagini anni scorsi

## 3) Modulo navbar condiviso

Come funziona:
- Ogni pagina include lo script assets/navbar-loader.js.
- Lo script fa fetch di assets/components/navbar.html e sostituisce il contenitore navbar locale.
- Aggiunge anche il comportamento scroll (classe scrolled-nav oltre una certa soglia).

Manutenzione:
- Per cambiare link/icone/struttura navbar, modifica solo assets/components/navbar.html.
- Le modifiche si propagano a tutte le pagine che caricano navbar-loader.js.

## 4) JSON modulari: formato e regole

### 4.1 assets/programma.json

Uso:
- Letto nella home.
- Gli eventi vengono ordinati per data e ora.
- In pagina si vedono solo eventi del giorno corrente; se oggi non ci sono eventi, compare il countdown.

Formato atteso:

  {
    "eventi": [
      {
        "giorno": "15-01-2026",
        "ora": "09:00",
        "titolo": "Riunione di apertura",
        "descrizione": "Incontro introduttivo"
      }
    ]
  }

Regole importanti:
- giorno deve essere in formato GG-MM-AAAA.
- ora e trattata come stringa (consigliato HH:MM).
- Se vuoi vedere contenuti subito in home, metti almeno un evento con data odierna.

### 4.2 assets/menu.json

Uso:
- Letto nella home con fetch no-store.
- Il rendering ha due slot: menu-piatto-a e menu-piatto-b.
- Se nel JSON ci sono piu di 2 blocchi, quelli extra vengono ignorati (con warning in console).

Formato atteso:

  [
    {
      "titolo": "Primi",
      "lista": ["Piatto 1", "Piatto 2"]
    },
    {
      "titolo": "Secondi",
      "lista": ["Piatto A", "Piatto B"]
    }
  ]

Regole importanti:
- File root: array.
- Ogni elemento: oggetto con titolo (stringa) e lista (array di stringhe).
- Se l'array e vuoto ([]), la sezione menu nella home viene nascosta completamente.
- Se il caricamento fallisce, resta visibile il contenuto statico HTML di fallback.

### 4.3 assets/premiLotteria.json

Uso:
- Letto in lotteria.html con fetch no-store.
- Ogni record viene normalizzato via script.
- I primi 5 premi alimentano anche la lista "top".
- Se presenti numeri vincenti, si attiva la ricerca per numero.

Formato atteso (campi):
- premio: numero classifica
- descrizione: testo premio (obbligatorio)
- header: titolo breve (opzionale, usato in evidenza top)
- image: immagine premio top (opzionale)
- numero: numero vincente (opzionale)
- commento: nota aggiuntiva (opzionale)

Esempio:

  [
    {
      "premio": 1,
      "header": "Scooter",
      "descrizione": "Scooter 125cc",
      "image": "assets/images/lotteria/premio1.jpg",
      "numero": "A1234",
      "commento": "Ritiro entro 30 giorni"
    }
  ]

Regole importanti:
- descrizione vuota => record scartato.
- numero puo essere stringa o numero.
- Se il JSON e invalido o vuoto, appare il messaggio di errore in pagina.

### 4.4 assets/images/new/manifest.json

Uso:
- Letto in foto-nuove.html.
- Contiene la lista delle immagini da mostrare in gallery.
- In homepage alimenta la card anteprima "foto nuove": se il manifest e vuoto, la card viene nascosta.

Formato atteso:

  [
    "foto1.jpg",
    "foto2.jpg"
  ]

Regole immagini:
- Metti i file immagine in assets/images/new/.
- Per ogni immagine e consigliato creare anche la miniatura con prefisso thumb_.
  - esempio: foto1.jpg e thumb_foto1.jpg
- La gallery prova a caricare thumb_nomefile; se manca, puo usare fallback al file pieno.

### 4.5 assets/images/old/manifest.json

Uso:
- Letto in foto-anni-scorsi.html.
- La lista puo includere sottocartelle per anno.
- Le immagini vengono ordinate per anno decrescente e poi per nome.
- In homepage alimenta la card anteprima "anni scorsi": se il manifest e vuoto, la card viene nascosta.

Formato atteso:

  [
    "2024/img01.JPG",
    "2023/img10.JPG",
    "2022/img02.JPG"
  ]

Regole immagini:
- Metti i file nelle sottocartelle anno, per esempio assets/images/old/2024/.
- Miniature consigliate: stesso percorso, nome con prefisso thumb_.
  - esempio: 2024/img01.JPG e 2024/thumb_img01.JPG
- Se una miniatura manca, lo script prova il fallback al file originale.

### 4.6 assets/sponsor.json

Uso:
- Letto nella home con fetch no-store.
- Popola dinamicamente la griglia degli sponsor.
- Se il JSON e invalido, vuoto o senza campi immagine validi, l'intera sezione sponsor viene nascosta.

Formato atteso:

  [
    {
      "nome": "Nome Sponsor",
      "image": "assets/images/lotteria/001.png",
      "link": "https://www.sponsorwebsite.com"
    },
    {
      "nome": "Sponsor senza link",
      "image": "assets/images/lotteria/002.png"
    }
  ]

Regole importanti:
- File root: array.
- Ogni elemento e un oggetto con i seguenti campi:
  - image (obbligatorio): percorso dell'immagine logo dello sponsor.
  - nome (opzionale): testo nome sponsor, usato per aria-label e tooltip.
  - link (opzionale): URL esterno. Se presente, il container diventa un link <a> con target="_blank" e rel="noopener noreferrer".
- Se image manca o e vuota, il record viene scartato.
- Se nessun record valido, la sezione sponsor viene completamente nascosta.
- I logo vengono visualizzati con object-fit: contain per preservare aspect ratio.
- Le immagini si espandono per riempire lo spazio disponibile nel grid (150px minimo per altezza).

Esempio filename di immagini:
- Carica i file logo in assets/images/lotteria/ o cartella desiderata.
- Assicurati che i percorsi image nel JSON corrispondano esattamente ai file reali (considera maiuscole/minuscole su Linux).
- Consigliato: immagini con sfondo trasparente (PNG) per migliore aspetto.

## 6) Procedura consigliata per aggiornamenti

1. Modifica i JSON necessari.
2. Se aggiungi foto, aggiorna anche il relativo manifest.json.
3. Verifica che la sintassi JSON sia valida (virgole, parentesi, doppi apici).
4. Avvia un server locale statico (non aprire i file direttamente con file://).
5. Controlla le pagine interessate e la console browser.

Esempio server locale:
- python3 -m http.server 8080
- poi apri http://localhost:8080

## 7) Checklist rapida dopo ogni modifica

- Home:
  - programma visibile (oppure countdown se nessun evento oggi)
  - menu caricato correttamente nei due blocchi
  - sponsor caricati e visualizzati nella griglia
- Lotteria:
  - lista premi caricata
  - eventuale ricerca per numero funzionante
- Foto:
  - gallery nuove e storiche caricano immagini
  - miniature/fallback corretti
- Navbar:
  - presente e uguale in tutte le pagine

## 8) Problemi comuni e soluzione

- Non vedo il programma:
  - Controlla formato giorno GG-MM-AAAA e data odierna.
- Menu non aggiornato:
  - Verifica che menu.json sia un array valido.
  - Ricorda: vengono mostrati al massimo 2 blocchi.
- Sponsor non caricati:
  - Controlla che sponsor.json sia un array valido.
  - Verifica che almeno un record abbia il campo image presente e non vuoto.
  - Controlla percorsi immagini e nome file reale (maiuscole/minuscole contano su Linux).
  - Se tutti i record sono scartati, l'intera sezione sponsor viene nascosta.
- Premi mancanti:
  - Controlla che descrizione sia presente e non vuota.
- Foto mancanti:
  - Controlla percorsi nel manifest e nome file reale (maiuscole/minuscole contano su Linux).
- Navbar non caricata:
  - Verifica percorso assets/components/navbar.html e inclusione di navbar-loader.js nella pagina.

## 9) Nota operativa

Mantieni i JSON come unica fonte dati per i contenuti ripetitivi: riduce errori, evita duplicazioni e rende gli aggiornamenti piu veloci anche senza toccare l'HTML strutturale.

### 4.7 assets/mostre.json

Uso:
- Letto nella home (navigazione card eventi).

Formato atteso:

  [
    {
      "titolo": "String",
      "descrizione": "String",
      "image": "String"
    }
  ]

### 4.8 assets/incontri.json

Uso:
- Letto nella home (navigazione card eventi).

Formato atteso (include data/ora dell'evento):

  [
    {
      "titolo": "String",
      "descrizione": "String",
      "image": "String",
      "data": "YYYY-MM-DDTHH:MM:SS"
    }
  ]

Regole per mostre.json e incontri.json:
- Vengono scaricati dalla home per recuperare le immagini.
- Se almeno uno dei file contiene immagini nel campo `image`, la prima immagine disponibile viene usata come sfondo per la card `eventi` nella sezione di navigazione.
- Se entrambi i file sono vuoti o non ci sono immagini, la card degli eventi non viene mostrata in home.
