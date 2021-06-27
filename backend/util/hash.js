const HASH = (mod) => {
    var i, chr;
    for (i = 0; i < this.length; i++) {
      chr += this.charCodeAt(i);
    }
    return (chr * 274876858367) % mod;
  };

export default HASH