function generationRandomPassword() {
    let passwordString = '';
    const lengthPasswordString = 16;
    const alphabet = 'abcdefjhijklmnopqrstuvwxyz_';

    for (let index = 0; index < lengthPasswordString; index++) {
        const randomNumber = Math.floor((Math.random() * 10) + 0);
        const randomString = Math.floor(Math.random() * (alphabet.length - 0) + 0);

        if (index % 2 != 0) {
            passwordString += alphabet[randomString];
        }

        else if (index % 4 == 0) {
            passwordString += randomNumber;
        }
    };

    for (let symbol = 4; symbol < passwordString.length; symbol+=4) {
        if (symbol % 4 == 0) {
            passwordString += passwordString[symbol].toUpperCase();
        }
    }

    return passwordString += '!';
}

module.exports = ( {generationRandomPassword} );