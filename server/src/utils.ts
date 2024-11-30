
export const RandomLink = (len:Number) => {
    let options = "kjdshfjsjdiu81ncjsnkjcs271nsdj";
    let ans = "";

    for (let i = 0; i < options.length; i++) {
        ans += options[Math.floor(Math.random() * options.length)];
    }

    return ans;
}