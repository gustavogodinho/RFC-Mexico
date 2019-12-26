
var rfc = {
    getRFC: function (name, surnameFather, surnameMother, bornDay, bornMonth, bornYear) {

        name = StringUtilities.clearString(this.removePrefixes(this.removeCommonNames(name)));
        surnameFather = StringUtilities.clearString(this.removePrefixes(surnameFather));
        surnameMother = StringUtilities.clearString(this.removePrefixes(surnameMother));
        bornDay = StringUtilities.clearString(bornDay);
        bornMonth = StringUtilities.clearString(bornMonth);
        bornYear = StringUtilities.clearString(bornYear);

        rfc = this.getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear);
        //n = name + ' ' + surnameFather + ' ' + surnameMother;
        //h = homoclave.fn_HomoclaveRFC(n);
        //d = homoclave.fn_DigitoVerificadorRFC(rfc + h);

        return rfc;
    },
    getCommonPart: function (name, surnameFather, surnameMother, bornDay, bornMonth, bornYear) {
        commonPart = surnameFather[0];
        commonPart += StringUtilities.getFirstInternalVowel(surnameFather);
        commonPart += surnameMother[0] || 'X';
        commonPart += name[0];
        commonPart = this.removeBadWords(commonPart)
        commonPart += bornYear.substring(2);
        commonPart += bornMonth;
        commonPart += bornDay;

        return commonPart;
    },

    removeCommonNames: function (name) {
        this.notAcceptedNames.forEach(
            function (notAccepted) {
                name = name.replace(new RegExp('^' + notAccepted), '');
            }
        );

        return name;
    },
    removePrefixes: function (name) {
        this.prefixes.forEach(
            function (notAccepted) {
                name = name.replace(new RegExp('^' + notAccepted), '');
            }
        );

        return name;
    },

    removeBadWords: function (word) {
        badWordsList = this.badWordsRFC

        if (badWordsList[word]) {
            return badWordsList[word]
        }

        return word;
    },

    notAcceptedNames: new Array(
        'MARIA DEL ',
        'MARIA DE LOS ',
        'MARIA ',
        'JOSE DE ',
        'JOSE ',
        'MA. ',
        'MA ',
        'M. ',
        'J. ',
        'J '
    ),
    prefixes: new Array(
        'PARA ',
        'AND ',
        'CON ',
        'DEL ',
        'LAS ',
        'LOS ',
        'MAC ',
        'POR ',
        'SUS ',
        'THE ',
        'VAN ',
        'VON ',
        'AL ',
        'DE ',
        'EL ',
        'EN ',
        'LA ',
        'MC ',
        'MI ',
        'OF ',
        'A ',
        'E ',
        'Y '
    ),

    badWordsRFC: {
        "BUEI": "BUEX",
        "BUEY": "BUEX",
        "CACA": "CACX",
        "CACO": "CACX",
        "CAGA": "CAGX",
        "CAGO": "CAGX",
        "CAKA": "CAKX",
        "COGE": "COGX",
        "COJA": "COJX",
        "COJE": "COJX",
        "COJI": "COJX",
        "COJO": "COJX",
        "CULO": "CULX",
        "FETO": "FETX",
        "GUEY": "GUEX",
        "JOTO": "JOTX",
        "KACA": "KACX",
        "KACO": "KACX",
        "KAGA": "KAGX",
        "KAGO": "KAGX",
        "KOGE": "KOGX",
        "KOJO": "KOJX",
        "KAKA": "KAKX",
        "KULO": "KULX",
        "MAME": "MAMX",
        "MAMO": "MAMX",
        "MEAR": "MEAX",
        "MEON": "MEOX",
        "MION": "MIOX",
        "MOCO": "MOCX",
        "MULA": "MULX",
        "PEDA": "PEDX",
        "PEDO": "PEDX",
        "PENE": "PENX",
        "PUTA": "PUTX",
        "PUTO": "PUTX",
        "QULO": "QULX",
        "RATA": "RATX",
        "RUIN": "RUIX",
    }
}
var StringUtilities = {
    getFirstInternalVowel: function (word) {
        vowels = word.substring(1).match(new RegExp('[AEIOU]'));
        if (vowels) {
            return vowels[0] || 'X';
        } else {
            return 'X'
        }
    },
    getFirstInternalConsonant: function (word) {
        vowels = word.substring(1).match(new RegExp('[BCDFGHJKLMNPQRSTUVWXYZ]'));
        if (vowels) {
            return vowels[0] || 'X';
        } else {
            return 'X'
        }
    },
    clearString: function (word) {
        cleanWord = word.trim();
        cleanWord = cleanWord.replace(/\s/g, ' ');
        cleanWord = this.removeAccents(cleanWord.toUpperCase());
        return cleanWord;
    },
    removeAccents: function (word) {
        accents = {
            'Á': 'A',
            'É': 'E',
            'Í': 'I',
            'Ó': 'O',
            'Ú': 'U'
        }

        for (accented in accents) {
            word = word.replace(new RegExp(accented), accents[accented]);
        }
        return word;
    }



}
// var homoclave = {

//     fn_HomoclaveRFC: function (name) {
//         equivalencia = '123456789ABCDEFGHIJKLMNPQRSTUVWXYZ';
//         i = 1;
//         cadenaNums = 0;
//         total = name.length;
//         suma = 0;

//         while (i <= total) {

//             cadenaNums += this.caracterHomoclaveRFC(name, i);

//             i++;
//         }
//         console.log(cadenaNums)

//         i = 1;

//         cadenaNums = '0' + cadenaNums;
//         console.log(cadenaNums)

//         while (i <= cadenaNums.length - 1) {

//             numero1 = cadenaNums.substr(i, 2)
//             numero2 = cadenaNums.substr(i + 1, 1)

//             suma += numero1 * numero2;

//             i++;
//         }

//         console.log(suma)

//         cociente = suma / 34
//         residuo = suma % 34

//         console.log(cociente)
//         console.log(residuo)

//         console.log(equivalencia.substr(cociente + 1, 1) + equivalencia.substr(residuo + 1, 1));
//         return h = equivalencia.substr(cociente + 1, 1) + equivalencia.substr(residuo + 1, 1);
        
//     },
//     fn_DigitoVerificadorRFC: function (texto) {
//         total = texto.length;
//         cadenaNums = '';
//         cont = 0;
//         suma = 0;
//         i = 1;

//         if (total = 12) {
//             modValue = 11
//         }
//         else {
//             modValue = 10
//         }

//         while (i <= total) {
//             cadenaNums = cadenaNums + this.caracterDigitoVerificador(texto, i)
//             i++
//         }

//         i = 1;

//         while (i <= 23) {
//             numero = cadenaNums.substr(i, 2)
//             suma += (numero * (13 - cont))

//             cont++
//             i++
//         }

//         residuo = suma % modValue;
//         r = 11 - residuo;

//         if (residuo = 0) {
//             digitoVerificador = '0'
//         } else {
//             if (r = 10) {
//                 digitoVerificador = 'A'
//             } else {
//                 digitoVerificador = r
//             }
//         }

//         return digitoVerificador
//     },

//     caracterHomoclaveRFC: function (name, i) {
//         r = 0
//         caracter = name.substr(i, 1);
//         //console.log(name.substr(i, 1));


//         switch (caracter) {
//             case ' ':
//                 r = 00
//             case '&':
//                 r = 10
//             case 'Ñ':
//                 r = 10
//             case 'A': case 'B': case 'C': case 'D': case 'E': case 'F': case 'G': case 'H': case 'I':
//                 r = caracter.charCodeAt(0) - 54
//                 //console.log(caracter)
//                 //console.log(caracter.charCodeAt(0))
//                 //console.log('primeiro')
//             case 'J': case 'K': case 'L': case 'M': case 'N': case 'O': case 'P': case 'Q': case 'R':
//                 r = caracter.charCodeAt(0) - 53
//                 //console.log(caracter)
//                 //console.log(caracter.charCodeAt(0))
//                 //console.log('segundo')
//             case 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z':
//              //   console.log(caracter)
//                 r = caracter.charCodeAt(0) - 51
//                // console.log(caracter.charCodeAt(0))
//                // console.log('terceiro')
//         }
//         console.log(r)
//         return r
//     },
//     caracterDigitoVerificador: function (texto, i) {
//         caracter = texto.substring(i, 1)
//         switch (caracter) {
//             case ' ':
//                 r = '37'
//             case '&':
//                 r = '24'
//             case 'Ñ':
//                 r = '38'
//             case 'A': case 'B': case 'C': case 'D': case 'E': case 'F': case 'G': case 'H': case 'I': case 'J': case 'K': case 'L': case 'M': case 'N':
//                 r = caracter.charCodeAt(0) - 55
//             case 'O': case 'P': case 'Q': case 'R': case 'S': case 'T': case 'U': case 'V': case 'W': case 'X': case 'Y': case 'Z':
//                 r = caracter.charCodeAt(0) - 54
//             case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
//                 r = '0' + caracter
//         }
//         return r
//     }
// }