
var rfc = {
    getRFC: function (name, surnameFather, surnameMother, bornDay, bornMonth, bornYear) {

        name = StringUtilities.clearString(this.removePrefixes(this.removeCommonNames(name)));
        surnameFather = StringUtilities.clearString(this.removePrefixes(surnameFather));
        surnameMother = StringUtilities.clearString(this.removePrefixes(surnameMother));
        bornDay = StringUtilities.clearString(bornDay);
        bornMonth = StringUtilities.clearString(bornMonth);
        bornYear = StringUtilities.clearString(bornYear);

        rfc = this.getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear);

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
        'DE ',
        'DEL '
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
