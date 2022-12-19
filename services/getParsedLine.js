export const getParsedLine = async (line) => {
 
    let parsedLine =
        line.includes('"') ?
            line.split('"') : 
            line.includes('\'') ?
                line.split('\'') :
                line.split(' ');

    parsedLine = parsedLine.map((el) => el.trim());

    parsedLine = parsedLine.filter((el) => {
        return (el != null && el != "" || el === 0);
    });

    return {
        command: parsedLine.shift(),
        params: parsedLine,
    }
}